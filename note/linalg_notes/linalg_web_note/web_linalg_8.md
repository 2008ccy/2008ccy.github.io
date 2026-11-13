---
title: 线性代数：矩阵秩的不等式
description: 矩阵秩的不等式的定义、定理、证明和原稿例题，附逐页手写原稿。
tags: [线性代数, 课程笔记]
pubDatetime: 2026-11-13T14:32:39+08:00
draft: false
featured: false
---

> 来源：Goodnotes“线性代数”原第 46～49 页（按笔记文件页序，含首尾）。日期导出 `线性代数11.13.pdf` 第 1～4 页对应本篇；配套 `note_linalg_8.pdf` 第 1～4 页依次对应原第 46～49 页。原稿略写处的证明、构造或计算已明确标作整理补充。

## **1. 秩的基本性质（原第 46 页）**

记 $r(A)$ 为矩阵 $A$ 的秩。原稿本节日期为“10.27”，汇总与秩有关的性质。以下各矩阵运算均要求尺寸相容。

1. 对 $A\in P^{m\times n}$，$0\leq r(A)\leq\min\{m,n\}$。
2. $r(AB)\leq\min\{r(A),r(B)\}$。
3. 若 $U,V$ 为相应阶数的可逆矩阵，则 $r(UA)=r(AV)=r(UAV)=r(A)$。
4. 分块对角矩阵满足

$$
r\begin{pmatrix}A&0\\0&B\end{pmatrix}
=r\begin{pmatrix}0&A\\B&0\end{pmatrix}=r(A)+r(B).
$$

5. $A,B$ 同型时，$r(A+B)\leq r(A)+r(B)$。
6. 若 $A$ 的列数、$B$ 的行数为 $n$，则

$$
r(A)+r(B)-n\leq r(AB)\leq\min\{r(A),r(B)\}.
$$

7. 特别地，若 $AB=0$，则 $r(A)+r(B)\leq n$。
8. 三个矩阵的乘积有定义时，

$$
r(AB)+r(BC)\leq r(B)+r(ABC).
$$

第 6 条的下界称为 Sylvester 不等式，第 8 条称为 Frobenius 不等式。原稿先以同阶方阵为情形记录；这里补明乘法公共维数，便于避免把 $n$ 误作任意一个矩阵的阶数。

原稿页末另将同阶方阵的两种估计串联：

$$
r(AB)+n\geq r(A)+r(B)\geq r(A+B).
$$

## **2. 满行秩矩阵有右逆（原第 47 页上部）**

设 $A\in P^{m\times n}$，$m\leq n$，且 $r(A)=m$。证明：存在 $B\in P^{n\times m}$，使 $AB=E_m$。

先考虑标准形

$$
A_0=\begin{pmatrix}E_m&0\end{pmatrix},\qquad
B_0=\begin{pmatrix}E_m\\0\end{pmatrix},\qquad A_0B_0=E_m.
$$

一般地，由矩阵等价标准形，可以写成

$$
A=UA_0V,
$$

其中 $U\in P^{m\times m}$、$V\in P^{n\times n}$ 均可逆。取

$$
B=V^{-1}B_0U^{-1},
$$

则

$$
AB=UA_0VV^{-1}B_0U^{-1}=UE_mU^{-1}=E_m.
$$

这里 $B$ 是右逆；当 $m<n$ 时，一般不能据此要求 $BA=E_n$。

## **3. 分块对角矩阵秩的证明（原第 47 页下部）**

设 $A\in P^{m\times p}$、$B\in P^{n\times q}$，记

$$
C=\begin{pmatrix}A&0\\0&B\end{pmatrix},\qquad
r(A)=r,\quad r(B)=s.
$$

当 $A,B$ 已是秩标准形时，$C$ 中的非零单位块分别有 $r,s$ 个主元，故 $r(C)=r+s$。

一般地，取可逆矩阵 $U_1,V_1,U_2,V_2$，使

$$
U_1AV_1=\begin{pmatrix}E_r&0\\0&0\end{pmatrix},\qquad
U_2BV_2=\begin{pmatrix}E_s&0\\0&0\end{pmatrix}.
$$

于是

$$
\begin{pmatrix}U_1&0\\0&U_2\end{pmatrix}
C
\begin{pmatrix}V_1&0\\0&V_2\end{pmatrix}
=
\begin{pmatrix}U_1AV_1&0\\0&U_2BV_2\end{pmatrix}.
$$

两侧乘的分块矩阵可逆，秩不变，右端秩为 $r+s$，从而 $r(C)=r(A)+r(B)$。交换块列还可得到 $r\left(\begin{smallmatrix}0&A\\B&0\end{smallmatrix}\right)=r+s$。

## **4. 和的秩不超过秩之和（原第 48 页）**

设 $A,B\in P^{m\times n}$。原稿利用分块矩阵分解：

$$
\begin{pmatrix}A&0\\A+B&B\end{pmatrix}
=
\begin{pmatrix}E_m&0\\E_m&E_m\end{pmatrix}
\begin{pmatrix}A&0\\0&B\end{pmatrix}
\begin{pmatrix}E_n&0\\E_n&E_n\end{pmatrix}.
$$

两端的分块单位下三角矩阵均可逆，故

$$
\begin{aligned}
r(A+B)
&\leq r\begin{pmatrix}A+B&B\end{pmatrix}\\
&\leq r\begin{pmatrix}A&0\\A+B&B\end{pmatrix}
=r(A)+r(B).
\end{aligned}
$$

第一步在子矩阵后增添列，第二步在上方增添行；删去行或列不会增加秩。

### **4.1 分块单位矩阵的尺寸与操作**

原稿提醒：把数值块看成单位矩阵时要区分行数 $m$ 与列数 $n$。例如

$$
\begin{pmatrix}cE_m&0\\0&E_n\end{pmatrix}
\begin{pmatrix}A&0\\0&B\end{pmatrix}
=\begin{pmatrix}cA&0\\0&B\end{pmatrix},
$$

其中 $A$ 有 $m$ 行，$B$ 有 $n$ 行；若要把它视为保秩的可逆倍乘，须 $c\neq 0$。

块列交换可写为

$$
\begin{pmatrix}A&0\\0&B\end{pmatrix}
\begin{pmatrix}0&E_n\\E_n&0\end{pmatrix}
=\begin{pmatrix}0&A\\B&0\end{pmatrix}
$$

（此式按 $A,B$ 均有 $n$ 列写出）。

## **5. Sylvester 不等式（原第 49 页）**

原稿记录同阶方阵形式

$$
r(AB)\geq r(A)+r(B)-n.
$$

**整理补充证明：** 更一般地，设 $A\in P^{m\times n}$、$B\in P^{n\times p}$，$r(B)=r$。将 $B$ 化为秩标准形，可写 $B=UDV$，其中 $U,V$ 可逆，$D$ 的前 $r$ 个对角元为 $1$，其余为零。

把 $AU$ 按列分成 $(C\ D_1)$，其中 $C$ 有 $r$ 列，则 $r(AB)=r(C)$。因此

$$
r(A)=r(AU)=r(C\ D_1)
\leq r(C)+r(D_1)\leq r(AB)+n-r(B),
$$

移项即得结论。

当 $AB=0$ 时，得到 $r(A)+r(B)\leq n$；这里 $n$ 为乘法的公共维数。

## **6. Frobenius 不等式（原第 49 页）**

原稿再次记录

$$
r(AB)+r(BC)\leq r(B)+r(ABC).
$$

**整理补充证明：** 将 $B$ 写成秩为 $r$ 的标准形分解，吸收左右可逆因子后，分别记相应的前 $r$ 列与前 $r$ 行为 $A_1,C_1$。则

$$
r(AB)=r(A_1),\quad r(BC)=r(C_1),\quad
r(ABC)=r(A_1C_1),\quad r(B)=r.
$$

对乘积 $A_1C_1$ 应用公共维数为 $r$ 的 Sylvester 不等式：

$$
r(A_1C_1)\geq r(A_1)+r(C_1)-r,
$$

即得所证式。$r=0$ 时各项均为零，结论同样成立。

## **手写原稿**

[在本站阅读手写原稿（对应原第 46～49 页，共 4 页）](/notes/read/linalg_notes/linalg_hand_note/note_linalg_8/)
