# 2025-2026 春夏线性代数（甲）期中参考解析

原卷：浙江大学 2025-2026 学年春夏学期《线性代数（甲）》期中考试，2026 年 4 月 26 日。原卷共 3 页，保留上传文件中的手写批注；本解析附于原卷之后。

上传源文件 SHA-256：`119af1312b936593d9cd2d79708a44be301cf46a6842bd5e3aa90ace93c27945`。发布合并稿为 `test/linalg_test/linear-algebra-midterm-2025-2026-spring-summer.pdf`；重新排版时可从合并稿取前 3 页恢复原卷。

以下为结合个人课程笔记、原卷批注独立核算的非官方参考解析。第 1 题题面存在矛盾，第 6、8 题须注意适用条件。

整理依据：`note/linalg_notes/linalg_web_note/线性代数-理解秩.md`、`web_linalg_5.md`（行列式与迹）、`web_linalg_6.md`（伴随矩阵）、`web_linalg_7.md`（分块矩阵）。

## 第 1 题：秩条件与题面矛盾

**题目。** 实矩阵 $A$ 为 $4\times2$，题面称 $AA^T$ 的四行为

$$
M=\begin{pmatrix}
1&-1&1&2\\
1&0&a&b\\
2&-1&c&d\\
-1&2&0&-1
\end{pmatrix}.
$$

求 $r(A)$、$r(AA^T)$、$(a,b)$、$(c,d)$。

**严格结论：不存在满足原题的实矩阵 $A$。** 对任意实矩阵，$AA^T$ 必为对称半正定矩阵。然而题面 $M_{12}=-1\ne1=M_{21}$，且 $M_{44}=-1<0$。这两个矛盾与 $a,b,c,d$ 无关，故原题不能按字面成立。

**若仅按秩条件理解命题意图。** 由于 $A$ 只有两列，必有 $r(AA^T)\le2$；$M$ 左上角二阶子式为 $1$，故若仅要求 $r(M)\le2$，则 $r(M)=2$。行变换得到

$$
M\sim\begin{pmatrix}
1&-1&1&2\\
0&1&1&1\\
0&0&a-2&b-3\\
0&0&c-3&d-5
\end{pmatrix}.
$$

秩为 $2$ 要求后两行全零，得到 $a=2,b=3,c=3,d=5$。又实矩阵满足 $r(AA^T)=r(A)$，故原卷批注所给的候选填空为

$$
\boxed{2,\quad2,\quad(2,3),\quad(3,5)}.
$$

**注意。** 这组数仅满足上述秩条件，仍不能使 $M$ 成为 $AA^T$，不可当作原题有解的证明。题面尚未核实，应同时保留这一说明。

## 第 2 题：与不同对角元的对角矩阵交换

**题目。** $A=\operatorname{diag}(1,2,\ldots,n)$，求实数域上所有满足 $AX=XA$ 的矩阵组成的集合 $V$。

**答案。**

$$
\boxed{V=\{\operatorname{diag}(t_1,\ldots,t_n):t_1,\ldots,t_n\in\mathbb R\}}.
$$

**推导。** 设 $X=(x_{ij})_{n\times n}$。左乘对角矩阵按行缩放，右乘按列缩放，因此

$$
(AX)_{ij}=i\,x_{ij},\qquad(XA)_{ij}=j\,x_{ij}.
$$

交换条件等价于

$$
(i-j)x_{ij}=0\qquad(1\le i,j\le n).
$$

当 $i\ne j$ 时，$i-j\ne0$，所以 $x_{ij}=0$；当 $i=j$ 时不产生限制。因此 $X$ 必为任意实对角矩阵。反之，任意两个同阶对角矩阵均可交换，故上述集合恰为全部解。

**知识点。** $V$ 是 $n$ 维线性空间，可取 $E_{11},E_{22},\ldots,E_{nn}$ 为一组基。

**易错点。** 结论依赖 $A$ 的对角元两两不同。若有重复对角元，则相应位置可以形成非对角的交换子块。

## 第 3 题：分块求逆、行列式与特征向量

**题目。**

$$
A=\begin{pmatrix}1&0&25&8\\1&1&2&2\\0&0&4&3\\0&0&3&4\end{pmatrix}.
$$

求 $A^{-1}$、$|A|$，以及满足 $A\alpha=\alpha$ 的非零向量。

**答案。**

$$
\boxed{A^{-1}=\frac17\begin{pmatrix}
7&0&-76&43\\-7&7&74&-45\\0&0&4&-3\\0&0&-3&4
\end{pmatrix}},\qquad\boxed{|A|=7},
$$

$$
\boxed{\alpha=t(0,1,0,0)^T,\quad t\in\mathbb R\setminus\{0\}}.
$$

**分块求逆。** 写成 $A=\begin{pmatrix}P&Q\\0&R\end{pmatrix}$，其中

$$
P=\begin{pmatrix}1&0\\1&1\end{pmatrix},\quad
Q=\begin{pmatrix}25&8\\2&2\end{pmatrix},\quad
R=\begin{pmatrix}4&3\\3&4\end{pmatrix}.
$$

由 $|P|=1,|R|=7$，得 $|A|=7$，且

$$
P^{-1}=\begin{pmatrix}1&0\\-1&1\end{pmatrix},\quad
R^{-1}=\frac17\begin{pmatrix}4&-3\\-3&4\end{pmatrix},
$$

$$
A^{-1}=\begin{pmatrix}P^{-1}&-P^{-1}QR^{-1}\\0&R^{-1}\end{pmatrix},\quad
-P^{-1}QR^{-1}=\frac17\begin{pmatrix}-76&43\\74&-45\end{pmatrix}.
$$

**求向量。** 令 $\alpha=(x_1,x_2,x_3,x_4)^T$，则 $(A-I)\alpha=0$ 给出 $x_3+x_4=0$、$25x_3+8x_4=0$，故 $x_3=x_4=0$，再由第二行得 $x_1=0$。$x_2$ 任取非零实数即可。

**易错点。** 右上逆块须保持乘法次序；$\alpha$ 是一族非零向量，不能包含零向量。

## 第 4 题：向量的线性表示

**题目。** 已知

$$
\alpha_1=\left(0,2,2,2,\frac25\right),\quad
\alpha_2=(0,5,1,5,-7),\quad
\alpha_3=(0,0,2,0,4),
$$

若 $\alpha_1=c\alpha_2+d\alpha_3$，求 $(c,d)$。

**答案。**

$$
\boxed{(c,d)=\left(\frac25,\frac45\right)}.
$$

**推导。** 按坐标比较，第二个坐标给出 $5c=2$，所以 $c=2/5$。第三个坐标给出 $c+2d=2$，所以 $d=4/5$。

不能只比较两个坐标而跳过其余条件。代回全部坐标可得

$$
\frac25\alpha_2+\frac45\alpha_3
=\left(0,2,\frac25+\frac85,2,-\frac{14}5+\frac{16}5\right)
=\left(0,2,2,2,\frac25\right)=\alpha_1.
$$

因此这组系数满足全部五个坐标，且前述两个独立方程已经唯一确定 $c,d$。

**易错点。** 第五个坐标是正的 $2/5$，不是 $2$ 或 $-2/5$；计算 $-7c+4d$ 时应保留符号。

## 第 5 题：相关列与非齐次方程组

**题目。** 非零四阶矩阵 $A=(\alpha_1\ \alpha_2\ \alpha_3\ \alpha_4)$ 满足 $\alpha_4=\alpha_1+\alpha_2-\alpha_3$。判断 $Ax=\alpha_1+3\alpha_3+\alpha_4$ 的解数，并给出一个解。

**答案。** 有**无数个解**，一个特解为

$$
\boxed{x_p=(1,0,3,1)^T}.
$$

**先证相容。** 由列向量乘法，

$$
Ax_p=\alpha_1+3\alpha_3+\alpha_4,
$$

故方程组确有解。

**再证不唯一。** 已知列关系可写成

$$
A\begin{pmatrix}1\\1\\-1\\-1\end{pmatrix}
=\alpha_1+\alpha_2-\alpha_3-\alpha_4=0.
$$

取 $v=(1,1,-1,-1)^T\ne0$，则对每个实数 $t$，

$$
A(x_p+tv)=Ax_p+tAv=\alpha_1+3\alpha_3+\alpha_4.
$$

因 $v\ne0$，不同的 $t$ 给出不同的解，故解有无数个。

**易错点。** 仅有 $|A|=0$ 还不能判断非齐次方程组有无解，必须先检查相容性。题目未说明前三列线性无关，因此不能断言 $r(A)=3$，也不能把 $x_p+tv$ 当作必然完整的通解；完整解集应写为 $x_p+\ker A$。

## 第 6 题：零角块矩阵的行列式与逆

**题目。**

$$
V=\begin{pmatrix}A&B\\C&0\end{pmatrix},\qquad
B\in\mathbb R^{k\times k},\quad C\in\mathbb R^{l\times l},\quad
|B|=b,\ |C|=c.
$$

其中 $A$ 为 $k\times l$ 矩阵，求 $|V|$ 与 $V^{-1}$。

**答案及条件。**

$$
\boxed{|V|=(-1)^{kl}bc}.
$$

当且仅当 $bc\ne0$ 时，$V$ 可逆，且

$$
\boxed{V^{-1}=\begin{pmatrix}0&C^{-1}\\B^{-1}&-B^{-1}AC^{-1}\end{pmatrix}}.
$$

若 $b=0$ 或 $c=0$，则不存在 $V^{-1}$。题面未明说 $bc\ne0$，逆矩阵一栏必须附上此条件。

**行列式。** 将下方 $l$ 行移到上方，需要 $kl$ 次相邻行交换，得到分块下三角矩阵：

$$
\begin{pmatrix}A&B\\C&0\end{pmatrix}
\longrightarrow\begin{pmatrix}C&0\\A&B\end{pmatrix}.
$$

后者的行列式为 $|C||B|=bc$，故 $|V|=(-1)^{kl}bc$。

**逆矩阵核对。** 设答案中的矩阵为 $W$，按相容尺寸相乘有

$$
VW=\begin{pmatrix}I_k&AC^{-1}-AC^{-1}\\0&I_l\end{pmatrix}=I_{k+l},
$$

$$
WV=\begin{pmatrix}I_l&0\\B^{-1}A-B^{-1}A&I_k\end{pmatrix}=I_{k+l}.
$$

**易错点。** $W$ 的块行高依次为 $l,k$，块列宽依次为 $k,l$。不能把分块矩阵求逆理解为每一块分别取逆，也不能擅自交换因子的顺序。

## 第 7 题：伴随矩阵的行列式与秩

**题目。** $n\ge2$，$A^*=A^2-2A-cI$，$|A|=b$，其中 $A^*$ 表示经典伴随矩阵。依次求：$b=2$ 时右侧的行列式；$r(A)<n-1$ 时右侧的行列式及 $c$；$r(A)=n-1,c=0$ 时右侧的秩。

**答案（按填空次序）。**

$$
\boxed{2^{n-1},\quad0,\quad0,\quad1}.
$$

**使用的性质。**

$$
|A^*|=|A|^{n-1},\qquad
r(A^*)=\begin{cases}
n,&r(A)=n,\\
1,&r(A)=n-1,\\
0,&r(A)<n-1.
\end{cases}
$$

**第一空。** $b=2$ 时，

$$
|A^2-2A-cI|=|A^*|=2^{n-1}.
$$

**第二、三空。** 若 $r(A)<n-1$，则所有 $n-1$ 阶子式为零，所以 $A^*=0$，从而 $A^2-2A-cI=0$，其行列式为 $0$。又 $A$ 奇异，可取非零 $v\in\ker A$；将等式作用在 $v$ 上：

$$
0=(A^2-2A-cI)v=-cv.
$$

由 $v\ne0$，必得 $c=0$。

**第四空。** 若 $r(A)=n-1$，由伴随矩阵的秩公式直接得到

$$
r(A^2-2A-cI)=r(A^*)=1.
$$

**易错点。** $A^*$ 在此不是转置或共轭转置；奇异矩阵的伴随矩阵不一定为零，必须区分秩为 $n-1$ 与小于 $n-1$ 两种情形。

## 第 8 题：用迹证明分块矩阵的零块

**题目。** 设 $A,B,C$ 为 $n$ 阶矩阵，

$$
S=\begin{pmatrix}A&B\\0&C\end{pmatrix},\qquad SS^T=S^TS.
$$

证明 $B=0$。以下按本课程的**实矩阵**情形证明。

**证明。** 由分块乘法，

$$
SS^T=\begin{pmatrix}
AA^T+BB^T&BC^T\\CB^T&CC^T
\end{pmatrix},\qquad
S^TS=\begin{pmatrix}
A^TA&A^TB\\B^TA&B^TB+C^TC
\end{pmatrix}.
$$

比较左上块即得

$$
AA^T+BB^T=A^TA.
$$

两边取迹，并使用 $\operatorname{tr}(XY)=\operatorname{tr}(YX)$：

$$
\operatorname{tr}(BB^T)
=\operatorname{tr}(A^TA)-\operatorname{tr}(AA^T)=0.
$$

设 $B=(b_{ij})$。由于 $b_{ij}$ 都是实数，

$$
0=\operatorname{tr}(BB^T)=\sum_{i=1}^n\sum_{j=1}^n b_{ij}^{\,2}.
$$

每一项均非负，因此所有 $b_{ij}=0$，即 $\boxed{B=0}$。

**条件与易错点。** 不能由 $AA^T=A^TA$ 直接作矩阵消去；这里用的是迹相等。平方和为零推出各项为零依赖实数域。若在复数域讨论且 $T$ 仍为普通转置，结论不再普遍成立；将转置改为共轭转置，则可用 $\sum|b_{ij}|^2$ 作同样证明。
