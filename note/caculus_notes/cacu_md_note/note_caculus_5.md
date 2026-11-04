---
title: 微积分：重要极限、子列与柯西收敛准则
description: 构造自然常数 e，证明调和数减对数收敛，整理子列、聚点定理与柯西准则。
tags: [微积分, 课程笔记]
draft: true
---

# **微积分：重要极限、子列与柯西收敛准则**

> 来源：`微积分11.4.pdf` 的 PDF 第 27～32 页，按文件页序。原第 27 页标注课堂日期“9.28”。本篇直接关联完整手稿，未生成摘录 PDF；所有内容保留为未发布整理稿。

## **1. 重要极限与自然常数 e（原第 27～28 页）**

研究数列

$$
b_n=\left(1+\frac1n\right)^n.
$$

先证其单调递增且有上界，再由单调收敛定理定义其极限为 $e$。

### **1.1 方法一：二项式展开证明单调性**

由二项式公式，

$$
b_n=2+\sum_{j=2}^n\frac1{j!}
\prod_{\ell=1}^{j-1}\left(1-\frac\ell n\right).
$$

把 $n$ 换成 $n+1$ 后，对每个已有的 $j$，各因子均增大，且还多出一个正项，因此

$$
b_{n+1}>b_n.
$$

又因各因子不大于 $1$，

$$
\begin{aligned}
b_n
&\leq 1+1+\frac1{2!}+\cdots+\frac1{n!}\\
&\leq 2+\frac12+\frac1{2^2}+\cdots+\frac1{2^{n-1}}\\
&=3-\frac1{2^{n-1}}<3.
\end{aligned}
$$

其中用到 $j!\geq 2^{j-1}$。故 $\{b_n\}$ 收敛。

### **1.2 方法二：幂差分解证明单调性并估计上界**

若 $0<a<b$，则

$$
\frac{b^{n+1}-a^{n+1}}{b-a}
=b^n+b^{n-1}a+\cdots+a^n<(n+1)b^n,
$$

因此

$$
a^{n+1}>b^n\bigl((n+1)a-nb\bigr).
$$

取

$$
a=1+\frac1{n+1},\qquad b=1+\frac1n,
$$

此时 $(n+1)a-nb=1$，故

$$
\left(1+\frac1{n+1}\right)^{n+1}
>\left(1+\frac1n\right)^n.
$$

同一个不等式取 $a=1$、$b=1+1/(2n)$，得到

$$
1>\left(1+\frac1{2n}\right)^n
\left(n+1-n\left(1+\frac1{2n}\right)\right)
=\frac12\left(1+\frac1{2n}\right)^n.
$$

所以

$$
b_{2n}=\left(1+\frac1{2n}\right)^{2n}<4.
$$

结合递增性，全部项都有上界 $4$，同样可知收敛。

### **1.3 方法三：算术平均与几何平均不等式**

令

$$
c_n=\left(1+\frac1n\right)^{n+1}.
$$

对 $n+1$ 个数 $n/(n+1)$ 及另一个数 $1$ 应用均值不等式：

$$
\begin{aligned}
\frac1{c_n}
&=\left(\frac n{n+1}\right)^{n+1}\cdot1\\
&<\left(\frac{(n+1)\frac n{n+1}+1}{n+2}\right)^{n+2}
=\left(\frac{n+1}{n+2}\right)^{n+2}
=\frac1{c_{n+1}}.
\end{aligned}
$$

故 $c_n$ 严格递减。对 $n$ 个数 $1+1/n$ 和一个数 $1$ 同样应用均值不等式，得

$$
\begin{aligned}
b_n
&=\left(1+\frac1n\right)^n\cdot1\\
&<\left(\frac{n(1+1/n)+1}{n+1}\right)^{n+1}
=\left(1+\frac1{n+1}\right)^{n+1}
=b_{n+1}.
\end{aligned}
$$

于是 $b_n$ 递增、$c_n$ 递减，并且 $b_n<c_n$。由

$$
c_n=b_n\left(1+\frac1n\right),
$$

两者极限相同，记为 $e$。得到重要估计

$$
\left(1+\frac1n\right)^n<e
<\left(1+\frac1n\right)^{n+1}.
$$

因而 $e$ 是前一数列所有项的上确界，也是后一数列所有项的下确界。

### **1.4 对数不等式旁记**

原稿在第 28 页末记有

$$
\frac{x}{1+x}<\ln(1+x)<x\qquad(x>-1,\ x\neq 0).
$$

当 $x=0$ 时三项均为 $0$，应改用等号。

> **Q1 · 缺失条件（原第 28 页）：** 原稿未在对数不等式旁标出定义域和严格性条件。正文补为 $x>-1$、$x\neq 0$；$x=0$ 时取等号。

## **2. 调和数减对数的收敛性（原第 29 页）**

设

$$
a_n=1+\frac12+\cdots+\frac1n-\ln n.
$$

证明 $\{a_n\}$ 收敛。由上一节的 $e$ 的两侧估计取对数可得

$$
\frac1{n+1}<\ln\left(1+\frac1n\right)<\frac1n.
$$

因此

$$
a_{n+1}-a_n
=\frac1{n+1}-\ln\left(1+\frac1n\right)<0,
$$

即数列严格递减。另一方面，将右侧不等式从 $j=1$ 加到 $n$：

$$
\begin{aligned}
1+\frac12+\cdots+\frac1n
&>\sum_{j=1}^n\ln\left(1+\frac1j\right)\\
&=\ln\left(2\cdot\frac32\cdots\frac{n+1}{n}\right)\\
&=\ln(n+1)>\ln n.
\end{aligned}
$$

所以 $a_n>0$。由单调收敛定理，$\{a_n\}$ 收敛。本页仅要求证明收敛，不求其极限的闭式。

## **3. 子列及其极限（原第 30 页）**

### **3.1 定义**

从无穷数列 $\{a_n\}$ 中按原有次序取出无穷多项，得到

$$
a_{n_1},a_{n_2},\ldots,a_{n_k},\ldots,
\qquad n_1<n_2<\cdots<n_k<\cdots,
$$

称为原数列的一个子列，记为 $\{a_{n_k}\}$。因为下标严格递增，有 $n_k\geq k$。

### **3.2 用所有子列判别收敛**

数列 $a_n\to a$，当且仅当它的每个子列都收敛到同一个数 $a$。

必要性：对任意 $\varepsilon>0$，存在 $N$ 使 $n>N$ 时 $|a_n-a|<\varepsilon$。当 $k>N$ 时，$n_k\geq k>N$，故 $|a_{n_k}-a|<\varepsilon$。

充分性：原数列自身就是一个子列，故结论直接成立。

### **3.3 奇偶子列判别**

原数列收敛，当且仅当奇数项子列与偶数项子列都收敛，且极限相同。

必要性由子列定理得到。反之，设

$$
a_{2k}\to a,\qquad a_{2k+1}\to a.
$$

对任意 $\varepsilon>0$，选 $K$ 使 $k>K$ 时这两个子列都与 $a$ 相差小于 $\varepsilon$。取 $N=2K+1$，则每个 $n>N$ 无论奇偶，其对应的子列下标均大于 $K$，因此 $|a_n-a|<\varepsilon$。

## **4. 有界数列的收敛子列定理（原第 31 页）**

**定理 1.6（魏尔斯特拉斯定理）：** 每个有界实数数列都存在一个收敛子列。

若一个有界数列不收敛，则能找到两个极限不同的收敛子列。原稿还记有“或一个子列极限不存在”的说法，它可作为非收敛的现象描述，但在有界情形下，两个不同的子列极限已经可以作为完整判据。

**整理补充：** 取一个收敛子列趋于 $a$。若原数列不趋于 $a$，就有 $\varepsilon_0>0$ 以及无穷多项满足 $|a_n-a|\geq\varepsilon_0$。从这些项组成的有界子列再抽取收敛子列，其极限必与 $a$ 不同。

## **5. 柯西收敛准则（原第 31 页）**

**定理 1.7：** 实数数列 $\{a_n\}$ 收敛的充分必要条件是

$$
\forall\varepsilon>0,\ \exists N\in\mathbb N^+,\
\forall n,m>N,\quad |a_n-a_m|<\varepsilon.
$$

等价地，可写成

$$
\forall\varepsilon>0,\ \exists N\in\mathbb N^+,\
\forall n>N,\ \forall p\in\mathbb N^+,\quad
|a_{n+p}-a_n|<\varepsilon.
$$

这里的 $N$ 必须对所有正整数 $p$ 同时有效。

### **5.1 正弦项加权和的例题**

对固定 $\theta\in\mathbb R$，设

$$
a_n=\frac{\sin\theta}{2}+
\frac{\sin(\theta^2)}{2^2}+\cdots+
\frac{\sin(\theta^n)}{2^n}.
$$

证明 $\{a_n\}$ 收敛。对 $m>n$，

$$
\begin{aligned}
|a_m-a_n|
&=\left|\sum_{j=n+1}^m\frac{\sin(\theta^j)}{2^j}\right|\\
&\leq\sum_{j=n+1}^m\frac1{2^j}
=\frac1{2^n}\left(1-\frac1{2^{m-n}}\right)
<\frac1{2^n}.
\end{aligned}
$$

对任意 $\varepsilon>0$，选 $N$ 使 $2^{-N}<\varepsilon$，则 $m>n>N$ 时上述差小于 $\varepsilon$；交换 $m,n$ 同样成立，故由柯西准则可知收敛。

## **6. 发散的柯西判据及调和数列（原第 32 页）**

**定理 1.8：** 实数数列发散，当且仅当

$$
\exists\varepsilon_0>0,\ \forall N\in\mathbb N^+,\
\exists n>N,\ \exists p\in\mathbb N^+,\quad
|a_{n+p}-a_n|\geq\varepsilon_0.
$$

这是柯西收敛条件的逻辑否定。

> **Q3 · 确定错误（原第 32 页）：** 原稿的“存在 $\varepsilon_0$”后，差值下界写成了未对应量化的 $\varepsilon$。正文统一为 $\varepsilon_0$，并采用逻辑否定所得的 $\geq$；若能证明严格大于，也足以说明发散。

**例：** 证明调和部分和

$$
H_n=1+\frac12+\cdots+\frac1n
$$

发散。对任意 $p\geq 1$，

$$
H_{n+p}-H_n
=\frac1{n+1}+\cdots+\frac1{n+p}
\geq\frac p{n+p}.
$$

取 $p=n$ 时，由实际各项比较可进一步得到

$$
H_{2n}-H_n\geq\frac12.
$$

取 $\varepsilon_0=1/3$。对任意 $N$，令 $n=N+1$、$p=n$，便有

$$
|H_{n+p}-H_n|\geq\frac12>\varepsilon_0.
$$

因此该数列不满足柯西条件，故发散。

## **核对清单**

- **Q1（第 28 页，已补条件）：** 对数不等式要求 $x>-1$，严格不等式排除 $x=0$。
- **Q3（第 32 页，已修正记号）：** 发散准则中的固定正数统一写为 $\varepsilon_0$。

## **手写原稿**

[查看手写原稿（本篇对应 PDF 第 27～32 页）](/notes/caculus_notes/cacu_hand_note/%E5%BE%AE%E7%A7%AF%E5%88%8611.4.pdf#page=27)
