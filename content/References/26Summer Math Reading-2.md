---
tags:
  - llm
---
[原对话](https://chatgpt.com/share/6a783ace-d858-83e8-9554-113be0adf610)

考虑到你最早大三下才能正式上《平衡态统计物理》，暑假的目标可以稍微提高：

> 不只是预习系综，而是走完一遍  
> **热力学语言 → Gibbs 系综 → Ising 相变 → Landau–Ginzburg 场 → 离散 GFF**，  
> 到大三下上课时再系统补气体、量子统计和更多计算。

我建议采用“**一本物理主教材＋一本数学伴读＋一套场论讲义**”，不要同时铺开很多经典大部头。

# 一、核心书单

## 1. 主教材：David Tong, _Statistical Physics_

这是整个暑假的主线。

它只有约 190 页，第一章直接介绍微正则、正则、巨正则系综、熵、温度、配分函数、自由能和涨落；第四章整理经典热力学语言；第五章则从 van der Waals 相变一路讲到 Ising 模型、平均场、临界指数、Peierls 轮廓、高低温展开、Kramers–Wannier 对偶、Landau–Ginzburg 理论以及关联函数。它几乎正好覆盖你的目标。[David Tong](https://davidtong.org/teaching/statistical-physics/)

建议阅读顺序不是按页从头到尾，而是：

\[ \boxed{\text{第1章}\to\text{第4章}\to\text{第2章选读}\to\text{第5章}} \]

其中：

- **第1章全读**；
- **第4章全读**；
- 第2章只读经典配分函数、理想气体、能量均分和 van der Waals；
- 第3章量子气体暂时全部跳过；
- **第5章全读**，这是暑假的重点。

Tong 的优点是简洁，缺点也是简洁：不少推导只写关键步骤。因此你需要自己补算，不能只顺着文字看。

---

## 2. 数学伴读：Friedli–Velenik, _Statistical Mechanics of Lattice Systems_

这本书与你的概率背景非常契合。它以概率论方式处理平衡态格点模型，核心例子包括 Curie–Weiss、Ising、无限体积 Gibbs 测度和离散 GFF，并且大部分习题有提示或解答；作者官网提供了完整书稿。[日内瓦大学](https://www.unige.ch/math/folks/velenik/smbook/index-BW.html)

但是它**不能作为唯一主教材**。作者明确说明该书基本不讲 critical phenomena 和 RG；如果只读它，你会掌握 Gibbs measure、Peierls argument 和热力学极限，却可能仍然不知道物理学家怎样讨论标度、关联长度和普适性。[日内瓦大学](https://www.unige.ch/math/folks/velenik/smbook/index-BW.html)

暑假只读：

- 第1章：快速浏览；
- 第2章 Curie–Weiss：基本全读；
- 第3章 Ising：选择性阅读；
- 第8章离散 GFF：基本全读。

暂时跳过第4—7章和第9—10章。

---

## 3. 场论桥梁：David Tong, _Statistical Field Theory_

不要一上来读这套讲义。等 Tong _Statistical Physics_ 第5章读完，再进入。

这套约 130 页的讲义从 Ising 模型和 Landau 平均场开始，进入 Landau–Ginzburg 场、关联函数、路径积分、高斯固定点、RG、Wilson–Fisher 固定点，最后才走向连续对称性、KT 相变和 Coulomb gas。[David Tong](https://davidtong.org/teaching/statistical-field-theory/)

暑假建议：

- **第1章全读**；
- **第2章全读**；
- 第3章读到 Gaussian fixed point；
- 有余力再读 relevant / irrelevant / marginal；
- 第4章暂时不读。

第1—2章会让你看到：

\[ \text{Ising spins} \longrightarrow \text{order parameter field} \longrightarrow \text{Landau--Ginzburg functional} \longrightarrow \text{Gaussian field}. \]

这是从统计物理走到 GFF/QFT 最重要的概念桥梁。

---

## 4. 两本备用书

### Schroeder, _An Introduction to Thermal Physics_

仅在你发现 Tong 对“热、功、Carnot 循环、热力学势”的处理太快时使用。

读前五章即可：

1. 热物理中的能量；
2. 第二定律；
3. 温度、熵、压强和化学势；
4. 热机；
5. 自由能和相变。

它面向学过微积分普通物理、但不要求已经学过热力学的读者；作者网站也给出了适合自学者的推荐习题。[韦伯物理](https://physics.weber.edu/thermal/overview.html?utm_source=chatgpt.com)

不必同时完整阅读 Schroeder 和 Tong。把 Schroeder 当作“物理概念词典”。

### Sethna, _Statistical Mechanics: Entropy, Order Parameters, and Complexity_

这本更适合自由浏览和“换换脑子”。它把系综、Ising Monte Carlo、序参量、对称性破缺、关联与响应、连续相变、普适性和 RG 放在同一幅较现代的图景中，官方页面提供第二版电子稿。[James Sethna](https://sethna.lassp.cornell.edu/StatMech/)

它不像 Tong 那样适合线性建立基础，但很适合每周末读一小节，获得“这些概念还会通向哪里”的感觉。

# 二、六周学习路线

## 第1周：从概率分布到热力学量

### 阅读

- Tong _Statistical Physics_ 第1章；
- 有困惑时查 Schroeder 第1—3章。

### 必须掌握

微正则系综：

\[ S(E,V,N)=k_B\log \Omega(E,V,N). \]

正则系综：

\[ \mathbb P(x)=\frac{e^{-\beta H(x)}}{Z(\beta)}, \qquad Z(\beta)=\sum_x e^{-\beta H(x)}. \]

以及

\[ F=-\frac1\beta\log Z,\qquad \mathbb E(H)=-\partial_\beta\log Z, \]\[ \operatorname{Var}(H) =\partial_\beta^2\log Z. \]

巨正则系综：

\[ \mathbb P(x,N) =\frac{e^{-\beta(H(x)-\mu N)}}{\Xi}. \]

你已经熟悉指数族和 cumulant generating function，因此公式本身很容易。真正需要思考的是：

- 为什么选择不同系综；
- 哪些变量由外界控制；
- 为什么 \(F\) 而不是能量决定恒温系统的平衡；
- 热力学极限下为什么不同系综通常等价；
- 为什么涨落相对于宏观量会变小。

### 练习

不要证明一般的大偏差定理。至少完整算三个模型：

1. 两能级自旋系统；
2. \(N\) 个独立自旋；
3. 一个经典谐振子或理想气体配分函数。

---

## 第2周：热力学语言

### 阅读

- Tong 第4章；
- Tong 第2章中理想气体、equipartition 和 van der Waals 部分。

### 必须掌握

第一定律和基本关系：

\[ dU=T\,dS-p\,dV+\mu\,dN. \]

热力学势：

\[ F=U-TS,\qquad G=U-TS+pV, \]\[ \Omega=U-TS-\mu N. \]

重点不是背公式，而是理解：

- 每个势的自然变量是什么；
- Legendre 变换为什么对应改变外部控制条件；
- 平衡为什么可以表述为某个势的极小化；
- 凸性、稳定性和热容/压缩率之间有什么关系；
- Maxwell relations 从哪里来。

你的数学背景会让 Legendre 变换显得过于简单。这里不要停留在形式推导，要给每一个变量附上物理意义、单位和控制方式。

### 本周产出

自己做一张表：

|外部控制|平衡势|配分函数|
|---|---|---|
|\(E,V,N\)|\(S\)|微正则态数|
|\(T,V,N\)|\(F\)|\(Z\)|
|\(T,V,\mu\)|\(\Omega\)|\(\Xi\)|
|\(T,p,N\)|\(G\)|等温等压系综|

---

## 第3周：平均场和第一遍 Ising 相变

### 阅读

- Tong 第5章，从相平衡读到 mean field theory；
- Friedli–Velenik 第2章 Curie–Weiss。

Friedli–Velenik 使用 Curie–Weiss 作为 Ising 的平均场版本，以较初等的组合和概率方法展示顺磁—铁磁相变。[日内瓦大学](https://www.unige.ch/math/folks/velenik/smbook/index-BW.html)

### 必须掌握

Ising Hamiltonian：

\[ H(\sigma) =-J\sum_{\langle x,y\rangle}\sigma_x\sigma_y -h\sum_x\sigma_x, \qquad \sigma_x\in\{-1,1\}. \]

物理词汇：

- magnetization；
- external field；
- order parameter；
- spontaneous symmetry breaking；
- susceptibility；
- critical temperature。

平均场自洽方程：

\[ m=\tanh\bigl(\beta(zJm+h)\bigr). \]

你需要自己分析：

- \(h=0\) 时非零解何时出现；
- \(m=0\) 的稳定性怎样改变；
- 为什么得到 \(m\sim(T_c-T)^{1/2}\)；
- 平均场临界指数为什么不依赖微观细节；
- 为什么二维 Ising 的真实临界指数又不同于平均场。

### 一个重要阅读习惯

先按物理方式做完平均场计算，再用你熟悉的语言把它翻译成：

- 变分问题；
- 熵与能量的竞争；
- Laplace principle；
- 大偏差率函数的极小点分岔。

不要反过来一开始就只读成大偏差理论。

---

## 第4周：真正的格点 Ising

### 阅读

- Tong 第5章中：
    - 一维 Ising；
    - 低温展开与 Peierls droplets；
    - 高温展开；
    - Kramers–Wannier duality；
    - correlations and fluctuations。
- Friedli–Velenik 第3章选读。

该书第3章系统处理热力学极限、无限体积 Gibbs states、相变定义、Peierls argument、高低温展开、相关不等式和 Lee–Yang 定理。[日内瓦大学](https://www.unige.ch/math/folks/velenik/smbook/index-BW.html)

第一遍只读：

1. 有限体积 Ising 与边界条件；
2. thermodynamic limit；
3. 一维无相变；
4. Peierls argument；
5. 高温与低温区域的基本图景。

暂时跳过：

- Lee–Yang 定理的完整证明；
- 全套 correlation inequalities；
- 过于技术性的唯一性证明；
- 二维 Ising 的精确可解结构。

### 本周应形成的认识

“相变”至少有三种相关但不同的表达：

1. 自由能失去解析性；
2. 无限体积极限出现多个 Gibbs states；
3. 长程有序或自发磁化出现。

在简单模型中它们相互联系，但不应从一开始就把它们当成同一句话。

---

## 第5周：从 spins 到 Gaussian field

### 阅读

- Tong _Statistical Physics_ 第5章后半；
- Tong _Statistical Field Theory_ 第1—2章。

Tong 的场论讲义第1章从 Ising、平均场和普适性进入 Landau–Ginzburg 理论；第2章讨论场的配分函数、自由能、关联函数、关联长度以及它与 QFT 的类比。[David Tong](https://davidtong.org/teaching/statistical-field-theory/)

### 核心对象

Landau–Ginzburg functional：

\[ \mathcal F[\phi] = \int_{\mathbb R^d} \left[ \frac12|\nabla\phi|^2 +\frac r2\phi^2 +\frac u{4!}\phi^4 -h\phi \right]dx. \]

对应的形式 Gibbs measure：

\[ \mathbb P(d\phi) \propto e^{-\beta\mathcal F[\phi]}\,D\phi. \]

先取 \(u=0\)，得到 Gaussian theory。在 Fourier 空间中，两点函数呈现为

\[ \widehat G(k)\sim\frac{1}{k^2+r}. \]

由此理解：

- \(r\) 为什么类似 mass squared；
- 关联长度为什么满足 \(\xi\sim r^{-1/2}\)；
- \(r\to0\) 时为什么出现长程关联；
- 临界点为什么对应 massless field；
- 为什么 GFF 是自由场，而 Ising 的临界场是相互作用场。

这一步是你暑假最重要的收获。它把概率中的高斯随机分布与物理中的自由场真正接起来。

---

## 第6周：离散 GFF 与连续 GFF

### 阅读

- Friedli–Velenik 第8章；
- Sheffield, _Gaussian Free Fields for Mathematicians_ 的前半部分。

Friedli–Velenik 第8章从格点 Gaussian Gibbs measure 出发，推导均值和协方差的随机游走表示，并说明随机游走的常返/暂留性质如何影响热力学极限。[日内瓦大学](https://www.unige.ch/math/folks/velenik/smbook/index-BW.html)

Sheffield 的综述则把 GFF 解释为欧氏无质量自由玻色场，并强调它作为随机广义函数、格点模型尺度极限以及与 SLE 联系的不同侧面。[arXiv](https://arxiv.org/abs/math/0312099?utm_source=chatgpt.com)

### 建议顺序

先在有限图 \(G=(V,E)\) 上理解

\[ \mathbb P(d\phi) \propto \exp\left( -\frac12\sum_{\{x,y\}\in E} (\phi_x-\phi_y)^2 \right) \prod_{x\in V^\circ}d\phi_x, \]

然后证明或彻底理解：

\[ \operatorname{Cov}(\phi_x,\phi_y) =G_D(x,y), \]

其中 \(G_D\) 是带 Dirichlet 边界条件的 Green 函数。

最后再看连续情形：

\[ \mathbb E[(h,f)(h,g)] = \langle f,(-\Delta)^{-1}g\rangle, \]

以及：

- 为什么二维 GFF 通常不是逐点定义的函数；
- domain Markov property；
- conformal invariance；
- 调和函数加独立零边界 GFF 的分解；
- GFF 与 SLE 耦合的入口。

# 三、最好配两个小项目

## 项目一：二维 Ising Monte Carlo

自己写一个很短的 Metropolis 或 heat-bath 程序，观察不同温度下：

\[ m=\frac1{|\Lambda|}\sum_x\sigma_x, \]

以及能量、磁化率和关联函数的变化。

不要把重点放在代码优化。你要观察的是：

- 高温无序；
- 低温形成大磁畴；
- 临界温度附近出现各种尺度的团簇；
- 临界 slowing down；
- 有限尺寸系统中“相变”会被抹平。

Sethna 的书把 Ising、Monte Carlo、Markov 方法、序参量和 RG 放在同一条叙事线上，适合作为这个项目的伴读。[James Sethna](https://sethna.lassp.cornell.edu/StatMech/)

## 项目二：采样离散 GFF

在 \(n\times n\) 方格上构造 Dirichlet Laplacian \(L\)，采样协方差为 \(L^{-1}\) 的中心高斯向量。

可以：

- 比较不同区域；
- 画出等高线；
- 数值验证协方差等于 Green 函数；
- 比较中心点方差随网格大小的增长；
- 条件固定某个子区域外的场，观察内部条件均值是调和延拓。

这个项目能把“Gaussian field”从抽象随机分布变成非常具体的对象。

# 四、每天怎样学

建议每天约三小时：

- **90 分钟读 Tong**：跟着物理主线；
- **60 分钟手算**：补完推导和做题；
- **30 分钟读 Friedli–Velenik 或写模拟**。

每周只要求完成：

- 6—10 道认真写出的习题；
- 一页概念总结；
- 一个模型的完整计算。

不要追求把所有公式严格化。尤其不要花大量时间重证：

- Stirling 公式；
- 大数定律；
- Gaussian integral 的一般形式；
- Legendre duality 的一般定理；
- 有限维高斯测度的标准结果。

你的优势已经在这里。暑假更值得练习的是：

- 选择 Hamiltonian；
- 判断控制变量；
- 做近似；
- 使用量纲；
- 识别序参量；
- 从关联函数读出物理尺度；
- 接受并理解物理推导中“先猜尺度，再验证自洽”的工作方式。

# 五、最精简版本

若最后只剩四周，就执行：

\[ \boxed{ \text{Tong Statistical Physics Ch.1,4,5} } \]

然后：

\[ \boxed{ \text{Tong Statistical Field Theory Ch.1,2} } \]

最后：

\[ \boxed{ \text{Friedli--Velenik Ch.8} } \]

Friedli–Velenik 的 Curie–Weiss 和 Ising 部分只作为查阅。这样已经足以让你从系综走到自由场，并为大三下的正式课程和之后的 SLE/GFF 学习建立一幅比较完整的物理图景。