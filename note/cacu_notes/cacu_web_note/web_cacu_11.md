---
title: 微积分：洛必达法则与泰勒公式
description: 洛必达法则的条件、适用边界与典型极限，及泰勒公式和拉格朗日余项证明。
tags: [微积分, 课程笔记]
pubDatetime: 2026-11-13T14:07:26+08:00
draft: false
featured: false
---

> 来源：Goodnotes“微积分”原第 75～81 页，已导出至 `微积分11.13.pdf`。该导出 PDF 第 3～9 页对应本篇，配套 `note_cacu_11.pdf` 第 1～7 页依次对应原第 75～81 页。原第 81 页开始泰勒公式，证明末尾未写完，补全处另行说明。

## **1. 洛必达法则的 $0/0$ 型（原第 75 页）**

设 $x\to x_0$ 时 $f(x)\to 0$、$g(x)\to 0$；在 $x_0$ 的某个去心邻域内，$f,g$ 可导且 $g'(x)\neq 0$。若

$$
\lim_{x\to x_0}\frac{f'(x)}{g'(x)}=A,
$$

其中 $A$ 可以是有限实数、$+\infty$ 或 $-\infty$，则

$$
\lim_{x\to x_0}\frac{f(x)}{g(x)}=A.
$$

左右单侧极限可分别应用；两侧都符合条件且结果相同时，才得到两侧极限。

### **1.1 用柯西中值定理证明**

原稿构造延拓函数 $F,G$：在 $x\neq x_0$ 时取原函数值，在 $x_0$ 都定义为零。由零极限，延拓后在 $x_0$ 连续。

以右极限为例，对 $[x_0,x]$ 应用柯西中值定理，存在 $\xi$ 介于 $x_0,x$ 之间，使

$$
\frac{f(x)}{g(x)}
=\frac{F(x)-F(x_0)}{G(x)-G(x_0)}
=\frac{f'(\xi)}{g'(\xi)}.
$$

$g'(t)\neq 0$ 保证 $G(x)\neq G(x_0)=0$，否则罗尔定理会给出导数为零的点。随 $x\to x_0^+$，$\xi\to x_0^+$，由导数商的极限得到结论。左侧同理。

### **1.2 与两边各自差商取极限的区别**

原稿另写了把 $f(x)/g(x)$ 改写成两个差商之比的方法。但 $f'(x_0)$、$g'(x_0)$ 可能不存在，或分母导数为零，所以不能把这种方法当作一般的洛必达法则证明。

## **2. 无穷型及分母趋于无穷的推广（原第 76 页）**

在相应去心邻域或充分靠近趋近端的区间内，要求 $f,g$ 可导、$g'\neq 0$，且导数商有有限或无穷极限。若 $f,g$ 都趋于无穷，可应用无穷型洛必达法则。

**原稿红字推广：** 事实上，只要求 $|g(x)|\to+\infty$，分子不一定趋于无穷，结论仍成立。趋近方式也可为 $x\to\pm\infty$。这不是任意形式的商都可以分别求导：分母趋于无穷、可导性、分母导数非零以及导数商极限均须核实。

### **2.1 例：已知 $f'+f$ 的极限**

设 $f$ 在 $[a,+\infty)$ 可导，且

$$
\lim_{x\to+\infty}\bigl(f'(x)+f(x)\bigr)=a_0\in\mathbb R.
$$

求 $f$ 的极限。利用分母趋于无穷的推广，

$$
\begin{aligned}
\lim_{x\to+\infty}f(x)
&=\lim_{x\to+\infty}\frac{e^xf(x)}{e^x}\\
&=\lim_{x\to+\infty}\frac{e^x(f'(x)+f(x))}{e^x}
=a_0.
\end{aligned}
$$

再由 $f'=(f'+f)-f$ 得 $f'(x)\to 0$。此处 $a_0$ 用于极限常数，与定义域左端点 $a$ 区分。

## **3. 洛必达法则不能使用的情形（原第 77 页）**

### **3.1 导数商振荡时，原商仍可能有极限**

$$
\lim_{x\to 0}\frac{x^2\sin(1/x)}{e^x-1}
=\lim_{x\to 0}x\sin\frac1x\cdot\frac{x}{e^x-1}=0.
$$

因为 $|x\sin(1/x)|\leq |x|$，且 $x/(e^x-1)\to 1$。若直接求导，导数商为

$$
\frac{2x\sin(1/x)-\cos(1/x)}{e^x},
$$

它没有极限，故此时不能用洛必达法则推出结果。导数商无极限，也不能反推原商无极限。

### **3.2 有界项用主项比较更直接**

$$
\begin{aligned}
\lim_{x\to+\infty}\frac{2x-\sin x}{3x+\cos x}
&=\lim_{x\to+\infty}\frac{2-\sin x/x}{3+\cos x/x}=\frac23,\\
\lim_{x\to+\infty}\frac{x}{\sqrt{1+x^2}}
&=\lim_{x\to+\infty}\frac1{\sqrt{1+1/x^2}}=1.
\end{aligned}
$$

前一题分别求导得到振荡商，无法应用法则；后一题应先除去最高次因子，避免不必要的循环。

### **3.3 $\infty-\infty$ 型先通分**

求 $x\to+\infty$ 时 $x-x^2\ln(1+1/x)$ 的极限。令 $t=1/x\to 0^+$，

$$
\begin{aligned}
x-x^2\ln\left(1+\frac1x\right)
&=\frac{t-\ln(1+t)}{t^2},\\
\lim_{t\to 0^+}\frac{t-\ln(1+t)}{t^2}
&=\lim_{t\to 0^+}\frac{1-1/(1+t)}{2t}
=\lim_{t\to 0^+}\frac1{2(1+t)}=\frac12.
\end{aligned}
$$

## **4. 幂指型与差值的一阶极限（原第 78 页）**

### **4.1 $0^0$ 型：$x^{\sin x}$**

$x>0$ 时先取对数，再转为指数：

$$
\begin{aligned}
\lim_{x\to 0^+}x^{\sin x}
&=\exp\left(\lim_{x\to 0^+}\sin x\ln x\right),\\
\sin x\ln x&=\frac{\sin x}{x}\,x\ln x\to 0.
\end{aligned}
$$

其中 $x\ln x=\ln x/(1/x)\to 0$，可由洛必达法则得到。所求极限为 $1$。

### **4.2 $\bigl((1+x)^{1/x}-e\bigr)/x$**

令 $h(x)=\ln(1+x)/x-1\to 0$，则

$$
\frac{(1+x)^{1/x}-e}{x}
=e\,\frac{e^{h(x)}-1}{h(x)}\,\frac{h(x)}x.
$$

又由洛必达法则，

$$
\lim_{x\to 0}\frac{h(x)}x
=\lim_{x\to 0}\frac{\ln(1+x)-x}{x^2}
=\lim_{x\to 0}\frac{1/(1+x)-1}{2x}
=-\frac12.
$$

因此

$$
\boxed{\lim_{x\to 0}\frac{(1+x)^{1/x}-e}{x}=-\frac e2.}
$$

## **5. 两个重要数列与一般化（原第 79 页上部）**

由上题令 $x=1/n$，得到

$$
\lim_{n\to\infty}n\left[\left(1+\frac1n\right)^n-e\right]=-\frac e2.
$$

同理，第二项使用 $x=1/(2n)$：

$$
\begin{aligned}
&\lim_{n\to\infty}n\left[\left(1+\frac1n\right)^n
-\left(1+\frac1{2n}\right)^{2n}\right]\\
&\quad=-\frac e2-\frac12\left(-\frac e2\right)=-\frac e4.
\end{aligned}
$$

推广：固定 $k>0$，令 $m=kn\to+\infty$（幂指表达式对实数同样有定义），有

$$
\lim_{n\to\infty}n\left[\left(1+\frac1n\right)^n
-\left(1+\frac1{kn}\right)^{kn}\right]
=-\frac e2+\frac e{2k}=\frac{1-k}{2k}e.
$$

## **6. 导数在一点存在，不代表导数极限存在（原第 79 页下部）**

原稿强调区分 $f'(x_0)$ 与 $\lim_{x\to x_0}f'(x)$：前者由原函数的差商定义，后者考察邻近点的导数值。

**整理补充反例：** 令 $f(0)=0$，$f(x)=x^2\sin(1/x)$（$x\neq 0$）。则 $f'(0)=0$，而

$$
f'(x)=2x\sin(1/x)-\cos(1/x)\quad(x\neq 0)
$$

在 $0$ 附近振荡，没有极限。导数的存在不要求导函数在该点附近连续。

若 $f$ 在 $x_0$ 连续、邻近去心区间可导，且右侧导数极限为有限数 $L$，则拉格朗日中值定理给出

$$
\frac{f(x)-f(x_0)}{x-x_0}=f'(\xi_x)\to L,
\qquad x_0<\xi_x<x,
$$

所以 $f'_+(x_0)=L$。左侧同理。当两侧导数极限均存在且相等时，就得到可导性与共同导数值；若已知可导且侧导数极限存在，该极限必等于该点导数。

## **7. 用拉格朗日中值定理计算极限（原第 80 页）**

求

$$
\lim_{x\to 0}\frac{\tan x-\tan(\sin x)}{x^3}.
$$

在 $x$ 与 $\sin x$ 之间对 $\tan t$ 用中值定理，得到某 $\xi_x$ 介于两者之间，使

$$
\tan x-\tan(\sin x)=\sec^2\xi_x\,(x-\sin x).
$$

因 $\xi_x\to 0$，有 $\sec^2\xi_x\to 1$。而

$$
\lim_{x\to 0}\frac{x-\sin x}{x^3}
=\lim_{x\to 0}\frac{1-\cos x}{3x^2}
=\frac16.
$$

故原极限为 $1/6$。原稿旁注提示此题可以使用拉格朗日中值定理。

## **8. 泰勒公式与拉格朗日余项（原第 81 页，证明续写）**

在下列导数有意义的条件下，定义 $n$ 次泰勒多项式

$$
P_n(x)=\sum_{j=0}^n\frac{f^{(j)}(x_0)}{j!}(x-x_0)^j,
\qquad R_n(x)=f(x)-P_n(x).
$$

若 $f$ 在 $x_0,x$ 之间的闭区间上有连续的 $n$ 阶导数，并在相应开区间上有 $n+1$ 阶导数，则存在介于 $x_0,x$ 之间的 $\xi$，使

$$
R_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}.
$$

### **8.1 原稿证明思路：构造辅助函数**

固定 $x\neq x_0$，令

$$
k=\frac{f(x)-P_n(x)}{(x-x_0)^{n+1}},
$$

则 $f(x)-[P_n(x)+k(x-x_0)^{n+1}]=0$。把展开中心改作变量 $t$，构造

$$
\varphi(t)=f(x)-\sum_{j=0}^n\frac{f^{(j)}(t)}{j!}(x-t)^j-k(x-t)^{n+1}.
$$

有 $\varphi(x_0)=\varphi(x)=0$。原稿开始对 $\varphi$ 求导，利用相邻项相消，末尾尚未写完。

**整理补充（完成证明）：** 求导后除最末项外均相消，得

$$
\varphi'(t)=-\frac{f^{(n+1)}(t)}{n!}(x-t)^n+(n+1)k(x-t)^n.
$$

由罗尔定理，存在 $\xi$ 介于 $x_0,x$ 之间，使 $\varphi'(\xi)=0$。因 $x-\xi\neq 0$，约去幂因子可得

$$
k=\frac{f^{(n+1)}(\xi)}{(n+1)!},
$$

代回 $k$ 的定义即得公式。$x=x_0$ 时余项为零，结论直接成立。

> **Q4 · 缺失条件与原稿未完（原第 81 页）：** 手稿列出泰勒式与辅助函数，但未写完整适用条件，末尾求导亦未完成。正文补明一组充分条件，并将相消与罗尔定理的最后步骤标为整理补充。

## **手写原稿**

[在本站阅读手写原稿（对应原第 75～81 页，共 7 页）](/notes/read/cacu_notes/cacu_hand_note/note_cacu_11/)
