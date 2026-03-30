[CmdletBinding()]
param(
  [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

function Write-Info([string]$msg) {
  Write-Host $msg
}

# Ensure we run from repo root
$repo = (git rev-parse --show-toplevel) 2>$null
if (-not $repo) {
  throw "Not inside a git repository."
}
Set-Location $repo

# On Windows, case-only renames can be ignored; force git to respect case changes
git config core.ignorecase false | Out-Null

$deleted = @(git ls-files -d)
$untracked = @(git ls-files --others --exclude-standard)

Write-Info ("Deleted tracked: {0}; Untracked: {1}" -f $deleted.Count, $untracked.Count)

$delMap = @{}
foreach ($p in $deleted) { $delMap[$p.ToLowerInvariant()] = $p }

$untMap = @{}
foreach ($p in $untracked) { $untMap[$p.ToLowerInvariant()] = $p }

$keys = @($delMap.Keys | Where-Object { $untMap.ContainsKey($_) })
Write-Info ("Case-only rename pairs found: {0}" -f $keys.Count)

if ($keys.Count -eq 0) {
  exit 0
}

$processed = 0
foreach ($k in $keys) {
  $old = $delMap[$k]
  $new = $untMap[$k]

  if ($old -ceq $new) { continue }

  $oldFs = Join-Path $repo ($old -replace '/', '\\')
  $newFs = Join-Path $repo ($new -replace '/', '\\')

  if (-not (Test-Path -LiteralPath $newFs)) {
    continue
  }

  if ($DryRun) {
    Write-Info ("DRYRUN: git mv -f -- `"{0}`" `"{1}`"" -f $old, $new)
    continue
  }

  $tmp = Join-Path $env:TEMP ("quartz-rename-" + [guid]::NewGuid().ToString() + "-" + (Split-Path $newFs -Leaf))

  try {
    # 1) Move the newly-renamed file out of the way
    Move-Item -LiteralPath $newFs -Destination $tmp

    # 2) Restore the old tracked path from HEAD
    git checkout -- "$old" | Out-Null

    # 3) Ensure destination directory exists
    $destDir = Split-Path $newFs -Parent
    if ($destDir -and -not (Test-Path -LiteralPath $destDir)) {
      New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }

    # 4) Record the rename in git
    git mv -f -- "$old" "$new" | Out-Null

    # 5) Put back the real file contents
    Move-Item -LiteralPath $tmp -Destination $newFs -Force

    $processed++
    if ($processed % 200 -eq 0) {
      Write-Info ("Processed {0}/{1}" -f $processed, $keys.Count)
    }
  } catch {
    # Best-effort rollback
    Write-Info ("ERROR processing: {0} -> {1}" -f $old, $new)
    Write-Info $_

    if (Test-Path -LiteralPath $tmp) {
      $destDir = Split-Path $newFs -Parent
      if ($destDir -and -not (Test-Path -LiteralPath $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
      }
      Move-Item -LiteralPath $tmp -Destination $newFs -Force -ErrorAction SilentlyContinue
    }
  }
}

Write-Info ("Done. Converted {0} pairs." -f $processed)

git status -sb
