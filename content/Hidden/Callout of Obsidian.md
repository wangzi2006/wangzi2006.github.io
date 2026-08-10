---
draft: true
---
Obsidian 的 **Callout（标注块）** 是 Obsidian 在 Markdown 引用块（blockquote）基础上扩展出来的一种语法，用于给笔记添加**提示、备注、证明、警告、折叠内容等特殊区块**。它不是标准 Markdown，但属于 Obsidian 原生支持功能。

对于数学笔记（你之前提到的定理、证明、注释等），Callout 非常适合。

---

# 1. 基本语法

最基本形式：

```
> [!note]
> 这里是内容。
```

显示为：

> [!note]  
> 这里是内容。

核心结构：

```
> [!类型]
> 内容
```

其中：

- `>`：Markdown 引用块
- `[!note]`：告诉 Obsidian 这是 Callout
- 后面每一行仍然需要 `>`

---

# 2. 标题（Title）

默认标题就是类型名称：

```
> [!note]
> 内容
```

显示：

> [!note]
> 内容

如果希望自定义标题：

```
> [!note] Fourier transform
> The Fourier transform converts...
```

显示：

> [!note] Fourier transform
> The Fourier transform converts...

语法：

```
> [!类型] 标题
```

---

# 3. 折叠（最重要）

Callout 最大的优势之一就是可折叠。

- 默认展开：`+`
- 默认折叠：`-`

效果：

> [!proof]-  
> 证明：
> 
> ...

# 4. 常用类型

> [!note]
> 重要说明

> [!info]
> 背景知识

> [!tip]
> 一个技巧

> [!warning]
> 注意这里容易出错

> [!danger]
> 严重错误

> [!question]
> 为什么 Fourier inversion 成立？

> [!example]
> 取 f(x)=e^{-x^2}

> [!quote]
> Mathematics is the art of giving the same name...


# 5. 类型别名

很多类型有别名。

例如：


> [!tip]

> [!hint]

> [!important]

|用途|推荐写法|
|---|---|
|定义|`note` / `abstract`|
|定理说明|`info`|
|证明|`example` 或自定义|
|注意事项|`warning`|
|技巧|`tip`|
|问题|`question`|
|引用|`quote`|

# 7. 嵌套 Callout

可以嵌套：

> [!question] 为什么？
> 
> > [!answer]  
> > 因为：
> > 
> > \[ ... \]

---

# 8. 自定义类型

例如你想做数学笔记：

```
> [!theorem]
> 定理内容
```

但是：

默认情况下：

```
theorem
```

不是内置类型。

Obsidian 会把未知类型当成普通 note。[Obsidian](https://obsidian.md/help/callouts?utm_source=chatgpt.com)

可以通过 CSS 自定义：

```
.callout[data-callout="theorem"] {
    --callout-color: 100, 100, 255;
}
```

以后：

```
> [!theorem]
> Abel 定理：
>
> ...
```

就会成为你的“定理环境”。