---
title: 微积分：集合与实数
description: 集合的可数性、实数、集合运算、邻域与上下确界。
pubDatetime: 2026-11-01T14:00:00+08:00
tags: [微积分, 课程笔记]
draft: false
featured: false
---

> 来源：`微积分11.4.pdf` 的 PDF 第 3～5 页（按文件页序，含首尾）。文末站内阅读稿第 1～3 页依次对应原稿第 3～5 页，首页仅保留数学内容。

## **1. 可数集与实数的不可数性（原第 3 页）**

能与自然数集建立一一对应的无限集合称为可数无限集。有理数可以写成 $p/q$（$p\in\mathbb Z$、$q\in\mathbb N^+$），通过枚举并略去重复项，可知 $\mathbb Q$ 可数。

### **1.1 对角线法**

证明 $(0,1)$ 中的实数不可数。反设可以列成

$$
x_1=0.a_{11}a_{12}a_{13}\cdots,\quad
x_2=0.a_{21}a_{22}a_{23}\cdots,\quad\ldots.
$$

对每个 $n$，选取

$$
b_n=\begin{cases}
2,&a_{nn}=1,\\
1,&a_{nn}\neq 1.
\end{cases}
$$

则 $x=0.b_1b_2b_3\cdots\in(0,1)$，且 $x$ 与第 $n$ 个数在第 $n$ 位不同，故 $x$ 不在表中，矛盾。这里新数只使用数字 1、2，避免了 $0.4999\cdots=0.5000\cdots$ 一类表示歧义（整理补充）。

因此实数不可数；又因为有理数可数，所以无理数不可数。

### **1.2 闭集的邻域刻画**

设 $X$ 是拓扑空间，$A\subseteq X$。如果对每个 $x\in X$，只要 $x$ 的每个邻域 $U$ 都满足 $U\cap A\neq\varnothing$，就有 $x\in A$，则 $A$ 为闭集。即 $A$ 包含自己的所有闭包点。

### **1.3 代数数与超越数**

若数 $x$ 是某个非零有理系数多项式的根，即存在 $n\geq 1$、$a_i\in\mathbb Q$、$a_n\neq 0$，使

$$
a_nx^n+a_{n-1}x^{n-1}+\cdots+a_0=0,
$$

则称 $x$ 为代数数。有理数、$\sqrt n$（$n\in\mathbb N$）、$\mathrm i$ 都是代数数。不是代数数的数称为超越数，原稿举例为 $e$、$\pi$、$\ln 2$、$\ln 3$。

## **2. 集合的基本概念（原第 4 页）**

集合具有确定性、无序性、互异性。空集 $\varnothing$ 是每个集合的子集；每个集合都是自身的子集；单元素集合恰有两个子集。

$$
\begin{aligned}
A\subseteq B&\iff \forall x\in A,\ x\in B,\\
A=B&\iff A\subseteq B\text{ 且 }B\subseteq A.
\end{aligned}
$$

交集、并集、差集及相对于全集 $S$ 的补集为

$$
\begin{aligned}
A\cap B&=\{x:x\in A\text{ 且 }x\in B\},\\
A\cup B&=\{x:x\in A\text{ 或 }x\in B\},\\
A\setminus B&=A\cap B^{\mathrm c},\\
\overline A&=S\setminus A,\qquad \overline A\cup A=S.
\end{aligned}
$$

这里差集公式中 $B^{\mathrm c}$ 是相对于同一全集取补。

### **2.1 有限集与无限集**

规定 $[n]=\{1,\ldots,n\}$（$n\geq 1$），$[0]=\varnothing$。若存在 $n\in\mathbb N_0$ 和双射 $f:[n]\to A$，则 $A$ 为有限集；否则为无限集。特别地，空集是有限集。

## **3. 邻域（原第 5 页）**

设 $a\in\mathbb R$、$\delta>0$，则

$$
\begin{aligned}
U(a,\delta)&=(a-\delta,a+\delta)=\{x:|x-a|<\delta\},\\
\overline U(a,\delta)&=[a-\delta,a+\delta],\\
U^{\circ}(a,\delta)&=U(a,\delta)\setminus\{a\}
=\{x:0<|x-a|<\delta\}.
\end{aligned}
$$

它们分别称为开邻域、闭邻域、去心邻域。邻域示意图见原第 5 页。

## **4. 最大值、最小值与上下界（原第 5 页）**

最大值、最小值必须是集合中的元素。例如 $(0,1)$ 没有最大值和最小值。

若存在实数 $M$，使对所有 $x\in A$ 都有 $x\leq M$，则称 $M$ 为 $A$ 的上界；若存在实数 $m$，使对所有 $x\in A$ 都有 $x\geq m$，则称 $m$ 为下界。集合可能没有上界或没有下界。

### **4.1 上确界**

$\beta=\sup A$ 表示 $\beta$ 是 $A$ 的最小上界，即

$$
\begin{cases}
\forall x\in A,\quad x\leq\beta,\\
\forall\varepsilon>0,\quad\exists x\in A,\quad\beta-\varepsilon<x\leq\beta.
\end{cases}
$$

第二条也可写成：任意 $\beta'<\beta$ 都不是上界，或者对任意 $\delta>0$ 都有 $U(\beta,\delta)\cap A\neq\varnothing$。这里 $U(\beta,\delta)$ 表示包含中心 $\beta$ 的普通邻域，不能一般地换成去心邻域。

### **4.2 下确界与确界原理**

$\alpha=\inf A$ 表示 $\alpha$ 是最大下界；等价地，$\alpha$ 是下界，且对每个 $\varepsilon>0$，存在 $x\in A$ 满足 $\alpha\leq x<\alpha+\varepsilon$（下确界的对偶刻画为整理补充）。

确界不一定属于原集合。例如 $A=(0,1)$ 时，$\inf A=0$、$\sup A=1$。

**确界原理：** 非空、上有界的实数集有唯一的上确界；非空、下有界的实数集有唯一的下确界。

## **手写原稿**

[在本站阅读手写原稿（原稿第 3～5 页）](/notes/read/cacu_notes/cacu_hand_note/note_cacu_1/)
