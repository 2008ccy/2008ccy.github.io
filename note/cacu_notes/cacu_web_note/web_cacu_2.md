---
title: 微积分：函数、反函数与极坐标
description: 映射和反函数、反三角函数与恒等式、复合迭代、函数性质及极坐标的知识点和例题。
pubDatetime: 2026-11-02T10:00:00+08:00
tags: [微积分, 课程笔记]
draft: false
featured: false
---

> 来源：`微积分11.4.pdf` 的 PDF 第 6～16 页（按文件页序，含首尾）。文末站内阅读稿为原样摘录，摘录第 1～11 页依次对应原稿第 6～16 页。补写的推导另作说明。

## **1. 映射、函数与反函数（原第 6 页）**

映射 $f:A\to B$ 按一定规则，对每个 $x\in A$ 指定唯一的 $y\in B$。当 $A,B\subseteq\mathbb R$ 时称为实函数，记为 $y=f(x)$。$A$ 是定义域，$f(A)=\{f(x):x\in A\}$ 是值域；值域可以是陪域 $B$ 的真子集。

若不同的自变量有不同的函数值，即 $f$ 为单射，则可以在值域上定义反函数

$$
f^{-1}:f(A)\to A,\qquad y=f(x)\iff x=f^{-1}(y).
$$

例如 $y=x^2$ 在 $\mathbb R$ 上不是单射，没有反函数；限制在 $[0,+\infty)$ 后，其反函数为 $y=\sqrt x$。原函数与反函数的图像关于直线 $y=x$ 对称。

$$
\begin{aligned}
f^{-1}(f(x))&=x,&&x\in A,\\
f(f^{-1}(y))&=y,&&y\in f(A).
\end{aligned}
$$

## **2. 求反函数的方法与例题（原第 7 页）**

先证明单射（严格单调是常用的充分条件），再由 $y=f(x)$ 解出 $x=f^{-1}(y)$；最后交换自变量与因变量的名称。

### **2.1 例：立方函数**

$f(x)=x^3+1$ 在 $\mathbb R$ 上严格递增。由 $x=y^3+1$ 得

$$
f^{-1}(x)=\sqrt[3]{x-1},\qquad x\in\mathbb R.
$$

### **2.2 例：用隐式关系表示反函数**

$$
f(x)=\tan x+\ln(x+2),\qquad x\in(0,\pi/2).
$$

$f$ 严格递增，因此存在反函数，但不一定能用初等表达式解出。其反函数 $y=f^{-1}(x)$ 由

$$
x=\tan y+\ln(y+2),\qquad 0<y<\pi/2
$$

确定。原函数值域为 $(\ln2,+\infty)$（整理补充），也是反函数的定义域。

### **2.3 例：立方根和的反函数**

设

$$
f(x)=\sqrt[3]{x+\sqrt{x^2+1}}+\sqrt[3]{x-\sqrt{x^2+1}},\qquad x\in\mathbb R.
$$

原稿通过导数证明严格递增：

$$
f'(x)=
\frac{1+x/\sqrt{x^2+1}}{3\bigl(\sqrt[3]{x+\sqrt{x^2+1}}\bigr)^2}
+\frac{1-x/\sqrt{x^2+1}}{3\bigl(\sqrt[3]{x-\sqrt{x^2+1}}\bigr)^2}>0.
$$

令 $u=\sqrt[3]{x+\sqrt{x^2+1}}$、$v=\sqrt[3]{x-\sqrt{x^2+1}}$，则 $uv=-1$。设 $y=u+v$，有

$$
\begin{aligned}
y^3&=u^3+v^3+3uv(u+v)\\
&=2x-3y,\\
x&=\frac{y^3+3y}{2}.
\end{aligned}
$$

因此

$$
f^{-1}(x)=\frac{x^3+3x}{2},\qquad x\in\mathbb R.
$$

## **3. 反三角函数的主值（原第 8 页）**

三角函数在整个实数定义域上未必单射，须限制到单调区间后求逆。

| 原函数的限制 | 对应反函数的定义域与值域 |
| --- | --- |
| $\sin:[-\pi/2,\pi/2]\to[-1,1]$ | $\arcsin:[-1,1]\to[-\pi/2,\pi/2]$ |
| $\cos:[0,\pi]\to[-1,1]$ | $\arccos:[-1,1]\to[0,\pi]$ |
| $\tan:(-\pi/2,\pi/2)\to\mathbb R$ | $\arctan:\mathbb R\to(-\pi/2,\pi/2)$ |
| $\cot:(0,\pi)\to\mathbb R$ | $\operatorname{arccot}:\mathbb R\to(0,\pi)$ |

各原函数及反函数的图像见原第 8 页，图像关于 $y=x$ 对称。

### **3.1 互余关系**

$$
\begin{aligned}
\arcsin x+\arccos x&=\frac\pi2,&&|x|\leq 1,\\
\arctan x+\operatorname{arccot}x&=\frac\pi2,&&x\in\mathbb R.
\end{aligned}
$$

例如设 $t=\arcsin x$、$s=\arccos x$，则 $\sin t=x=\cos s$，结合主值范围得 $t+s=\pi/2$。正切与余切的情形同理。原稿采用直角三角形辅助记忆；负自变量时仍须结合主值范围判断。

## **4. 正割、余割与复合恒等式（原第 9 页）**

$$
\sec x=\frac1{\cos x},\qquad
\csc x=\frac1{\sin x},
$$

定义时分别要求 $\cos x\neq 0$、$\sin x\neq 0$。其中 $\sec$ 为正割，$\csc$ 为余割。

$$
1+\tan^2x=\sec^2x,\qquad 1+\cot^2x=\csc^2x.
$$

### **4.1 例：$\sec(\arctan x)$**

令 $t=\arctan x$，则 $t\in(-\pi/2,\pi/2)$、$\cos t>0$。由 $1+\tan^2t=\sec^2t$，得到

$$
\sec(\arctan x)=\sqrt{1+x^2},\qquad x\in\mathbb R.
$$

### **4.2 例：$\arcsin(\sin x)$**

在 $[0,\pi]$ 上，

$$
\arcsin(\sin x)=\begin{cases}
x,&0\leq x\leq\pi/2,\\
\pi-x,&\pi/2<x\leq\pi.
\end{cases}
$$

因为当 $x\in(\pi/2,\pi]$ 时，$\sin x=\sin(\pi-x)$，且 $\pi-x\in[0,\pi/2)$。

## **5. 三角函数的常用公式（原第 10～11 页）**

### **5.1 和差角公式**

$$
\begin{aligned}
\sin(x\pm y)&=\sin x\cos y\pm\cos x\sin y,\\
\cos(x\pm y)&=\cos x\cos y\mp\sin x\sin y,\\
\tan(x\pm y)&=\frac{\tan x\pm\tan y}{1\mp\tan x\tan y}.
\end{aligned}
$$

正切公式要求所出现的正切和分式均有意义。

### **5.2 和差化积、积化和差**

原稿提示可由和差角公式推出，并特别标出负号：

$$
\cos x-\cos y=-2\sin\frac{x+y}{2}\sin\frac{x-y}{2}.
$$

以下将原稿仅列名称的其余常用式补齐，便于查阅（整理补充）：

$$
\begin{aligned}
\sin x+\sin y&=2\sin\frac{x+y}{2}\cos\frac{x-y}{2},\\
\sin x-\sin y&=2\cos\frac{x+y}{2}\sin\frac{x-y}{2},\\
\cos x+\cos y&=2\cos\frac{x+y}{2}\cos\frac{x-y}{2},\\
2\sin x\cos y&=\sin(x+y)+\sin(x-y),\\
2\cos x\sin y&=\sin(x+y)-\sin(x-y),\\
2\cos x\cos y&=\cos(x+y)+\cos(x-y),\\
2\sin x\sin y&=\cos(x-y)-\cos(x+y).
\end{aligned}
$$

### **5.3 万能代换与二倍角公式**

令 $t=\tan(\theta/2)$，则在各式有意义时，

$$
\sin\theta=\frac{2t}{1+t^2},\quad
\cos\theta=\frac{1-t^2}{1+t^2},\quad
\tan\theta=\frac{2t}{1-t^2}.
$$

$$
\begin{aligned}
\sin2x&=2\sin x\cos x,\\
\cos2x&=2\cos^2x-1,\\
\tan2x&=\frac{2\tan x}{1-\tan^2x}.
\end{aligned}
$$

### **5.4 相消公式与定义域**

$$
\begin{aligned}
\sin(\arcsin x)&=x,&&|x|\leq 1,\\
\cos(\arccos x)&=x,&&|x|\leq 1,\\
\tan(\arctan x)&=x,&&x\in\mathbb R,\\
\cot(\operatorname{arccot}x)&=x,&&x\in\mathbb R.
\end{aligned}
$$

反向复合时，必须落在所选主值区间：

$$
\begin{aligned}
\arcsin(\sin x)&=x,&&x\in[-\pi/2,\pi/2],\\
\arccos(\cos x)&=x,&&x\in[0,\pi],\\
\arctan(\tan x)&=x,&&x\in(-\pi/2,\pi/2).
\end{aligned}
$$

### **5.5 反正割、反余割与负角公式**

为使原稿的公式含义明确，本篇采用

$$
\operatorname{arcsec}x=\arccos\frac1x,\qquad
\operatorname{arccsc}x=\arcsin\frac1x,\qquad |x|\geq 1.
$$

因而

$$
\operatorname{arcsec}x+\operatorname{arccsc}x=\frac\pi2,
\qquad |x|\geq 1.
$$

$$
\begin{aligned}
\arcsin(-x)&=-\arcsin x,&&|x|\leq 1,\\
\arctan(-x)&=-\arctan x,&&x\in\mathbb R,\\
\operatorname{arccsc}(-x)&=-\operatorname{arccsc}x,&&|x|\geq 1,\\
\arccos(-x)&=\pi-\arccos x,&&|x|\leq 1,\\
\operatorname{arccot}(-x)&=\pi-\operatorname{arccot}x,&&x\in\mathbb R,\\
\operatorname{arcsec}(-x)&=\pi-\operatorname{arcsec}x,&&|x|\geq 1.
\end{aligned}
$$

## **6. 复合函数与迭代（原第 12 页）**

复合时，要先核对内层函数的值是否落在外层定义域。原稿提示从定义域和代入方式检查复合层次。

设

$$
f(x)=\frac{x}{\sqrt{1+x^2}},\qquad
f_n=\underbrace{f\circ\cdots\circ f}_{n\text{ 次}}.
$$

注意此处 $f_n$ 是迭代，不是函数值的 $n$ 次幂。计算

$$
f_1(x)=\frac{x}{\sqrt{1+x^2}},\qquad
f_2(x)=\frac{x/\sqrt{1+x^2}}{\sqrt{1+x^2/(1+x^2)}}
=\frac{x}{\sqrt{1+2x^2}}.
$$

猜想并用数学归纳法证明

$$
f_n(x)=\frac{x}{\sqrt{1+nx^2}},\qquad n\geq 1.
$$

当 $n=1$ 时成立；若 $n=k$ 时成立，则

$$
\begin{aligned}
f_{k+1}(x)&=f(f_k(x))\\
&=\frac{x/\sqrt{1+kx^2}}{\sqrt{1+x^2/(1+kx^2)}}\\
&=\frac{x}{\sqrt{1+(k+1)x^2}}.
\end{aligned}
$$

## **7. 奇偶分解与奇偶延拓（原第 13 页）**

讨论奇偶性时，定义域必须关于原点对称。

### **7.1 唯一的奇偶分解**

任何定义在对称区间 $(-a,a)$ 上的函数，都可以唯一地分解成一个奇函数与一个偶函数之和：

$$
f(x)=g_1(x)+g_2(x),\quad
g_1(x)=\frac{f(x)-f(-x)}2,\quad
g_2(x)=\frac{f(x)+f(-x)}2.
$$

其中 $g_1$ 为奇函数、$g_2$ 为偶函数。唯一性由

$$
\begin{cases}
f(x)=g_1(x)+g_2(x),\\
f(-x)=-g_1(x)+g_2(x)
\end{cases}
$$

相加、相减即得。

### **7.2 偶延拓与奇延拓**

若 $f$ 定义在 $[0,a]$，其偶延拓到 $[-a,a]$ 为

$$
F_{\mathrm e}(x)=\begin{cases}
f(x),&0\leq x\leq a,\\
f(-x),&-a\leq x<0.
\end{cases}
$$

其奇延拓写为

$$
F_{\mathrm o}(x)=\begin{cases}
f(x),&0<x\leq a,\\
0,&x=0,\\
-f(-x),&-a\leq x<0.
\end{cases}
$$

## **8. 周期函数与严格单调函数（原第 14 页）**

### **8.1 周期函数**

周期 $T>0$ 要求定义域在平移 $\pm T$ 下保持不变，且对定义域中的每个 $x$，都有 $f(x+T)=f(x)$。并非每个周期函数都有最小正周期，例如常值函数的每个正数都是周期。

周期函数的定义域不一定是整个实数轴，例如 $\tan x$ 的定义域需排除 $\pi/2+k\pi$。

### **8.2 严格单调函数的反函数**

**定理：** 严格递增（严格递减）函数在值域上有反函数，且反函数也严格递增（严格递减）。

严格递增时，若 $x_1>x_2$，则 $f(x_1)>f(x_2)$，因此不存在两个不同自变量有相同函数值，反函数存在。

再设 $y_1>y_2$、$x_i=f^{-1}(y_i)$。若 $x_1\leq x_2$，则 $y_1=f(x_1)\leq f(x_2)=y_2$，矛盾；故 $x_1>x_2$，反函数严格递增。递减情况同理。

## **9. 有界性与初等函数（原第 15 页）**

函数 $f$ 在 $D$ 上有界，是指存在 $M>0$，使

$$
\forall x\in D,\qquad |f(x)|\leq M.
$$

无界则是

$$
\forall M>0,\quad\exists x_0\in D,\qquad |f(x_0)|>M.
$$

无界是定义域上整体的性质，不能仅凭无界便断言某个指定方向的极限为无穷大。原稿用示意图比较单支增长及多支无界曲线，图见原第 15 页。

### **9.1 例：证明无界**

对 $f(x)=1/x^3$、$x\in(0,1]$，任给 $M>0$，取

$$
x_0=\frac1{\sqrt[3]{M+1}}\in(0,1],
$$

则 $f(x_0)=M+1>M$，故无界。

### **9.2 初等函数与非初等函数**

基本初等函数包括常值函数、幂函数、指数函数、对数函数、三角函数与反三角函数。由它们经过有限次四则运算、复合，在共同有意义的区间上得到的函数称为初等函数。

原稿列举取整函数和狄利克雷函数为非初等函数的例子：

$$
D(x)=\begin{cases}
1,&x\in\mathbb Q,\\
0,&x\notin\mathbb Q.
\end{cases}
$$

分段写法本身不意味着非初等。例如

$$
f(x)=\begin{cases}-x,&x\leq 0,\\x,&x>0\end{cases}
=|x|=\sqrt{x^2}
$$

仍是初等函数。

## **10. 极坐标（原第 16 页）**

### **10.1 坐标及转换**

平面上固定极点 $O$、极轴与正角方向。点 $M$ 的极径 $r=|OM|\geq 0$，极角 $\theta$ 为极轴到射线 $OM$ 的有向角。原稿示意图见原第 16 页。

$$
x=r\cos\theta,\qquad y=r\sin\theta,\qquad r^2=x^2+y^2.
$$

当 $x\neq 0$ 时，$\tan\theta=y/x$；此式不能单独确定象限。极角相差 $2k\pi$ 表示同一方向，极点处极角不唯一。

### **10.2 单位圆的三种表示**

$$
\begin{aligned}
&x^2+y^2=1,\\
&r=1,\\
&\begin{cases}x=\cos\theta,\\y=\sin\theta,\end{cases}
\qquad 0\leq\theta\leq 2\pi.
\end{aligned}
$$

### **10.3 心形线**

原稿给出

$$
x^2+y^2=a\bigl(\sqrt{x^2+y^2}+x\bigr).
$$

代入极坐标得到 $r^2=ar(1+\cos\theta)$，从而心形线可写为

$$
r=a(1+\cos\theta),\qquad 0\leq\theta\leq 2\pi
$$

（按通常极径非负的表示取 $a>0$；原点仍包含在曲线上）。原稿此处止于代入式，化简和参数条件为整理补充。

### **10.4 例：圆心在 $(a,0)$ 的圆**

设 $a>0$，原曲线为

$$
(x-a)^2+y^2=a^2.
$$

代入 $x=r\cos\theta$、$y=r\sin\theta$，有

$$
r^2-2ar\cos\theta=0.
$$

因此可用

$$
r=2a\cos\theta,\qquad -\pi/2\leq\theta\leq\pi/2
$$

表示该圆；角度范围保证 $r\geq 0$。原点对应两端点，除去因子 $r$ 时没有因此丢掉曲线上的原点。

也可相对于圆心参数化：

$$
\begin{cases}
x-a=a\cos\varphi,\\
y=a\sin\varphi,
\end{cases}
\qquad 0\leq\varphi\leq 2\pi.
$$

## **手写原稿**

[在本站阅读手写原稿（原稿第 6～16 页）](/notes/read/cacu_notes/cacu_hand_note/note_cacu_2/)
