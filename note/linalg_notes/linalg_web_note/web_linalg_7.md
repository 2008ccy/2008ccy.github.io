---
# 修改标题、摘要和实际发布时间；保留信息区开头及末尾的 ---。
title: >-
  线性代数：分块矩阵与初等矩阵
description: >-
  线性代数：分块矩阵与初等矩阵的知识点、推导和手写原稿。
pubDatetime: 2026-10-28T13:50:00+08:00
tags: [ 课程笔记]
# 默认允许发布；暂不公开时改为 true。
draft: false
featured: false
---

> 来源：`线性代数10.22.pdf` 的 PDF 第 38～45 页（按文件页序）。摘录 `note_linalg_7.pdf` 第 1～8 页依次对应原第 38～45 页。开头为前页公式的续写，已补入理解公式必需的记号；原第 37 页例 10 不在本份中重录。

## 1. 克拉默公式的续写（原第 38 页上部）

设 $A$ 为 $n$ 阶可逆矩阵，$A_{ij}$ 为元素 $a_{ij}$ 的代数余子式。原稿本页接续上页，将 $x=A^{-1}b$ 写成分量形式：

$$
x_j=\frac1{\det A}\sum_{i=1}^{n}b_iA_{ij}.
$$

设 $D_j$ 为将 $A$ 的第 $j$ 列换成 $b$ 后所得矩阵的行列式。按该列展开，其余子式不变，故

$$
D_j=\sum_{i=1}^{n}b_iA_{ij},\qquad x_j=\frac{D_j}{\det A}.
$$

## 2. 分块矩阵的乘法（原第 38 页）

若 $A\in P^{m\times n}$、$B\in P^{n\times p}$，沿乘法的公共维数分块时，$A$ 的列分割与 $B$ 的行分割必须一致。分块后按通常乘法规则运算，并保持因子顺序。

例如

$$
\begin{pmatrix}A_{11}&A_{12}\\A_{21}&A_{22}\end{pmatrix}
\begin{pmatrix}B_{11}&B_{12}\\B_{21}&B_{22}\end{pmatrix}
=\begin{pmatrix}
A_{11}B_{11}+A_{12}B_{21}&A_{11}B_{12}+A_{12}B_{22}\\
A_{21}B_{11}+A_{22}B_{21}&A_{21}B_{12}+A_{22}B_{22}
\end{pmatrix}.
$$

### 原稿例题

$$
A=\left(\begin{array}{cc|cc}
1&0&1&3\\0&1&2&4\\\hline
0&0&-1&0\\0&0&0&-1
\end{array}\right),\qquad
B=\left(\begin{array}{cc|cc}
1&2&0&0\\2&0&0&0\\\hline
6&3&1&0\\0&-2&0&1
\end{array}\right).
$$

记

$$
U=\begin{pmatrix}1&3\\2&4\end{pmatrix},\quad
V=\begin{pmatrix}1&2\\2&0\end{pmatrix},\quad
W=\begin{pmatrix}6&3\\0&-2\end{pmatrix},
$$

则 $A=\begin{pmatrix}E&U\\0&-E\end{pmatrix}$，$B=\begin{pmatrix}V&0\\W&E\end{pmatrix}$，所以

$$
AB=\begin{pmatrix}V+UW&U\\-W&-E\end{pmatrix}
=\begin{pmatrix}
7&-1&1&3\\14&-2&2&4\\-6&-3&-1&0\\0&2&0&-1
\end{pmatrix}.
$$

## 3. 分块矩阵的转置与求逆（原第 39 页）

转置时，先交换各块的位置，再对每个块转置：

$$
A=(A_{ij})_{m\times n}
\quad\Longrightarrow\quad
A^{\mathsf T}=(A_{ji}^{\mathsf T})_{n\times m}.
$$

例如

$$
\begin{pmatrix}A_{11}&A_{12}\\A_{21}&A_{22}\end{pmatrix}^{\mathsf T}
=\begin{pmatrix}A_{11}^{\mathsf T}&A_{21}^{\mathsf T}\\A_{12}^{\mathsf T}&A_{22}^{\mathsf T}\end{pmatrix}.
$$

求分块矩阵的逆，可以先设逆矩阵的分块形式，再通过 $AA^{-1}=E$ 确定各块；不能对一般分块矩阵逐块取逆。

### 分块对角矩阵

若每个 $A_i$ 都是方阵，则

$$
A=\operatorname{diag}(A_1,\ldots,A_s)
$$

称分块对角矩阵，且

$$
\det A=\prod_{i=1}^{s}\det A_i.
$$

因此 $A$ 可逆当且仅当每个 $A_i$ 都可逆，此时

$$
A^{-1}=\operatorname{diag}(A_1^{-1},\ldots,A_s^{-1}).
$$

行列式和可逆性的完整表述为整理补充，原稿以例题应用这些性质。

## 4. 分块求逆例题（原第 40 页上部）

$$
A=\left(\begin{array}{c|cc|cc}
-2&0&0&0&0\\\hline
0&6&1&0&0\\
0&-10&-2&0&0\\\hline
0&0&0&1&2\\
0&0&0&3&5
\end{array}\right)
=\operatorname{diag}\left(-2,
\begin{pmatrix}6&1\\-10&-2\end{pmatrix},
\begin{pmatrix}1&2\\3&5\end{pmatrix}\right).
$$

三个块的行列式分别为 $-2,-2,-1$，所以 $\det A=-4\neq 0$。各块的逆为

$$
(-2)^{-1}=-\frac12,
$$

$$
\begin{pmatrix}6&1\\-10&-2\end{pmatrix}^{-1}
=-\frac12\begin{pmatrix}-2&-1\\10&6\end{pmatrix}
=\begin{pmatrix}1&\frac12\\-5&-3\end{pmatrix},
$$

$$
\begin{pmatrix}1&2\\3&5\end{pmatrix}^{-1}
=-\begin{pmatrix}5&-2\\-3&1\end{pmatrix}
=\begin{pmatrix}-5&2\\3&-1\end{pmatrix}.
$$

故

$$
A^{-1}=\left(\begin{array}{c|cc|cc}
-\frac12&0&0&0&0\\\hline
0&1&\frac12&0&0\\
0&-5&-3&0&0\\\hline
0&0&0&-5&2\\
0&0&0&3&-1
\end{array}\right).
$$

## 5. 初等矩阵（原第 40～41 页）

将单位矩阵作一次初等行变换得到的矩阵称初等矩阵；也可由一次相应的初等列变换获得。原稿分为三类：

| 类型 | 记号 | 对单位矩阵的行操作 |
| --- | --- | --- |
| 交换型 | $E_{st}$ | 交换第 $s,t$ 行 |
| 倍乘型 | $E_s(c)$，$c\neq 0$ | 第 $s$ 行乘 $c$ |
| 倍加型 | $E_{st}(c)$，$s\neq t$ | 第 $t$ 行的 $c$ 倍加到第 $s$ 行 |

倍加型是在单位矩阵的第 $(s,t)$ 项加上 $c$。注意 $E_{st}$ 与 $E_{st}(c)$ 分别表示交换型和倍加型，不能混淆。

**核心对应：** 对 $A$ 作一次初等行变换，等于在左侧乘相应初等矩阵；作初等列变换，等于在右侧乘相应初等矩阵。原稿将变换箭头“改写成等式”，正是这一对应。

### 5.1 交换行、列

$$
E_{12}=\begin{pmatrix}0&1&0\\1&0&0\\0&0&1\end{pmatrix},
$$

$$
E_{12}A=\begin{pmatrix}a_{21}&a_{22}&a_{23}\\a_{11}&a_{12}&a_{13}\\a_{31}&a_{32}&a_{33}\end{pmatrix},
\qquad
AE_{12}=\begin{pmatrix}a_{12}&a_{11}&a_{13}\\a_{22}&a_{21}&a_{23}\\a_{32}&a_{31}&a_{33}\end{pmatrix}.
$$

左乘交换第 $1,2$ 行；右乘交换第 $1,2$ 列。

### 5.2 倍乘行、列

$$
E_2(c)=\begin{pmatrix}1&0&0\\0&c&0\\0&0&1\end{pmatrix},\qquad c\neq 0.
$$

左乘 $E_2(c)$ 将 $A$ 的第 $2$ 行乘以 $c$，右乘则将第 $2$ 列乘以 $c$。

### 5.3 倍加行、列

$$
E_{21}(c)=\begin{pmatrix}1&0&0\\c&1&0\\0&0&1\end{pmatrix},
$$

$$
E_{21}(c)A=
\begin{pmatrix}
a_{11}&a_{12}&a_{13}\\
a_{21}+ca_{11}&a_{22}+ca_{12}&a_{23}+ca_{13}\\
a_{31}&a_{32}&a_{33}
\end{pmatrix}.
$$

即 $R_2+cR_1$。右乘 $E_{12}(c)$ 则表示 $C_2+cC_1$。同一个 $E_{st}(c)$ 左乘时为 $R_s+cR_t$，右乘时为 $C_t+cC_s$，下标所指的目标方向须分清。

## 6. 初等矩阵的逆与等价标准形（原第 42 页）

三类初等矩阵均可逆，逆仍为同类初等矩阵：

$$
E_{st}^{-1}=E_{st},\qquad
E_s(c)^{-1}=E_s(c^{-1}),\qquad
E_{st}(c)^{-1}=E_{st}(-c).
$$

分别对应再交换一次、乘以倒数、加上相反倍数。直接相乘均得到 $E$。

若 $A\in P^{m\times n}$，则

$$
r(A)=r\iff
\text{存在初等矩阵的乘积 }P,Q,
\quad PAQ=\begin{pmatrix}E_r&0\\0&0\end{pmatrix}.
$$

$P$ 记录初等行变换，$Q$ 记录初等列变换。设依次施加的左乘矩阵为 $P_1,\ldots,P_s$，右乘矩阵为 $Q_1,\ldots,Q_t$，则

$$
P_s\cdots P_1AQ_1\cdots Q_t=S,
$$

$$
A=P_1^{-1}\cdots P_s^{-1}S Q_t^{-1}\cdots Q_1^{-1},
\qquad S=\begin{pmatrix}E_r&0\\0&0\end{pmatrix}.
$$

这里必须按实际操作顺序排列各因子。

## 7. 可逆矩阵与初等矩阵乘积（原第 43 页）

对 $n$ 阶方阵，以下命题等价：

1. $A$ 可逆。
2. $A$ 可表示成有限个初等矩阵的乘积。

证明：可逆方阵可仅通过初等行变换化为单位矩阵，故存在初等矩阵 $P_1,\ldots,P_s$ 使

$$
P_s\cdots P_1A=E,
\qquad A=P_1^{-1}\cdots P_s^{-1}.
$$

各逆矩阵仍是初等矩阵，得到所需表示。反之，有限个可逆矩阵的乘积可逆。

**推论：** 左右乘可逆矩阵不改变秩。若 $P,Q$ 可逆、维数适配，则

$$
r(PA)=r(A),\qquad r(AQ)=r(A),\qquad r(PAQ)=r(A).
$$

这是因为可逆矩阵可分解为初等矩阵，而初等变换不改变秩。

### 用初等行变换求逆

对可逆矩阵，把 $A$ 与 $E$ 并排，始终对整个增广矩阵作相同的行变换：

$$
(A\mid E)\xrightarrow{\text{初等行变换}}(E\mid A^{-1}).
$$

理由是 $P_s\cdots P_1A=E$ 时，$P_s\cdots P_1=A^{-1}$，同样的左乘作用在右侧 $E$ 上正好得到 $A^{-1}$。使用这一横向增广形式时须用行变换。

## 8. 初等行变换求逆例题（原第 44 页）

$$
A=\begin{pmatrix}1&2&2\\3&1&0\\-1&-1&-1\end{pmatrix}.
$$

按原稿的操作顺序核算，得到连续变换链：

$$
\begin{aligned}
&\left(\begin{array}{rrr|rrr}
1&2&2&1&0&0\\3&1&0&0&1&0\\-1&-1&-1&0&0&1
\end{array}\right)
\xrightarrow{\substack{R_2-3R_1\\R_3+R_1}}
\left(\begin{array}{rrr|rrr}
1&2&2&1&0&0\\0&-5&-6&-3&1&0\\0&1&1&1&0&1
\end{array}\right)\\[1em]
&\xrightarrow{R_{23}}
\left(\begin{array}{rrr|rrr}
1&2&2&1&0&0\\0&1&1&1&0&1\\0&-5&-6&-3&1&0
\end{array}\right)
\xrightarrow{\substack{R_1-2R_2\\R_3+5R_2}}
\left(\begin{array}{rrr|rrr}
1&0&0&-1&0&-2\\0&1&1&1&0&1\\0&0&-1&2&1&5
\end{array}\right)\\[1em]
&\xrightarrow{R_2+R_3}
\left(\begin{array}{rrr|rrr}
1&0&0&-1&0&-2\\0&1&0&3&1&6\\0&0&-1&2&1&5
\end{array}\right)
\xrightarrow{-R_3}
\left(\begin{array}{rrr|rrr}
1&0&0&-1&0&-2\\0&1&0&3&1&6\\0&0&1&-2&-1&-5
\end{array}\right).
\end{aligned}
$$

因此

$$
A^{-1}=\begin{pmatrix}-1&0&-2\\3&1&6\\-2&-1&-5\end{pmatrix}.
$$

## 9. 矩阵方程的增广求解（原第 45 页）

原稿再次使用

$$
A=\begin{pmatrix}1&2&3\\2&2&1\\3&4&3\end{pmatrix},\quad
B=\begin{pmatrix}2&1\\5&3\end{pmatrix},\quad
C=\begin{pmatrix}1&3\\2&0\\3&1\end{pmatrix}
$$

求解 $AXB=C$。由 $A,B$ 可逆，

$$
X=A^{-1}CB^{-1}.
$$

先把 $A,C$ 横向增广，通过初等行变换计算：

$$
(A\mid C)\xrightarrow{\text{初等行变换}}(E\mid A^{-1}C).
$$

再把 $B$ 与所得 $A^{-1}C$ 纵向拼接，通过初等列变换计算：

$$
\begin{pmatrix}B\\A^{-1}C\end{pmatrix}
\xrightarrow{\text{初等列变换}}
\begin{pmatrix}E\\A^{-1}CB^{-1}\end{pmatrix}.
$$

横向增广时，两块行数相同，用行变换实现左乘；纵向拼接时，两块列数相同，用列变换实现右乘。

以下数值为整理补充，便于检查增广法的结果：

$$
A^{-1}C=\begin{pmatrix}1&1\\0&-2\\0&2\end{pmatrix},\qquad
B^{-1}=\begin{pmatrix}3&-1\\-5&2\end{pmatrix},
$$

$$
X=\begin{pmatrix}-2&1\\10&-4\\-10&4\end{pmatrix}.
$$

该结果与第六份原第 35 页例题一致，且已代回全部六个矩阵元素对应的方程检验。

## 手写原稿

[查看手写原稿（note_linalg_7.pdf，共 8 页）](/notes/linalg_notes/linalg_hand_note/note_linalg_7.pdf)
