---
title: Quartz 页面自定义
draft: true
---
## 快捷参数

**字体大小：** `quartz\styles\custom.scss` 中，修改 `1.07em`
```scss
article {
  font-size: 1.07rem;
}
```

**日期列宽度：** `quartz\components\styles\listPage.scss` 中，修改 `9em`
```scss
li.section-li {
  margin-bottom: 1em;
  & > .section {
    display: grid;
    grid-template-columns: fit-content(9em) 3fr 1fr;
```

**顶部留白：** `quartz\styles\variables.scss` 中，修改 `4rem`
```scss
$sidePanelWidth: 320px;
$topSpacing: 4rem; //原始 6rem
$boldWeight: 700;
```
## 修改字体样式

1. `quartz.config.ts` 中，修改
```ts
    theme: {
      fontOrigin: "local",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "LXGW WenKai Screen R",
        code: "IBM Plex Mono",
      },
```

2. 将字体对应的 `ttf` 放入 `quartz\static\fonts`；
3. 在 `quartz\styles\custom.scss` 中增加
```scss
@font-face {
  font-family: "LXGW WenKai Screen R";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/static/fonts/LXGWWenKaiScreenR.ttf") format("truetype");
}
```

## 查看所有评论

点击[链接](https://dash.cloudflare.com/56ce2eb7f042af5efa7e3621878a523e/workers/d1/databases/b811ce8c-81e3-4830-8ce0-aa9b92039bd7/console)，在下方命令行输入
```SQL
select * from annotation_inbox;
```
即可。