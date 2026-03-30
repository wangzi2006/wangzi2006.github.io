[CmdletBinding()]
param(
  [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

function Write-Info([string]$msg) { Write-Host $msg }

$repo = (git rev-parse --show-toplevel) 2>$null
if (-not $repo) { throw "Not inside a git repository." }
Set-Location $repo

git config core.ignorecase false | Out-Null

# Canonical top-level content directories as they exist on disk
$canonicalContentDirs = @()
if (Test-Path -LiteralPath (Join-Path $repo 'content')) {
  $canonicalContentDirs = Get-ChildItem -LiteralPath (Join-Path $repo 'content') -Directory | Select-Object -ExpandProperty Name
}

Write-Info ("Canonical content dirs (disk): {0}" -f ($canonicalContentDirs -join ', '))

$files = @(git ls-files)
$dupes = @($files | Group-Object { $_.ToLowerInvariant() } | Where-Object { $_.Count -gt 1 })
Write-Info ("Case-collision groups: {0}" -f $dupes.Count)

if ($dupes.Count -eq 0) { exit 0 }

$removed = 0
foreach ($g in $dupes) {
  $group = @($g.Group)

  # Prefer the path whose top-level content dir matches on-disk casing
  $keep = $null
  foreach ($dir in $canonicalContentDirs) {
    $prefix = "content/$dir/"
    $candidate = $group | Where-Object { $_.StartsWith($prefix, [System.StringComparison]::Ordinal) } | Select-Object -First 1
    if ($candidate) { $keep = $candidate; break }
  }

  if (-not $keep) {
    # Fallback: keep the lexicographically-first variant
    $keep = ($group | Sort-Object)[0]
  }

  foreach ($p in $group) {
    if ($p -ceq $keep) { continue }

    if ($DryRun) {
      Write-Info ("DRYRUN: git rm --cached -- `"{0}`" (keep `"{1}`")" -f $p, $keep)
      continue
    }

    git rm --cached -- "$p" | Out-Null
    $removed++
  }
}

Write-Info ("Removed duplicate-casing index entries: {0}" -f $removed)

# Show remaining collisions (should be 0)
$files2 = @(git ls-files)
$dupes2 = @($files2 | Group-Object { $_.ToLowerInvariant() } | Where-Object { $_.Count -gt 1 })
Write-Info ("Remaining case-collision groups: {0}" -f $dupes2.Count)

git status -sb
