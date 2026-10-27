---
# 修改标题、摘要和实际发布时间；保留信息区开头及末尾的 ---。
title: "线性代数：矩阵等价、矩阵运算、转置与伴随矩阵"
description: "包含矩阵的运算，比较困难"
pubDatetime: 2026-10-26T16:50:00+08:00
tags: [学习记录, 课程笔记]
# 默认允许发布；暂不公开时改为 true。
draft: false
featured: false
---



> 来源：`线性代数10.22.pdf` 的 PDF 第 24～32 页（按文件页序）。摘录 `note_linalg_5.pdf` 第 1～9 页依次对应原第 24～32 页。原稿未完成的计算以“整理补充”标明。

## 1. 矩阵等价（原第 24 页）

若同型矩阵 $A$ 可经过有限次初等行、列变换化为 $B$，称 $A$ 与 $B$ **等价**，记作 $A\sim B$。等价关系满足自反性、对称性和传递性。

每个 $m\times n$ 矩阵都可化为等价标准形：

$$
A\sim\begin{pmatrix}E_r&0\\0&0\end{pmatrix},\qquad r=r(A),
$$

其中 $E_r$ 为 $r$ 阶单位矩阵。反过来，能化为该标准形的矩阵，其秩就是 $r$。

因此，两个同型矩阵等价，当且仅当秩相等。同型矩阵按等价关系分为 $\min\{m,n\}+1$ 类，分别对应秩 $0,1,\ldots,\min\{m,n\}$。

原稿亦使用“相抵”表示等价；本文统一使用“等价”。矩阵相等与等价是不同概念。

## 2. 矩阵的相等、加减与数乘（原第 25 页）

两个矩阵相等，是指它们同型且对应位置的元素全部相等。

同型矩阵逐项相加减：

$$
A\pm B=(a_{ij}\pm b_{ij}),\qquad
A+B=B+A,\qquad(A+B)+C=A+(B+C).
$$

一列或一行构成的矩阵称列向量或行向量。数域 $P$ 上的 $n$ 维列向量构成

$$
P^{n\times1}=\left\{\begin{pmatrix}a_1\\\vdots\\a_n\end{pmatrix}\;\middle|\;a_i\in P\right\}.
$$

原稿用 $\alpha,\beta,\gamma$ 表示向量；每个元素称一个分量，列向量从上到下排列，行向量从左到右排列。

数乘是将每个元素都乘以同一个数：

$$
cA=(ca_{ij}),\qquad
2\begin{pmatrix}1&2&3\\4&5&6\end{pmatrix}
=\begin{pmatrix}2&4&6\\8&10&12\end{pmatrix}.
$$

$-A=(-1)A$ 为 $A$ 的负矩阵。数乘满足交换数因子的结合律及分配律：

$$
c(dA)=(cd)A,\quad(c+d)A=cA+dA,\quad c(A+B)=cA+cB.
$$

行列式对每一行（列）分别线性。因此若 $A$ 为 $n$ 阶方阵，

$$
\det(cA)=c^n\det A.
$$

不能把“整个矩阵数乘”与“仅一行（列）数乘”混淆。

## 3. 矩阵乘法（原第 26 页）

设 $A=(a_{ik})\in P^{m\times s}$，$B=(b_{kj})\in P^{s\times n}$。乘积 $C=AB\in P^{m\times n}$ 的元素为

$$
c_{ij}=\sum_{k=1}^{s}a_{ik}b_{kj}.
$$

即左矩阵第 $i$ 行与右矩阵第 $j$ 列对应相乘后求和。乘法有定义的条件是左矩阵列数等于右矩阵行数。

例如：

$$
\begin{pmatrix}1&-1&0\\2&1&-1\\-1&0&1\end{pmatrix}
\begin{pmatrix}0&1\\-1&2\\1&0\end{pmatrix}
=\begin{pmatrix}1&-1\\-2&4\\1&-1\end{pmatrix}.
$$

该例 $AB$ 有定义，而 $BA$ 因内侧维数不匹配没有定义。

矩阵乘法一般不交换；一般也不能消去非零因子：$AB=AC$ 且 $A\neq 0$，不能推出 $B=C$。非零矩阵相乘也可能为零，例如（整理补充）

$$
\begin{pmatrix}1&0\\0&0\end{pmatrix}
\begin{pmatrix}0&0\\0&1\end{pmatrix}=0.
$$

## 4. 方程组与线性代换的矩阵表示（原第 27 页）

线性方程组

$$
\begin{cases}
a_{11}x_1+\cdots+a_{1n}x_n=b_1,\\
\vdots\\
a_{m1}x_1+\cdots+a_{mn}x_n=b_m
\end{cases}
$$

可写成 $Ax=b$，其中 $A=(a_{ij})_{m\times n}$、$x=(x_1,\ldots,x_n)^{\mathsf T}$、$b=(b_1,\ldots,b_m)^{\mathsf T}$。矩阵乘法逐行给出原方程的左端。

对线性代换，设

$$
x=Ay,\qquad y=Bz,
$$

其中 $x\in P^{2\times1}$、$y\in P^{3\times1}$、$z\in P^{2\times1}$，则

$$
\begin{pmatrix}x_1\\x_2\end{pmatrix}
=\begin{pmatrix}a_{11}&a_{12}&a_{13}\\a_{21}&a_{22}&a_{23}\end{pmatrix}
\begin{pmatrix}b_{11}&b_{12}\\b_{21}&b_{22}\\b_{31}&b_{32}\end{pmatrix}
\begin{pmatrix}z_1\\z_2\end{pmatrix}
=ABz.
$$

这说明连续线性代换对应矩阵乘积。

## 5. 乘法规律与对角矩阵（原第 28～29 页）

在维数适配时，

$$
(AB)C=A(BC),\quad c(AB)=(cA)B=A(cB),
$$

$$
A(B+C)=AB+AC,\qquad(B+C)A=BA+CA.
$$

但一般没有 $AB=BA$、消去律或“乘积为零则某个因子为零”的结论。

设

$$
D=\operatorname{diag}(\lambda_1,\lambda_2,\lambda_3),\qquad
F=\operatorname{diag}(\mu_1,\mu_2,\mu_3).
$$

则

$$
DA=\begin{pmatrix}
\lambda_1a_{11}&\lambda_1a_{12}&\lambda_1a_{13}\\
\lambda_2a_{21}&\lambda_2a_{22}&\lambda_2a_{23}\\
\lambda_3a_{31}&\lambda_3a_{32}&\lambda_3a_{33}
\end{pmatrix},
$$

$$
AF=\begin{pmatrix}
a_{11}\mu_1&a_{12}\mu_2&a_{13}\mu_3\\
a_{21}\mu_1&a_{22}\mu_2&a_{23}\mu_3\\
a_{31}\mu_1&a_{32}\mu_2&a_{33}\mu_3
\end{pmatrix}.
$$

左乘对角矩阵按行缩放，右乘对角矩阵按列缩放。仅主对角线可能非零的方阵称对角矩阵，记为 $\operatorname{diag}(\lambda_1,\ldots,\lambda_n)$。

当所有对角元均为 $\lambda$ 时称数量矩阵，即 $\lambda E_n$，满足 $(\lambda E_n)A=A(\lambda E_n)=\lambda A$（此处 $A$ 为 $n$ 阶方阵）。$\lambda=1$ 时为单位矩阵，且对矩形矩阵也有

$$
E_mA_{m\times n}=A_{m\times n},\qquad A_{m\times n}E_n=A_{m\times n}.
$$

单位矩阵是数量矩阵，数量矩阵是对角矩阵。

### 方阵的幂

对于方阵 $A$，定义 $A^0=E$，$A^k$ 为 $k$ 个 $A$ 的乘积（$k>0$）。对非负整数 $k,t$，

$$
A^kA^t=A^{k+t},\qquad(A^k)^t=A^{kt}.
$$

一般 $(AB)^k\neq A^kB^k$，应保持因子顺序：

$$
(A+B)^2=A^2+AB+BA+B^2,
$$

$$
(A+B)(A-B)=A^2-AB+BA-B^2.
$$

若额外满足 $AB=BA$，才可作相应的交换化简。

## 6. 乘积的行列式与迹（原第 30 页）

对同阶方阵，

$$
\det(AB)=\det A\det B=\det(BA).
$$

这不意味着 $AB=BA$。

方阵 $A$ 的迹是主对角线元素之和：

$$
\operatorname{tr}(A)=\sum_{i=1}^{n}a_{ii}.
$$

有

$$
\operatorname{tr}(A+B)=\operatorname{tr}A+\operatorname{tr}B,\quad
\operatorname{tr}(cA)=c\operatorname{tr}A,\quad
\operatorname{tr}(AB)=\operatorname{tr}(BA).
$$

**例：** $A,B$ 为 $n$ 阶方阵，$AB+E=0$，$\det A=2$，求 $\det B$。

$$
2\det B=\det(AB)=\det(-E)=(-1)^n
\quad\Longrightarrow\quad\det B=\frac{(-1)^n}{2}.
$$

## 7. 转置（原第 30 页）

将行与列互换得到 $A^{\mathsf T}$，满足

$$
\begin{aligned}
(A^{\mathsf T})^{\mathsf T}&=A,\\
(A+B)^{\mathsf T}&=A^{\mathsf T}+B^{\mathsf T},\\
(cA)^{\mathsf T}&=cA^{\mathsf T},\\
(AB)^{\mathsf T}&=B^{\mathsf T}A^{\mathsf T},\\
r(A^{\mathsf T})&=r(A).
\end{aligned}
$$

方阵还满足 $\det A^{\mathsf T}=\det A$。多个因子的乘积转置时顺序倒转：

$$
(ABC)^{\mathsf T}=C^{\mathsf T}B^{\mathsf T}A^{\mathsf T}.
$$

## 8. 伴随矩阵（原第 31 页）

设 $A=(a_{ij})$ 为 $n$ 阶方阵，$A_{ij}$ 为 $a_{ij}$ 的代数余子式。定义

$$
A^*=\begin{pmatrix}
A_{11}&A_{21}&\cdots&A_{n1}\\
A_{12}&A_{22}&\cdots&A_{n2}\\
\vdots&\vdots&&\vdots\\
A_{1n}&A_{2n}&\cdots&A_{nn}
\end{pmatrix}.
$$

注意代数余子式的下标已经转置：伴随矩阵第 $i,j$ 项为 $A_{ji}$。

**定理：**

$$
AA^*=A^*A=(\det A)E.
$$

证明：乘积第 $i,j$ 项为

$$
(AA^*)_{ij}=\sum_{k=1}^{n}a_{ik}A_{jk}
=\begin{cases}\det A,&i=j,\\0,&i\neq j.\end{cases}
$$

这正是元素与代数余子式的正交关系；$A^*A$ 同理。三阶情形的乘积因此为 $\operatorname{diag}(\det A,\det A,\det A)$。

## 9. 含参数的矩阵方程（原第 32 页）

原稿题记“P77.6”，给出

$$
A=\begin{pmatrix}1&-1&-1\\2&a&1\\-1&1&a\end{pmatrix},\qquad
B=\begin{pmatrix}2&3\\1&a\\-a-1&-2\end{pmatrix},
$$

问 $a$ 取何值时 $AX=B$ 有解。设 $X=(x^{(1)},x^{(2)})$、$B=(b^{(1)},b^{(2)})$，则

$$
AX=B\iff Ax^{(1)}=b^{(1)},\quad Ax^{(2)}=b^{(2)}.
$$

因此须让两列方程同时相容，可以对 $(A\mid B)$ 作行消元。以下分类与解为整理补充。

$$
\det A=(a-1)(a+2).
$$

当 $a\neq 1,-2$ 时有唯一解：

$$
X=\begin{pmatrix}
1&\dfrac{4a+1}{a+2}\\[0.5em]
0&\dfrac{a^2-7a+3}{(a-1)(a+2)}\\[0.5em]
-1&\dfrac1{a-1}
\end{pmatrix}.
$$

第一列对所有 $a$ 都满足 $A(1,0,-1)^{\mathsf T}=b^{(1)}$。第二列在 $a=1$ 或 $a=-2$ 时不相容：此时 $r(A)=2$ 而 $r(A\mid B)=3$。因此

$$
AX=B\text{ 有解}\iff a\neq 1,-2.
$$

该参数解已逐项代回 $AX=B$ 核算。

## 手写原稿

[查看手写原稿（note_linalg_5.pdf，共 9 页）](/notes/linalg_notes/linalg_hand_note/note_linalg_5.pdf)
