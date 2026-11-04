---
title: 微积分：导数、反函数求导与高阶导数
description: 导数定义、反三角函数、幂指函数求导及莱布尼茨公式的推导与例题。
tags: [微积分, 课程笔记]
draft: true
---

# **微积分：导数、反函数求导与高阶导数**

> 来源：`微积分11.4.pdf` 的 PDF 第 54～61 页，按文件页序，含首尾。本篇直接关联完整手稿，未生成独立摘录。原第 58 页标注日期为“10.26”。整理补全的证明、条件及未完成例题会另行说明。

## **1. 导数的定义与连续性（原第 54 页）**

设 $f$ 在 $x_0$ 的某邻域内有定义。若有限极限

$$
f'(x_0)=\lim_{\Delta x\to0}
\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}
$$

存在，称 $f$ 在 $x_0$ 可导。常用记号有

$$
f'(x_0),\qquad y'\big|_{x=x_0},\qquad
\left.\frac{dy}{dx}\right|_{x=x_0},\qquad
\left.\frac d{dx}f(x)\right|_{x=x_0}.
$$

**定理：** 可导必连续。因此，不连续必不可导；连续却未必可导。

**整理补充证明：** 当 $\Delta x\neq 0$ 时，

$$
f(x_0+\Delta x)-f(x_0)
=\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}\,\Delta x\to0.
$$

## **2. 从定义求反三角函数导数（原第 54～55 页）**

### **2.1 $f(x)=\arctan x$**

令 $\theta=\arctan(x+\Delta x)-\arctan x$，则 $\theta\to0$，且

$$
\tan\theta
=\frac{(x+\Delta x)-x}{1+x(x+\Delta x)}
=\frac{\Delta x}{1+x^2+x\Delta x}.
$$

利用 $\theta/\tan\theta\to1$，有

$$
\begin{aligned}
f'(x)
&=\lim_{\Delta x\to0}\frac\theta{\Delta x}\\
&=\lim_{\Delta x\to0}
\frac\theta{\tan\theta}\frac1{1+x^2+x\Delta x}
=\frac1{1+x^2}.
\end{aligned}
$$

### **2.2 $f(x)=\arcsin x$**

对 $-1<x<1$，令 $t=\arcsin x$、$t_1=\arcsin(x+\Delta x)$。则 $\Delta x=\sin t_1-\sin t$，且 $t_1\to t$，所以

$$
\begin{aligned}
(\arcsin x)'
&=\lim_{t_1\to t}\frac{t_1-t}{\sin t_1-\sin t}\\
&=\lim_{t_1\to t}
\frac{t_1-t}{2\cos\frac{t_1+t}{2}\sin\frac{t_1-t}{2}}\\
&=\frac1{\cos t}
=\frac1{\cos(\arcsin x)}
=\frac1{\sqrt{1-x^2}}.
\end{aligned}
$$

原稿用直角三角形表示 $\sin t=x$、$\cos t=\sqrt{1-x^2}$。该图保留于第 55 页；主值范围为 $t\in[-\pi/2,\pi/2]$，导数公式用于开区间 $(-1,1)$。

## **3. 导函数的奇偶性、周期性与运算法则（原第 55 页）**

在关于原点对称的定义域上，可导偶函数的导函数为奇函数；可导奇函数的导函数为偶函数。

若可导函数 $f$ 满足周期关系 $f(x+T)=f(x)$，则求导得 $f'(x+T)=f'(x)$，故 $T$ 也是导函数的周期。这里不保证最小正周期相同。

以下 $u,v$ 均在所讨论点可导：

$$
\begin{aligned}
(u\pm v)'&=u'\pm v',\\
(uv)'&=u'v+uv',\\
\left(\frac uv\right)'&=\frac{u'v-uv'}{v^2}\quad(v\neq 0),\\
\left(\frac1v\right)'&=-\frac{v'}{v^2}\quad(v\neq 0).
\end{aligned}
$$

## **4. 三角函数的导数（原第 56 页）**

$$
\begin{aligned}
(\tan x)'&=\sec^2x,&(\cot x)'&=-\csc^2x,\\
(\sec x)'&=\left(\frac1{\cos x}\right)'=\tan x\sec x,\\
(\csc x)'&=\left(\frac1{\sin x}\right)'=-\cot x\csc x.
\end{aligned}
$$

各式只用于相应函数的定义域。

## **5. 反函数求导（原第 56 页）**

设 $y=f(x)$ 的反函数为 $x=\varphi(y)$，$y_0=f(x_0)$。在相应局部反函数连续、导数存在且分母非零时，

$$
f'(x_0)=\frac1{\varphi'(y_0)}.
$$

原稿提醒：$\Delta x\to0$ 时 $\Delta y\to0$；反函数的一一性保证 $\Delta x\neq 0$ 时 $\Delta y\neq 0$，从而可以把差商取倒数。

例如 $y=\arcsin x$ 的反函数为 $x=\sin y$，在主值区间内，

$$
\frac{dy}{dx}
=\frac1{dx/dy}
=\frac1{\cos y}
=\frac1{\sqrt{1-x^2}},\qquad -1<x<1.
$$

**整理补充条件：** 一种常用充分条件是原函数在邻域内连续且严格单调，并在所考察点可导、导数非零。不能在导数为零的点直接使用倒数公式。

## **6. 幂指函数求导（原第 57 页）**

原稿先回顾：$f(x)\to A$ 可写为 $f(x)=A+\alpha(x)$，其中 $\alpha(x)\to0$。

设 $u(x)>0$，且 $u,v$ 可导。写成指数形式：

$$
y=u(x)^{v(x)}=e^{v(x)\ln u(x)}.
$$

由链式法则与乘积法则，

$$
\boxed{y'
=u(x)^{v(x)}
\left(v'(x)\ln u(x)+\frac{v(x)u'(x)}{u(x)}\right).}
$$

> **Q1 · 确定错误／缺失条件（原第 57 页）：** 原稿括号第二项写成 $v(x)/u(x)$，漏乘 $u'(x)$；正文已补入，并补明实数幂的 $u(x)>0$ 条件。若只是 $u(x)=x$，漏掉的因子恰为 $1$，但一般函数不可省略。

## **7. 反函数的一、二阶导数（原第 58 页）**

设 $y=f(x)$，反函数为 $x=\varphi(y)$，并假设所需二阶导数存在、$f'(x)\neq 0$。则

$$
\frac{dx}{dy}=\frac1{f'(x)}.
$$

再对 $y$ 求导，必须使用链式法则：

$$
\begin{aligned}
\frac{d^2x}{dy^2}
&=\frac d{dy}\left(\frac1{f'(x)}\right)\\
&=\frac d{dx}\left(\frac1{f'(x)}\right)\frac{dx}{dy}\\
&=-\frac{f''(x)}{(f'(x))^2}\frac1{f'(x)}
=-\frac{f''(x)}{(f'(x))^3}.
\end{aligned}
$$

### **7.1 高阶导数记号**

$$
\frac{d^2f}{dx^2}=\frac d{dx}\left(\frac{df}{dx}\right).
$$

二阶导数在 $x_0$ 的值可记为 $f''(x_0)$、$y''|_{x=x_0}$ 或 $\left.d^2y/dx^2\right|_{x=x_0}$。$n$ 阶导数相应记为

$$
f^{(n)}(x_0),\qquad
y^{(n)}\big|_{x=x_0},\qquad
\left.\frac{d^ny}{dx^n}\right|_{x=x_0}.
$$

## **8. 一点高阶可导与邻域连续（原第 59 页）**

原稿提出问题：在 $x_0$ 二阶可导，能推出函数或一阶导数在某邻域连续吗？

按通常递归定义，$f''(x_0)$ 存在要求 $f'$ 在某邻域有定义，且 $f'$ 在 $x_0$ 可导。因此：

1. $f$ 在该邻域每一点都可导，故 $f$ 在该邻域连续。
2. $f'$ 在 $x_0$ 连续。
3. 不能仅据此断言 $f'$ 在整个邻域内连续，也不能断言 $f''$ 在 $x_0$ 连续。

相应地，$n$ 阶可导保证更低阶导数在所考察点具有相应的连续性，但最高阶导数未必连续。原稿“$n\geq 2$ 时低阶函数在邻域连续，$n=1$ 时不能保证”的提醒应按具体阶数理解。

### **8.1 原稿反例 $f(x)=x^2D(x)$**

$D(x)$ 是狄利克雷函数：有理点取 $1$，无理点取 $0$。则

$$
f'(0)=\lim_{h\to0}hD(h)=0,
$$

但 $f$ 在任意 $x\neq 0$ 处都不连续。这个例子说明“一点可导”不能推出“某邻域处处连续”。

> **Q2 · 论证范围澄清（原第 59 页）：** $x^2D(x)$ 只在 $0$ 一阶可导，不能用来否定“二阶可导推出原函数在某邻域连续”。正文将它明确归于“一阶可导”的反例，并区分导函数在一点连续与在邻域内处处连续。第 62 页继续讨论同一问题。

## **9. 初等函数的高阶导数（原第 59 页）**

对正整数 $n$，在各自适用的定义域内：

$$
\begin{aligned}
\frac{d^n}{dx^n}x^a
&=a(a-1)\cdots(a-n+1)x^{a-n},\\
\frac{d^n}{dx^n}\ln x
&=(-1)^{n-1}\frac{(n-1)!}{x^n}\quad(x>0),\\
\frac{d^n}{dx^n}\sin x
&=\sin\left(x+\frac{n\pi}{2}\right),\\
\frac{d^n}{dx^n}a^x
&=a^x(\ln a)^n\quad(a>0).
\end{aligned}
$$

其中 $a=n$ 为正整数时，$(x^n)^{(n)}=n!$；$a=e$ 时，$(e^x)^{(n)}=e^x$。对于实指数幂可先在 $x>0$ 上使用，整数幂再按其实际定义域延伸。

## **10. 高阶导数的运算法则（原第 60 页）**

$$
(u\pm v)^{(n)}=u^{(n)}\pm v^{(n)},
\qquad(cu)^{(n)}=cu^{(n)}.
$$

### **10.1 莱布尼茨公式**

$$
\boxed{(uv)^{(n)}
=\sum_{k=0}^{n}\binom nk u^{(n-k)}v^{(k)}.}
$$

这里 $u^{(0)}=u$、$v^{(0)}=v$。展开的首几项为

$$
u^{(n)}v+nu^{(n-1)}v'
+\cdots+uv^{(n)}.
$$

**数学归纳证明。** $n=1$ 时就是乘积法则。假设 $n=m$ 时成立，求导得

$$
\begin{aligned}
(uv)^{(m+1)}
&=\sum_{k=0}^{m}\binom mk
\left(u^{(m-k+1)}v^{(k)}+u^{(m-k)}v^{(k+1)}\right)\\
&=u^{(m+1)}v+uv^{(m+1)}\\
&\quad+\sum_{k=1}^{m}
\left(\binom mk+\binom m{k-1}\right)
u^{(m+1-k)}v^{(k)}\\
&=\sum_{k=0}^{m+1}\binom{m+1}k
u^{(m+1-k)}v^{(k)}.
\end{aligned}
$$

故对所有正整数 $n$ 成立。

## **11. 高阶导数例题（原第 61 页）**

### **11.1 $y=x^2e^x$，求 $y^{(n)}$**

多项式三阶及以上导数为零，莱布尼茨公式只保留三项。对 $n\geq 2$，

$$
\begin{aligned}
y^{(n)}
&=\binom n0e^xx^2
+\binom n1e^x\,2x
+\binom n2e^x\,2\\
&=e^x\bigl(x^2+2nx+n(n-1)\bigr).
\end{aligned}
$$

直接检查 $n=1$ 也满足最后的多项式表达式。原稿在三项展开处标注了 $n\geq 2$。

### **11.2 $y=e^x\cos x$，求 $y^{(n)}$**

先求一阶导数并用辅助角公式：

$$
y'=e^x(\cos x-\sin x)
=\sqrt2e^x\cos\left(x+\frac\pi4\right).
$$

反复求导，每次乘 $\sqrt2$ 并把相位增加 $\pi/4$，于是

$$
\boxed{y^{(n)}=(\sqrt2)^ne^x
\cos\left(x+\frac{n\pi}{4}\right).}
$$

原稿旁注建议使用辅助角方法，避免把每一阶都展开成许多乘积项。

### **11.3 $y=\arctan x$，求 $y^{(n)}(0)$**

由 $y'=1/(1+x^2)$，先消去分母：

$$
(1+x^2)y'=1.
$$

对上式求 $n$ 阶导数（$n\geq 1$），利用莱布尼茨公式：

$$
(1+x^2)y^{(n+1)}+2nxy^{(n)}
+n(n-1)y^{(n-1)}=0.
$$

原稿在这里开始代入 $x=0$，尚未写完全部结果。

**整理补充：** $y(0)=0$、$y'(0)=1$，且

$$
y^{(n+1)}(0)=-n(n-1)y^{(n-1)}(0)\quad(n\geq 1).
$$

因此偶数阶导数为零；对 $m\geq 0$，

$$
\boxed{y^{(2m)}(0)=0,\qquad
y^{(2m+1)}(0)=(-1)^m(2m)!.}
$$

这里 $y^{(0)}(0)=y(0)$，$n=0$ 时原方程右侧为 $1$，不能把上述零右端递推直接用于 $n=0$。

## **核对清单**

- **Q1（原第 57 页，确定错误／缺失条件）：** 幂指函数导数补入 $u'(x)$，并补明 $u>0$。
- **Q2（原第 59 页，论证范围澄清）：** 狄利克雷函数反例只说明一点一阶可导不能保证邻域连续；不能据此否定二阶可导的相应结论。
- **原稿未写完（原第 61 页）：** $\arctan x$ 的高阶导数在零点的值，已标为整理补充给出完整递推及结果。

## **手写原稿**

[查看手写原稿（微积分11.4.pdf，本篇对应第 54～61 页）](/notes/caculus_notes/cacu_hand_note/%E5%BE%AE%E7%A7%AF%E5%88%8611.4.pdf#page=54)
