---
# 修改标题、摘要和实际发布时间；保留信息区开头及末尾的 ---。
title: >-
  线性代数：逆矩阵与伴随矩阵的性质
description: >-
  线性代数：逆矩阵与伴随矩阵的性质的知识点、推导和手写原稿。
pubDatetime: 2026-10-28T13:40:00+08:00
tags: [线性代数， 课程笔记]
# 默认允许发布；暂不公开时改为 true。
draft: false
featured: false
---

> 来源：`线性代数10.22.pdf` 的 PDF 第 33～37 页（按文件页序）。摘录 `note_linalg_6.pdf` 第 1～5 页依次对应原第 33～37 页。依要求，整理稿删去原第 37 页“例 10”；配套 PDF 保留这五页的原貌。

## 1. 逆矩阵的定义与唯一性（原第 33 页）

设 $A,B$ 均为 $n$ 阶方阵，若

$$
AB=BA=E_n,
$$

则称 $B$ 为 $A$ 的逆矩阵，记为 $A^{-1}$，并称 $A$ 可逆。可逆矩阵的逆矩阵仍可逆，且 $(A^{-1})^{-1}=A$。

逆矩阵唯一。若 $B,C$ 都是 $A$ 的逆矩阵，则

$$
C=EC=(BA)C=B(AC)=BE=B.
$$

## 2. 可逆的判定及伴随矩阵公式（原第 33 页）

**定理：**

$$
A\text{ 可逆}\iff\det A\neq 0,
\qquad A^{-1}=\frac{A^*}{\det A}.
$$

证明：若 $AB=E$，则 $\det A\det B=1$，故 $\det A\neq 0$。反之，利用

$$
AA^*=A^*A=(\det A)E,
$$

当 $\det A\neq 0$ 时，$A^*/\det A$ 同时是左逆和右逆。

**推论（原第 34 页）：** 同阶方阵只须验证 $AB=E$ 或 $BA=E$ 中的一式，就能推出两式都成立，且 $B=A^{-1}$。因为对其中一式取行列式即可先证明 $A,B$ 均可逆。

## 3. 逆矩阵的运算规律（原第 34 页）

以下 $A,B$ 均可逆，$c\neq 0$：

$$
\begin{aligned}
(A^{-1})^{-1}&=A,\\
(AB)^{-1}&=B^{-1}A^{-1},\\
(cA)^{-1}&=c^{-1}A^{-1},\\
(A^{\mathsf T})^{-1}&=(A^{-1})^{\mathsf T},\\
\det(A^{-1})&=(\det A)^{-1}.
\end{aligned}
$$

逆矩阵与转置可以交换；乘积取逆时须倒转顺序。对于正整数 $k$，定义

$$
A^{-k}=(A^{-1})^k.
$$

### 二阶矩阵求逆

若 $A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ 且 $ad-bc\neq 0$，则

$$
A^{-1}=\frac1{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}.
$$

即交换主对角线两项，副对角线两项变号，再除以行列式。

原稿例题：

$$
A=\begin{pmatrix}2&5\\1&3\end{pmatrix},\qquad
\det A=6-5=1,
\qquad A^{-1}=\begin{pmatrix}3&-5\\-1&2\end{pmatrix}.
$$

## 4. 矩阵方程 $AXB=C$（原第 35 页）

$$
A=\begin{pmatrix}1&2&3\\2&2&1\\3&4&3\end{pmatrix},\quad
B=\begin{pmatrix}2&1\\5&3\end{pmatrix},\quad
C=\begin{pmatrix}1&3\\2&0\\3&1\end{pmatrix}.
$$

$\det A=2$、$\det B=1$，故 $A,B$ 均可逆。在等式左侧乘 $A^{-1}$，右侧乘 $B^{-1}$：

$$
A^{-1}(AXB)B^{-1}=A^{-1}CB^{-1}
\quad\Longrightarrow\quad X=A^{-1}CB^{-1}.
$$

原稿只给出求解形式，以下数值为整理补充：

$$
A^{-1}=\begin{pmatrix}1&3&-2\\-\frac32&-3&\frac52\\1&1&-1\end{pmatrix},
\qquad B^{-1}=\begin{pmatrix}3&-1\\-5&2\end{pmatrix},
$$

$$
X=\begin{pmatrix}-2&1\\10&-4\\-10&4\end{pmatrix}.
$$

代回可得 $AXB=C$。口诀“左撤左，右撤右”表示：消去左侧因子须左乘其逆，消去右侧因子须右乘其逆。

## 5. 伴随矩阵的性质（原第 35～36 页）

设 $A$ 为 $n$ 阶方阵，$n\geq 2$。原稿归纳如下：

1. $AA^*=A^*A=(\det A)E$。
2. $A$ 可逆当且仅当 $\det A\neq 0$，此时 $A^{-1}=A^*/\det A$。
3. $\det A^*=(\det A)^{n-1}$。
4. 伴随矩阵的秩满足

$$
r(A^*)=\begin{cases}
n,&r(A)=n,\\
1,&r(A)=n-1,\\
0,&r(A)<n-1.
\end{cases}
$$

5. 若 $A\in P^{m\times n}$、$B\in P^{n\times t}$ 且 $AB=0$，则 $r(A)+r(B)\leq n$。
6. 对可逆同阶方阵 $A,B$，$(AB)^*=B^*A^*$。

### 5.1 伴随矩阵行列式的证明

当 $\det A\neq 0$ 时，对 $AA^*=(\det A)E$ 取行列式：

$$
\det A\det A^*=(\det A)^n
\quad\Longrightarrow\quad\det A^*=(\det A)^{n-1}.
$$

当 $\det A=0$ 时，若反设 $\det A^*\neq 0$，则由 $AA^*=0$ 右乘 $(A^*)^{-1}$ 得 $A=0$。但 $n\geq 2$ 时，零矩阵的全部 $n-1$ 阶代数余子式均为零，故 $A^*=0$，矛盾。因此 $\det A^*=0$，公式仍成立。

### 5.2 零乘积的秩不等式

整理补充证明：$AB=0$ 表明 $B$ 的每个列向量都属于 $A$ 的零空间，故

$$
r(B)\leq\dim\ker A=n-r(A).
$$

于是 $r(A)+r(B)\leq n$。这条结论适用于矩形矩阵。

### 5.3 伴随矩阵秩的分类证明

- 若 $r(A)=n$，则 $\det A\neq 0$，由 $\det A^*=(\det A)^{n-1}\neq 0$ 得 $r(A^*)=n$。
- 若 $r(A)=n-1$，则 $AA^*=0$，上节不等式给出 $r(A^*)\leq 1$。又因为存在非零 $n-1$ 阶子式，$A^*$ 至少有一个元素非零，故 $r(A^*)=1$。
- 若 $r(A)<n-1$，全部 $n-1$ 阶子式为零，即 $A^*=0$，故 $r(A^*)=0$。

### 5.4 乘积伴随矩阵的证明

原稿以 $A,B$ 可逆为条件。利用逆矩阵公式，

$$
\begin{aligned}
(AB)^*&=\det(AB)(AB)^{-1}\\
&=(\det A)(\det B)B^{-1}A^{-1}\\
&=((\det B)B^{-1})((\det A)A^{-1})=B^*A^*.
\end{aligned}
$$

## 6. 逆矩阵之和的可逆性（原第 36 页）

设 $A,B,A+B$ 均为 $n$ 阶可逆矩阵，证明 $A^{-1}+B^{-1}$ 可逆并求其逆。

矩阵加减一般不能直接套用乘法的求逆规律，先作因式分解：

$$
\begin{aligned}
A^{-1}+B^{-1}
&=B^{-1}BA^{-1}+B^{-1}AA^{-1}\\
&=B^{-1}(A+B)A^{-1}.
\end{aligned}
$$

其行列式为

$$
\det(A^{-1}+B^{-1})=(\det B)^{-1}\det(A+B)(\det A)^{-1}\neq 0.
$$

因此

$$
(A^{-1}+B^{-1})^{-1}=A(A+B)^{-1}B.
$$

## 7. 代数余子式条件下求行列式（原第 37 页，例 10 之前）

原稿题记“P80 T15”：设非零三阶矩阵 $A=(a_{ij})$ 满足

$$
a_{ij}+A_{ij}=0\quad(1\leq i,j\leq 3),
$$

求 $\det A$，其中 $A_{ij}$ 为代数余子式。

由条件 $A^*=-A^{\mathsf T}$，取行列式得

$$
(\det A)^2=\det A^*=\det(-A^{\mathsf T})=-\det A.
$$

所以 $\det A=0$ 或 $\det A=-1$。若 $A$ 为实矩阵，由 $A\neq 0$ 可选一非零行，第 $i$ 行展开给出

$$
\det A=\sum_{j=1}^{3}a_{ij}A_{ij}
=-\sum_{j=1}^{3}a_{ij}^2<0.
$$

因此 $\det A=-1$。

整理补充：事实上在复数域仍可利用秩排除零行列式。若 $\det A=0$，则 $r(A^*)=r(A)$（因 $A^*=-A^{\mathsf T}$）；而三阶伴随矩阵的秩分类表明，$r(A)=2$ 时左侧为 $1$，$r(A)=1$ 时左侧为 $0$，均矛盾。故非零 $A$ 必可逆，仍有 $\det A=-1$。这样可不依赖平方和证明。

## 手写原稿

[查看手写原稿（note_linalg_6.pdf，共 5 页）](/notes/linalg_notes/linalg_hand_note/note_linalg_6.pdf)
