# 24-25 线性代数期中第 13、14 题修订解答

用于替换 `test/linalg_test/24-25线性代数真题.pdf` 及站内阅读页对应的两题答案。以下采用对话中核算的初等变换解法；其他题目的解答与原资料来源、许可保持保留。

## 第 13 题：两组行作差计算行列式

**思路。** 第一、二行只有前两列不同，第三、四行只有后两列不同，分别相减可以产生零。

先作 $R_1-R_2$、$R_3-R_4$：

$$
\begin{aligned}
D&=\begin{vmatrix}
1+x&1&1&1\\1&1-x&1&1\\1&1&1+y&1\\1&1&1&1-y
\end{vmatrix}
\xrightarrow{\substack{R_1-R_2\\R_3-R_4}}
\begin{vmatrix}
x&x&0&0\\1&1-x&1&1\\0&0&y&y\\1&1&1&1-y
\end{vmatrix}.
\end{aligned}
$$

从第一行提出 $x$、第三行提出 $y$，再作 $C_2-C_1$、$C_4-C_3$：

$$
\begin{aligned}
D&=xy\begin{vmatrix}
1&1&0&0\\1&1-x&1&1\\0&0&1&1\\1&1&1&1-y
\end{vmatrix}
\xrightarrow{\substack{C_2-C_1\\C_4-C_3}}
xy\begin{vmatrix}
1&0&0&0\\1&-x&1&0\\0&0&1&0\\1&0&1&-y
\end{vmatrix}.
\end{aligned}
$$

按第一行展开，再按剩余行列式的最后一列展开：

$$
\begin{aligned}
D&=xy\begin{vmatrix}-x&1&0\\0&1&0\\0&1&-y\end{vmatrix}
=xy(-y)\begin{vmatrix}-x&1\\0&1\end{vmatrix}\\[1mm]
&=xy(-y)(-x)=\boxed{x^2y^2}.
\end{aligned}
$$

**说明。** 全程只用行列式的初等变换、提取公因子和按行列展开；$x=0$ 或 $y=0$ 时推导也成立。

## 第 14 题：列求和与相邻列作差

**思路。** 每行都是 $1,2,\ldots,n$ 的循环排列。先利用每行的和相等，再作差，让大部分元素变成零。下面按 $n\geq 3$ 推导。

**第一步：其余列加到第一列。** 记 $S=1+2+\cdots+n=n(n+1)/2$。作 $C_1+C_2+\cdots+C_n$，再从第一列提出 $S$，得

$$
D_n=\begin{vmatrix}
1&2&3&\cdots&n\\2&3&4&\cdots&1\\\vdots&\vdots&\vdots&&\vdots\\n&1&2&\cdots&n-1
\end{vmatrix}
=S\begin{vmatrix}
1&2&3&\cdots&n\\1&3&4&\cdots&1\\\vdots&\vdots&\vdots&&\vdots\\1&1&2&\cdots&n-1
\end{vmatrix}.
$$

**第二步：其余各行减第一行。** 作 $R_i-R_1\ (i=2,\ldots,n)$，第一列变为 $(1,0,\ldots,0)^{\mathsf T}$。按第一列展开，记剩余的 $n-1$ 阶行列式为 $|B|$，则 $D_n=S|B|$。$B$ 的第 $r$ 行为

$$
\left(\underbrace{r,\ldots,r}_{n-1-r\text{ 个}},\quad
\underbrace{r-n,\ldots,r-n}_{r\text{ 个}}\right),\qquad r=1,\ldots,n-1.
$$

**第三步：相邻两列作差。** 在 $B$ 中，**从左到右**依次作 $C_j-C_{j+1}\ (j=1,\ldots,n-2)$。相同的数相减为零，只有从 $r$ 跳到 $r-n$ 的位置留下 $n$。例如 $n=4$ 时，

$$
B=\begin{pmatrix}1&1&-3\\2&-2&-2\\-1&-1&-1\end{pmatrix}
\xrightarrow{\substack{C_1-C_2\\C_2-C_3}}
\begin{pmatrix}0&4&-3\\4&0&-2\\0&0&-1\end{pmatrix}.
$$

一般情况下，前 $n-2$ 列中的 $n$ 排在前 $n-2$ 行的反对角线上，末行仅余末项 $-1$。把这 $n-2$ 列倒序，共需 $(n-2)(n-3)/2$ 次列交换；此时得到上三角矩阵，主对角元是 $n,\ldots,n,-1$。所以

$$
\begin{aligned}
|B|&=(-1)^{\frac{(n-2)(n-3)}2}\,n^{n-2}(-1),\\[1mm]
D_n&=\frac{n(n+1)}2\,(-1)^{1+\frac{(n-2)(n-3)}2}n^{n-2}\\[1mm]
&=\boxed{(-1)^{\frac{n(n-1)}2}\,\frac{n^{n-1}(n+1)}2}.
\end{aligned}
$$

最后两个符号指数相差 $2n-4$，是偶数，故符号相同。$n=1,2$ 时直接算得 $1,-3$，也符合此公式。
