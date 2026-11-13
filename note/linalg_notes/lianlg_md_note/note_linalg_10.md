---
title: 线性代数：线性相关判别与向量组等价
description: 线性相关判别与向量组等价的定义、定理、证明和原稿例题，附逐页手写原稿。
tags: [线性代数, 课程笔记]
draft: true
---

# **线性代数：线性相关判别与向量组等价**

> 来源：Goodnotes“线性代数”原第 55～62 页（按笔记文件页序，含首尾）。日期导出 `线性代数11.13.pdf` 第 10～17 页对应本篇；配套 `note_linalg_10.pdf` 第 1～8 页依次对应原第 55～62 页。原稿略写处的证明、构造或计算已明确标作整理补充。

## **1. 矩阵幂作用于向量的无关性例题（原第 55 页）**

原稿标注日期“11.3”及题号“P121，13”。设 $A\in P^{n\times n}$、$b\in P^{n\times1}$，$m$ 为非负整数，且

$$
A^mb\neq 0,\qquad A^{m+1}b=0.
$$

证明 $b,Ab,\ldots,A^mb$ 线性无关。

设

$$
k_0b+k_1Ab+\cdots+k_mA^mb=0.
$$

先左乘 $A^m$。由 $A^{m+1}b=0$ 可知对每个 $p\geq 1$，

$$
A^{m+p}b=A^{p-1}(A^{m+1}b)=0,
$$

因此只剩 $k_0A^mb=0$，由 $A^mb\neq 0$ 得 $k_0=0$。

在余下关系中左乘 $A^{m-1}$，同理得 $k_1A^mb=0$，所以 $k_1=0$。继续得到 $k_0=\cdots=k_m=0$，故向量组无关。

**整理补充：** 若 $m=0$，条件即 $b\neq 0,Ab=0$，单向量组 $(b)$ 无关，结论仍成立。由无关向量个数不超过维数，还可知 $m+1\leq n$。

原稿题面指数经放大核对为 $m+1$，与证明一致。

## **2. 用矩阵秩判别向量组相关性（原第 56 页）**

设 $\alpha_1,\ldots,\alpha_s\in P^n$，按列组成

$$
A=(\alpha_1\ \cdots\ \alpha_s)\in P^{n\times s}.
$$

则

$$
\begin{aligned}
\alpha_1,\ldots,\alpha_s\text{ 相关}
&\iff Ax=0\text{ 有非零解}\\
&\iff r(A)<s;\\
\alpha_1,\ldots,\alpha_s\text{ 无关}
&\iff Ax=0\text{ 只有零解}\\
&\iff r(A)=s.
\end{aligned}
$$

注意比较的是秩与**向量个数 $s$**，不能无条件改成与分量数 $n$ 比较。

## **3. 相关与可由其余向量表示（原第 57 页）**

当 $s\geq 2$ 时：

- 向量组相关，当且仅当其中**至少一个**向量可由其余 $s-1$ 个向量线性表示。
- 向量组无关，当且仅当其中**任意一个**向量都不能由其余向量线性表示。

证明第一条：若

$$
t_1\alpha_1+\cdots+t_s\alpha_s=0
$$

为一个非零系数关系，选 $t_j\neq 0$，则

$$
\alpha_j=-\sum_{i\neq j}\frac{t_i}{t_j}\alpha_i.
$$

反之，若 $\alpha_j=\sum_{i\neq j}c_i\alpha_i$，移项得到一个 $\alpha_j$ 系数为 $1$ 的关系，故原组相关。

第二条为第一条的逻辑否定。原稿红字提示要区分“至少一个”与“任意一个”，不要把相关性误读为每个向量都可由其余向量表示。

## **4. 增添一个向量与表示唯一性（原第 58～59 页上部）**

设 $\alpha_1,\ldots,\alpha_s$ 无关，但 $\alpha_1,\ldots,\alpha_s,\beta$ 相关，则 $\beta$ 可由原组**唯一**线性表示。

由相关性，有不全为零的 $t_1,\ldots,t_s,t_{s+1}$，使

$$
t_1\alpha_1+\cdots+t_s\alpha_s+t_{s+1}\beta=0.
$$

必须 $t_{s+1}\neq 0$，否则原组无关将迫使所有系数都为零，矛盾。于是

$$
\beta=-\frac{t_1}{t_{s+1}}\alpha_1-\cdots-\frac{t_s}{t_{s+1}}\alpha_s.
$$

若另有两组表示

$$
\beta=\sum_{i=1}^s c_i\alpha_i=\sum_{i=1}^s d_i\alpha_i,
$$

相减得 $\sum_i(c_i-d_i)\alpha_i=0$，由无关性得 $c_i=d_i$，故唯一。

### **4.1 反向结论（原第 59 页）**

若某个 $\beta$ 能由 $\alpha_1,\ldots,\alpha_s$ **唯一**线性表示，则该向量组无关。

反证：若原组相关，存在不全为零的 $t_i$ 使 $\sum_i t_i\alpha_i=0$。把它加到一个已有表示 $\beta=\sum_i c_i\alpha_i$ 上，就得到另一组不同系数 $c_i+t_i$，与唯一性矛盾。

这里“唯一表示”包括表示存在；没有表示不能称为唯一表示。

## **5. $n$ 维向量多于 $n$ 个时必相关（原第 59 页下部）**

对 $n+1$ 个 $n$ 维向量组成的矩阵

$$
A=(\alpha_1\ \cdots\ \alpha_{n+1})\in P^{n\times(n+1)},
$$

有 $r(A)\leq n<n+1$，所以列向量相关。更多向量的情形由“部分相关则整体相关”得到。

## **6. 向量组的线性表示及矩阵形式（原第 60 页）**

设

$$
\mathrm I=(\alpha_1,\ldots,\alpha_s),\qquad
\mathrm {II}=(\beta_1,\ldots,\beta_t)
$$

都是同一 $P^n$ 中的向量组。“$\mathrm {II}$ 可由 $\mathrm I$ 线性表示”，是指每个 $\beta_j$ 都可由 $\alpha_1,\ldots,\alpha_s$ 表示。

若

$$
\beta_j=\sum_{i=1}^s m_{ij}\alpha_i\quad(1\leq j\leq t),
$$

则可统一写为

$$
B=AM,\qquad
A=(\alpha_1\ \cdots\ \alpha_s),\quad
B=(\beta_1\ \cdots\ \beta_t),\quad M\in P^{s\times t}.
$$

表示系数排在 $M$ 的各列。原稿在不同段落交换过两组的编号；正文以等式 $B=AM$ 明确表示方向。

## **7. 表示关系与向量个数（原第 61 页）**

若包含 $s$ 个向量的 $\mathrm I$ 可由包含 $t$ 个向量的 $\mathrm {II}$ 表示，且 $s>t$，则 $\mathrm I$ 必相关。

**整理补充证明：** 此时 $A=BN$，所以

$$
r(A)\leq r(B)\leq t<s.
$$

因此 $A$ 的 $s$ 个列向量相关。这就是原稿“多的由少的表示，多的必相关”的记忆法。

等价表述：若 $\mathrm I$ 无关且可由 $\mathrm {II}$ 表示，则 $s\leq t$。

## **8. 向量组等价（原第 61～62 页）**

两个向量组可相互线性表示时，称它们等价，记为 $\mathrm I\sim\mathrm {II}$。矩阵形式为存在适当尺寸的 $M,N$，使

$$
A=BN,\qquad B=AM.
$$

这里 $M,N$ 未必为方阵，也不能一般地断言它们互逆。

### **8.1 表示关系的秩判别（原第 62 页）**

$\mathrm {II}$ 可由 $\mathrm I$ 表示，当且仅当增添 $B$ 的所有列不增加秩，即

$$
r(A)=r(A\ B).
$$

原稿逐个加入 $\beta_1,\ldots,\beta_t$ 说明这一点：每次所加入的列已经在原列向量组的线性组合中，秩保持不变。

两个向量组等价的充要条件为

$$
\boxed{r(A)=r(B)=r(A\ B).}
$$

**条件提醒：** 只知道 $r(A)=r(B)$ 不够。例如 $(1,0)^{\mathsf T}$ 和 $(0,1)^{\mathsf T}$ 两组秩都为 $1$，却不能相互表示；合并后的秩为 $2$。

### **8.2 等价无关组的向量个数相同（原第 62 页）**

若 $\mathrm I$、$\mathrm {II}$ 等价且都无关，由第 7 节先得 $s\leq t$，再交换两组得 $t\leq s$，因此 $s=t$。

原稿在本页引出此结论，后面关于极大无关组的秩定义将继续使用它。

## **手写原稿**

[在本站阅读手写原稿（对应原第 55～62 页，共 8 页）](/notes/read/linalg_notes/linalg_hand_note/note_linalg_10/)
