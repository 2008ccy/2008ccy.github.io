---
title: 微积分：柯西准则的应用与函数极限
description: 数列收敛和发散的证明、函数极限的定义与性质、连续性及根式渐近例题。
tags: [微积分, 课程笔记]
draft: true
---

# **微积分：柯西准则的应用与函数极限**

> 来源：`微积分11.4.pdf` 的 PDF 第 33～39 页，按文件页序。原第 33 页记有课堂日期“9.30”。本篇直接关联完整源 PDF；原第 39 页未写完的根式例题，另以“整理补充”完成核算。本篇暂不发布。

## **1. 柯西准则的两个例题（原第 33 页）**

### **1.1 证明正弦数列发散**

证明 $\{\sin n\}$ 发散。对任意足够大的整数 $k$，区间

$$
\left(2k\pi+\frac\pi4,\ 2k\pi+\frac{3\pi}4\right),
\qquad
\left(2k\pi+\frac{5\pi}4,\ 2k\pi+\frac{7\pi}4\right)
$$

的长度都为 $\pi/2>1$，所以分别含有整数 $n_k,m_k$。于是

$$
\sin n_k>\frac{\sqrt2}{2},\qquad
\sin m_k<-\frac{\sqrt2}{2}.
$$

给定任意 $N$，可使 $k$ 足够大而保证 $n_k,m_k>N$，但

$$
|\sin n_k-\sin m_k|>\sqrt2>1.
$$

取 $\varepsilon_0=1$，可知柯西条件不成立，故数列发散。

### **1.2 平方倒数的部分和收敛**

令

$$
a_n=1+\frac1{2^2}+\cdots+\frac1{n^2}.
$$

对任意 $p\in\mathbb N^+$，

$$
\begin{aligned}
0<a_{n+p}-a_n
&=\sum_{j=n+1}^{n+p}\frac1{j^2}\\
&<\sum_{j=n+1}^{n+p}\frac1{(j-1)j}\\
&=\sum_{j=n+1}^{n+p}\left(\frac1{j-1}-\frac1j\right)\\
&=\frac1n-\frac1{n+p}<\frac1n.
\end{aligned}
$$

给定 $\varepsilon>0$，取 $N=\lfloor1/\varepsilon\rfloor+1$，则任意 $n>N$、$p\geq 1$ 都满足 $|a_{n+p}-a_n|<\varepsilon$。由柯西准则，数列收敛。

## **2. 相邻差的绝对值部分和有界（原第 34 页上部）**

**例：** 若存在常数 $C>0$，使每个 $n\geq 1$ 都有

$$
|a_2-a_1|+|a_3-a_2|+\cdots+|a_{n+1}-a_n|\leq C,
$$

证明 $\{a_n\}$ 收敛。

令

$$
b_n=\sum_{j=1}^{n}|a_{j+1}-a_j|.
$$

$b_n$ 单调不减且有上界 $C$，故收敛。由其柯西性质，对任意 $\varepsilon>0$，存在 $N$ 使 $n>N$、$p\geq 1$ 时

$$
\begin{aligned}
\varepsilon>b_{n+p}-b_n
&=\sum_{j=n+1}^{n+p}|a_{j+1}-a_j|\\
&\geq\left|\sum_{j=n+1}^{n+p}(a_{j+1}-a_j)\right|\\
&=|a_{n+p+1}-a_{n+1}|.
\end{aligned}
$$

把下标整体平移一项，即得到 $\{a_n\}$ 的柯西条件，所以它收敛。

## **3. 无穷远处的函数极限（原第 34 页下部）**

原稿以

$$
\lim_{x\to+\infty}\arctan x=\frac\pi2
$$

说明函数极限。对每个足够小的 $\varepsilon>0$，可取 $X=\cot\varepsilon$，当 $x>X$ 时，

$$
\left|\arctan x-\frac\pi2\right|
=\frac\pi2-\arctan x<\varepsilon.
$$

原稿示意图表达：反正切曲线随着 $x$ 增大而趋近水平直线 $y=\pi/2$；另一侧渐近线为 $y=-\pi/2$，详见原第 34 页。

> **Q2 · 缺失条件（原第 34 页）：** 直接选 $X=\cot\varepsilon$ 的证明须先限制 $0<\varepsilon<\pi/2$。要覆盖任意误差，可先取 $\eta=\min\{\varepsilon/2,\pi/4\}$，再令 $X=\cot\eta$，得到误差小于 $\eta<\varepsilon$。正文保留原方法，并补明这一范围。

## **4. 有限点处函数极限的定义（原第 35 页）**

设 $f$ 在 $x_0$ 的某个去心邻域

$$
\mathring U(x_0,\delta_0)
=\{x:0<|x-x_0|<\delta_0\}
$$

内有定义。若存在常数 $A$，使得

$$
\forall\varepsilon>0,\ \exists\delta>0,\
\forall x,\quad 0<|x-x_0|<\delta
\Longrightarrow |f(x)-A|<\varepsilon,
$$

则称 $f(x)$ 在 $x\to x_0$ 时以 $A$ 为极限，记作

$$
\lim_{x\to x_0}f(x)=A.
$$

实际证明时可令 $\delta\leq\delta_0$，保证所用的去心邻域落在定义域内。

### **4.1 定义证明例一**

证明

$$
\lim_{x\to-1}\frac{x+1}{x^2-1}=-\frac12.
$$

对 $x\neq -1,1$，

$$
\left|\frac{x+1}{x^2-1}+\frac12\right|
=\left|\frac1{x-1}+\frac12\right|
=\frac{|x+1|}{2|x-1|}.
$$

先限制 $|x+1|<1$，则 $-2<x<0$，从而 $|x-1|>1$。于是

$$
\left|\frac{x+1}{x^2-1}+\frac12\right|
<\frac{|x+1|}{2}.
$$

给定 $\varepsilon>0$，取

$$
\delta=\min\{1,2\varepsilon\},
$$

当 $0<|x+1|<\delta$ 时，误差小于 $\varepsilon$。

### **4.2 定义证明的一般步骤**

1. 先取固定的 $\delta_0>0$，把变量限制在便于估计且在定义域内的去心邻域。
2. 估计 $|f(x)-A|$，根据目标 $\varepsilon$ 找到所需的 $\delta^*$。
3. 取 $\delta=\min\{\delta_0,\delta^*\}$，完整写出定义中的蕴含关系。

## **5. 定义证明例二及极限性质（原第 36 页）**

### **5.1 极限计算**

证明

$$
\lim_{x\to1}\frac{x^2-1}{x^2-x}=2.
$$

当 $x\neq 0,1$ 时，

$$
\left|\frac{x^2-1}{x^2-x}-2\right|
=\left|\frac{x+1}{x}-2\right|
=\frac{|x-1|}{|x|}.
$$

若 $|x-1|<1/2$，则 $1/2<x<3/2$，因此误差小于 $2|x-1|$。给定 $\varepsilon>0$，选

$$
\delta=\min\left\{\frac12,\frac\varepsilon2\right\},
$$

即可完成证明。

### **5.2 极限与函数在该点的值**

极限只考察去心邻域内的函数值，与 $f(x_0)$ 是否存在或取何值无关。函数极限和数列极限有相似的误差控制思想，但函数极限的变量在定义域内趋近，不能只检查少数取值。

$\delta$ 可依赖于 $\varepsilon$。缩小 $\delta$ 后，原来成立的误差条件仍成立；不要求任意选择的 $\delta(\varepsilon)$ 具有固定的单调关系。

### **5.3 左、右极限与基本运算**

$$
\lim_{x\to x_0}f(x)=A
\iff
\lim_{x\to x_0^-}f(x)=
\lim_{x\to x_0^+}f(x)=A.
$$

这里假设左右两侧都有相应的定义域点。原稿还列出函数极限的唯一性、局部有界性、保号性与四则运算。

**整理补充其具体表述：** 若有限极限存在，则它唯一，并且函数在某个去心邻域内有界；若极限非零，则充分靠近时与极限同号。若 $f(x)\to A$、$g(x)\to B$，则

$$
f(x)\pm g(x)\to A\pm B,\quad
f(x)g(x)\to AB,\quad
\frac{f(x)}{g(x)}\to\frac AB\quad(B\neq 0).
$$

## **6. 连续性与一个导数相关结论（原第 37 页上部）**

若 $f$ 在 $x_0$ 的某邻域内有定义，并且

$$
\lim_{x\to x_0}f(x)=f(x_0),
$$

则称 $f$ 在 $x_0$ 处连续。等价定义为

$$
\forall\varepsilon>0,\ \exists\delta>0,\quad
|x-x_0|<\delta\Longrightarrow
|f(x)-f(x_0)|<\varepsilon.
$$

**原稿结论：** 若有限极限

$$
\lim_{x\to0}\frac{f(x)}x=A
$$

存在，则

$$
\lim_{x\to0}f(x)
=\lim_{x\to0}\left(\frac{f(x)}x\cdot x\right)
=A\cdot0=0.
$$

如果另外有 $f(0)=0$，则

$$
f'(0)=\lim_{x\to0}\frac{f(x)-f(0)}{x-0}
=\lim_{x\to0}\frac{f(x)}x=A.
$$

> **Q3 · 缺失条件（原第 37 页）：** 原稿直接续写 $f'(0)=A$，但极限条件不限制 $f(0)$。只有原函数已经满足 $f(0)=0$ 时才能这样结论；若 $f$ 在 $0$ 尚未定义，可以补定义 $f(0)=0$，再得到延拓后函数在 $0$ 可导。正文已补此条件。

## **7. 指数函数在零点的极限（原第 37 页下部）**

设 $a>1$ 为常数，证明

$$
\lim_{x\to0}a^x=1.
$$

分别考察两侧：当 $x>0$ 时，$a^x>1$；对任意 $\varepsilon>0$，取

$$
\delta_+=\log_a(1+\varepsilon)>0,
$$

则 $0<x<\delta_+$ 保证 $|a^x-1|=a^x-1<\varepsilon$。

当 $x<0$ 时，$a^x<1$。先取 $0<\eta<\min\{1,\varepsilon\}$，再取

$$
\delta_-=-\log_a(1-\eta)>0.
$$

若 $-\delta_-<x<0$，则 $a^x>1-\eta$，所以 $|a^x-1|=1-a^x<\eta<\varepsilon$。左右极限相同，故结论成立。

> **Q4 · 缺失条件（原第 37 页）：** 原稿左极限的页边推导选用了 $-\log_a(1-\varepsilon)$，须先限制 $0<\varepsilon<1$，才能保证对数有定义。正文另取较小的 $\eta$ 处理任意误差。原稿页边的 $|a^x-1|=1-a^x$ 属于 $x<0$ 的左极限推导，符号本身正确。

## **8. 复合极限与幂差公式（原第 38 页上部）**

### **8.1 复合极限的去心邻域问题**

原稿提醒：证明复合函数极限时，要注意内层函数值是否落在外层函数所需的去心邻域中。若

$$
u(x)\to u_0,\qquad \lim_{u\to u_0}f(u)=A,
$$

则一种充分条件是充分靠近时 $u(x)\neq u_0$。如果内层可反复等于 $u_0$，则还需保证 $f(u_0)=A$，例如要求外层在 $u_0$ 连续，才能直接套用复合极限。

### **8.2 整数幂与根式的极限**

对正整数 $m$，由

$$
x^m-1=(x-1)(x^{m-1}+x^{m-2}+\cdots+x+1),
$$

得到

$$
\lim_{x\to1}\frac{x^m-1}{x-1}=m,
\qquad
\lim_{x\to1}\frac{x-1}{x^m-1}=\frac1m.
$$

再令 $t=\sqrt[m]{x}$，则 $t\to1$，故

$$
\lim_{x\to1}\frac{\sqrt[m]{x}-1}{x-1}
=\lim_{t\to1}\frac{t-1}{t^m-1}
=\frac1m.
$$

## **9. 根式在正无穷处的线性渐近式（原第 38 页下部）**

求常数 $a_2,b_2$，使

$$
\lim_{x\to+\infty}
\left(\sqrt{x^2-x+1}-a_2x-b_2\right)=0.
$$

**整理补充主项判断：** 两边除以 $x$，利用 $x>0$，有

$$
\frac{\sqrt{x^2-x+1}}x
=\sqrt{1-\frac1x+\frac1{x^2}}\to1,
$$

所以必须 $a_2=1$。然后有理化：

$$
\begin{aligned}
\sqrt{x^2-x+1}-x
&=\frac{-x+1}{\sqrt{x^2-x+1}+x}\\
&=\frac{-1+1/x}{\sqrt{1-1/x+1/x^2}+1}
\to-\frac12.
\end{aligned}
$$

故

$$
a_2=1,\qquad b_2=-\frac12.
$$

原稿采用一般参数有理化后比较系数：

$$
\sqrt{x^2-x+1}-a_2x-b_2
=\frac{(1-a_2^2)x^2-(1+2a_2b_2)x+1-b_2^2}
{\sqrt{x^2-x+1}+a_2x+b_2}.
$$

结合主项符号确定 $a_2=1$，再令 $1+2a_2b_2=0$，与上述结果一致。

## **10. 负无穷处的对应例题与数列刻画（原第 39 页）**

### **10.1 根式在负无穷处的渐近式**

求 $a_1,b_1$，使

$$
\lim_{x\to-\infty}
\left(\sqrt{x^2-x+1}-a_1x-b_1\right)=0.
$$

原稿令 $u=-x$，则 $u\to+\infty$，变为

$$
\lim_{u\to+\infty}
\left(\sqrt{u^2+u+1}+a_1u-b_1\right)=0.
$$

原稿到此停止，未写出参数和后续计算。

**整理补充：** 比较 $u$ 的主项可知 $1+a_1=0$，故 $a_1=-1$。再计算

$$
\begin{aligned}
\sqrt{u^2+u+1}-u
&=\frac{u+1}{\sqrt{u^2+u+1}+u}\\
&=\frac{1+1/u}{\sqrt{1+1/u+1/u^2}+1}
\to\frac12.
\end{aligned}
$$

所以

$$
a_1=-1,\qquad b_1=\frac12.
$$

> **Q5 · 原稿未完成（原第 39 页）：** 负无穷处根式例题只写了换元。正文明确标出补写部分，核算得到 $a_1=-1,b_1=1/2$；这不是原稿已有的答案。

### **10.2 函数极限的数列刻画**

原稿末尾写出：若 $f(x)\to A$（$x\to x_0$），则对任意处于定义域去心邻域内、满足 $x_n\to x_0$ 的数列，都有

$$
f(x_n)\to A.
$$

**整理补充：** 完整的海涅定理给出等价关系：在 $x_0$ 为定义域聚点时，

$$
\lim_{x\to x_0}f(x)=A
\iff
\left[\ \forall\{x_n\}\subset D\setminus\{x_0\},\
x_n\to x_0\Longrightarrow f(x_n)\to A\ \right].
$$

不能只验证某一个趋近数列；右侧要求对所有这类数列都成立。

## **核对清单**

- **Q2（第 34 页，已补条件）：** 反正切证明选 $X=\cot\varepsilon$ 时先限制误差范围，任意误差用较小的 $\eta$ 处理。
- **Q3（第 37 页，已补条件）：** 从 $\lim f(x)/x=A$ 推出原函数 $f'(0)=A$，必须再有 $f(0)=0$。
- **Q4（第 37 页，已补条件）：** 左极限选取 $-\log_a(1-\varepsilon)$ 时需先限制误差小于 $1$。
- **Q5（第 39 页，原稿未完成）：** 本篇补出负无穷根式例题的推导和 $a_1=-1,b_1=1/2$，请区分原稿与补充。

## **手写原稿**

[查看手写原稿（本篇对应 PDF 第 33～39 页）](/notes/cacu_notes/cacu_hand_note/%E5%BE%AE%E7%A7%AF%E5%88%8611.4.pdf#page=33)
