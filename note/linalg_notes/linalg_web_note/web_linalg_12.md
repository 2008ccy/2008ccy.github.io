---
title: 线性代数：方程组的解结构与欧氏空间
description: 从基础解系构造非齐次方程组的通解，推导实内积的性质，并用施密特正交化求标准正交基。
tags: [线性代数, 课程笔记]
pubDatetime: 2026-11-24T15:46:17+08:00
draft: false
featured: false
---

> 来源：Goodnotes《线性代数》原第 74～80 页，对应日期导出 `线性代数11.24.pdf` 第 12～18 页。文末手稿 `note_linalg_12.pdf` 共 7 页，按原页序排列。

## **1. 从自由变量构造基础解系（原第 74 页）**

[上一篇的末例](/posts/linalg_notes/linalg_web_note/web_linalg_11/)用两个自由变量写出了四元齐次方程组的通解。一般地，设 $A\in P^{m\times n}$，$r(A)=r$。为便于书写，先按主元变量、自由变量的顺序排列未知数，并对 $A$ 作初等行变换，化为

$$
\begin{pmatrix}I_r&C\\0&0\end{pmatrix},
\qquad C=(c_{ij})\in P^{r\times(n-r)}.
$$

令自由变量组成的列向量为 $t=(t_1,\ldots,t_{n-r})^{\mathsf T}$，主元变量便是 $-Ct$。若 $C_j$ 表示 $C$ 的第 $j$ 列，$e_j$ 是 $P^{n-r}$ 的第 $j$ 个标准基向量，则

$$
x=\begin{pmatrix}-Ct\\t\end{pmatrix}
=\sum_{j=1}^{n-r}t_j\eta_j,\qquad
\eta_j=\begin{pmatrix}-C_j\\ e_j\end{pmatrix}.
$$

实际解题时把分量放回原未知数的位置。每个 $\eta_j$ 都满足方程，因为 $-C_j+Ce_j=0$。若 $\sum_j k_j\eta_j=0$，观察自由变量所在的分量就得 $k_j=0$。而任意解又都由上式给出，故这些向量构成基础解系，**解空间的维数等于自由变量的个数 $n-r$**。$r=n$ 时只有零解，解空间维数为零。

## **2. 非齐次方程组的解结构（原第 75～76 页）**

设 $b\neq 0$，称 $Ax=0$ 为非齐次方程组 $Ax=b$ 的**导出组**。设 $A\alpha=A\beta=b$，$A\gamma=A\delta=0$，则

$$
\begin{aligned}
A(\alpha+\beta)&=2b,\\
A(\alpha-\beta)&=0,\\
A(\alpha+\gamma)&=b.
\end{aligned}
$$

因此，两特解之差是导出组的解，特解加上任一齐次解仍是原方程组的解。原稿的小例中，$A(5\alpha+6\beta-3\gamma-2\delta)=11b$，因为 $\gamma,\delta$ 两项经 $A$ 作用都为零。

**解的结构定理。** 设 $\xi^*$ 是 $Ax=b$ 的一个特解，$\xi_1,\ldots,\xi_{n-r}$ 是 $Ax=0$ 的基础解系。$Ax=b$ 的全部解为

$$
x=\xi^*+\sum_{j=1}^{n-r} k_j\xi_j,\qquad k_j\in P.
$$

**证明。** 任取原方程的解 $x$，有 $A(x-\xi^*)=b-b=0$。于是 $x-\xi^*$ 可以用基础解系表示，得到上式。反过来，将上式左乘 $A$，得到 $A\xi^*+\sum_j k_j A\xi_j=b$。所以式中每组参数都给出原方程的解。几何上，解集是齐次解空间沿 $\xi^*$ 平移的结果。

## **3. 五元非齐次方程组的通解（原第 77 页）**

求下列方程组的通解：

$$
\begin{aligned}
x_1+x_2+x_3+x_4+x_5&=7,\\
3x_1+3x_2+x_3+x_4-3x_5&=-2,\\
x_1+x_2+3x_3+3x_4+7x_5&=30,\\
5x_1+5x_2-3x_3+3x_4-x_5&=12.
\end{aligned}
$$

按原稿从第一列开始消元。下面每个箭头上的操作从上往下执行：

$$
\begin{aligned}
&\left(\begin{array}{rrrrr|r}
1&1&1&1&1&7\\3&3&1&1&-3&-2\\1&1&3&3&7&30\\5&5&-3&3&-1&12
\end{array}\right)\\
&\xrightarrow{\substack{R_2-3R_1\\R_3-R_1\\R_4-5R_1}}
\left(\begin{array}{rrrrr|r}
1&1&1&1&1&7\\0&0&-2&-2&-6&-23\\0&0&2&2&6&23\\0&0&-8&-2&-6&-23
\end{array}\right)\\
&\xrightarrow{\substack{R_3+R_2\\R_4-R_2\\R_{34}\\-\frac16 R_3}}
\left(\begin{array}{rrrrr|r}
1&1&1&1&1&7\\0&0&-2&-2&-6&-23\\0&0&1&0&0&0\\0&0&0&0&0&0
\end{array}\right)\\
&\xrightarrow{\substack{R_2+2R_3\\-\frac12 R_2\\R_1-R_3\\R_1-R_2\\R_{23}}}
\left(\begin{array}{rrrrr|r}
1&1&0&0&-2&-9/2\\0&0&1&0&0&0\\0&0&0&1&3&23/2\\0&0&0&0&0&0
\end{array}\right).
\end{aligned}
$$

令 $x_2=t_1,\ x_5=t_2$，于是 $x_3=0$，$x_4=\tfrac{23}{2}-3t_2$，$x_1=-\tfrac92-t_1+2t_2$。将常数项和两个自由参数的系数分开，得到

$$
\begin{aligned}
\xi^*&=(-9/2,0,0,23/2,0)^{\mathsf T},\\
\xi_1&=(-1,1,0,0,0)^{\mathsf T},\\
\xi_2&=(2,0,0,-3,1)^{\mathsf T},\\
x&=\xi^*+t_1\xi_1+t_2\xi_2,\qquad t_1,t_2\in P.
\end{aligned}
$$

**代回检验。** 四个方程的左端在 $\xi^*$ 处依次为 $7,-2,30,12$，在 $\xi_1,\xi_2$ 处均为零。两个方向在自由变量 $x_2,x_5$ 上的分量线性无关，与 $5-r(A)=2$ 相符。

## **4. 欧氏空间的内积与度量矩阵（原第 78 页）**

在 $\mathbb R^n$ 中，$\alpha=(a_1,\ldots,a_n)^{\mathsf T}$ 与 $\beta=(b_1,\ldots,b_n)^{\mathsf T}$ 的标准内积定义为

$$
(\alpha,\beta)=\alpha^{\mathsf T}\beta=\sum_{i=1}^n a_i b_i.
$$

内积满足正定性，即 $(\alpha,\alpha)\geq 0$ 且等号恰在 $\alpha=0$ 时成立。它还满足对称性 $(\alpha,\beta)=(\beta,\alpha)$ 和双线性：

$$
\left(\sum_i c_i\alpha_i,\sum_j d_j\beta_j\right)
=\sum_i\sum_j c_i d_j(\alpha_i,\beta_j).
$$

若 $G_{ij}=(\alpha_i,\beta_j)$，上式可写为 $c^{\mathsf T}Gd$。特别地，在同一组基 $\varepsilon_1,\ldots,\varepsilon_n$ 下，令 $H_{ij}=(\varepsilon_i,\varepsilon_j)$。向量 $\alpha,\beta$ 的坐标列分别为 $X,Y$ 时，有

$$
(\alpha,\beta)=X^{\mathsf T}HY.
$$

$H$ 称为这组基的**度量矩阵**（Gram 矩阵）。它是实对称正定矩阵，因为对任意 $X\neq 0$，相应向量 $\alpha=\sum_i x_i\varepsilon_i$ 非零，故 $X^{\mathsf T}HX=(\alpha,\alpha)>0$。

## **5. 长度、夹角与正交（原第 78～79 页）**

定义 $\|\alpha\|=\sqrt{(\alpha,\alpha)}$。**柯西–施瓦茨不等式**给出

$$
|(\alpha,\beta)|\leq\|\alpha\|\,\|\beta\|,
$$

等号当且仅当 $\alpha,\beta$ 线性相关。若有一个向量为零，等号显然成立。其余相关情形写作 $\alpha=k\beta$，则两端同为 $|k|\|\beta\|^2$。若两向量无关，则任意实数 $t$ 都有 $t\alpha+\beta\neq 0$，因而

$$
\|t\alpha+\beta\|^2
=\|\alpha\|^2t^2+2(\alpha,\beta)t+\|\beta\|^2>0.
$$

该二次式的判别式严格小于零，故 $(\alpha,\beta)^2<\|\alpha\|^2\|\beta\|^2$。

对于两个非零向量，夹角 $\theta=\arccos\!\big((\alpha,\beta)/(\|\alpha\|\|\beta\|)\big)$ 有意义，因为反余弦的自变量在 $[-1,1]$ 内。展开平方并使用上述不等式可得

$$
\|\alpha+\beta\|^2
=\|\alpha\|^2+2(\alpha,\beta)+\|\beta\|^2
\leq(\|\alpha\|+\|\beta\|)^2.
$$

两边开方即得**三角不等式**。同一展开式也说明，$\|\alpha+\beta\|^2=\|\alpha\|^2+\|\beta\|^2$ 当且仅当 $(\alpha,\beta)=0$，即两向量正交。

一组基的向量两两正交时，称为**正交基**。若每个向量还都是单位向量，就称为**标准正交基**，此时度量矩阵为 $I_n$。两两正交的非零向量必线性无关，因为对 $\sum_i c_i\alpha_i=0$ 两边分别与 $\alpha_j$ 取内积，便得 $c_j\|\alpha_j\|^2=0$，所以每个 $c_j$ 都为零。

## **6. 施密特正交化（原第 80 页）**

给定线性无关向量 $\alpha_1,\ldots,\alpha_s$，从 $\beta_1=\alpha_1$ 开始，逐步减去 $\alpha_k$ 在前面各个正交方向上的投影：

$$
\beta_k=\alpha_k-\sum_{j=1}^{k-1}
\frac{(\alpha_k,\beta_j)}{(\beta_j,\beta_j)}\beta_j,
\qquad
\gamma_k=\frac{\beta_k}{\|\beta_k\|}.
$$

与任一先前的 $\beta_j$ 取内积，恰好只有对应的投影项与 $(\alpha_k,\beta_j)$ 相消。若 $\beta_k=0$，则 $\alpha_k$ 已由前面的向量表示，与原组线性无关矛盾。因此每一步都能单位化，得到同一生成空间的一组标准正交基。

**例。** 取 $\alpha_1=(1,2,-1)^{\mathsf T}$、$\alpha_2=(-1,3,1)^{\mathsf T}$、$\alpha_3=(4,-1,0)^{\mathsf T}$。前两步给出

$$
\beta_1=\alpha_1,\qquad
\beta_2=\alpha_2-\tfrac46\beta_1
=\tfrac53(-1,1,1)^{\mathsf T}.
$$

第三步中，$(\alpha_3,\beta_1)=2$，$(\alpha_3,\beta_2)=-25/3$，且 $\|\beta_2\|^2=25/3$。于是

$$
\beta_3=\alpha_3-\tfrac13\beta_1+\beta_2
=(2,0,2)^{\mathsf T}.
$$

归一化后所得的正交基为

$$
\begin{aligned}
\gamma_1&=\tfrac1{\sqrt6}(1,2,-1)^{\mathsf T},\\
\gamma_2&=\tfrac1{\sqrt3}(-1,1,1)^{\mathsf T},\\
\gamma_3&=\tfrac1{\sqrt2}(1,0,1)^{\mathsf T}.
\end{aligned}
$$

三对不同向量的内积均为零，每个向量与自身的内积均为一，故它们的度量矩阵确为 $I_3$。

## **手写原稿**

[在本站阅读手写原稿（对应原第 74～80 页，共 7 页）](/notes/read/linalg_notes/linalg_hand_note/note_linalg_12/)
