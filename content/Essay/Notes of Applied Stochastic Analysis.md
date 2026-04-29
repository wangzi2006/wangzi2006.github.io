---
title: 应用随机分析笔记
---
> 序号的标号对标刘勇老师的讲义 lectnote26


## Kolmogorov Equation

本节的目标是直观理解并记忆 Kolmogorov Backward Equation（KBE）和 Kolmogorov Forward Equation（KFE，或称 Fokker-Planck Equation）。

回忆如下定义：

**Def 2.4.4（马氏过程的转移概率族）** 称 $(P(s,x;t,A))_{s<t, x \in \mathbb{R^n}, A \in \mathcal B(\mathbb R^n)}$ 是马氏过程 $(X_t)$ 的**转移概率族**，如果满足如下三个条件：
1. $P(s,-;t,A) \in \text{Bor}(\mathbb{R}^n)$
2. $P(s,x;t,-)$ 是可测空间 $(\mathbb{R}^n, \mathcal B(\mathbb{R}^n))$ 上的概率测度
3. 对于任意的 $f \in \text{Bor}_b(\mathbb {R}^n)$，
   $$
\mathbb{E}[f(X_t)|X_s] = \int f(y) P(s, X_s; t, dy)
$$
特别地，
- 当 $P$ 只与 $t-s$ 有关时，称为**时齐马氏过程**，记为 $P(t-s,x,A)$；
- 若 $P$ 有密度函数 $p(s,x;t,y)$，则称 $p$ 为马氏过程的**转移概率密度族**。

**(Def) 4.4（扩散过程，diffusion process）** 称轨道连续的马氏过程 $(X_t)$ 是**扩散过程**，如果满足以下三个条件：
$$
\begin{aligned}
&\lim _{t-s \downarrow 0} \frac{1}{t-s} \mathrm{P}\left(\left|X_t-x\right|>\varepsilon \mid X_s=x\right)=0 ; \\
&\lim _{t-s \downarrow 0} \frac{1}{t-s} \int_{|y-x| \leq \varepsilon}(y-x) P(s, x ; t, \mathrm{~d} y)=b(s, x) ; \\
&\lim _{t-s \downarrow 0} \frac{1}{t-s} \int_{|y-x| \leq \varepsilon}(y-x)^2 P(s, x ; t, \mathrm{~d} y)=\sigma^2(s, x) .
\end{aligned}
$$
称 $b(x,s)$ 为**漂移系数**， $\sigma^2(s,x)$ 为**扩散系数**。当 $(X_t)$ 是时齐马氏过程时，$b$ 与 $\sigma^2$ 不依赖于时间 $s$，分别记作 $b(x)$ 和 $\sigma^2(x)$。

> 当满足矩条件时，对 $b, \sigma^2$ 的计算可以写成更紧凑的形式：
> $$
> \begin{aligned}
> b(s,x) &= \lim_{t-s \downarrow 0} \frac{1}{t-s} \mathbb{E}[X_t - x| X_s = x] \\
> \sigma^2(s,x) &= \lim_{t-s \downarrow 0} \frac{1}{t-s} \mathbb{E}[(X_t - x)^2| X_s = x]
> \end{aligned}
> $$

先直接给出 KBE 和 KFE 的样子：

**Thm 4.4.1（Kolmogorov Backward Equation，KBE）** 设扩散过程 $X_t$ 有转移概率密度 $p(s,x;t,y)$，则
$$
\left\{ \begin{aligned}
-\frac{\partial p(s, x; t, y)}{\partial s} & = b(s, x)\frac{\partial p(s, x; t, y)}{\partial x} + \frac{1}{2}\sigma^2(s, x)\frac{\partial^2 p(s, x; t, y)}{\partial x^2}, \quad s < t \\
p(t, x; t, y) & = \delta_x(y)
\end{aligned} \right.
$$

**Thm 4.4.4（Kolmogorov Forward Equation，KFE）** 设扩散过程 $X_t$ 有转移概率密度 $p(s,x;t,y)$，则
$$
\left\{ \begin{aligned}
\frac{\partial p(s, x; t, y)}{\partial t} &=  - \frac{\partial}{\partial y} \left( b(t, y) p(s, x; t, y) \right) +\frac{1}{2} \frac{\partial^2}{\partial y^2} \left( \sigma^2(t, y) p(s, x; t, y) \right), \quad s<t \\
p(s, x; s, y) &= \delta_x(y)
\end{aligned} \right.
$$

粗糙地说，Kolmogorov 方程描述了：在给定系数以及目前概率密度 $p(s,x;t,y)$ 的情况下，如何通过目前的形状分布（关于 $x$ 或 $y$ 的导数）来判断形状分布随时间 $s$ 或 $t$ 的变化趋势。

两个方程有两个主要不同点：
1. 符号不同
2. 后向方程的求的是**密度**关于空间的偏导，而前向方程求的是**概率流**关于空间的偏导。
下面将详细展开如何理解这种不同。我们忽略第二行的初值（终值）条件，只理解第一行的等式。

### Backward Equation

等式的左侧 $-p'_s$ 理解成 $p'_{-s}=p'_{t-s}$，即概率分布随着时间的倒退而如何变化。把 $p$ 理解成收益（或者说，周围有多少粒子）。

例1：先考虑 $b$ 的影响。设 $\sigma = 0$，$b \equiv 1$（粒子匀速地向右移动），$p$ 增（右密左疏）。在目前 $s$，我右边比我人多，左边比我人少。

目标：我回到过去极小时刻，看看过去在此地时，现在周围的人更多还是更少。即比较 $p(s-\delta, x)$ 与 $p(s, x)$ 的大小关系。（根据公式，希望 $p(s-\delta, x)$ 更大。）

假如我可以穿越时间，来到之前一点 $s-\delta$ 的时刻，此时我位于 $x$，人群密度 $p(s-\delta, x)$。我随时间运动到 $s$ 时刻，此时随水流移动到右侧：$p(s-\delta, x) = p(s, x+ \delta)$，人比原先更多。

【画图：纵轴为时间，横轴为 $x$，用点的稀疏和稠密表示概率密度分布 $p$】

例2：假如粒子不是匀速移动的呢？仍然穿越时间。仍然有 $p(s-\delta, x) \approx p(s, x + b\delta)$，当 $p'_x$ 与 $b$ 符号一致时，$p(s-\delta,x) > p(s,x)$。

例3：再考虑 $\sigma^2$ 的影响。设 $b=0$，$\sigma^2 > 0$，概率分布形如开口朝上的二次函数，$p'_{xx} > 0$，比如两侧的人都比我多。

同样是回到过去极小时刻，看看过去在此地时，现在周围的人在期望意义下更多还是更少。由于是二次函数，我从 $s-\delta$ 时刻在 $x$ 开始走一段时间，到达 $x \pm \varepsilon$。由于 $x$ 是局部极小值点，因此我乱走的期望收益也比原先位置的收益更高。因此 $\sigma^2$ 前面的系数是正的。

总结来说，Backward Equation 理解成：**回到过去极小时刻，看看过去在此地时，在期望意义下，现在周围的人更多还是更少。** 我是一个轻巧的发射器，发射一些墨水，看看墨水会到达哪个位置。

<iframe src="static/animation/KBE.html" width="100%" height="500px" frameborder="0" scrolling="no"> </iframe>

### Forward Equation

与之对应的，在 Forward Equation 中，我是一个接收器，看看带有密度的粒子们将有多少撞到我的身上。这就是所谓的**概率流**观点。通过 $b$ 对概率分布的影响，我将详细解释概率流的含义。

例1：设 $\sigma = 0$，$b \equiv 1$（粒子匀速地向右移动），$p$ 增（右密左疏）。在目前 $t$，我右边比我人多，左边比我人少。

假如我再等一小会儿，在 $t + \delta$ 时刻，整体向右移动了，而我接收到的是原先位于左边的粒子数，粒子变少了。换句话说，$p(t+ \delta,y) = p(t, y- \delta) < p(t, y)$。这是负号的原因。

例2：$\sigma = 0$，$p$ 是均匀分布（在 $y$ 的邻域），$b$ 随着 $y$ 的增大而减小。比如，$b(-y) =  y$ 对 $y > 0$ 成立，$p(t,y) = 1$ 在 $y \in [-1,0]$ 上成立。

假如我在 $0$ 处再等一小会儿，虽然在我这个位置的 $b$ 为 $0$，也就是说，我并不会收到 ”局部整体平移“ 带给我的贡献，但是当 $y<0$ 时有一部分平移量到达了我的位置。因此，我在 $t + \delta$ 时刻从 $0$ 收到的粒子，比 $t$ 时刻要来的多。

这时候，我像是一个在 $0$ 处的观测者。想象路口在 $0$ 处堵车，后面的车子都在开向 $0$，但越远的车子开的越快。虽然最开始车子是均匀分布的，但随着时间的变化，密度仍然在向 $0$ 处汇聚。（通过合适的参数选择，我们甚至可以让车子一直是均匀分布的，只是分布的区间越来越小，就像是从两侧被压扁的长方形，从宽而矮变成窄而高。）

<iframe src="static/animation/KFE.html" width="100%" height="500px" frameborder="0" scrolling="no"> </iframe>


通过这个例子，我们发现，决定观测者观测到的车流量并不像原先那样仅仅由 $p$ 的形状决定，而是由 $p$ 的形状和 $b$ 的速度共同决定。这很好理解：车变多还是变少，取决于现在流走的车 $p(t,0)$ with 流失速度 $b(t,0)$ 和将要到达的车（比如，$b>0$，$p(t, 0_-)$ with 流入速度 $b(t, 0_-)$）。假如 $p(y)b(y)$ 局部减，意味着流入的车子 $p(y_{-})b(y_-)$ 比流出的车子 $p(y)b(y)$ 更多，意味着这点观测到的密度随着时间，也即 $p$ 关于 $t$ 增。

例3：再考虑 $\sigma^2$ 的影响。设 $b=0$，$\sigma^2 > 0$，概率分布形如开口朝上的二次函数，$p'_{xx} > 0$，比如两侧的人都比我多。随时间扩散，表现出劫富济贫（平均化）的性质，因此在此地观察到的粒子将（随着时间流逝而）变多。

总结而言，KFE 可以把方程重写为：
$$
\frac{\partial p}{\partial t} + \frac{\partial}{\partial y} J(t,y) = 0
$$
其中 $J(t,y) = b(t,y)p - \frac{1}{2}\frac{\partial}{\partial y}(\sigma^2(t,y)p)$ 称为**概率流 (Probability Flux)**，刻画了该时刻在该位置的例子期望流向多远的地方；假如比我小的地方比我流的快，则概率流的导数为负数。

局部密度的增加 $\frac{\partial p}{\partial t} > 0$，必然是因为流入大于流出，也即概率流的导数 $\frac{\partial J}{\partial y} < 0$。