---
# 修改标题、摘要和实际发布时间；保留信息区开头及末尾的 ---。
title: " 线性代数：Laplace 展开、Vandermonde 行列式与矩阵的秩"
description: "包含Laplace 展开、Vandermonde 行列式与矩阵的秩等技巧性较强且十分重要的内容"
pubDatetime: 2026-10-26T16:20:00+08:00
tags: [线性代数，课程笔记]
# 默认允许发布；暂不公开时改为 true。
draft: false
featured: false
---



> 来源：`线性代数10.22.pdf` 的 PDF 第 15～20 页（按文件页序）。摘录 `note_linalg_3.pdf` 第 1～6 页依次对应原第 15～20 页。按原稿顺序整理，已核算并完善适用条件与记号；补写的证明已注明。

## 1. 余子式与按一行（列）展开（原第 15 页）

设 $A=(a_{ij})$ 为 $n$ 阶方阵。删去第 $i$ 行和第 $j$ 列，剩余元素保持原来的相对次序，构成一个 $n-1$ 阶行列式，称为元素 $a_{ij}$ 的**余子式**，记作 $M_{ij}$。对应的**代数余子式**为

$$
A_{ij}=(-1)^{i+j}M_{ij}.
$$

行列式可以按任意一行或任意一列展开：

$$
\det A=\sum_{k=1}^{n}a_{ik}A_{ik}
=\sum_{k=1}^{n}a_{kj}A_{kj}.
$$

第一式固定第 $i$ 行，第二式固定第 $j$ 列。选择零较多的一行（列）通常可以减少计算。

例如，按第一行展开：

$$
\begin{vmatrix}
a_{11}&0&0&0\\
a_{21}&a_{22}&a_{23}&a_{24}\\
a_{31}&a_{32}&a_{33}&a_{34}\\
a_{41}&a_{42}&a_{43}&a_{44}
\end{vmatrix}
=a_{11}\begin{vmatrix}
a_{22}&a_{23}&a_{24}\\a_{32}&a_{33}&a_{34}\\a_{42}&a_{43}&a_{44}
\end{vmatrix}.
$$

若第三行仅第四列非零，则

$$
\begin{vmatrix}
a_{11}&a_{12}&a_{13}&a_{14}\\
a_{21}&a_{22}&a_{23}&a_{24}\\
0&0&0&a_{34}\\
a_{41}&a_{42}&a_{43}&a_{44}
\end{vmatrix}
=(-1)^{3+4}a_{34}
\begin{vmatrix}a_{11}&a_{12}&a_{13}\\a_{21}&a_{22}&a_{23}\\a_{41}&a_{42}&a_{43}\end{vmatrix}
=a_{34}A_{34}.
$$

原稿的证明思路是将第三行移到第一行、第四列移到第一列，共交换 $(3-1)+(4-1)=5$ 次，再按首行展开；符号与 $(-1)^{3+4}$ 相同。

## 2. 元素与代数余子式的正交关系（原第 16 页）

$$
\sum_{k=1}^{n}a_{ik}A_{jk}
=\begin{cases}\det A,&i=j,\\0,&i\neq j,\end{cases}
\qquad
\sum_{k=1}^{n}a_{ki}A_{kj}
=\begin{cases}\det A,&i=j,\\0,&i\neq j.\end{cases}
$$

同一行（列）的元素与自身代数余子式对应相乘再求和，得到原行列式；与另一行（列）的代数余子式对应相乘再求和，得到零。

例如，将三阶行列式的第一行换成第二行：

$$
\begin{vmatrix}a_{21}&a_{22}&a_{23}\\a_{21}&a_{22}&a_{23}\\a_{31}&a_{32}&a_{33}\end{vmatrix}
=a_{21}A_{11}+a_{22}A_{12}+a_{23}A_{13}=0.
$$

这里第一行的余子式没有改变，而新行列式有两行相同。

## 3. Vandermonde 行列式（原第 16 页）

$$
D_n=\begin{vmatrix}
1&1&\cdots&1\\
x_1&x_2&\cdots&x_n\\
x_1^2&x_2^2&\cdots&x_n^2\\
\vdots&\vdots&&\vdots\\
x_1^{n-1}&x_2^{n-1}&\cdots&x_n^{n-1}
\end{vmatrix}
=\prod_{1\leq i<j\leq n}(x_j-x_i).
$$

乘积遍历所有 $i<j$，共 $n(n-1)/2$ 个因子。

按原稿思路，从下向上依次作 $R_k-x_nR_{k-1}$（$k=n,n-1,\ldots,2$），保证使用的上一行仍是旧行：

$$
\begin{aligned}
D_n&\xrightarrow{\substack{R_n-x_nR_{n-1}\\R_{n-1}-x_nR_{n-2}\\\vdots\\R_2-x_nR_1}}
\begin{vmatrix}
1&\cdots&1&1\\
x_1-x_n&\cdots&x_{n-1}-x_n&0\\
x_1(x_1-x_n)&\cdots&x_{n-1}(x_{n-1}-x_n)&0\\
\vdots&&\vdots&\vdots\\
x_1^{n-2}(x_1-x_n)&\cdots&x_{n-1}^{n-2}(x_{n-1}-x_n)&0
\end{vmatrix}\\[0.8em]
&=(-1)^{1+n}\prod_{i=1}^{n-1}(x_i-x_n)D_{n-1}
=\prod_{i=1}^{n-1}(x_n-x_i)D_{n-1}.
\end{aligned}
$$

结合 $D_1=1$，递推即得结论；不需要假设各 $x_i$ 两两不同。若有相等者，等式两边均为零。

## 4. 多行 Laplace 展开（原第 17～18 页）

### 4.1 高阶子式及其代数余子式

在 $n$ 阶行列式中，选取行标 $i_1<\cdots<i_k$ 和列标 $j_1<\cdots<j_k$，交叉位置上的元素按原次序构成一个 $k$ 阶子式 $M_{I,J}$。删去这些行和列后得到互补的 $n-k$ 阶余子式 $M_{I^c,J^c}$，其代数余子式为

$$
\mathcal A_{I,J}=(-1)^{i_1+\cdots+i_k+j_1+\cdots+j_k}M_{I^c,J^c}.
$$

例如，在四阶行列式中选第 $1,3$ 行、第 $1,3$ 列：

$$
M_{I,J}=\begin{vmatrix}a_{11}&a_{13}\\a_{31}&a_{33}\end{vmatrix},
\qquad
\mathcal A_{I,J}=(-1)^{1+3+1+3}
\begin{vmatrix}a_{22}&a_{24}\\a_{42}&a_{44}\end{vmatrix}.
$$

四阶矩阵共有 $\binom42^2$ 个二阶子式；固定两行时则只有 $\binom42$ 个。

### 4.2 展开定理

固定任意 $k$ 行，取这 $k$ 行上的全部 $\binom nk$ 个 $k$ 阶子式，各乘自身的代数余子式，再求和：

$$
\det A=\sum_{\substack{J\subseteq\{1,\ldots,n\}\\|J|=k}}
M_{I,J}\mathcal A_{I,J}.
$$

固定 $k$ 列也有对应公式。

四阶情形，固定第 $2,3$ 行，列组合依次为 $12,13,14,23,24,34$，有

$$
\det A=\sum_{\ell=1}^{6}N_\ell\mathcal A_\ell.
$$

其中

$$
N_1=\begin{vmatrix}a_{21}&a_{22}\\a_{31}&a_{32}\end{vmatrix},
\quad
\mathcal A_1=(-1)^{2+3+1+2}\begin{vmatrix}a_{13}&a_{14}\\a_{43}&a_{44}\end{vmatrix},
$$

$$
N_6=\begin{vmatrix}a_{23}&a_{24}\\a_{33}&a_{34}\end{vmatrix},
\quad
\mathcal A_6=(-1)^{2+3+3+4}\begin{vmatrix}a_{11}&a_{12}\\a_{41}&a_{42}\end{vmatrix}.
$$

若原矩阵为

$$
\begin{vmatrix}
a_{11}&0&0&a_{14}\\
0&a_{22}&a_{23}&0\\
0&a_{32}&a_{33}&0\\
a_{41}&0&0&a_{44}
\end{vmatrix},
$$

按第 $2,3$ 行展开，仅选第 $2,3$ 列的子式可能非零，因此结果为

$$
(-1)^{2+3+2+3}
\begin{vmatrix}a_{22}&a_{23}\\a_{32}&a_{33}\end{vmatrix}
\begin{vmatrix}a_{11}&a_{14}\\a_{41}&a_{44}\end{vmatrix}.
$$

### 4.3 含零块的行列式

若 $A$ 为 $s$ 阶方阵，$B$ 为 $t$ 阶方阵，$C$ 为 $s\times t$ 矩阵，则

$$
\det\begin{pmatrix}C&A\\B&0_{t\times s}\end{pmatrix}
=(-1)^{st}\det A\det B.
$$

按前 $s$ 行展开，仅最后 $s$ 列对应的子式可能贡献非零项，符号指数为

$$
(1+\cdots+s)+((t+1)+\cdots+(t+s))=s(s+1)+st,
$$

其奇偶性与 $st$ 相同。

**注意：** 一般分块矩阵不能套用标量二阶行列式公式：

$$
\det\begin{pmatrix}A&B\\C&D\end{pmatrix}
\neq\det A\det D-\det B\det C
\quad\text{（一般情形）}.
$$

## 5. 矩阵的秩（原第 19 页）

矩阵 $A$ 中非零子式的最高阶数称为 $A$ 的秩，记为 $r(A)$；若全部元素为零，规定 $r(A)=0$。对于 $m\times n$ 矩阵，

$$
0\leq r(A)\leq\min\{m,n\}.
$$

这里的子式可以选取不相邻的行和列。

- $r(A)\geq r$，当且仅当存在一个非零 $r$ 阶子式。
- $r(A)\leq r$，当且仅当所有 $r+1$ 阶子式均为零；更高阶子式也均为零。
- 因此，存在非零 $r$ 阶子式且全部 $r+1$ 阶子式为零，即可判定秩为 $r$。

最后一条可由行列式展开理解：如果所有 $r+1$ 阶子式为零，每个 $r+2$ 阶子式按一行展开也是零，再逐阶递推。

**定理：** 初等行变换、初等列变换均不改变矩阵的秩。行阶梯形矩阵的秩等于非零行数，也等于主元个数，因此求秩时化为阶梯形即可。

原稿旁注：非零 $r$ 阶子式通过展开，可找到非零 $r-1$ 阶子式（$r\geq 2$）；给矩阵增加一行或一列，秩至多增加 $1$。

## 6. 用秩判定线性方程组的解（原第 20 页）

设 $A\in P^{m\times n}$，$b\in P^{m\times1}$，增广矩阵为 $\bar A=(A\mid b)$。未知数为 $n$ 个，方程为 $m$ 个。

$$
\begin{array}{c|c}
\text{秩的关系}&\text{解的情况}\\\hline
r(A)\neq r(\bar A)&\text{无解}\\
r(A)=r(\bar A)=n&\text{唯一解}\\
r(A)=r(\bar A)=r<n&\text{有 }n-r\text{ 个自由未知量}
\end{array}
$$

在原稿所讨论的实数等无限数域上，最后一种情况有无穷多解。增广后只多一列，所以不相等时必有 $r(\bar A)=r(A)+1$。

消元后出现“系数全为零、常数非零”的行，即矛盾方程 $0=d$（$d\neq 0$），对应无解。相容时，

$$
\text{未知量个数}=\text{主元未知量个数}+\text{自由未知量个数}.
$$

齐次方程组 $Ax=0$ 总有零解，且

$$
r(A)<n\iff\text{存在非零解},
\qquad
r(A)=n\iff\text{只有零解}.
$$

当 $m=n$ 时，

$$
Ax=b\text{ 有唯一解}\iff r(A)=n\iff\det A\neq 0.
$$

## 手写原稿

[查看手写原稿（note_linalg_3.pdf，共 6 页）](/notes/linalg_notes/linalg_hand_note/note_linalg_3.pdf)
