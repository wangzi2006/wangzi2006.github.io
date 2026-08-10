---
title: 相变与临界现象的数理 笔记
---

## 第二章 基本设定与定义

### 2.1 统计力学入门

有限集合 $S$ 是系统所有微观状态的集合，下面总用 $s$ 表示 $S$ 中的元素；**哈密顿量 (Hamiltonian)** $H$ 是定义在 $S$ 上的实值函数，其取值是取值是该微观状态下系统的能量。**逆温度** $\beta = (k_B T)^{-1}$，其中 $k_B$ 是 Boltzmann constant，$T$ 是绝对温度。

**Def (canonical distribution, 正则分布)** （依赖于 $\beta$ 的）**正则分布** 定义为
$$
p(s) := \frac{\exp(-\beta H(s))}{Z(\beta)}.
$$
其中，$Z(\beta) := \sum_s \exp(-\beta H(s))$ 称为 **配分函数 (partition function)**，它是正则分布的归一化系数。

> 在绝对零度，$\beta \to \infty$ ，能量最低的基态以概率 $1$ 出现；$\beta = 0$（极高温）时，外界强烈的热涨落扰动系统，因此所有微观状态等概率出现。

**期望**：$\langle g(s) \rangle_{\beta} := \sum_s p(s)g(s)$，$\langle  \cdot \rangle_\beta$ 中的下标 $\beta$ 暗示期望是依赖于 $\beta$ 的。有时省略。

**协方差**：$\langle g(s); h(s)\rangle := \langle g(s) h(s) \rangle - \langle g(s) \rangle \langle h(s) \rangle$

**Def (Helmholtz free energy, 亥姆霍兹自由能)** 依赖于逆温度 $\beta$ 的 **自由能** 定义为

$$
F(\beta) := -\frac{1}{\beta} \log Z(\beta) = -\frac{1}{\beta} \log \sum_{s \in S} e^{-\beta H(s)}.
$$
> `[!note]-` 自由能的直观理解
> 事实上，
> $$
> F = U - TS,
> $$
> 其中 $U = \langle H \rangle$ 是平均哈密顿量（能量），而
> $$
> S=-\sum_s p(s)\log p(s)
> $$
> 是熵。
> 
> 另一个等价定义是：
> $$
> F = \inf_{\mu} \left\{ \mathbb E_\mu H-\frac1\beta S(\mu) \right\}.
> $$
> 
述：



### 2.2 Ising 模型的定义

