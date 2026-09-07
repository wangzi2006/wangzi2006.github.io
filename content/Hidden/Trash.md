---
draft: true
---

## 丁剑 章复熹 Liouville first passage percolation: geodesic length exponent is strictly larger than 1 at high temperatures

论文链接：https://arxiv.org/pdf/1610.02766

作者：丁剑，章复熹

### 粗糙直观

Thm 1.1：在 DGFF 的 $N \to \infty$ 时，（近似连续场，）任意两点（只要两点间的距离大于某个常数 $\kappa$）间的测地线（最短代价）的 “维数” 是一致地大于 $1 + \alpha$ 的。其中 $\alpha$ 仅依赖于代价函数，而不依赖于 $\kappa$

Thm 1.2：近似连续场，在 $\mathcal P$（两点欧式距离是非退化地较远、代价最小的测地线距离却很近（与尺度 $N$ 相比））中的路径，路径上有很多点的代价都很大

Thm 1.2 implies Thm 1.1 的原因：前人告诉我们可以控制测地线代价的一致上界 $\max_{x, y \in V_N} w(\text{Geo}_{N,x,y})$，而 Thm 1.2 意味着【如果这条边很直，i.e. 两点距离非退化地较远，但路径长度并不显著大，则一定意味着路径上有很多点的代价都很大】；而这些代价之和，已经超过了测地线的上界；意味着测地线不是这种坏边。

### 问题

- 我学过 DGFF 基本性质，但仅仅知道 $\eta^B(z)$ 的定义，模糊地知道这似乎是量子场论关心的问题。GFF，无论是连续的还是离散的（我完全没接触连续的 GFF），其 geodesics 指的是什么？为什么我们需要考虑 GFF 这一模型？
- 如 Remark 1.4 所言，$V_{3N}$ 的尺度是非本质的。在所有参数中，似乎只有逆温度 $\gamma_0$ （at high temperatures）是本质的
- **Liouville FPP 为什么叫这个名字？其更直观的概率含义是什么？**代价函数 $\sum_{z \in P} \exp(\gamma \eta^{V_{3N}}(z))$ 有什么直观意义？我有印象的是 Ising model 中的 $e^{-\beta H(\sigma)}$，和这里的 $e^{\gamma \eta(z)}$ 应该没什么关系吧
- Thm 1.2 中的 $\delta$ 完全没有出现在条件中，可以认为 $\delta$ 是任意接近于 $0$ 的数字吗？但是定理中写成 $\sqrt \delta$，很奇怪。所以 Thm 1.2 是对于任意的逆温度 $\gamma$ 都成立的吗？
- Thm 1.2 为何从直观上是正确的？不得不经过代价大的点，为什么反而发生在 $\mathcal P$ 这样代价距离很近的路径中？
- 1.1 Related works 中说，in [10] a sub-sequential scaling limit was proved for the normalized metric，其中 “子列尺度极限” a sub-sequential scaling limit 指的是什么？
- log-correlated fields 反复被提及。这指的是什么？
- 多尺度分析法（multi-scale analysis）我曾在讨论班听过。有时我会感觉匪夷所思，因为它似乎总能通过取不同的尺度，并且依照特定的顺序取极限 / 大小关系，得到自己想要的结论。（由于我自己没有跟着推导过一遍，因此不知道隐藏在其下的难点在哪里）
- 但本文中出现的多尺度分析法似乎并非如此。在 1.4 Outline of the proof 部分，作者介绍了 [22] 的思想，这简直堪称惊人。不过，震惊过后，scale-variance 对应分形，似乎又很自然，而这样自然的性质，自然是用 scale（multi-scale）的方式去证明：在不同的尺度上都有绕行，因此维数大于1
- 作者在 Part 1 Introduction 中如此清晰地展示自己的思想，虽然这不是我第一次阅读论文，但我还是被震惊了。我不知道成熟的读者是否可以只依赖于 Part 1 给出完整的证明；至少我远远不行。然而， 假如我花费一个月硬啃完整的证明，再花一个月遗忘，最后留在脑子里的，无非是 Part 1 的内容。
- 我理解的 1.4 Outline of the proof 中提到的 two important differences from the fractal percolation process 粗糙的意思是说：
  - 原先模型中，一个边的开闭依赖于它所在的 **每个尺度** 的盒子不被移去；现在，GFF 是连续模型，由于 $\eta(x) \sim \sum_j \eta_j(x)$，所以 **每个尺度的盒子不被移走** 类似于 **每个盒子的移走程度总和小于某个值**，因此直接可用 $\eta(x)$ 刻画
  - 第二点是否是说，原先我们只要证明坏路径不存在（维数为1或小于 $1 + \alpha$ 的路径不存在），只需要坏路径被移走一条边。现在，$\mathcal P$ 中的路径都是坏的路径。我们要说明坏路径中有很多边被移走。
- 为解决这一问题，作者定义了温顺的（tame）子路径。温顺的子路径以较少的方式产生孩子（这很直观，类似一条直线在下一个小尺度中只会分裂成 $K$ 个直线段，而一条曲曲折折的线在下一个尺度中可能分裂成更多），而不温顺的子路径孩子会更多。
- The success in our context crucially relies on the introduction of the uniform flow θP as we describe next. Suppose that a node has a large degree d. On the one hand, the choices of locations of the children grow exponentially in d. On the other hand, (in light of the definition of uniform flow) we will perform an average over d children, and thus obtain a large deviation. In addition, the probability decays exponentially in d, thereby beating the growth of enumeration if we choose our parameters appropriately.
  以上这段我不能理解，因为我完全没接触过 large deviation 大偏差。这里附近给的概述，我似懂非懂
- 这篇论文算是 percolation 论文中，论证链条较长的吗？这篇论文发表在什么期刊上，期刊地位如何？论文本身质量如何？

> 元问题：我通过这样做批注、与你交互的方式读论文，是否可行？给出 pros and cons，可能的改进。

### AI 的回答

#### 关于 Liouville first-passage percolation

Liouville FPP 可以理解为：

> 在一个具有跨尺度相关性的随机地形上，研究“最快路径”会呈现怎样的几何形状。

给每个格点赋予 DGFF 高度 \(\eta(z)\)，通行代价为
$$
 e^{\gamma\eta(z)}. 
$$
高处昂贵、低处便宜；测地线在“直接走”和“绕路寻找低谷”之间权衡。

数学家关心它主要有三个原因：

1. **它近似二维随机几何。**
   Liouville quantum gravity 试图描述随机起伏的二维曲面。连续 GFF 太粗糙，无法直接代入形式度量 \(e^{\gamma h}(dx^2+dy^2)\)；LFPP 是构造、逼近其距离与测地线的自然方式。
2. **它是相关型 FPP 的典型模型。**
   经典 FPP 的边权通常独立；LFPP 的权重由 log-correlated GFF 产生，同一低谷会跨越许多空间尺度。它展示了相关性如何把近似直线的最短路径变成分形路径。
3. **它连接多个领域。**
   它同时涉及 GFF、渗流、随机度量、多尺度分析、随机平面地图和统计物理。因此，LFPP 中的距离指数、测地线维数和尺度极限，都是理解二维随机空间普适性的试验场。

一句话概括：

> 经典 FPP 问“随机但局部独立的介质中最快路径怎样走”；Liouville FPP 问“具有分形、跨尺度结构的随机空间中，距离和最短路径怎样产生”。

#### 五、定理 1.2 为什么直观上正确？

正确的二择一直觉是：

> 一条路径要么比较直，因而必须穿过许多“不太便宜”的区域；要么不断寻找各个尺度上的低谷绕行，因而组合长度会变得超线性。

GFF 的低谷不是一张固定尺度上的地图。一个点特别低，是许多尺度上的增量共同作用的结果。要让一条宏观路径上的绝大多数点都特别低，它就必须同时顺应许多尺度上的有利区域。

在一个尺度上稍微绕一下似乎不贵；但若正比例多个尺度都需要绕行，这些长度损失会乘起来：
$$
K\cdot K\cdots K \quad\longrightarrow\quad K^m(1+c)^m =N^{1+\alpha}.
$$
所以不是“低代价路径反而经过很多高代价点”，而是：

- 短路径必须经过很多不太低的点；
- 真正能充分利用极低场值的路径必须绕得很长；
- 测地线由于总权重很低，只能选择后一种，故呈分形。

#### 六、什么是 log-correlated field？

粗略地说，如果二维随机场满足
$$
 \operatorname{Cov}(\eta(x),\eta(y)) =\log\frac{N}{|x-y|}+O(1) 
$$
或等价的局部形式
$$
 \operatorname{Cov}(\eta(x),\eta(y)) \approx -\log|x-y|+O(1), 
$$
就称它具有 logarithmic correlations。

它的核心性质是每个对数尺度贡献大约相同量级的方差。可以想象
$$
 \eta(x)\approx\eta_0(x)+\eta_1(x)+\cdots+\eta_{m-1}(x), 
$$
其中 \(\eta_j\) 描述尺度 \(K^j\) 上的随机起伏。对固定 \(x\)，不同 \(j\) 的增量近似或严格独立；对于相距足够远的点，同一尺度上的增量也具有可利用的独立性。

这正是本文多尺度分析的概率基础。

#### 七、什么是 subsequential scaling limit？

先将离散正方形缩放到单位正方形，再用一个典型距离尺度 \(a_N\) 归一化 LFPP 度量：
$$
 \widetilde D_N=\frac{D_N}{a_N}. 
$$
“存在子列尺度极限”是说：对任意尺度序列 \(N_1,N_2,\ldots\)，都能抽出一个子列 \(N_{k_j}\)，使归一化随机度量 \(\widetilde D_{N_{k_j}}\) 依分布收敛到某个随机度量。

它通常由紧性得到。它没有告诉你：

- 整个序列一定收敛；
- 不同子列的极限相同；
- 归一化尺度有唯一渐近形式。

[论文 [10] 的准确结果](https://arxiv.org/abs/1605.04011)是：经适当归一化和插值后，可以抽取一个在 Gromov–Hausdorff 意义下收敛的子列，极限是单位正方形上的随机度量；当时极限的唯一性仍是猜想。

----------

> 元回复：【原文定义】【定理与量词】都是论文中的内容，我觉得不必记在笔记中。我现在的论述中，已经进行了充分思考，写了很多自己的解释。
>
> 我的迷惑：“你喜欢的是宏观的随机几何图景，还是也愿意长期处理路径熵、高斯集中和多尺度技术？” 这是否是我现在必须回答的问题？因为我想在三四天之内了解教授们的工作、找导师。精读一篇文章恐怕花费的时间太长。



## 李欣意 A LOWER BOUND FOR DISCONNECTION BY SIMPLE RANDOM WALK

作者：李欣意

### 粗糙直观

- Thm 0.1：渐进下界
  $$
  P_0[随机路径将 K_N 与无穷远隔开] > \sim e^{-C \cdot \text{cap}(K) \cdot N^{d-2}}
  $$
  $N$ 越大，越难隔开；cap K 越大，多少意味着 K 越大（分散），越难隔开。若 $K=B_N$ 是 box，则 $\text{cap}(B_N)$ 是 $N^{d-2}$ 量级，这给出 $N^{d-2}$ 的直观来历。

- 后面提到的前任工作说明这个渐进下界很可能是 sharp 的，本论文的方法因此具有重要性。

### 问题

- References 中，Definition 2.13 提到 **stochastically dominates**：

  > If $P$ and $Q$ are probability measures on the measurable space $\left(\{0,1\}^{\mathbb{Z}^d}, \mathscr{F}\right)$, then we say that $P$ stochastically dominates $Q$ if for every increasing event $G \in \mathscr{F}, Q[G] \leq P[G]$.

  我觉得这是很难满足的要求。对于同一族概率，随着参数的变化，一般是单调地 dominate 的（dominate 意味着可以做耦合对吗）。后面说明 random interlacements 和独立的 Bernoulli percolation 不会相互 dominate，因为 random interlacements 有长程关联。这本书为什么要特别强调这一点？

- 仅仅是 Introduction 就让我难以下嘴。勉强看到 (0.7) 式；tilted walks 以及它具有的 locally in a strongly non-percolative mode 简直不知所云。（猜测：让随机游走更可能走到未经过的地方，在这样的概率变换下，wp1 阻隔 $K_N$；随后通过熵估计，说明 “这一概率变换实际上改变的不多”，因此 “在原先的概率 $P_0$ 下，阻隔 $K_N$ 的概率足够大”。

- 但令我迷惑的是，random interlacements 在这里起到了什么样的作用。

- 这一论文难度大似乎过大。我是否还应该继续读？或者应该做什么别的事情？

### AI 的回答

结论先说：你的定理直觉基本正确；对 tilted walk 的猜测抓住了“改变测度—让事件典型—支付熵代价”的主干，但“让随机游走更愿意访问未访问点”是错的。Random interlacements 正是连接“局部轨迹足够稠密”与“形成阻隔”的中间模型。

#### 2. stochastic domination 为什么值得特别强调？

你的感觉是对的：它确实是非常强的要求。

在这里
$$
P\succeq Q
$$
表示对所有 increasing events \(G\)，都有 \(P(G)\ge Q(G)\)。在 \(\{0,1\}^{\mathbb Z^d}\) 上，这等价于存在一个耦合 \((\xi_P,\xi_Q)\)，使得
$$
\xi_P(x)\ge\xi_Q(x) \quad\text{对所有 }x,\quad\text{几乎处处}.
$$
注意是“存在这样的耦合”，不是任意耦合都满足。

同一族模型也不一定随参数单调；random interlacements 确实单调，是因为可以使用同一个 Poisson 轨迹云，直接得到
$$
 u_1\le u_2 \quad\Longrightarrow\quad \mathcal I^{u_1}\subseteq\mathcal I^{u_2}. 
$$
为什么要和 Bernoulli percolation 比较？因为若存在随机支配，大量几何结论可以直接迁移：

- 是否渗流；
- 连通概率的衰减；
- 大团块是否存在；
- 路径长度和化学距离的控制。

可惜，在整个 \(\mathbb Z^d\) 上，二者任何方向都不能支配。教材给出的反例非常有启发性。interlacements 同时表现出：

> 巨大空洞比独立模型常见，巨大稠密块也比独立模型常见。

这正是相关性造成的聚簇或间歇性。教材强调“不能用 Bernoulli 支配”，是为了告诉读者：不能只根据单点密度把它当作近似独立渗流；后面必须发展 coupling、decoupling inequality 和多尺度方法。[教材第 3 章的两个反例](https://www.math.uni-leipzig.de/~sapozhnikov/SpringerRI.pdf)

严格地说，“有长程相关”本身并不自动推出“不能随机支配”；真正证明不支配的是上面两个宏观事件的概率尺度。

#### 3. tilted walk 到底做了什么？

你的总体框架正确：
$$
 \text{构造新测度 }\widetilde P_N \longrightarrow \text{断连在新测度下以高概率发生} \longrightarrow \text{计算相对熵} \longrightarrow \text{得到原测度下的概率下界}. 
$$
但 tilted walk 不是更喜欢访问“尚未访问”的点。它没有自避记忆。

作者取 \(K\) 的平衡势 \(h\)：
$$
 \Delta h=0\quad\text{于 }\mathbb R^d\setminus K,\qquad h=1\quad\text{于 }K,\qquad h(x)\to0\quad (|x|\to\infty), 
$$
再令 \(h_N(x)=h(x/N)\)，把随机游走的跃迁率改成大致包含
$$
 \frac{h_N(y)}{h_N(x)} 
$$
的形式。这是一个 Doob \(h\)-transform：它把游走吸引、限制在 \(K_N\) 附近，使它在一段很长时间内表现得近似 recurrent，而不是像原始 \(d\ge3\) 随机游走那样迅速逃向无穷远。

时间 \(T_N\) 被精细选择，使局部时间的期望约为
$$
 u_{**}h_N^2(x). 
$$
在 \(K_N\) 及其附近，\(h_N\approx1\)，所以局部轨迹密度约为 interlacements level \(u_{**}\)。

你所说的“改变得不多”也要稍作修正：

> \(\widetilde P_N\) 和 \(P_0\) 未必在总变差意义下接近；它们可能非常不同。作者证明的是改变测度的相对熵只有正确的 \(N^{d-2}\) 量级，因而在所关心的大偏差尺度上价格不太高。

#### 4. “locally in a strongly non-percolative mode” 是谁不渗流？

指的是 tilted walk 留下的 vacant set，而不是 tilted walk 本身。

在 \(K_N\) 周围取许多介观小盒子。作者证明 tilted walk 在每个盒子内留下的轨迹，可以与略高于 $u_{**}$ 的 random interlacements 比较：
$$
 \text{tilted-walk trace} \quad\approx\quad \mathcal I^{u_{**}(1+\varepsilon)}. 
$$
由于 $u>u_{**}$ 时，interlacement vacant set $\mathcal V^u$ 穿越大盒子的概率具有 stretched-exponential 衰减，所以局部上空集处于“强非渗流状态”：
$$
 P[x\leftrightarrow\partial B_L \text{ in }\mathcal V^u] \le e^{-cL^\rho}. 
$$
因此在 \(K_N\) 周围的所有介观盒子中，几乎都无法形成贯穿的 vacant path。这些盒子合起来构成一圈随机“围栏”，阻断 \(K_N\) 与无穷远。

#### 5. random interlacements 的准确作用

它不是论文最终研究的对象，而是一个局部比较模型，承担四个角色：

1. **描述局部平衡图景。**
   单条长时间游走切成许多 excursions 后，局部看起来像 Poisson 条独立轨迹，即 random interlacements。
2. **提供断连判据。**
   已知 \(u>u_{**}\) 时，\(\mathcal V^u\) 很难穿越大盒子。
3. **提供临界强度。**
   作者把 tilted walk 的局部时间调到约 \(u_{**}\)，使围栏刚好足够稠密，又不支付过多熵代价。
4. **把“单条相关轨迹”转化为可分析对象。**
   论文先借助准平稳分布把单条轨迹切成近似独立 excursions，再 Poisson 化，最后耦合到 interlacements。

整条证明可压缩成：
$$
\boxed{ \begin{aligned} &\text{用 }h\text{-transform 把游走留在 }K_N\text{ 附近}\\ &\Longrightarrow \text{产生大量近似独立的 excursions}\\ &\Longrightarrow \text{局部支配高强度 interlacements}\\ &\Longrightarrow \text{vacant set 无法穿过围栏}\\ &\Longrightarrow \widetilde P_N(\text{断连})\to1\\ &\Longrightarrow \text{相对熵给出 }P_0(\text{断连})\text{ 的下界}. \end{aligned}}
$$
你的原猜测已经抓到了第一行、第五行和第六行；缺失的是中间以 interlacements 为桥梁的三步。

#### 6. 还应该继续读吗？

为了当前三四天内了解导师：不应继续读证明。

建议再花最多 30–45 分钟：

- 把 Introduction 中 (0.8)–(0.11) 及其后关于 chain of couplings 的两页读完；
- 用上面的六行重写证明主线；
- 记下你现在知道的技术关键词：\[ \text{capacity,\ }h\text{-transform,\ relative entropy,\ local time,\ excursions,\ coupling}. \]
- 然后停止这篇论文，转向李欣意老师另一篇论文的摘要和 Introduction，观察其研究对象是否仍围绕随机游走、相关渗流、容量和随机几何。

你现在已经从这篇文章获得了选导师所需的信息：

> 李欣意老师这条研究线的典型风格，是以随机游走和随机空间模型为对象，结合离散势论、相关渗流、大偏差、改变测度与精细耦合。

看不懂 tilted walk 的细节，不构成负面信号。这篇 Introduction 默认读者已经熟悉一整套 Sznitman 随机交织研究，绝不是为本科生零基础进入而写的。真正应该在交流中问老师的是：

> 如果本科生跟您做科研，题目是否需要先系统学习 random interlacements 和势论？还是会从一个较自足的随机游走小问题开始？

这个答案比你现在能否读懂 Proposition 5.2，更能决定这位老师是否适合作为本研导师。



## 刘勇 Pathwise stationary solutions of stochastic Burgers equations with $L^2 [0, 1]$-noise and stochastic Burgers integral equations on infinite horizon

https://arxiv.org/pdf/math/0609344

### 粗糙理解

如标题所说，为 Burgers equations 给出了用随机积分表示的 pathwise stationary solutions

> 在大黏性条件下，证明随机 Burgers 方程存在唯一的路径平稳解；该解可表示为从负无穷到当前时刻的随机积分方程，并且会吸引其他初始状态。

### 问题

- 下学期才学 pde，不知道  the equation is non-autonomous for a.e. ω 中的非自治指的是什么
- 随机分析用到的工具似乎自成一派，和概率，但和离散模型（渗流、Ising，以及其极限 SLE 等）所去甚远。Ito 积分固然是一个好用的工具，它 plays an important role in 各个地方，当然也包括 SLE；然而 Ito 积分归根到底是工具性的东西，如果再往下，这一块的研究，应当更偏向分析。这恐怕不是我目前感兴趣的地方。 

## Baverez The CFT of SLE loop measures and the Kontsevich-Suhov conjecture

https://arxiv.org/pdf/2407.09080

### 粗糙理解

我甚至不能理解其研究对象。下个学期我将旁听 Baverez 的随机过程II，他可能会在课程中讲一些与他自己研究相关的问题。




## 孙鑫 SLE partition functions via conformal welding of random surfaces

[https://arxiv.org/pdf/2309.05177](https://arxiv.org/pdf/2309.05177)

### 问题1

-   > Let $X_0^\alpha\left(D ; x_1, \ldots, x_{2 N}\right)$ be the set of all $N$-tuples $\left(\eta_1, \ldots, \eta_N\right)$ of disjoint continuous curves in $\bar{D}$ which does not intersect $\partial D$ except at the starting and ending points such that for each $1 \leq k \leq N, \eta_k$ links $x_{i_k}$ with $x_{j_k}$. Then the global $N$-SLE ${ }_\kappa$ associated to $\alpha$, is the probability measure on $\left(\eta_1, \ldots, \eta_N\right) \subset X_0^\alpha\left(D ; x_1, \ldots, x_{2 N}\right)$ such that for each $1 \leq k \leq N$, given $\eta_1, \ldots, \eta_{k-1}, \eta_{k+1}, \ldots, \eta_N$, the conditional law of $\eta_k$ is the chordal SLE ${ }_\kappa$ in $D \backslash\left\{\eta_1, \ldots, \eta_{k-1}, \eta_{k+1}, \ldots, \eta_N\right\}$ connecting $x_{i_k}$ and $x_{j_k}$. $D \backslash\left\{\eta_1, \ldots, \eta_{k-1}, \eta_{k+1}, \ldots, \eta_N\right\}$ 似乎不是单连通区域。这里，$\eta\_k$ 的 conditional law 应该是在 **$x\_{i\_k}$ 与 $x\_{j\_k}$ 所在的单连通区域** 上的 SLE，对吗？**对的**

- 我们提到的配分函数 partition function，我只在 Ising model 中见过：$Z = \sum\_\sigma e^{-\beta H(\sigma)}$ 是离散概率的归一化系数。这和 SLE 中提到的 partition function 有什么关系？（文中似乎说，这是离散模型的连续对应物。）“配分” partition 一词来自于哪里？

- 我有如下理解：$mSLE^\#$ 根据定义，是概率测度；$mSLE$ 是 $mSLE^\#$ 的等比例缩放，缩放比例是配分函数 $Z$，这样 $\int mSLE = Z$，与离散情形对应。
  但是，我们为什么要这样构造？我看到 $mSLE^\#$ 的定义是自然的，但 $Z$ 的构造在论文本身中没有详述。$Z$ 的含义如何？

- 更进一步地，文中提到了 global 与 local 的 N-SLE，分别对应 $Z\_\alpha$ 和 $Z$ 两个配分函数。$Z\_\alpha$ 依赖于节点之间的联系方式 $\alpha$，而 local multiple SLEs 并未在文中详述。$Z$ 与 $Z\_\alpha$ 的关系是什么样的？


### 解答1

#### 2. SLE partition function 与 Ising 配分函数的关系

最直观的联系来自把离散构型按照界面的连接方式分类。

设离散模型的微观构型为 \(\sigma\)，权重

$$
 w(\sigma)=e^{-\beta H(\sigma)}. 
$$
每个构型产生一个界面连接方式 \(A(\sigma)=\alpha\)。于是可以把总配分函数拆成

$$
 Z^\delta =\sum_\sigma w(\sigma) =\sum_\alpha \underbrace{\sum_{\sigma:A(\sigma)=\alpha}w(\sigma)}_{Z_\alpha^\delta}. 
$$
这里：

- \(Z_\alpha^\delta\)：所有产生连接方式 \(\alpha\) 的微观构型的总权重；
- \(Z^\delta=\sum_\alpha Z_\alpha^\delta\)：所有连接方式的总权重；

因而
$$
\mathbb P^\delta[A=\alpha] =\frac{Z_\alpha^\delta}{Z^\delta}.
$$
在临界缩放极限中，经过适当的格点尺度重整化，

$$
Z_\alpha^\delta\longrightarrow Z_\alpha(D;x_1,\ldots,x_{2N}),
$$
这就是 multiple SLE 的 **pure partition function**。它不再对离散自旋构型求和，但仍保留“连接方式 \(\alpha\) 的总权重”这一含义。Peltola–Wu 也正是通过 \(Z_\alpha/Z\) 给出 GFF 水平线的连接概率。[具体公式](https://arxiv.org/pdf/1703.00898)

“partition function” 这个名称来自统计物理中的“对所有状态求和”；常用字母 \(Z\) 源于德语 **Zustandssumme**，即“状态总和”。[Pathria《Statistical Mechanics》](https://www.pas.rochester.edu/~yishengtu/research_files/EOS_reference/Pathria%2C R. K.  Statistical Mechanics.pdf)

#### 3. 为什么还要定义非概率测度 \(mSLE\)？

你的公式理解是对的，但这里应写成

$$
\operatorname{mSLE}_{\kappa,\alpha} = Z_\alpha\, \operatorname{mSLE}^{\#}_{\kappa,\alpha},
$$
如果固定一个 \(D,x_1,\ldots,x_{2N},\alpha\)，这看起来确实只是人为乘了一个数。关键是，\(Z_\alpha\) 是随着区域和标记点变化的函数：\[ Z_\alpha=Z_\alpha(D;x_1,\ldots,x_{2N}). \]

在 SLE 中，\(Z_\alpha\) 同时承担三种作用：

1. **比较不同连接方式**： \[ \mathbb P[A=\alpha]\propto Z_\alpha. \]

2. **决定 local SLE 的演化**

   Loewner 驱动过程的额外漂移由 \[ \kappa\,\partial_{x_i}\log Z \] 给出。也就是说，\(Z\) 告诉正在生长的曲线如何“感受到”其他标记点和潜在连接方式。

3. **保持共形协变和焊接公式**

   \(mSLE^\#\) 是归一化的曲线概率律；\(mSLE\) 则像一个 CFT 相关函数测度，能够在共形变换、区域限制和 LQG 焊接下满足自然的乘法公式。

因此，\(Z_\alpha\) 并不是从一个固定的 \(mSLE^\#\) 中自动恢复的。它还需要跨越所有区域和标记点满足：

- BPZ 型偏微分方程；
- 共形协变；
- 两个相邻标记点融合时由 \(\alpha\) 决定的渐近行为；
- 递归归一化 \(Z_{\varnothing}=1\)。

这些性质基本确定了 \(Z_\alpha\)。另一种构造是先用 Brownian loop measure 对独立 SLE 曲线重新加权，得到非归一化测度，再把其总质量定义成 \(Z_\alpha\)。

孙鑫这篇文章的贡献正是提供另一种来源：LQG 曲面焊接后，随机共形模量的密度可以分解为

$$
 \text{LCFT 因子}\times Z_\alpha, 
$$
于是 SLE partition function 自然从焊接测度中出现，而不只是人为补上的归一化常数。[论文摘要与 Theorem 1.1](https://arxiv.org/pdf/2309.05177)

#### 4. local 的 \(Z\) 与 global 的 \(Z_\alpha\)

二者不是互不相关的两类配分函数。更准确地说，\(\{Z_\alpha\}\) 是一组“纯基底”，一般的 \(Z\) 是它们的正线性组合。

**【Global multiple SLE】**global SLE 一开始就指定完整连接方式 \(\alpha\)，并直接研究从端点到端点的 \(N\) 条完整曲线：$$ \operatorname{mSLE}^{\#}_{\kappa,\alpha}. $$ 它对应 pure partition function \(Z_\alpha\)。

**【Local multiple SLE】** local SLE 只研究从各个标记点长出的一小段曲线，直到它们接近、碰撞或者吞掉其他标记点之前。此时还未必知道最终会形成哪种连接方式。它由一个一般的 partition function \(Z\) 驱动。在通常可延拓成完整不交曲线的情形，
$$
 Z=\sum_{\alpha\in\mathrm{LP}_N}c_\alpha Z_\alpha, \qquad c_\alpha\ge 0. 
$$
相应的完整曲线连接方式满足

$$
 \mathbb P_Z[A=\alpha] = \frac{c_\alpha Z_\alpha(D;x_1,\ldots,x_{2N})} {Z(D;x_1,\ldots,x_{2N})}, 
$$
并且在条件 \(A=\alpha\) 下，曲线就是 global $\operatorname{mSLE}^{\#}_{\kappa,\alpha}.$

特别地：

- 若 \(Z=Z_\alpha\)，local SLE 最终必按 \(\alpha\) 连接，并与 global SLE\(_\alpha\) 一致；

- 若 $Z=\sum_\alpha Z_\alpha,$ 则称为 symmetric partition function，并且 $\mathbb P[A=\alpha]=\frac{Z_\alpha}{\sum_\beta Z_\beta}.$


例如 \(N=2\) 时有两种无交叉连接方式：

$$
 \alpha_1=(12)(34),\qquad \alpha_2=(14)(23). 
$$
取

$$
Z=Z_{\alpha_1}+Z_{\alpha_2},
$$
则 local SLE 尚未预先决定最终连接；两种连接的概率分别是

$$
 \frac{Z_{\alpha_1}}{Z_{\alpha_1}+Z_{\alpha_2}}, \qquad \frac{Z_{\alpha_2}}{Z_{\alpha_1}+Z_{\alpha_2}}. 
$$
Peltola–Wu 证明了：当 \(Z=Z_\alpha\) 时，local 和 global 两种构造确实一致；一般 \(Z_1+Z_2\) 对应的 local law 则是两种 law 按 \(Z_1/Z\)、\(Z_2/Z\) 混合。[local/global 对应及凸组合公式](https://arxiv.org/pdf/1703.00898)

### 问题2

- 总结刚刚的理解：Z\_\alpha 刻画了【边界标记点通过 \alpha 的方式连接在一起的权重】，而 mSLE^\\# 是【condition on 连接方式 \alpha 时，特定连接方式的概率测度】。只有两者相乘，得到的才是【这一特定连接方式在全局的权重】。对吗
- 另外，我对于 local 有另一个问题。local 的曲线从部分标记点出发，不一定会碰到另一部分标记点。由于曲线是不交的，如果长出来的 SLE 曲线把标记点给包围起来了（却没有到达），那这样的标记点难道不是再也无法到达了吗？
- 我们再次在 GFF 上遇到了 e^{\gamma \phi(z)}，不过上次遇到的是 discrete GFF，我对 discrete 中的 green function 和 GFF 构造是清楚的，然而一般的 GFF 中，centered Gaussian process on D 我不清楚是什么；Green's function 也不清楚；再一次遇到经常遇到的 Liouville，量子引力前加的 Liouville 暗示什么？
- 详细解释 1.2 Liouville quantum gravity surfaces and conformal welding. 我对这一块完全陌生。

### 解答2

第一条基本正确，但把“全局的权重”换成“非归一化测度”会更精确：

\[ \operatorname{mSLE}_{\kappa,\alpha}(A) = Z_\alpha(D;\mathbf x)\, \operatorname{mSLE}^{\#}_{\kappa,\alpha}(A) \]

表示：所有连接方式为 \(\alpha\)、同时落在事件 \(A\) 中的曲线构型，其非归一化总权重。

我核对了论文第 1.2 节及 Figure 1：

**一、完善你对 \(Z_\alpha\) 和 \(mSLE^\#\) 的总结**

可以记成：

- \(Z_\alpha(D;\mathbf x)\)：边界标记点按照 \(\alpha\) 连接的总权重；
- \(\operatorname{mSLE}^{\#}_{\kappa,\alpha}\)：已知连接方式是 \(\alpha\) 后，完整曲线形状的条件概率分布；
- \(\operatorname{mSLE}_{\kappa,\alpha}=Z_\alpha\operatorname{mSLE}^{\#}_{\kappa,\alpha}\)：同时保留连接方式权重与该连接方式内部的曲线分布。

如果整体模型给不同连接方式附加系数 \(c_\alpha\)，那么

\[ \mathcal M=\sum_\alpha c_\alpha\operatorname{mSLE}_{\kappa,\alpha}, \]

归一化以后

\[ \mathbb P[A=\alpha] = \frac{c_\alpha Z_\alpha} {\sum_\beta c_\beta Z_\beta}. \]

所以 \(Z_\alpha\) 本身不是概率；它还依赖统一的归一化约定，并且具有共形尺度。真正的概率来自若干 \(Z_\alpha\) 的比值。

**二、local SLE 会不会把标记点隔绝掉？**

你的担忧正是 **local SLE 只定义到 continuation threshold** 的原因。

**1. local 并不承诺生成完整曲线**

local multiple SLE 只描述从标记点长出的一小段曲线，通常在以下事情发生之前停止：

- 两条生长中的曲线相遇；
- 曲线触碰不允许触碰的边界；
- 某个标记点被 Loewner hull 吞掉；
- 曲线的后续连接方式已经不能在当前单连通区域内继续定义。

因此，如果一个标记点真的“尚未被曲线碰到，却已经与相应目标隔绝”，local 过程就在这里到达 continuation threshold。它不会声称自己还能继续。

**2. 在本文的 \(\kappa\in(0,4)\) 情形，问题更温和**

此时 SLE 曲线是简单曲线。一条从边界长入内部、尚未再次碰到边界的简单曲线段，本身不能围出一个封闭区域；要把边界点彻底隔绝，通常必须：

- 再次碰到边界；
- 自交；
- 与另一条曲线相遇；
- 或已经完整连接到另一个边界点。

前三件事在本文所考虑的 disjoint simple curve 设置中，在 local 停止之前不会发生。

当一条完整曲线连接两个边界点后，它确实会把 \(D\) 切成两个分支。但如果连接方式是无交叉的 link pattern \(\alpha\)，那么每一对剩余的应连接端点都会落在同一个分支里，仍然可以继续。

**3. \(Z_\alpha\) 正是在控制“正确连接”**

若使用 pure partition function \(Z_\alpha\)，Loewner 驱动函数中出现漂移

\[ \kappa\partial_{x_i}\log Z_\alpha. \]

这个漂移以及 \(Z_\alpha\) 的 fusion 渐近性质，会阻止曲线走入与 \(\alpha\) 不相容的拓扑情形。对 \(\kappa\leq4\)，可以证明这种 local 过程能够延拓成按照 \(\alpha\) 连接的 global multiple SLE。

所以：

> 任意 local 描述未必自动给出完整曲线；但由 \(Z_\alpha\) 产生的 pure local SLE 可以延拓，并与 global SLE\(_\alpha\) 一致。

这正是 local/global 一致性定理的实质之一。[Peltola–Wu](https://arxiv.org/abs/1703.00898)

**三、从 discrete GFF 到 continuum GFF**

你熟悉的离散情形已经包含了连续情形的全部骨架。

**1. 离散 GFF**

在有限格点区域 \(D^\delta\) 上，零边界离散 GFF 是一个高维高斯向量

\[ (h^\delta(v))_{v\in D^\delta}, \]

满足

\[ \mathbb E[h^\delta(u)h^\delta(v)] = G_{D^\delta}(u,v), \]

其中离散 Green 函数既可以理解为：

- 随机游走退出区域前访问 \(v\) 的期望次数；
- 离散 Laplacian 的逆：

\[ G_{D^\delta}=(-\Delta_{D^\delta})^{-1}. \]

**2. 连续 Green 函数**

连续区域 \(D\) 上的 Dirichlet Green 函数满足

\[ -\Delta_zG_D(z,w)=2\pi\delta_w(z), \qquad G_D(z,w)=0,\quad z\in\partial D, \]

这里 \(2\pi\) 会随作者的 Laplacian 归一化变化。

它可以理解为连续 Laplacian 的积分核：

\[ (-\Delta_D)^{-1}f(z) = \frac1{2\pi}\int_DG_D(z,w)f(w)\,dw. \]

二维 Green 函数在对角线附近具有对数奇性：

\[ G_D(z,w)=-\log|z-w|+O(1), \qquad z\to w. \]

这正是 GFF 属于“log-correlated field”的原因。

**3. “centered Gaussian process on \(D\)”是什么意思？**

普通 Gaussian process 是一族随机变量 \(\{X_z:z\in D\}\)，使任意有限线性组合都是高斯变量。

但二维 continuum GFF **不能真正逐点定义**。因为

\[ \operatorname{Var}(h(z))=G_D(z,z)=\infty. \]

所以论文在 Introduction 里称它为 “centered Gaussian process on \(D\)” 是启发式说法。严格地，\(h\) 是一个随机广义函数：对每个光滑测试函数 \(f\)，可以定义

\[ (h,f), \]

并且这些是联合高斯随机变量，满足

\[ \mathbb E[(h,f)]=0, \]\[ \operatorname{Cov}((h,f),(h,g)) = \iint_{D\times D} f(z)G_D(z,w)g(w)\,dz\,dw. \]

“centered”就是所有这些线性观测的期望均为 \(0\)。

若 \(-\Delta e_n=\lambda_ne_n\)，也可以形式化写成

\[ h=\sum_{n=1}^{\infty} \frac{\xi_n}{\sqrt{\lambda_n}}e_n, \qquad \xi_n\overset{\mathrm{i.i.d.}}{\sim}N(0,1). \]

这个级数通常只在负阶 Sobolev 空间中收敛，不逐点收敛。

> 零边界与自由边界

- 零边界 GFF 对应 Dirichlet Green 函数；
- 自由边界 GFF 对应 Neumann Green 函数，且只定义到加一个常数，因此需要固定平均值为 \(0\)。

论文构造 quantum disk 时使用的是上半平面上的自由边界 GFF，并通过半圆上的平均值归一化。Introduction 省略了这一边界条件差别。

**四、为什么 \(e^{\gamma h(z)}\) 需要重整化？**

由于 \(h(z)\) 不存在，\(e^{\gamma h(z)}\) 当然也不能直接定义。

先取圆平均

\[ h_\varepsilon(z) = \text{\(h\) 在 \(\partial B(z,\varepsilon)\) 上的平均}, \]

这是一个真正的高斯随机变量，而且

\[ \operatorname{Var}(h_\varepsilon(z)) = \log\varepsilon^{-1}+O(1). \]

因此

\[ \mathbb E[e^{\gamma h_\varepsilon(z)}] = e^{\frac{\gamma^2}{2}\operatorname{Var}(h_\varepsilon(z))} \asymp\varepsilon^{-\gamma^2/2}, \]

会趋于无穷。需要乘以抵消发散的因子：

\[ \mu_{h,\varepsilon}(dz) = \varepsilon^{\gamma^2/2} e^{\gamma h_\varepsilon(z)}\,dz. \]

当 \(\gamma\in(0,2)\) 时，它弱收敛到非平凡的随机面积测度

\[ \mu_h(dz). \]

这就是 Gaussian multiplicative chaos。

在边界上相应定义

\[ \nu_{h,\varepsilon}(dx) = \varepsilon^{\gamma^2/4} e^{\frac\gamma2h_\varepsilon(x)}\,dx \longrightarrow \nu_h(dx), \]

称为 LQG boundary length measure。

因此论文里的

\[ \mu_\phi(dz)=e^{\gamma\phi(z)}dz, \qquad \nu_\phi(dx)=e^{\gamma\phi(x)/2}dx \]

只是省略了 regularization 和 renormalization 的形式记号。

> 与 LFPP 中 \(e^{\gamma h(v)}\) 的区别

二者都从指数化的 log-correlated field 出发，但用途不同：

- LFPP 把 \(e^{\gamma h(v)}\) 当作路径经过格点的代价，研究最短路径；
- LQG 先用重整化指数定义随机面积和边界长度；
- LQG 的真正距离还需要另一套更困难的构造，不能简单逐点写成 \(e^{\gamma h/2}|dz|\)。

这篇文章只需要 LQG 面积、边界长度和焊接，不需要 LQG metric。

**五、“Liouville quantum gravity”中的 Liouville 是什么？**

先假设 \(h\) 是普通光滑函数。形式上定义二维度量

\[ ds_h^2=e^{\gamma h(z)}|dz|^2. \]

它的面积元和长度元分别是

\[ dA_h=e^{\gamma h(z)}\,d^2z, \qquad dL_h=e^{\gamma h(z)/2}|dz|. \]

在经典微分几何中，把一个平面度量写成这种共形形式，并要求它具有给定高斯曲率，会导出 Liouville equation，大致形如

\[ -\Delta h=C e^{\gamma h}. \]

二维量子引力把这个共形因子 \(h\) 也当作随机变量，并对所有可能的二维度量“积分”。对应的 Liouville action 包含：

- Dirichlet energy，即 GFF 的高斯部分；
- 指数项 \(e^{\gamma h}\)，即面积项；
- 曲率和边界项。

所以“Liouville”表示这里量子化的是二维度量的共形因子，并且理论来自经典 Liouville 方程/作用量。“quantum”不是说这里直接研究希尔伯特空间里的量子算符，而是来自对随机几何、场和度量进行路径积分的物理来源。[Berestycki–Powell 的导论](https://arxiv.org/abs/2404.16642)

**六、什么是 quantum surface？**

这是第 1.2 节最关键的定义。

假设 \(g:D\to\widetilde D\) 是共形映射。论文规定坐标变换

\[ \widetilde h = h\circ g^{-1} + Q\log|(g^{-1})'|, \qquad Q=\frac2\gamma+\frac\gamma2. \]

如果两个 pair 满足这个关系，就视为同一个 quantum surface：

\[ (D,h)\sim_\gamma(\widetilde D,\widetilde h). \]

因此：

> quantum surface 不是一个固定区域上画着一个随机函数，而是所有等价坐标表示 \((D,h)\) 的等价类。

\((D,h)\) 只称为这张量子曲面的一个 **embedding** 或坐标表示。

这类似抽象黎曼曲面不等于某一张具体坐标图。换一个共形坐标，场也必须同时发生变换。

> 为什么是 \(Q=2/\gamma+\gamma/2\)？

如果 \(h\) 是光滑函数，仅要求普通面积元在换坐标后不变，会得到经典项 \(2/\gamma\)。额外的

\[ \frac{\gamma}{2} \]

来自 GFF 的对数发散和 GMC 重整化，也可以看作一种量子修正或 conformal anomaly。

这个变换保证

\[ \mu_{\widetilde h}=g_*\mu_h, \qquad \nu_{\widetilde h}=g_*\nu_h. \]

换句话说，坐标表示虽然变了，但量子面积和量子边界长度没有变。LQG metric 也满足相同的内禀性。[Gwynne–Miller](https://arxiv.org/abs/1905.00384)

**七、quantum disk 与 marked points**

quantum disk 是拓扑上为圆盘、带有随机 LQG 几何的量子曲面。它通常具有：

- 有限的量子面积；
- 有限的量子边界长度；
- 若干个边界标记点。

论文记两点标记、weight 为 \(W\) 的 quantum disk 法则为

\[ \mathcal M_2^{\mathrm{disk}}(W). \]

这里 \(W\) 不是面积或周长，而是控制标记点附近场的对数奇性及曲面类型的参数。

- \(W\geq\gamma^2/2\)：thick quantum disk，是一张连通的盘；
- \(0<W<\gamma^2/2\)：thin quantum disk，是一串首尾连接的“珠子状”量子盘；
- \(W=2\)：两个标记点是关于量子边界长度测度的典型点。

“quantum typical point”意思是：给定曲面后，按归一化的 \(\nu_h\) 抽取边界点。量子边界长度大的部分更容易被选中。

论文的 \(\mathrm{QD}_m\) 就是在 quantum disk 边界上按 \(\nu_h\) 抽取 \(m\) 个有序标记点所得的曲面测度。

你现在不必学习 thick disk 的 Brownian motion 构造；只需保留“随机盘 + 量子周长 + 标记点”这张图。

**八、Liouville field 与 insertion**

论文还说 quantum disk 可以用 LCFT 语言描述。

Liouville field measure \(\mathrm{LF}_{\mathbb H}\) 大致是：

- 一个自由边界 GFF；
- 再加一个随机整体常数，代表曲面的总体量子尺度。

由于没有固定总面积或周长，这通常是一个无穷测度，而不是概率测度。

在边界点 \(s_i\) 加 insertion，形式上是用

\[ e^{\frac{\beta_i}{2}\phi(s_i)} \]

重新加权场的法则。严格定义仍然需要重整化。它的效果可以理解为：

- 在 \(s_i\) 附近制造一个规定强度的对数奇性；
- 把 \(s_i\) 变成具有指定 quantum weight 的标记点；
- 同时使相应对象具有特定的共形协变指数。

三个 boundary insertions 对应带三个标记点的 quantum triangle。

所以 LQG 和 LCFT 在这里是同一随机曲面的两种描述：

- LQG 语言强调随机面积、边界长度和焊接；
- LCFT 语言强调场、insertions、相关函数和共形协变。

**九、conformal welding 到底如何进行？**

取两张带边界弧的量子曲面

\[ (S_1,e_1),\qquad(S_2,e_2). \]

设边界弧的量子长度分别为

\[ L_i=\nu_{h_i}(e_i). \]

为了粘起来，必须先要求

\[ L_1=L_2=\ell. \]

由于“两个连续随机变量恰好相等”通常是零概率事件，论文先按长度做测度分解：

\[ \mathcal M^i = \int_0^\infty \mathcal M^i(\ell)\,d\ell. \]

这里 \(\mathcal M^i(\ell)\) 可以理解为“边界弧量子长度固定为 \(\ell\) 时的条件测度”。

然后：

1. 从 \(\mathcal M^1(\ell)\times\mathcal M^2(\ell)\) 抽取两张曲面；
2. 从弧的起点开始，用量子长度 \(t\in[0,\ell]\) 参数化两条边界；
3. 把第一条边界上累计长度为 \(t\) 的点，与第二条边界上累计长度为 \(t\) 的点认同；
4. 得到一张新的拓扑曲面；
5. 用 uniformization 给它选择一个平面共形坐标。

原来的两条边界在新曲面中合成一条内部界面 \(\eta\)。

要注意，焊接依据的是极其粗糙、奇异的 LQG 长度，而不是 Euclidean length，所以产生的界面也是分形曲线。

奇妙之处在于：在恰当的 quantum disk 法则下，这条焊缝恰好是 SLE。论文回顾的 Theorem A 是

\[ \mathcal M_2^{\mathrm{disk}}(W_1+W_2) \times \operatorname{SLE}_\kappa(W_1-2;W_2-2) = c\, \operatorname{Weld}\!\left( \mathcal M_2^{\mathrm{disk}}(W_1), \mathcal M_2^{\mathrm{disk}}(W_2) \right), \]

其中

\[ \kappa=\gamma^2. \]

直观上：

> 把 weight \(W_1,W_2\) 的两张随机盘按量子长度粘起来，得到 weight \(W_1+W_2\) 的随机盘；粘合缝是一条带相应 force weights 的 SLE。

Figure 1 右侧的串珠形部分就是 thin quantum disk。

**十、这如何产生 multiple SLE partition function？**

固定 link pattern \(\alpha\)。先设想已经画出了 \(N\) 条无交曲线，它们把圆盘切成 \(N+1\) 个区域：

\[ S_1,\ldots,S_{N+1}. \]

论文的操作是反过来的：

1. 给每个区域 \(S_k\) 分配一张带相应边界标记点的 quantum disk；
2. 对每条预期界面 \(\eta_i\)，让它两侧的 quantum boundary arc 都具有长度 \(\ell_i\)；
3. 按照 link pattern \(\alpha\) 把这些边界弧逐条焊接；
4. 对所有 \(\ell_1,\ldots,\ell_N\) 积分。

结果是一张完整 quantum disk，内部带有 \(N\) 条焊缝。

Theorem 1.1 说明，当把最终曲面嵌入上半平面、固定三个标记点并让其余标记点成为随机 conformal moduli 时，联合测度分解成

\[ \text{带 boundary insertions 的 Liouville field} \quad\times\quad \operatorname{mSLE}_{\kappa,\alpha}. \]

而

\[ \operatorname{mSLE}_{\kappa,\alpha} = Z_\alpha\operatorname{mSLE}^{\#}_{\kappa,\alpha}. \]

因此，\(Z_\alpha\) 可以解释成：

> 按照 \(\alpha\) 焊接若干随机曲面时，这种界面拓扑在给定共形模量下贡献的密度。

这比“为了把概率测度放大而人为乘上 \(Z_\alpha\)”深得多：**LQG 焊接自然产生的是非归一化的曲线测度，\(Z_\alpha\) 正是其中不能被概率归一化抹掉的模量权重。**

对于当前选方向的目的，你只需牢牢记住五句话：

1. continuum GFF 是 Laplacian 逆所定义的随机广义函数；
2. 重整化 \(e^{\gamma h}\) 给出随机面积与边界长度；
3. quantum surface 是 \((D,h)\) 在共形换坐标下的等价类；
4. 按量子边界长度焊接两张 LQG 曲面，焊缝产生 SLE；
5. 多重焊接时，焊缝的非归一化法则就是 \(Z_\alpha mSLE_\alpha^\#\)。

目前没有必要继续读 quantum disk 的 Brownian 构造或 LCFT insertion 的严格定义。理解上述链条，已经足以理解孙鑫这篇论文在做什么。

## 章复熹 on the chemical distance exponent for the two-sided level-set of the 2D Guassian free field

https://arxiv.org/pdf/2011.04955

### 粗糙理解

主定理 1.1 说得很清楚了：

- **单侧截断的 DGFF 中没有相变现象。**这是容易理解的：DGFF 具有局部马氏性。假如说，在 $[-N, N] \cap \Z^2$ 内，在横坐标 $x=0$ 的整点上的随机变量值 $\eta^{V_{2N}}$ 已经确定，比如全都是 $1$，那么右半轴相当于是 Dirichlet 边界条件的 DGFF 再整体加 1。换言之，【横坐标 $x=0$ 的整点上的随机变量值全都大于等于 1】这件事暗示了【右侧的点也很有可能大于等于 1】，因此单侧截断无效。
- **考虑双侧截断**，$\mathcal P$ 中的边是欧式距离长、但路径长度短。可以证明，在尺度极限下，$\mathcal P$ 中的边不可能是开的。
- Remark 1.2 表示 $V_N$ 相较于 $V_{2N}$ 只是除去边界条件影响。数字 2 是非本质的
- Remark 1.3 表示，由于 donminate 理论，这件事情对 GFF on metric graphs 也是成立的
- Remark 1.4 & 1.5 表示，我们的结论是定量的；通过同样的论证手段，我们知道 $\lambda = \lambda_N$ （随着 $N$ 变化时），可以得出 exponent 并非严格大于一的下界结论（$N \log^{1/2} N$ 只比 $N$ 多了 log 量级）
- 于是，Remark 1.5 自然接着问，是否存在一个随着 $N$ 变化的临界值 $\lambda_N$，使得恰好出现 dim = 1 的路径。（On the other hand, it has been shown in [9, Theorem 2] that *the maximum of the DGFF* is at most ... with probability tending to 1, see [8] for more about the level-set at heights proportional to the absolute maximum. maximum 指的应该是整个场的最大值）



- 章复熹老师的文献综述做得很清晰；亦或是我具有阅读她文章所需要的背景知识：
  - 介绍 chemical distance 的概念，说的是在 percolation 中假如两点 open 地连通，那么 open 连通的最短距离与欧式距离的幂关系。在高维 Bernoulli 渗流中，open 连通路径的分形维数为 2，正如布朗运动一般；在二维超临界/亚临界情况下，距离与欧式距离相当；二维临界情况仍未解决（截止论文）。
  - 在高维（大于等于3）具有长程相关性的模型，超临界情况下，总是与欧式距离相当；二维的具体量级难估计，但维数确定为一维。

- 证明思路：
  - $\mathcal P$ 中的短开路径必然包含着大多数的 tame（近乎直线）路径，这一论述与之前读过的论文相同
  - 我们要证明 tame 路径是指数减的。为此，将路径切分成 $\sqrt K$ 个 $O(\sqrt K)$ 的平行四边形，每个小平行四边形内部 1x1 中央以正概率无法穿透；而不同小平行四边形近似独立；由此完成这一部分证明。
  - 与之前的论文相比，有本质困难的是最后一部分的归纳。大体思路和之前一样：通过不同尺度的分析（大尺度上的直线意味着切成小尺度也是 $K$ 个直线），得到大偏差结论。但我其实并没有读懂 we need to control the fluctuation of harmonic functions at all scales in an efficient way, so that one can translate the open property into a demand on the GFF at every sub-scale.  的意思。

### 问题

- 什么是 GFF on metric graphs
-  Question 1.7 提到的 对 two-sided level-set 做 scaling limit，是让 $N$ 趋向于无穷，看路径的尺度极限吗，期望它收敛到 SLE 吗？这样的路径当然是不交的，为什么我们会期望它收敛到最密集的 $SLE_4$ ？
- log-correlated 指的是【相关性较弱】（相比别的长程相关性），对吗？就是二维关联函数带有的 log

> 选导师问题：在我天真的想法中，更喜欢接受 SLE 的理论，因此对孙鑫老师的工作很感兴趣；然而这更像是【我喜欢这套理论的优雅】，不知道这些工具/研究方式是否喜欢。相对地，章复熹老师等离散概率更容易接触，但分析中用到的方法繁复、冗长，似乎不是我所喜欢的。然而，对于其证明图景的概括，这个故事，我认为是很有趣、能把握住的。
>
> 我计划向李欣意老师询问本科生科研的相关事项；向孙鑫老师询问了解 SLE CFT 等的途径，并期望与他们面谈。帮我拟定邮件。
>
> 或者说，你是否觉得我应该给更多老师发邮件？

