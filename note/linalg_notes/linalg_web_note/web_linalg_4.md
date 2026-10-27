---
# 修改标题、摘要和实际发布时间；保留信息区开头及末尾的 ---。
title: "线性代数：复数与一元多项式"
description: "包含复数与一元多项式（类似强基内容）"
pubDatetime: 2026-10-26T16:40:00+08:00
tags: [学习记录, 课程笔记]
# 默认允许发布；暂不公开时改为 true。
draft: false
featured: false
---



> 来源：`线性代数10.22.pdf` 的 PDF 第 21～22 页（按文件页序）。摘录 `note_linalg_4.pdf` 第 1～2 页对应原第 21～22 页；第 23 页不在本次范围内。

## 1. 复数（原第 21 页）

### 1.1 代数形式与几何表示

$$
\mathbb C=\{x+iy\mid x,y\in\mathbb R\},\qquad i^2=-1.
$$

有序实数对 $(x,y)$ 对应复数 $z=x+iy$，其中

$$
\operatorname{Re}z=x,\qquad\operatorname{Im}z=y.
$$

复数还对应复平面上的点 $(x,y)$，或从原点指向该点的向量。原稿的坐标图及辐角示意见配套 PDF 第 1 页。

### 1.2 三角形式与指数形式

非零复数可写成

$$
z=r(\cos\theta+i\sin\theta),\qquad
r=|z|=\sqrt{x^2+y^2},
$$

其中 $x=r\cos\theta$、$y=r\sin\theta$，$\theta$ 为辐角。

一般辐角相差 $2k\pi$，主辐角在选定区间内唯一；$z=0$ 没有确定辐角。这里用 $\theta$ 表示所取的一个辐角。

由欧拉公式

$$
e^{i\theta}=\cos\theta+i\sin\theta,
$$

可写 $z=re^{i\theta}$。

设 $z_j=r_je^{i\theta_j}$，则

$$
\begin{aligned}
z_1z_2&=r_1r_2[\cos(\theta_1+\theta_2)+i\sin(\theta_1+\theta_2)],\\
\frac{z_1}{z_2}&=\frac{r_1}{r_2}[\cos(\theta_1-\theta_2)+i\sin(\theta_1-\theta_2)]
\quad(z_2\neq 0).
\end{aligned}
$$

乘法将模相乘、辐角相加；除法将模相除、辐角相减。对正整数 $n$，De Moivre 公式为

$$
z^n=r^ne^{in\theta}=r^n(\cos n\theta+i\sin n\theta).
$$

由欧拉公式及其负角形式相加、相减，得到

$$
\cos\theta=\frac{e^{i\theta}+e^{-i\theta}}2,
\qquad
\sin\theta=\frac{e^{i\theta}-e^{-i\theta}}{2i}.
$$

## 2. 一元多项式（原第 22 页）

### 2.1 定义、次数与系数

设 $P$ 为数域，$x$ 为变量，$n$ 为非负整数。表达式

$$
f(x)=a_nx^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0
=\sum_{k=0}^{n}a_kx^k,\qquad a_k\in P,
$$

称为数域 $P$ 上的一元多项式。$P=\mathbb R$ 时称实系数多项式；$P=\mathbb C$ 时称复系数多项式。

若 $a_n\neq 0$，则 $a_nx^n$ 为首项，$a_n$ 为首项系数，$a_0$ 为常数项，$n=\deg f$ 为次数。非零常数多项式的次数为 $0$；零多项式的次数另作约定，不由上述定义确定（整理补充）。

### 2.2 根与因式定理

若 $c\in P$ 且 $f(c)=0$，则 $c$ 为 $f(x)$ 的一个根。

**因式定理：**

$$
f(c)=0\iff (x-c)\mid f(x)
\iff f(x)=(x-c)h(x),\quad h(x)\in P[x].
$$

### 2.3 重根

若

$$
f(x)=(x-c)^kh(x),\qquad h(c)\neq 0,
$$

则 $c$ 为 $f$ 的 $k$ 重根。$k=1$ 称单根；$k\geq 2$ 称重根。

### 2.4 代数学基本定理与因式分解

**代数学基本定理：** 每个次数至少为 $1$ 的复系数多项式，在复数域中至少有一个根。

推论：每个 $n$ 次复系数多项式（$n\geq 1$），按重数计算恰有 $n$ 个复根。若这些根为 $z_1,\ldots,z_n$，首项系数为 $a_n\neq 0$，则

$$
f(x)=a_n(x-z_1)(x-z_2)\cdots(x-z_n).
$$

这里允许 $z_i$ 重复。原稿下一页的乘积展开和单位根例题不在本份指定页码内。

## 手写原稿

[查看手写原稿（note_linalg_4.pdf，共 2 页）](/notes/linalg_notes/linalg_hand_note/note_linalg_4.pdf)
