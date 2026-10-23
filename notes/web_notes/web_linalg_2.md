---
# 必填：填写笔记标题，会显示在网站列表和文章页面。
title: "线性代数：行最简矩阵与行列式性质"

# 必填：用一两句话概括笔记内容。
description: "化简成行最简矩阵并学会行列式基本性质"

# 必填：填写实际发布时间，+08:00 表示北京时间。保持此格式，不加引号。
# 未来时间的笔记暂时隐藏，到时需重新构建发布。
pubDatetime: 2026-10-23T09:02:00+08:00

# 可选：填写分类标签，多个标签用英文逗号分隔。
tags: [学习记录, 课程笔记]

# true 表示草稿，false 表示允许发布。
draft: false

# 可选：是否在首页推荐，true 为推荐，false 为不推荐。
featured: false

# 可选：更新笔记后，可取消下一行的注释并填写实际修改时间。
# modDatetime: 2026-10-22T12:00:00+08:00
---

# 线性代数：行最简形矩阵与行列式的性质

> 来源：`线性代数10.22.pdf` 的 PDF 第 9～14 页（按文件页序）。同名原稿 `note_linalg_2.pdf` 为这六页的摘录，其第 1～6 页对应完整原稿第 9～14 页。正文按原稿顺序整理，已修正公式与记号错误并补全适用条件；原稿中的模糊字迹已按确认内容和核算结果定稿。

## 1. 行阶梯形与行最简形矩阵（原第 9 页）

### 1.1 行阶梯形矩阵

非零行中从左到右第一个非零元素称为该行的主元。行阶梯形矩阵满足：

1. 所有零行位于非零行下方。
2. 每行主元所在列的下方元素全为零。
3. 从上到下，各非零行主元的列标严格递增，形成阶梯形。

例如：

$$
\begin{pmatrix}
2&1&3&4\\
0&5&6&7\\
0&0&0&0
\end{pmatrix}.
$$

主元为第一行的 $2$、第二行的 $5$。原稿以圆圈和箭头标出这两个“阶梯头”。

### 1.2 行最简形矩阵

行最简形矩阵（原稿亦注“简化”）满足：

1. 所有零行位于非零行下方。
2. 每个非零行的主元为 $1$。
3. 每个主元所在列，除该主元外的元素全为零。
4. 从上到下，主元的列标严格递增。

例如：

$$
\begin{pmatrix}
1&2&0&1&3\\
0&0&1&4&5\\
0&0&0&0&0
\end{pmatrix}.
$$

主元位于第 $1,3$ 列；不要求相邻主元出现在相邻列。原稿旁注：“阶梯头会错位”，即主元之间可以跳过非主元列。

### 1.3 含自由变量的方程组

$$
\begin{cases}
x_1+x_3-x_4-3x_5=-2,\\
x_1+2x_2-x_3-x_5=1,\\
4x_1+6x_2-2x_3-4x_4+3x_5=7,\\
2x_1-2x_2+4x_3-7x_4+4x_5=1.
\end{cases}
$$

原稿只列出方程组与通解，以下消元链为整理补充。箭头简记沿用：交换为 $R_{ij}$、$C_{ij}$，倍乘为 $cR_i$，倍加为 $R_i+cR_j$；同一箭头内按从上到下的顺序执行。

$$
\begin{aligned}
&\left(\begin{array}{rrrrr|r}
1&0&1&-1&-3&-2\\
1&2&-1&0&-1&1\\
4&6&-2&-4&3&7\\
2&-2&4&-7&4&1
\end{array}\right)
\xrightarrow{\substack{
R_2-R_1\\
R_3-4R_1\\
R_4-2R_1
}}
\left(\begin{array}{rrrrr|r}
1&0&1&-1&-3&-2\\
0&2&-2&1&2&3\\
0&6&-6&0&15&15\\
0&-2&2&-5&10&5
\end{array}\right)
\\[1.5em]
&\xrightarrow{\substack{
\frac12R_2\\
R_3-6R_2\\
R_4+2R_2
}}
\left(\begin{array}{rrrrr|r}
1&0&1&-1&-3&-2\\
0&1&-1&\frac{1}{2}&1&\frac{3}{2}\\
0&0&0&-3&9&6\\
0&0&0&-4&12&8
\end{array}\right)
\xrightarrow{\substack{
-\frac13R_3\\
R_4+4R_3
}}
\left(\begin{array}{rrrrr|r}
1&0&1&-1&-3&-2\\
0&1&-1&\frac{1}{2}&1&\frac{3}{2}\\
0&0&0&1&-3&-2\\
0&0&0&0&0&0
\end{array}\right)
\\[1.5em]
&\xrightarrow{\substack{
R_1+R_3\\
R_2-\frac12R_3
}}
\left(\begin{array}{rrrrr|r}
1&0&1&0&-6&-4\\
0&1&-1&0&\frac{5}{2}&\frac{5}{2}\\
0&0&0&1&-3&-2\\
0&0&0&0&0&0
\end{array}\right)
\end{aligned}
$$

取自由变量 $x_3=c_1$、$x_5=c_2$，可写为

$$
\begin{cases}
x_1=-4-c_1+6c_2,\\
x_2=\frac52+c_1-\frac52c_2,\\
x_3=c_1,\\
x_4=-2+3c_2,\\
x_5=c_2,
\end{cases}
\qquad c_1,c_2\in\mathbb R.
$$

因此，方程组有无穷多解。

## 2. 增广矩阵消元与通解（原第 10 页）

原稿给出的是四个方程、四个未知数的增广矩阵。将零行保留在底部，整理为连续变换链：

$$
\begin{aligned}
&\left(\begin{array}{rrrr|r}
1&2&5&-1&-1\\
1&2&-2&1&3\\
3&6&8&-1&1\\
5&10&11&-1&3
\end{array}\right)
\xrightarrow{\substack{
R_2-R_1\\
R_3-3R_1\\
R_4-5R_1
}}
\left(\begin{array}{rrrr|r}
1&2&5&-1&-1\\
0&0&-7&2&4\\
0&0&-7&2&4\\
0&0&-14&4&8
\end{array}\right)
\\[1.5em]
&\xrightarrow{\substack{
R_3-R_2\\
R_4-2R_2
}}
\left(\begin{array}{rrrr|r}
1&2&5&-1&-1\\
0&0&-7&2&4\\
0&0&0&0&0\\
0&0&0&0&0
\end{array}\right)
\xrightarrow{R_1+\frac57R_2}
\left(\begin{array}{rrrr|r}
1&2&0&\frac{3}{7}&\frac{13}{7}\\
0&0&-7&2&4\\
0&0&0&0&0\\
0&0&0&0&0
\end{array}\right)
\\[1.5em]
&\xrightarrow{-\frac17R_2}
\left(\begin{array}{rrrr|r}
1&2&0&\frac{3}{7}&\frac{13}{7}\\
0&0&1&-\frac{2}{7}&-\frac{4}{7}\\
0&0&0&0&0\\
0&0&0&0&0
\end{array}\right)
\end{aligned}
$$

$$
\begin{cases}
x_1=\frac{13}{7}-2c_1-\frac37c_2,\\
x_2=c_1,\\
x_3=-\frac47+\frac27c_2,\\
x_4=c_2,
\end{cases}
\qquad c_1,c_2\in\mathbb R.
$$

这里的主元列为第 $1,3$ 列，自由变量为 $x_2,x_4$。

## 3. 矩阵、分块矩阵与增广矩阵（原第 11 页）

### 3.1 矩阵的类型与记号

记 $A_{m\times n}$ 为 $m$ 行、$n$ 列的矩阵。

- **实矩阵：** 全部元素为实数。
- **$n$ 阶方阵：** 行数、列数都为 $n$，记为 $A_{n\times n}$。
- **零矩阵：** 全部元素为零。

设 $P$ 为一个数域，例如 $\mathbb R$ 或 $\mathbb Q$，则

$$
P^{m\times n}
=\left\{A=(a_{ij})_{m\times n}\;\middle|\;
 a_{ij}\in P,\ 1\leq i\leq m,\ 1\leq j\leq n\right\}.
$$

### 3.2 分块矩阵

将矩阵按行、列划分成若干子矩阵，可以写成

$$
A=\begin{pmatrix}
A_{11}&A_{12}\\
A_{21}&A_{22}
\end{pmatrix}.
$$

原稿的具体例子按分块边界整理为

$$
A=\left(\begin{array}{cc|ccc}
0&1&1&1&0\\
1&0&1&2&0\\\hline
0&2&1&2&2\\
3&1&2&3&1
\end{array}\right),
$$

其中

$$
\begin{aligned}
A_{11}&=\begin{pmatrix}0&1\\1&0\end{pmatrix},
&A_{12}&=\begin{pmatrix}1&1&0\\1&2&0\end{pmatrix},\\[0.7em]
A_{21}&=\begin{pmatrix}0&2\\3&1\end{pmatrix},
&A_{22}&=\begin{pmatrix}1&2&2\\2&3&1\end{pmatrix}.
\end{aligned}
$$

### 3.3 系数矩阵与增广矩阵

方程组各未知数的系数构成系数矩阵 $A$；在其右侧增加常数项列 $b$，形成增广矩阵 $\bar A$：

$$
A=(a_{ij})_{m\times n},
\qquad
\bar A=\left(\begin{array}{ccc|c}
a_{11}&\cdots&a_{1n}&b_1\\
\vdots&&\vdots&\vdots\\
a_{m1}&\cdots&a_{mn}&b_m
\end{array}\right).
$$

## 4. 三角行列式、转置与基本性质（原第 12 页）

### 4.1 上三角与下三角行列式

上三角、下三角行列式都等于主对角线元素的乘积：

$$
\begin{aligned}
\begin{vmatrix}
a_{11}&a_{12}&\cdots&a_{1n}\\
0&a_{22}&\cdots&a_{2n}\\
\vdots&\ddots&\ddots&\vdots\\
0&\cdots&0&a_{nn}
\end{vmatrix}
&=\prod_{i=1}^{n}a_{ii},\\[1em]
\begin{vmatrix}
a_{11}&0&\cdots&0\\
a_{21}&a_{22}&\ddots&\vdots\\
\vdots&\vdots&\ddots&0\\
a_{n1}&a_{n2}&\cdots&a_{nn}
\end{vmatrix}
&=\prod_{i=1}^{n}a_{ii}.
\end{aligned}
$$

### 4.2 行标、列标与展开式符号

固定任意一个行标排列 $(i_1,\ldots,i_n)$，让列标排列 $(j_1,\ldots,j_n)$ 遍历全部排列，有

$$
\det A=
\sum_{(j_1,\ldots,j_n)}
(-1)^{\tau(i_1,\ldots,i_n)+\tau(j_1,\ldots,j_n)}
a_{i_1j_1}\cdots a_{i_nj_n}.
$$

其中 $\tau$ 表示排列的逆序数。这是前篇固定标准行标的展开式的一般写法。

### 4.3 转置不改变行列式

将矩阵的行、列互换得到转置矩阵 $A^{\mathsf T}$，并且

$$
\begin{aligned}
A&=\begin{pmatrix}
a_{11}&a_{12}&a_{13}\\a_{21}&a_{22}&a_{23}\\a_{31}&a_{32}&a_{33}
\end{pmatrix},\\[0.7em]
A^{\mathsf T}&=\begin{pmatrix}
a_{11}&a_{21}&a_{31}\\a_{12}&a_{22}&a_{32}\\a_{13}&a_{23}&a_{33}
\end{pmatrix},
\qquad \det A^{\mathsf T}=\det A.
\end{aligned}
$$

### 4.4 交换两行（列）改变符号

若 $B$ 是由 $A$ 交换两行得到的矩阵，则 $\det B=-\det A$；交换两列也同理。

$$
\begin{vmatrix}a_{11}&a_{12}\\a_{21}&a_{22}\end{vmatrix}
\xrightarrow{R_{12}}
-\begin{vmatrix}a_{21}&a_{22}\\a_{11}&a_{12}\end{vmatrix}.
$$

**推论：** 若行列式中有两行（列）对应元素相同，则行列式为零。

证明：交换这两行，元素排列与原来完全相同，但行列式变号，故 $D=-D$，从而 $D=0$。原稿讨论实数或有理数情形。

### 4.5 一行（列）的公因子可以提出

$$
\begin{vmatrix}
a_{11}&\cdots&a_{1n}\\
c a_{21}&\cdots&c a_{2n}\\
\vdots&&\vdots\\
a_{n1}&\cdots&a_{nn}
\end{vmatrix}
=c\begin{vmatrix}
a_{11}&\cdots&a_{1n}\\
a_{21}&\cdots&a_{2n}\\
\vdots&&\vdots\\
a_{n1}&\cdots&a_{nn}
\end{vmatrix}.
$$

结合上一推论，若两行（列）成比例，则行列式为零。若一行（列）全零，行列式也为零。

## 5. 行列式的拆分、倍加与计算（原第 13 页）

### 5.1 按一行（列）拆分

若某一行的每个元素都是两项之和，可以将该行拆开：

$$
\begin{aligned}
&\begin{vmatrix}
a_{11}+b_{11}&a_{12}+b_{12}&a_{13}+b_{13}\\
a_{21}&a_{22}&a_{23}\\a_{31}&a_{32}&a_{33}
\end{vmatrix}\\[0.7em]
={}&\begin{vmatrix}
a_{11}&a_{12}&a_{13}\\a_{21}&a_{22}&a_{23}\\a_{31}&a_{32}&a_{33}
\end{vmatrix}
+\begin{vmatrix}
b_{11}&b_{12}&b_{13}\\a_{21}&a_{22}&a_{23}\\a_{31}&a_{32}&a_{33}
\end{vmatrix}.
\end{aligned}
$$

列的拆分同理。

### 5.2 倍加不改变行列式

将某一行的 $k$ 倍加到另一行，行列式不变；对列也成立。例如：

$$
\begin{vmatrix}
a_{11}&a_{12}&a_{13}\\a_{21}&a_{22}&a_{23}\\a_{31}&a_{32}&a_{33}
\end{vmatrix}
\xrightarrow{R_2+kR_1}
\begin{vmatrix}
a_{11}&a_{12}&a_{13}\\
a_{21}+ka_{11}&a_{22}+ka_{12}&a_{23}+ka_{13}\\
a_{31}&a_{32}&a_{33}
\end{vmatrix}.
$$

若 $a_{11}\neq 0$，取 $k=-a_{21}/a_{11}$，可以把第二行第一列消为零。若 $a_{11}=0$，应另选非零主元，不能直接作此除法。

### 5.3 四阶行列式例题

$$
\begin{aligned}
&D=\begin{vmatrix}
3&1&-1&2\\
-5&1&3&-4\\
2&0&1&-1\\
1&-5&3&-3
\end{vmatrix}
\xrightarrow{C_{12}}
-\begin{vmatrix}
1&3&-1&2\\
1&-5&3&-4\\
0&2&1&-1\\
-5&1&3&-3
\end{vmatrix}
\\[1.5em]
&\xrightarrow{\substack{
R_2-R_1\\
R_4+5R_1
}}
-\begin{vmatrix}
1&3&-1&2\\
0&-8&4&-6\\
0&2&1&-1\\
0&16&-2&7
\end{vmatrix}
\xrightarrow{\substack{
\frac12R_2\\
2R_3\\
R_3+R_2\\
R_4+4R_2
}}
-\begin{vmatrix}
1&3&-1&2\\
0&-4&2&-3\\
0&0&4&-5\\
0&0&6&-5
\end{vmatrix}
\\[1.5em]
&\xrightarrow{R_4-\frac32R_3}
-\begin{vmatrix}
1&3&-1&2\\
0&-4&2&-3\\
0&0&4&-5\\
0&0&0&\frac{5}{2}
\end{vmatrix}
\\[1em]
&=-1\times(-4)\times4\times\frac52=40.
\end{aligned}
$$

其中 $\frac12R_2$ 与 $2R_3$ 的倍乘因子乘积为 $1$，因此这一组操作整体不改变行列式。其余行倍加也不改变值，交换列的负号已保留在式外。原稿省略的操作标记已按前后数值补全。

## 6. 利用列变换证明整除性（原第 14 页）

已知五个数 $18055$、$83283$、$61042$、$48576$、$57776$ 都能被 $23$ 整除，证明

$$
D=\begin{vmatrix}
1&8&0&5&5\\
8&3&2&8&3\\
6&1&0&4&2\\
4&8&5&7&6\\
5&7&7&7&6
\end{vmatrix}
$$

也能被 $23$ 整除。

按原稿的位值箭头，将前四列乘以相应的十进制位权，加到第五列：

$$
\begin{aligned}
D={}&\begin{vmatrix}
1&8&0&5&5\\8&3&2&8&3\\6&1&0&4&2\\4&8&5&7&6\\5&7&7&7&6
\end{vmatrix}\\[0.7em]
&\xrightarrow{\substack{
C_5+10C_4\\C_5+100C_3\\C_5+1000C_2\\C_5+10000C_1
}}
\begin{vmatrix}
1&8&0&5&18055\\8&3&2&8&83283\\6&1&0&4&61042\\4&8&5&7&48576\\5&7&7&7&57776
\end{vmatrix}\\[0.7em]
={}&23\begin{vmatrix}
1&8&0&5&785\\8&3&2&8&3621\\6&1&0&4&2654\\4&8&5&7&2112\\5&7&7&7&2512
\end{vmatrix}.
\end{aligned}
$$

最后一个行列式的元素均为整数，所以 $23\mid D$。此处将原稿仅用蓝色位值箭头提示的证明补写完整。

## 手写原稿

[查看同名手写原稿（note_linalg_2.pdf，共 6 页）](/notes/note/handwrite_notes/note_linalg_2.pdf)

摘录保留了原稿的主元圆圈、阶梯示意、分块布局、位值箭头、颜色及涂改。本文“原第 9～14 页”分别对应摘录 PDF 第 1～6 页。
