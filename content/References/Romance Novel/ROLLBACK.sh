#requires -version 5.1
$ErrorActionPreference = "Stop"
$Root = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Location).Path }
$List = Join-Path $Root ".codex-generated-files.txt"
if (Test-Path -LiteralPath $List) {
    foreach ($rel in Get-Content -LiteralPath $List) {
        if ($rel) { Remove-Item -LiteralPath (Join-Path $Root $rel) -Force -ErrorAction SilentlyContinue }
    }
}
foreach ($name in @("HuLiYouDou", "LiuYunDuan")) {
    $dir = Join-Path $Root $name
    if (Test-Path -LiteralPath $dir) {
        Get-ChildItem -LiteralPath $dir -Directory -Recurse | Sort-Object FullName -Descending | Where-Object { -not (Get-ChildItem -LiteralPath $_.FullName -Force) } | Remove-Item -Force
        if (-not (Get-ChildItem -LiteralPath $dir -Force)) { Remove-Item -LiteralPath $dir -Force }
    }
}
$Backup = Join-Path $Root ".codex-backup-link-export\LiuYunDuan\Atypical Marriage.md"
if (Test-Path -LiteralPath $Backup) {
    $Liu = Join-Path $Root "LiuYunDuan"
    New-Item -ItemType Directory -Path $Liu -Force | Out-Null
    Copy-Item -LiteralPath $Backup -Destination (Join-Path $Liu "Atypical Marriage.md") -Force
}
Write-Output "ROLLBACK_OK target=$Root"
