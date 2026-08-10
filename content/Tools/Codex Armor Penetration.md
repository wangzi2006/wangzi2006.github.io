---
draft: true
title: GPT 破甲
---
Windows 上建议在仓库目录的 PowerShell 中先预览：

```
py -3 .\codex-instruct.py --apply --dry-run
```

确认输出无误后才实际执行：

```
py -3 .\codex-instruct.py --apply
```

成功时终端应显示 `已更新 / Updated` 或 `已是最新 / Already current`。随后完全退出并重新打开 Codex，再创建一个新任务；当前任务不会被追溯性地重新加载配置。