---
title: 微积分：数列极限的性质与收敛准则
description: 数列极限的定义证明、四则运算、夹逼定理、单调收敛与不动点迭代。
tags: [微积分, 课程笔记]
draft: true
---

# **微积分：数列极限的性质与收敛准则**

> 来源：`微积分11.4.pdf` 的 PDF 第 21～26 页，均按文件页序。原稿中的日期为课堂记录日期。本篇直接关联完整手稿，未另行生成摘录 PDF；保留首次核算的修正说明，暂不发布。

## **1. 用定义证明多项式增长慢于指数增长（原第 21 页）**

证明数列极限时，目标是对任意 $\varepsilon>0$ 找到 $N$，使 $n>N$ 时都有 $|a_n-a|<\varepsilon$。估计时允许先得到 $|a_n-a|\leq C\eta$，其中 $C>0$ 为常数；最后取 $\eta=\varepsilon/C$ 即可。

**例：** 设 $a>0$，$k$ 为固定非负整数，证明

$$
\lim_{n\to\infty}\frac{n^k}{(1+a)^n}=0.
$$

由二项式公式，当 $n>k$ 时，

$$
\begin{aligned}
(1+a)^n
&=1+na+\frac{n(n-1)}{2!}a^2+\cdots+a^n\\
&>\frac{n(n-1)\cdots(n-k)}{(k+1)!}a^{k+1}.
\end{aligned}
$$

当 $n>2k$ 时，$n-j>n/2$（$1\leq j\leq k$），因而

$$
(1+a)^n>
\frac{n(n/2)^k}{(k+1)!}a^{k+1}
=\frac{2a^{k+1}}{(2k+2)!!}n^{k+1}.
$$

这里

$$
(2k)!!=2\cdot4\cdots(2k),\qquad
(2k-1)!!=1\cdot3\cdots(2k-1).
$$

于是

$$
0\leq\frac{n^k}{(1+a)^n}
<\frac{(2k+2)!!}{2a^{k+1}n}.
$$

对任意 $\varepsilon>0$，取整数

$$
N>\max\left\{2k,\frac{(2k+2)!!}{2a^{k+1}\varepsilon}\right\},
$$

即得所需结论。若要推广到固定实数幂，只需选大于该幂的非负整数作比较；这是整理补充。

## **2. 收敛数列的基本性质（原第 22 页）**

### **2.1 唯一性**

若数列 $\{a_n\}$ 收敛，则其极限唯一。

### **2.2 有界性**

若数列 $\{a_n\}$ 收敛，则存在 $M>0$，使所有 $n$ 都满足 $|a_n|\leq M$。

逆命题不成立。例如 $a_n=(-1)^n$ 有界，但没有极限。结合后文的单调收敛定理，单调有界数列一定收敛。

### **2.3 极限的严格大小与最终大小**

若 $a_n\to a$、$b_n\to b$，且 $a<b$，则存在 $N$，当 $n>N$ 时都有 $a_n<b_n$。

特别地，若 $a_n\to a>0$，则对任意固定的 $\gamma\in(0,a)$，都有某个 $N$，使 $n>N$ 时

$$
a_n>\gamma>0.
$$

这称为保号性；负极限有相应结论。

### **2.4 不等式取极限**

若 $a_n\to a$、$b_n\to b$，并且从某项起恒有 $a_n\geq b_n$，则 $a\geq b$。即使最终有严格不等式 $a_n>b_n$，极限也只能保证非严格不等式。

## **3. 极限的四则运算（原第 23 页）**

设 $a_n\to a$、$b_n\to b$，则

$$
\begin{aligned}
\lim_{n\to\infty}(a_n\pm b_n)&=a\pm b,\\
\lim_{n\to\infty}a_nb_n&=ab,\\
\lim_{n\to\infty}\frac{a_n}{b_n}&=\frac ab\qquad(b\neq 0).
\end{aligned}
$$

商式中，$b_n\to b\neq 0$ 保证分母从某项起不为零。

**商法则的证明：** 原稿先把分子凑成 $a_n-a$ 与 $b_n-b$：

$$
\begin{aligned}
\left|\frac{a_n}{b_n}-\frac ab\right|
&=\frac{|ba_n-ab_n|}{|b_n||b|}\\
&=\frac{|b(a_n-a)+a(b-b_n)|}{|b_n||b|}\\
&\leq\frac{|b||a_n-a|+|a||b_n-b|}{|b_n||b|}.
\end{aligned}
$$

由反三角不等式

$$
\bigl||b_n|-|b|\bigr|\leq |b_n-b|,
$$

当 $|b_n-b|<|b|/2$ 时，有

$$
\frac{|b|}{2}<|b_n|<\frac{3|b|}{2}.
$$

因此，若再使 $|a_n-a|<\eta$、$|b_n-b|<\eta$，就有

$$
\left|\frac{a_n}{b_n}-\frac ab\right|
\leq\frac{2(|b|+|a|)}{|b|^2}\eta.
$$

**整理补充：** 对给定目标误差 $\varepsilon>0$，选

$$
\eta=\frac{|b|^2\varepsilon}{2(|b|+|a|)},
$$

再将三个要求对应的项数阈值取最大值，即完成定义证明。原稿末尾得到常数乘误差，补上这一步即可。

## **4. 多项式商的数列极限（原第 24 页上部）**

设 $a_0b_0\neq 0$，考虑

$$
\frac{a_0n^m+a_1n^{m-1}+\cdots+a_m}
{b_0n^k+b_1n^{k-1}+\cdots+b_k}
=n^{m-k}\frac{a_0+a_1/n+\cdots+a_m/n^m}
{b_0+b_1/n+\cdots+b_k/n^k}.
$$

故当 $n\to\infty$ 时，

$$
\lim\frac{a_0n^m+\cdots+a_m}{b_0n^k+\cdots+b_k}
=\begin{cases}
0,&m<k,\\
a_0/b_0,&m=k,\\
+\infty,&m>k,\ a_0/b_0>0,\\
-\infty,&m>k,\ a_0/b_0<0.
\end{cases}
$$

原稿旁注：$\bigl||a_n|-|a|\bigr|\leq |a_n-a|$，可用于由 $a_n\to a$ 推出 $|a_n|\to |a|$。

## **5. 夹逼定理与例题（原第 24～25 页）**

### **5.1 夹逼定理**

若 $a_n\to a$、$b_n\to a$，且从某项起恒有

$$
a_n\leq c_n\leq b_n,
$$

则 $c_n\to a$。夹逼时上下界必须趋向同一极限。

### **5.2 固定实数幂的极限**

对固定 $\beta\in\mathbb R$，

$$
\lim_{n\to\infty}\left(1+\frac1n\right)^\beta=1.
$$

当 $\beta=0$ 时显然成立。若 $\beta>0$，令 $r=\lfloor\beta\rfloor$，则

$$
\left(1+\frac1n\right)^r
\leq\left(1+\frac1n\right)^\beta
\leq\left(1+\frac1n\right)^{r+1}.
$$

两端均为固定整数次乘积，极限为 $1$。若 $\beta<0$，对 $-\beta>0$ 先应用前面的结论，再取倒数。

### **5.3 奇偶相邻比值的乘积**

求

$$
P_n=\frac12\frac34\frac56\cdots\frac{2n-1}{2n}
$$

的极限。利用

$$
\frac{2j-1}{2j}<\frac{2j}{2j+1}
<\frac{2j+1}{2j+2},
$$

先比较平方：

$$
P_n^2<\prod_{j=1}^n\frac{2j-1}{2j}\frac{2j}{2j+1}
=\frac1{2n+1}.
$$

再把 $P_n$ 中除第一项外的各因子与前一个偶奇比值比较，得

$$
P_n\geq\frac12\prod_{j=1}^{n-1}\frac{2j}{2j+1},
\qquad
P_n^2\geq\frac1{4n}.
$$

所以

$$
\frac1{2\sqrt n}\leq P_n<\frac1{\sqrt{2n+1}}
\quad\Longrightarrow\quad P_n\to0.
$$

### **5.4 原稿旁记**

原第 25 页上部记有斯特林渐近公式与平方和公式：

$$
n!\sim\sqrt{2\pi n}\left(\frac ne\right)^n,
\qquad
\sum_{j=1}^n j^2=\frac{n(n+1)(2n+1)}6.
$$

其中 $u_n\sim v_n$ 表示 $u_n/v_n\to1$；手稿未在本页证明斯特林公式。

## **6. 确界与单调收敛定理（原第 25 页下部～26 页）**

**确界原理：** 非空且有上界的实数集有唯一上确界；非空且有下界的实数集有唯一下确界。上、下确界相同当且仅当该非空集合只含一个实数。

**单调收敛定理：** 单调且有界的实数数列必定收敛。

以单调递增且有上界的数列为例，令

$$
a=\sup\{a_n:n\geq 1\}.
$$

对任意 $\varepsilon>0$，由上确界的定义，有 $N$ 使

$$
a_N>a-\varepsilon.
$$

当 $n\geq N$ 时，由单调性及上界性质，

$$
a-\varepsilon<a_N\leq a_n\leq a<a+\varepsilon,
$$

所以 $|a_n-a|<\varepsilon$。递减且有下界时同理，以其下确界为极限。

## **7. 递推数列与不动点（原第 26 页）**

### **7.1 根式递推的例题**

设

$$
a_1=4,\qquad a_{n+1}=\sqrt{12-a_n}.
$$

若数列收敛到 $a$，由递推式应有 $a=\sqrt{12-a}$，故候选极限为 $3$（另一个代数根 $-4$ 不满足根式方程）。

**整理补充：** 归纳可得 $0\leq a_n\leq 4$，因而递推始终有定义。原稿使用的误差估计为

$$
\begin{aligned}
|a_{n+1}-3|
&=\left|\sqrt{12-a_n}-3\right|\\
&=\frac{|a_n-3|}{\sqrt{12-a_n}+3}
<\frac13|a_n-3|.
\end{aligned}
$$

逐次迭代可得

$$
0\leq|a_{n+1}-3|<3^{-n}|a_1-3|=3^{-n}\to0.
$$

所以 $a_n\to3$。这道题直接控制误差即可，不要求数列单调。

### **7.2 连续递推与压缩映射**

若 $a_{n+1}=f(a_n)$、$a_n\to a$，且 $f$ 在 $a$ 处连续，则

$$
a=f(a).
$$

这样的 $a$ 称为 $f$ 的不动点。

**整理补充的反例：** $f(x)=-x$ 连续且以 $0$ 为不动点，但从 $a_1=1$ 出发的迭代为 $1,-1,1,-1,\ldots$，并不收敛。

原稿还写出压缩条件：对某集合 $X\subseteq\mathbb R$ 上的映射 $f:X\to X$，存在 $r\in[0,1)$，使任意 $x,y\in X$ 都有

$$
|f(x)-f(y)|\leq r|x-y|.
$$

若已有不动点 $a\in X$，则对 $a_1\in X$ 的迭代，

$$
|a_{n+1}-a|\leq r|a_n-a|
\leq\cdots\leq r^n|a_1-a|\to0.
$$

**整理补充：** 若要由压缩条件本身保证不动点存在，可要求 $X$ 是非空闭区间，且 $f:X\to X$。在这些条件下，不动点唯一，并且任意起点的迭代都收敛到它。

**整理补充的反例：** 在 $X=(0,1)$ 上，$f(x)=x/2$ 是自映射且满足压缩系数 $r=1/2$，但唯一可能的不动点 $0$ 不在 $X$ 中，因此 $X$ 内没有不动点。

## **手写原稿**

[查看手写原稿（本篇对应 PDF 第 21～26 页）](/notes/cacu_notes/cacu_hand_note/%E5%BE%AE%E7%A7%AF%E5%88%8611.4.pdf#page=21)
