---
title: 微积分：极限判别、无穷小与连续性
description: 夹逼定理、海涅定理、两个重要极限、无穷小比较及连续性的手稿整理。
tags: [微积分, 课程笔记]
draft: true
---

# **微积分：极限判别、无穷小与连续性**

> 来源：`微积分11.4.pdf` 的 PDF 第 40～53 页，按文件页序，含首尾。本篇直接关联完整手稿，未另行生成摘录。下文保留原稿的证明、例题与旁注；标为“整理补充”的内容是为补齐条件或推导所加。

## **1. 夹逼定理（原第 40 页）**

若

$$
\lim_{x\to x_0}f(x)=\lim_{x\to x_0}g(x)=A,
$$

且存在 $\delta>0$，使 $0<|x-x_0|<\delta$ 时恒有

$$
f(x)\leq h(x)\leq g(x),
$$

则 $\lim_{x\to x_0}h(x)=A$。

### **1.1 取整函数例题**

以 $[x]=\lfloor x\rfloor$ 表示不超过 $x$ 的最大整数，则

$$
[x]\leq x<[x]+1,
\qquad x-1<[x]\leq x.
$$

求 $\lim_{x\to0}x[1/x]$。由

$$
\frac1x-1<\left[\frac1x\right]\leq\frac1x
$$

可得：当 $x>0$ 时，$1-x<x[1/x]\leq 1$；当 $x<0$ 时，$1\leq x[1/x]<1-x$。分别夹逼得左右极限均为 $1$，故

$$
\boxed{\lim_{x\to0}x\left[\frac1x\right]=1.}
$$

## **2. 海涅定理：函数极限的归结原则（原第 41 页）**

设 $f$ 在 $x_0$ 的某去心邻域内有定义。则

$$
\lim_{x\to x_0}f(x)=A
$$

当且仅当对于任意满足 $x_n\neq x_0$、$x_n\to x_0$ 的定义域内数列，都有 $f(x_n)\to A$。

**必要性。** 给定 $\varepsilon>0$，由函数极限存在，取 $\delta>0$，使

$$
0<|x-x_0|<\delta\Longrightarrow|f(x)-A|<\varepsilon.
$$

由 $x_n\to x_0$，存在 $N$，使 $n>N$ 时 $0<|x_n-x_0|<\delta$。于是 $|f(x_n)-A|<\varepsilon$。

**充分性。** 若 $f(x)$ 不趋于 $A$，则存在 $\varepsilon_0>0$，使每个 $\delta>0$ 内都能找到一点满足

$$
0<|x-x_0|<\delta,
\qquad |f(x)-A|\geq\varepsilon_0.
$$

依次取 $\delta_n=\delta_*/n$（$\delta_*$ 为定义域去心邻域的半径），选得 $x_n$。于是 $x_n\to x_0$，但 $f(x_n)$ 不趋于 $A$，与假设矛盾。

**判别极限不存在：** 找到两列都趋于 $x_0$ 的自变量，使函数值数列极限不同；或找到一列使函数值数列不收敛。一个反例数列已经足够否定指定的极限。

## **3. 第一个重要极限（原第 42～43 页）**

$$
\boxed{\lim_{x\to0}\frac{\sin x}{x}=1.}
$$

角度以弧度计。当 $0<x<\pi/2$ 时，由几何不等式

$$
\sin x<x<\tan x
$$

得 $\cos x<\sin x/x<1$。又由 $|\sin t|\leq|t|$，

$$
\cos x=1-2\sin^2\frac x2\geq 1-\frac{x^2}{2}.
$$

故

$$
1-\frac{x^2}{2}\leq\cos x<\frac{\sin x}{x}<1,
$$

夹逼得到右极限为 $1$，同时得到 $\cos x\to1$。左极限中令 $u=-x$，则

$$
\lim_{x\to0^-}\frac{\sin x}{x}
=\lim_{u\to0^+}\frac{\sin(-u)}{-u}
=\lim_{u\to0^+}\frac{\sin u}{u}=1.
$$

于是

$$
\lim_{x\to0}\cos x=1,
\qquad \lim_{x\to0}\sin x=0,
\qquad \lim_{x\to0}\frac{\tan x}{x}=1.
$$

### **3.1 三角函数的连续性**

令 $h=x-x_0$，利用和角公式：

$$
\begin{aligned}
\lim_{x\to x_0}\cos x
&=\lim_{h\to0}(\cos h\cos x_0-\sin h\sin x_0)\\
&=\cos x_0.
\end{aligned}
$$

故余弦函数连续；正弦函数同理。原稿用“其余同理”概括其他三角函数，整理时应理解为：商式表示的三角函数在各自分母非零的定义域内连续。

## **4. 第二个重要极限（原第 43 页）**

$$
\boxed{\lim_{x\to\infty}\left(1+\frac1x\right)^x=e,
\qquad \lim_{t\to0}(1+t)^{1/t}=e.}
$$

这里 $x\to\infty$ 同时包含正、负无穷方向；实数幂要求底数为正。

### **4.1 从数列极限推广到实变量**

设 $x\to+\infty$，$n=[x]$，则 $n\leq x<n+1$。当 $n\geq 1$ 时，

$$
\left(1+\frac1{n+1}\right)^n
\leq\left(1+\frac1{n+1}\right)^x
\leq\left(1+\frac1x\right)^x
\leq\left(1+\frac1n\right)^x
\leq\left(1+\frac1n\right)^{n+1}.
$$

左右两端都趋于 $e$，故中间项亦趋于 $e$。

当 $x\to-\infty$ 时，令 $u=-x\to+\infty$，有

$$
\left(1+\frac1x\right)^x
=\left(1-\frac1u\right)^{-u}
=\left(1+\frac1{u-1}\right)^{u-1}
\left(1+\frac1{u-1}\right)\to e.
$$

再令 $x=1/t$，即得 $t\to0$ 的形式。

### **4.2 对数函数的连续性**

原稿由指数函数的连续性讨论对数函数的连续性，并记录

$$
\lim_{t\to0}\frac{\ln(1+t)}t=1,
\qquad \lim_{x\to1}\ln x=0,
\qquad \lim_{x\to x_0}\ln x=\ln x_0\quad(x_0>0).
$$

**整理补充：** 先利用严格单调连续函数的反函数连续，得到 $\ln$ 连续；再对 $(1+t)^{1/t}\to e$ 取对数，便得第一式。最后写 $\ln x=\ln(x/x_0)+\ln x_0$，即得一般点的连续性，避免把“指数值收敛”直接当成“指数必收敛”的未说明推论。

## **5. 幂函数与幂指函数的极限（原第 44 页）**

### **5.1 幂函数连续**

固定实数 $a$，在 $x>0$ 上有 $x^a=e^{a\ln x}$，故对 $x_0>0$，

$$
\lim_{x\to x_0}x^a
=\lim_{x\to x_0}e^{a\ln x}
=e^{a\ln x_0}=x_0^a.
$$

这个推导给出正半轴上的连续性；整数幂等在其他定义域内的连续性可另由运算法则得到。

### **5.2 幂指函数极限**

若 $f(x)\to A>0$、$g(x)\to B$，则 $f$ 最终为正，且

$$
\begin{aligned}
\lim_{x\to x_0}f(x)^{g(x)}
&=\lim_{x\to x_0}e^{g(x)\ln f(x)}\\
&=e^{B\ln A}=A^B.
\end{aligned}
$$

### **5.3 $1^\infty$ 型**

若 $f(x)\to0$、$g(x)\to\infty$，且 $f(x)g(x)\to A$，则在底数最终为正时，

$$
\boxed{\lim_{x\to a}(1+f(x))^{g(x)}=e^A.}
$$

原稿给出两种变形：

$$
(1+f(x))^{g(x)}
=\left((1+f(x))^{1/f(x)}\right)^{f(x)g(x)}
=e^{g(x)\ln(1+f(x))}.
$$

第一种写法在 $f(x)\neq 0$ 时使用；第二种结合 $\ln(1+u)\sim u$ 更方便。若 $f$ 有零点，可以用第二种或作连续延拓。此公式的核心是计算指数极限 $\lim g(x)\ln(1+f(x))$。

## **6. $1^\infty$ 型例题（原第 45 页）**

求

$$
\lim_{x\to\infty}\left(\sqrt{\cos\frac1x}\right)^{x^2}.
$$

令 $u=1/x\to0$，把底数写成 $1+(\sqrt{\cos u}-1)$，则

$$
\begin{aligned}
\lim_{u\to0}\frac{\sqrt{\cos u}-1}{u^2}
&=\lim_{u\to0}\frac{\cos u-1}{(\sqrt{\cos u}+1)u^2}\\
&=\lim_{u\to0}\frac{-2\sin^2(u/2)}{(\sqrt{\cos u}+1)u^2}
=-\frac14.
\end{aligned}
$$

所以原极限为 $\boxed{e^{-1/4}}$。

原稿留下思考题 $\lim_{x\to0}(\cos x)^{-1/x^2}$。**整理补充解答：** $\ln\cos x\sim\cos x-1\sim-x^2/2$，故指数 $-\ln\cos x/x^2\to1/2$，答案为 $e^{1/2}$。

## **7. 无穷小、局部有界与无界（原第 46 页）**

当 $x\to x_0$ 时，若 $f(x)\to0$，称 $f$ 为这一过程中的无穷小量。

若存在去心邻域 $\mathring U(x_0,\delta)$ 和 $M>0$，使其中所有定义域内的点满足 $|f(x)|\leq M$，则称 $f$ 在 $x_0$ 附近局部有界。

在任意小的去心邻域中都无界，量词为

$$
\forall M>0,\ \forall\delta>0,\ \exists x:
\quad0<|x-x_0|<\delta,\quad |f(x)|>M.
$$

> **Q1 · 缺失条件（原第 46～47 页）：** 第 46 页的“无界”简写只写了存在一个邻域内的点，没有明确“对任意邻域”。正文依据第 47 页补写的量词，将“在趋近点的任意小邻域无界”写完整；这与后文无穷大量的“邻域内所有点都大”不同。

有限极限可以用无穷小表示：

$$
\lim_{x\to x_0}f(x)=A
\iff f(x)=A+\alpha(x),\quad\alpha(x)\to0.
$$

记 $\alpha(x)=o(1)$。若 $f,g$ 都趋于 $0$，且 $g$ 在所讨论的去心邻域内非零，则

$$
\begin{array}{c|c}
\displaystyle\lim f(x)/g(x)&\text{比较关系}\\\hline
0&f=o(g),\ f\text{ 为 }g\text{ 的高阶无穷小}\\
c\neq 0&f,g\text{ 为同阶无穷小}\\
1&f\sim g,\ f,g\text{ 为等价无穷小}
\end{array}
$$

## **8. 无穷小的运算法则（原第 47 页）**

当 $x\to0$，对实指数可在 $x\to0^+$ 理解；若相应实幂在双侧有定义，也可使用双侧形式。$m>n>0$ 时，

$$
o(x^m)+o(x^n)=o(x^n).
$$

$m,n>0$ 时，

$$
o(x^m)o(x^n)=o(x^{m+n}).
$$

原稿性质：同阶无穷小之和仍为无穷小；有限个无穷小之和仍为无穷小；有界量与无穷小的乘积仍为无穷小。这里“同阶之和”不保证仍与原量同阶，例如 $x+(-x+x^2)=x^2$。

## **9. 无穷大量与无界量（原第 47～48 页）**

当 $x\to x_0$ 时，若

$$
\forall M>0,\ \exists\delta>0,\ \forall x:
\quad0<|x-x_0|<\delta\Longrightarrow|f(x)|>M,
$$

称 $f$ 为无穷大量，写为 $|f(x)|\to+\infty$。若最终 $f(x)>M$，则写 $f(x)\to+\infty$；负无穷类似。

当 $x\to+\infty$ 时，二者的区别为：

$$
\begin{aligned}
|f(x)|\to+\infty:
&\quad\forall M>0,\ \exists X>0,\ \forall x>X,
\quad |f(x)|>M;\\
\text{在尾部无界}:
&\quad\forall M>0,\ \forall X>0,\ \exists x>X,
\quad |f(x)|>M.
\end{aligned}
$$

### **9.1 例：证明 $\lim_{x\to-\infty}x^2/(x+1)=-\infty$**

任给 $M>0$，取 $X>\max\{1,M\}$。当 $x<-X$ 时，

$$
\frac{x^2}{x+1}=x-1+\frac1{x+1}<x<-M.
$$

故结论成立。

### **9.2 例：$\tan x$ 在 $x\to+\infty$ 的尾部无界**

任给 $M>0$、$X>0$，取

$$
x'=[X+1]\pi+\arctan(2M)>X.
$$

则 $\tan x'=2M>M$。因此它在任意尾部无界。它不是无穷大量，因为取 $x_n=n\pi\to+\infty$ 时函数值恒为 $0$。

### **9.3 无穷小与无穷大的倒数关系**

$$
|f(x)|\to+\infty\Longrightarrow\frac1{f(x)}\to0.
$$

反之，若 $f(x)\to0$，且某个去心邻域内 $f(x)\neq 0$，则 $|1/f(x)|\to+\infty$。不附加符号条件时不能直接断言倒数趋于正无穷。

## **10. 等价替换与常见极限（原第 49～51 页）**

有限个无穷大量的乘积仍为无穷大量；可变号的无穷大量之和未必是无穷大量。

若 $f(x)/g(x)\to1$，记 $f\sim g$。两者可同为无穷小，也可同为无穷大量。等价替换主要用于乘除因子；遇到加减，必须先检查是否发生主项抵消。

> **Q2 · 适用条件补足（原第 49、51 页）：** 原稿“加减一般不能用等价替换”的提醒应理解为不能把各项机械替换后相减；而 $e^x\sim1+x$ 本身虽然成立，只说明比值趋于 $1$，不足以用于计算高阶差。正文保留提醒，并使用更强的 $e^x-1\sim x$ 等形式。

当 $x\to0$ 时，常用等价关系为

$$
\begin{aligned}
\sin x&\sim x,& \tan x&\sim x,\\
\ln(1+x)&\sim x,& e^x-1&\sim x,\\
a^x-1&\sim x\ln a\quad(a>0,\ a\neq 1),\\
(1+x)^a-1&\sim ax\quad(a\neq 0),\\
\arcsin x&\sim x,&\arctan x&\sim x,\\
1-\cos x&\sim\frac{x^2}{2}.
\end{aligned}
$$

另外 $\ln x\sim x-1$ 是 $x\to1$ 时的关系。对于 $a=1$ 或 $a=0$ 的退化情形，前述相应“差”恒为零，不使用比值为 $1$ 的等价记号。

原稿还记有 $e^x\sim1+x$、$(1+x)^a\sim1+ax$，但不能据此替换高阶差。

### **10.1 两个直接推导（原第 49 页）**

固定 $a\neq 0$，

$$
\begin{aligned}
\lim_{x\to0}\frac{(1+x)^a-1}{x}
&=\lim_{x\to0}
\frac{e^{a\ln(1+x)}-1}{a\ln(1+x)}
\frac{\ln(1+x)}x\,a=a.
\end{aligned}
$$

$a=0$ 时直接得到 $0$。对 $a>0$、$a\neq 1$，

$$
\lim_{x\to0}\frac{a^x-1}{x}
=\lim_{x\to0}\frac{e^{x\ln a}-1}{x\ln a}\ln a=\ln a;
$$

$a=1$ 时也直接成立。

### **10.2 例：$\tan x-\sin x$（原第 50 页）**

先作恒等变形，避免抵消：

$$
\tan x-\sin x=\tan x(1-\cos x)\sim\frac{x^3}{2}.
$$

所以

$$
\lim_{x\to0}\frac{\tan x-\sin x}{x^3}=\frac12.
$$

第二例为

$$
\begin{aligned}
&\lim_{x\to0}
\frac{\tan x-\sin x}
{(e^{x^2}-1)(\sqrt[3]{1-3x}-1)}\\
&\quad=\lim_{x\to0}
\frac{\tan x(1-\cos x)}
{(e^{x^2}-1)(\sqrt[3]{1-3x}-1)}
=\lim_{x\to0}\frac{x\cdot x^2/2}{x^2\cdot(-x)}
=-\frac12.
\end{aligned}
$$

### **10.3 例：求等价无穷小 $ax^n$（原第 51 页）**

设 $x\to0$，$e^{\tan x}-e^{\sin x}$ 与 $ax^n$ 等价，求 $a,n$。先提取因子：

$$
\begin{aligned}
e^{\tan x}-e^{\sin x}
&=e^{\sin x}\bigl(e^{\tan x-\sin x}-1\bigr)\\
&\sim\tan x-\sin x
=\tan x(1-\cos x)
\sim\frac{x^3}{2}.
\end{aligned}
$$

故 $\boxed{a=1/2,\ n=3}$。原稿强调：不可在原来的减法中分别把两个指数函数都替换成 $1$。

## **11. 嵌套根式的等价量（原第 52 页）**

$$
f(x)=\sqrt{x+\sqrt{x+\sqrt x}},\qquad x>0.
$$

当 $x\to0^+$ 时，提取最低次幂：

$$
f(x)=x^{1/8}
\left(x^{3/4}+\sqrt{1+x^{1/2}}\right)^{1/2}
\sim x^{1/8}.
$$

当 $x\to+\infty$ 时，提取最高次幂：

$$
f(x)=x^{1/2}
\left(1+\sqrt{x^{-1}+x^{-3/2}}\right)^{1/2}
\sim x^{1/2}.
$$

这里第二个是等价无穷大量，不能称为无穷小量。

## **12. 连续、间断及复合函数（原第 52 页）**

在 $x_0$ 有定义时，连续要求 $\lim_{x\to x_0}f(x)=f(x_0)$。原稿间断点分类整理如下：

- 第一类：左右极限都存在且有限。二者相等而与函数值不同（或函数未定义），是可去间断；二者不等，是跳跃间断。
- 第二类：至少一侧没有有限极限，例如无穷间断、振荡间断。原稿举 $f(x)=1/x$、$x\to0$ 为例。

原页底部开始记录复合函数的连续性。**整理补充完整表述：** 若 $g$ 在 $x_0$ 连续，$f$ 在 $g(x_0)$ 连续，则 $f\circ g$ 在 $x_0$ 连续。

## **13. 连续函数应用：奇次实多项式有实根（原第 53 页）**

设

$$
P_n(x)=a_0x^n+a_1x^{n-1}+\cdots+a_{n-1}x+a_n,
\qquad a_0\neq 0,
$$

其中系数为实数，$n$ 为奇数。证明 $P_n(x)=0$ 至少有一个实根。

> **Q4 · 记号修正（原第 53 页）：** 原稿多项式的首项与末项都写作 $a_0$；正文依一般系数编号将常数项记为 $a_n$。证明不要求常数项等于首项系数。

不妨设 $a_0>0$。由最高次项控制无穷远行为，

$$
\lim_{x\to-\infty}P_n(x)=-\infty,
\qquad\lim_{x\to+\infty}P_n(x)=+\infty.
$$

于是可选 $a<0<b$，使 $P_n(a)<0<P_n(b)$。多项式在 $[a,b]$ 连续，由零点定理，存在 $\xi\in(a,b)$，使 $P_n(\xi)=0$。若 $a_0<0$，对 $-P_n$ 应用相同论证。

## **核对清单**

- **Q1（原第 46～47 页，缺失条件）：** 无界的局部量词已补完整，须区别“存在大值”和“所有值最终都大”。
- **Q2（原第 49、51 页，适用条件）：** 等价替换须检查加减抵消，常见关系的参数退化情形已补足。
- **Q4（原第 53 页，记号修正）：** 一般多项式常数项暂记为 $a_n$。

## **手写原稿**

[查看手写原稿（微积分11.4.pdf，本篇对应第 40～53 页）](/notes/cacu_notes/cacu_hand_note/%E5%BE%AE%E7%A7%AF%E5%88%8611.4.pdf#page=40)
