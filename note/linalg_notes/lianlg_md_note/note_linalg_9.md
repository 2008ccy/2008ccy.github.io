---
title: 线性代数：向量的线性表示与线性相关
description: 向量的线性表示与线性相关的定义、定理、证明和原稿例题，附逐页手写原稿。
tags: [线性代数, 课程笔记]
draft: true
---

# **线性代数：向量的线性表示与线性相关**

> 来源：Goodnotes“线性代数”原第 50～54 页（按笔记文件页序，含首尾）。日期导出 `线性代数11.13.pdf` 第 5～9 页对应本篇；配套 `note_linalg_9.pdf` 第 1～5 页依次对应原第 50～54 页。原稿略写处的证明、构造或计算已明确标作整理补充。

## **1. 线性方程组的秩判别（原第 50 页）**

设有 $m$ 个方程、$n$ 个未知数的线性方程组

$$
\begin{cases}
a_{11}x_1+\cdots+a_{1n}x_n=b_1,\\
\vdots\\
a_{m1}x_1+\cdots+a_{mn}x_n=b_m.
\end{cases}
$$

记系数矩阵为 $A$，右端列向量为 $b$，增广矩阵为 $\overline A=(A\ b)$，则

- $r(A)\neq r(\overline A)$：无解。
- $r(A)=r(\overline A)=r$：有解；$r=n$ 时唯一解，$r<n$ 时有 $n-r$ 个自由未知量。
- 在数域 $P$ 上，后一种情形有无穷多解。

### **1.1 按行分块理解方程**

增广矩阵的第 $i$ 行为

$$
\rho_i=(a_{i1},\ldots,a_{in},b_i).
$$

若某行 $\rho_m$ 是其余行的线性组合，例如 $\rho_m=t_1\rho_1+\cdots+t_{m-1}\rho_{m-1}$，则相应的方程是前面方程的线性组合。这里必须把右端常数也包括在行向量内，不能只比较系数而忽略常数。

## **2. 按列分块与线性组合（原第 51 页）**

记 $A$ 的列为

$$
\beta_j=\begin{pmatrix}a_{1j}\\\vdots\\a_{mj}\end{pmatrix}
\quad(1\leq j\leq n),\qquad
b=\begin{pmatrix}b_1\\\vdots\\b_m\end{pmatrix}.
$$

则 $Ax=b$ 等价于

$$
b=x_1\beta_1+\cdots+x_n\beta_n.
$$

表达式 $t_1\beta_1+\cdots+t_n\beta_n$ 称为这些向量的线性组合。若存在标量 $t_1,\ldots,t_n$ 使

$$
b=t_1\beta_1+\cdots+t_n\beta_n,
$$

则称 $b$ 可由 $\beta_1,\ldots,\beta_n$ 线性表示，$(t_1,\ldots,t_n)$ 称为一组表示系数。

特别地，零向量总可表示为 $0\beta_1+\cdots+0\beta_n$；它也可能有非零系数组成的表示。

## **3. 线性相关与线性无关（原第 51～52 页）**

若存在**不全为零**的 $t_1,\ldots,t_n$，使

$$
t_1\beta_1+\cdots+t_n\beta_n=0,
$$

则称向量组线性相关。若上述等式只能在 $t_1=\cdots=t_n=0$ 时成立，则称线性无关。

把这些列排成 $A=(\beta_1\ \cdots\ \beta_n)$，则

$$
\begin{aligned}
b\text{ 可线性表示}
&\iff Ax=b\text{ 有解}\\
&\iff r(A)=r(A\ b),\\
\beta_1,\ldots,\beta_n\text{ 线性相关}
&\iff Ax=0\text{ 有非零解}\\
&\iff r(A)<n,\\
\beta_1,\ldots,\beta_n\text{ 线性无关}
&\iff r(A)=n.
\end{aligned}
$$

**零向量的表示：** 向量组线性无关，当且仅当零向量只有全零系数这一种表示。

### **3.1 一般向量表示的唯一性**

在 $b$ **已经可以表示**的前提下：

- $r(A)=n$ 时，$b$ 的表示唯一。
- $r(A)<n$ 时，$b$ 有无穷多组表示系数。

后一条可由“一个特解加上齐次方程的任意解”得到。若 $b$ 不能表示，则没有表示系数，不能称其为“有无穷多种表示”。

> **Q1 · 条件补全（原第 52 页）：** 手稿把 $r<n$ 与“无穷多表示”并列，须保留前面的有解条件 $r(A)=r(A\ b)$。正文明确限定为已经可以表示的 $b$。

## **4. 相关性的基本性质及证明（原第 53 页）**

### **4.1 部分相关，整体相关**

若 $\alpha_1,\ldots,\alpha_r$ 相关，则在加入 $\alpha_{r+1},\ldots,\alpha_n$ 后仍相关。

证明：取不全为零的 $k_1,\ldots,k_r$ 使

$$
k_1\alpha_1+\cdots+k_r\alpha_r=0.
$$

补上其余系数 $0$，便得到整个向量组的一个非零系数关系。

### **4.2 整体无关，部分无关**

这是上一命题的逆否命题。否则部分相关将推出整体相关，矛盾。

### **4.3 含零向量的向量组相关**

对零向量取系数 $1$、其余向量取系数 $0$，线性组合即为零，系数不全为零。

### **4.4 单向量组**

只有一个向量的向量组 $(\alpha)$ 相关，当且仅当 $\alpha=0$；无关，当且仅当 $\alpha\neq 0$。

证明：$\alpha=0$ 时 $1\alpha=0$；反之若 $k\alpha=0$ 且 $k\neq 0$，在数域中除以 $k$ 得 $\alpha=0$。

## **5. 接长与截短向量（原第 54 页）**

接长是对同一向量组中的每个向量增加相同个数的分量；截短则删去同样位置的分量。

### **5.1 无关向量接长后仍无关**

原稿例子：

$$
\alpha_1=\begin{pmatrix}1\\0\end{pmatrix},\quad
\alpha_2=\begin{pmatrix}0\\1\end{pmatrix};\qquad
\widetilde\alpha_1=\begin{pmatrix}3\\1\\0\end{pmatrix},\quad
\widetilde\alpha_2=\begin{pmatrix}8\\0\\1\end{pmatrix}.
$$

原来的两个分量仍保留在接长后的后两行，所以原组无关时，新组也无关。

**整理补充证明：** 若接长后的向量有一个非零系数关系，把新增分量删去，就得到原组的同一个非零系数关系，与原组无关矛盾。

### **5.2 相关向量接长后未必相关**

$$
\alpha_1=\begin{pmatrix}1\\2\end{pmatrix},\quad
\alpha_2=\begin{pmatrix}3\\6\end{pmatrix}
$$

原组相关；但

$$
\widetilde\alpha_1=\begin{pmatrix}1\\2\\5\end{pmatrix},\quad
\widetilde\alpha_2=\begin{pmatrix}3\\6\\0\end{pmatrix}
$$

无关：第三个分量先推出第一系数为零，再由非零的第二向量推出第二系数为零。

### **5.3 相关组截短后仍相关**

原组的非零系数关系在删去分量后仍成立。反过来，无关组截短后可能变为相关组。

## **6. 补充向量使向量组的秩为 3（原第 54 页下部）**

原稿给出

$$
\alpha_1=(1,1,-1,-1)^{\mathsf T},\qquad
\alpha_2=(1,2,0,3)^{\mathsf T},
$$

要求找到 $\alpha_3,\alpha_4$ 使 $r(\alpha_1\ \alpha_2\ \alpha_3\ \alpha_4)=3$，尚未写出具体选取。

**整理补充的一组答案：** 取

$$
\alpha_3=(0,0,1,0)^{\mathsf T},\qquad
\alpha_4=\alpha_1+\alpha_2=(2,3,-1,2)^{\mathsf T}.
$$

前三个向量的前三行构成的三阶子式为

$$
\begin{vmatrix}1&1&0\\1&2&0\\-1&0&1\end{vmatrix}=1\neq 0,
$$

故前三列无关，第四列又在前两列的张成中，整个向量组的秩恰为 $3$。上述构造已用精确分数消元核验。

## **手写原稿**

[在本站阅读手写原稿（对应原第 50～54 页，共 5 页）](/notes/read/linalg_notes/linalg_hand_note/note_linalg_9/)
