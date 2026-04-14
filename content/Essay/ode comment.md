---
title: 常微分方程课堂补充
---
> 对[刘保平老师](http://162.105.102.96/teachers/~baoping/)常微分方程课程内容的理解与补充。持续施工中。

##### 教材 引理 5.3

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

<div align="center"><img src="det Y(x).svg" style="height: 50vh"></div>

比如 $y_1$，它在纵坐标上的位移相当于将平行四边形的对边按照平行的线移动，不贡献面积；只有在横向位移才贡献面积，贡献率（随着时间 $\varepsilon$）恰好为位移速度 $a_{11}$ 乘以底边 $1$；同理， $y_2$ 位移量的贡献来源于纵向位移 $a_{22}$.  粗糙地说，极小的时间 $\varepsilon$ 后，面积
$$
\det(Y(\varepsilon)) \approx (1 + a_{11} \varepsilon)(1 + a_{22} \varepsilon) = 1 + \varepsilon \  \text{tr}{A} + o(\varepsilon)
$$
由此给出微分等式的直观。
