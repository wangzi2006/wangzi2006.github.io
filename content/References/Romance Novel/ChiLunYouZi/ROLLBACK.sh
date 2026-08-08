#!/usr/bin/env bash
set -euo pipefail

target_dir="${1:-/e/Ceva/Important/4-college/6-entertain/8-Quartz/quartz/content/References/Romance Novel/ChiLunYouZi}"
list_file="$target_dir/.codex-generated-files.txt"
backup_dir="$target_dir/.codex-backup"

while IFS= read -r name; do
  [[ -z "$name" ]] && continue
  /usr/bin/rm -f -- "$target_dir/$name"
done < "$list_file"

/usr/bin/rmdir -- "$target_dir/Love in My Palm" "$target_dir/Sink with Me" 2>/dev/null || true

if [[ -d "$backup_dir/pre-draft-true" ]]; then
  /usr/bin/cp -R -- "$backup_dir/pre-draft-true/." "$target_dir/"
elif [[ -f "$backup_dir/Contract Marriage Madman.md" ]]; then
  /usr/bin/cp -f -- "$backup_dir/Contract Marriage Madman.md" "$target_dir/Contract Marriage Madman.md"
fi

echo "ROLLBACK_OK target=$target_dir"
