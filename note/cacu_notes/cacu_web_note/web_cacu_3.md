---
title: 微积分：数列极限的定义与基本例题
description: 数列极限的ε-N定义、邻域刻画，以及几何数列、n次根、阶乘和指数比较的证明。
pubDatetime: 2026-11-02T14:10:00+08:00
tags: [微积分, 课程笔记]
draft: false
featured: false
---

> 来源：`微积分11.4.pdf` 的 PDF 第 18～20 页（按文件页序，含首尾）。原第 17 页不在本次转换范围。保留原稿例题编号 7～11；前面的有理式例题在原第 18 页未另标编号。文末站内阅读稿为原样摘录，摘录第 1～3 页依次对应原稿第 18～20 页。

## **1. 数列与极限（原第 18 页）**

数列是一种特殊的函数：定义域为正整数集，按下标顺序排列，记为 $\{a_n\}_{n=1}^{\infty}$。

### **1.1 $\varepsilon$-$N$ 定义**

若存在实数 $a$，使得

$$
\forall\varepsilon>0,\quad\exists N\in\mathbb N^+,\quad
n>N\Longrightarrow |a_n-a|<\varepsilon,
$$

则称数列 $\{a_n\}$ 收敛于 $a$，记为

$$
\lim_{n\to\infty}a_n=a.
$$

这里 $\varepsilon$ 必须任意给定，$N$ 可以依赖于 $\varepsilon$，但不能依赖于随后任取的 $n$。

### **1.2 邻域刻画**

对 $a$ 的任意邻域 $U(a,\varepsilon)$，只有有限多个下标对应的项落在邻域之外，其余项都在邻域内。这与 $\varepsilon$-$N$ 定义等价。

没有有限极限的数列称为发散数列；趋于无穷大也属于这里的发散情形。

## **2. 例：有理式数列（原第 18 页）**

证明

$$
\lim_{n\to\infty}\frac{n^2-1}{n^2+2n+2}=1.
$$

令 $a_n=(n^2-1)/(n^2+2n+2)$。对任意 $\varepsilon>0$，取

$$
N=\left\lfloor\frac3\varepsilon\right\rfloor+3.
$$

当 $n>N$ 时，

$$
|a_n-1|=\frac{2n+3}{n^2+2n+2}<\frac3n<\varepsilon.
$$

因此 $a_n\to 1$。取 $N$ 的目的，是把误差放大到一个确定趋于 0 的量 $3/n$；不能随意选一个不能证明趋于 0 的上界。

## **3. 例 7：几何数列（原第 19 页）**

证明当 $|q|<1$ 时，

$$
\lim_{n\to\infty}q^n=0.
$$

若 $q=0$，结论显然。若 $0<|q|<1$，则 $\ln|q|<0$。对任意 $\varepsilon>0$，要使 $|q|^n<\varepsilon$，只需

$$
n>\frac{\ln\varepsilon}{\ln|q|}.
$$

取

$$
N=\max\left\{1,\left\lfloor\frac{\ln\varepsilon}{\ln|q|}\right\rfloor+1\right\}.
$$

则当 $n>N$ 时，$|q^n-0|=|q|^n<\varepsilon$，证毕。分母为负数，取对数后除以它时不等号须反向。

## **4. 例 8：常数的 $n$ 次根（原第 19 页）**

原稿设 $a>1$，证明

$$
\lim_{n\to\infty}\sqrt[n]a=1.
$$

### **4.1 方法一：取对数**

因 $a>1$，要使 $\sqrt[n]a-1<\varepsilon$，只需

$$
\frac{\ln a}{n}<\ln(1+\varepsilon),
\qquad n>\frac{\ln a}{\ln(1+\varepsilon)}.
$$

所以取 $N=\lfloor\ln a/\ln(1+\varepsilon)\rfloor+1$ 即可。

### **4.2 方法二：伯努利不等式**

令 $b_n=\sqrt[n]a-1>0$，则

$$
a=(1+b_n)^n\geq 1+nb_n,
\qquad 0<b_n\leq\frac{a-1}{n}.
$$

任给 $\varepsilon>0$，只要 $n>(a-1)/\varepsilon$，便有 $|\sqrt[n]a-1|<\varepsilon$，因此极限为 1。

## **5. 例 9：阶乘快于固定底数的幂（原第 19 页）**

对固定实数 $a$，证明

$$
\lim_{n\to\infty}\frac{a^n}{n!}=0.
$$

原稿思路是：将乘积前面有限多个可能大于等于 1 的因子归入常数，后面的因子用 1 放大，只保留最后的 $|a|/n$。

若 $a=0$，结论显然。若 $0<|a|<1$，则

$$
\left|\frac{a^n}{n!}\right|\leq\frac1{n!}\leq\frac1n\longrightarrow 0.
$$

若 $|a|\geq 1$，令 $m=\lfloor|a|\rfloor$，并置

$$
M=\prod_{j=1}^{m}\frac{|a|}{j}=\frac{|a|^m}{m!}.
$$

当 $n>m$ 时，

$$
\begin{aligned}
\left|\frac{a^n}{n!}\right|
&=M\left(\prod_{j=m+1}^{n-1}\frac{|a|}{j}\right)\frac{|a|}{n}\\
&\leq M\frac{|a|}{n}.
\end{aligned}
$$

因为 $j\geq m+1>|a|$ 时，$|a|/j<1$；空乘积按 1 处理。对任意 $\varepsilon>0$，取

$$
N=\max\left\{m+1,\left\lfloor\frac{M|a|}{\varepsilon}\right\rfloor+1\right\},
$$

则 $n>N$ 时误差小于 $\varepsilon$，结论成立。

这里完整写出 $M$、$N$ 的定义及空乘积边界，是对原稿略写部分的整理补充。

## **6. 例 10：$\sqrt[n]n$ 的极限（原第 20 页）**

证明

$$
\lim_{n\to\infty}\sqrt[n]n=1.
$$

令 $h_n=\sqrt[n]n-1$，当 $n>1$ 时 $h_n>0$。由二项式展开，当 $n>3$ 时，

$$
\begin{aligned}
n=(1+h_n)^n
&=1+nh_n+\frac{n(n-1)}2h_n^2+\cdots\\
&>\frac{n(n-1)}2h_n^2
>\frac{n^2}{3}h_n^2.
\end{aligned}
$$

所以 $0<h_n<\sqrt{3/n}$。任给 $\varepsilon>0$，取

$$
N=\max\left\{3,\left\lfloor\frac3{\varepsilon^2}\right\rfloor+1\right\},
$$

则 $n>N$ 时，$|\sqrt[n]n-1|=h_n<\sqrt{3/n}<\varepsilon$，证毕。

## **7. 例 11：指数与多项式的比较（原第 20 页）**

证明

$$
\lim_{n\to\infty}\frac{n^2}{2^n}=0.
$$

当 $n>4$ 时，二项式展开给出

$$
\begin{aligned}
2^n=(1+1)^n
&=1+n+\frac{n(n-1)}2+\frac{n(n-1)(n-2)}6+\cdots\\
&>\frac{n(n-1)(n-2)}6
>\frac{n\cdot(n/2)\cdot(n/2)}6
=\frac{n^3}{24}.
\end{aligned}
$$

于是

$$
0<\frac{n^2}{2^n}<\frac{24}{n}\longrightarrow 0.
$$

用定义写完最后一步（整理补充）：任给 $\varepsilon>0$，取 $N=\max\{4,\lfloor24/\varepsilon\rfloor+1\}$，则 $n>N$ 时 $n^2/2^n<\varepsilon$。

## **手写原稿**

[在本站阅读手写原稿（原稿第 18～20 页）](/notes/read/cacu_notes/cacu_hand_note/note_cacu_3/)
