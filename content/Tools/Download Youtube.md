---
title: 下载 Youtube 视频
draft: true
---
打开对应 Youtube 视频，将插件 `Cookies.txt` （较小的文件）复制到 `E:\Ceva\Important\4-college\4-computer\youtube-download` 文件夹下，改名为 `cookies.txt`，随后：

```powershell
cd "E:\Ceva\Important\4-college\4-computer\youtube-download"
.\yt-dlp.exe --cookies ".\cookies.txt" -f "bv*+ba/b" --merge-output-format mp4 "https://www.youtube.com/watch?v=TfyPshgMbug"
```