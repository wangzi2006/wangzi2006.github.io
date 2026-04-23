---
title: 常微分方程课堂补充
---
> 对[刘保平老师](http://162.105.102.96/teachers/~baoping/)常微分方程课程内容的理解与补充。持续施工中。

## 教材 引理 5.3

> 若 $Y'(x) = A(x) Y(x)$，则
> $$
> \frac{d\det(Y(x))}{dx} = \text{tr}(A(x)) \cdot \det Y(x)
> $$
> 因此，
> $$
> \det (Y(x)) = \det Y(x_0) \cdot e^{\int_{x_0}^x \text{tr}(A) dt} 
> $$

想象空间是二维的，$x$ 理解成时间。$Y(x) = [y_1(x), y_2(x)]$  是两个随时间 $x$ 变化的向量，$\det Y$ 是两个向量张成的平行四边形面积。

由方程的线性性，不难想象平行四边形随着时间改变的速率只依赖于平行四边形本身的大小，并且与之成比例。因此不妨设 $Y(0) = I_2$，即初始平行四边形由两个单位向量张成。

在极小的时间 $\varepsilon$ 后，两个解会变成 
$$
y_1(\varepsilon) \approx y_1(0) + \varepsilon y_1'(0) = \begin{pmatrix} 1 \\ 0 \end{pmatrix} + \varepsilon A \begin{pmatrix} 1 \\ 0 \end{pmatrix}
$$
$$
y_2(\varepsilon) \approx y_2(0) + \varepsilon y_2'(0) = \begin{pmatrix} 0 \\ 1 \end{pmatrix} + \varepsilon A \begin{pmatrix} 0 \\ 1 \end{pmatrix}
$$

采用线速场的想法，把两个位移量画出来，观察它们对面积的贡献。如下图所示。

<img src="det Y(x).svg" class="img-landscape">

比如 $y_1$，它在纵坐标上的位移相当于将平行四边形的对边按照平行的线移动，不贡献面积；只有在横向位移才贡献面积，贡献率（随着时间 $\varepsilon$）恰好为位移速度 $a_{11}$ 乘以底边 $1$；同理， $y_2$ 位移量的贡献来源于纵向位移 $a_{22}$.  粗糙地说，极小的时间 $\varepsilon$ 后，面积
$$
\det(Y(\varepsilon)) \approx (1 + a_{11} \varepsilon)(1 + a_{22} \varepsilon) = 1 + \varepsilon \  \text{tr}{A} + o(\varepsilon)
$$
由此给出微分等式的直观。

## 0423

下面我将从几何直观（但完全不严谨）的角度，描述齐次常系数线性微分方程组的解形如什么样。

我们考察的对象是：
$$
\frac{dy}{dt} = Ay
$$

其中 $A \in \mathbb{R}^{n \times n}$ 是实常数矩阵，$y = y(t) = (y^{(1)}(t), \cdots , y^{(n)}(t))^t$ 是 $n$ 维向量函数。这里我采用上标表示分量；下标不同的 $y_1, y_2$ 将表示不同的解。自变量是 $t$，暗示着我们将其看作向量随时间变化。

回忆一些事实：
- 解是 $n$ 维线性空间。因此，只要找到 $n$ 个线性无关的解，就找到了所有的解
- 一些解线性无关当且仅当它们的初值线性无关（虽然这可以用 Liouville 公式证明，但这实际上是 “过原点的解存在唯一，是常值 $0$ 函数” 的直接推论）。因此，我们只要找到 $n$ 个线性无关的初值 $y_i(0) \in \mathbb{R}^n$，并且找到以它们为初值的解 $y_i$ 即可。

简单起见，下设 $n = 2$。

最简单的例子莫过于  $A = \text{diag}(\lambda_1, \lambda_2)$；这个时候，方程可重写为

$$
\frac{dy^{(1)}}{dt} = \lambda_1 t, \quad \frac{dy^{(2)}}{dt} = \lambda_2 t
$$

很容易找到初值 $(1,0)^t$ 对应的解 $y_1 = (e^{\lambda_1 t}, 0)^t$ 与初值 $(0,1)^t$ 对应的解 $y_2 = (0, e^{\lambda_2 t})^t$。

我们不妨把解向量画出来。比如说，$\lambda_1 = 1, \lambda_2 = 2$，那么过 $(1,1)$ 的解曲线为

$$
y(t) = (e^{t}, e^{2t}) =: (y^{(1)}(t), y^{(2)}(t))
$$
因此解曲线满足
$$
y^{(2)}(t) = (y^{(1)}(t))^2
$$
换言之，假如横轴是 $y^{(1)}$，竖轴是 $y^{(2)}$，那么解曲线将随着 $t$ 增大而沿着二次函数 $y = x^2$ 飞向第一象限的远方。

以上结论不仅针对过 $(1,1)$ 的解曲线成立。事实上，（非特征向量的）解曲线总是形如二次函数。

又比如，$\lambda_1 = -1, \lambda_2 = -2$，那么过 $(1,1)$ 的解曲线 $(e^{-t}, e^{-2t})$ 将随着 $t$ 增大而沿着二次函数 $y = x^2$ 回到原点。

翻到本节末尾的可交互图像，固定 $b=c=0$，将 $a$ 和 $d$ 设置成如下值，观察解曲线的样子并理解。
- $(a,d) = (1,1)$
- $(a,d) = (1,1/2)$
- $(a,d) = $

<iframe src="animation/ode - 2nd constant coefficient.html" width="100%" height="500px" frameborder="0" scrolling="no"> </iframe>
