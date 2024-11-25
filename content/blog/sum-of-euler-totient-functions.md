---
title: "Sum of Euler Totient Function from 1 to N"
date: "26 November 2024"
category: "CP & Interviews"
tags: ['Maths',"Euler Totient Function"]
about: ""
---
## Computing the Sum of Euler's Totient Function Efficiently

In this section, we introduce an algorithm to compute the sum of Euler's totient function $\varphi(i)$, denoted by
$$
\Phi(N) := \sum_{i=1}^{N} \varphi(i),
$$
in $O\left(N^{2/3} (\log\log{N})^{1/3}\right)$ time. (In practice, we set $k := \left(\frac{N}{\log\log{N}}\right)^{2/3}$ 
and enumerate $(\Phi(i))_{1 \leq i \leq k}$ and 

$(\Phi(\left \lfloor N/i \right\rfloor))_{1 \leq i \leq k} $.)

This algorithm appears to be well-known from Project Euler. I would like to extend my gratitude to Mr. Kanarai for teaching me the analysis of its computational complexity.

### Definition of Euler's Totient Function

Euler's totient function $\varphi(i)$ is defined as the number of integers between $1$ and $i$ that are coprime with $i$. 

### Preliminary Result

First, as a preparatory step, we show that for any positive integer $m$, 
$$
m = \sum_{d \mid m} \varphi(d).
$$
For integers $n$ with $1 \leq n \leq m$ and $\gcd(m, n) = g$, since $\gcd\left(m, \frac{n}{g}\right) = 1$, the integer $\frac{n}{g}$ is coprime with $m$. 

Because $\frac{n}{g} \leq \frac{m}{g}$, there are $\varphi\left(\frac{m}{g}\right)$ such integers $n$.

By iterating over all factors $g$ of $m$ and summing, we count each integer from $1$ to $m$ exactly once. Therefore, for any positive integer $m$, 
$$
m = \sum_{d \mid m} \varphi\left(\frac{m}{d}\right) = \sum_{d \mid m} \varphi(d).
$$

### Summing Over All Integers Up to $N$

Summing the equation $m = \sum_{d \mid m} \varphi(d)$ for $m = 1, \ldots, N$, we obtain
$$
\sum_{n=1}^N n = \sum_{n=1}^N \sum_{d \mid n} \varphi(d).
$$
The left-hand side is the sum of an arithmetic series, which equals $\frac{N(N + 1)}{2}$.

On the right-hand side, by fixing $\frac{n}{d}$ and summing over $d$, we have
$$
\sum_{n=1}^N \sum_{d=1}^{\left\lfloor \frac{N}{n} \right\rfloor} \varphi(d).
$$
Thus,
$$
\begin{align}
\frac{N(N + 1)}{2} &= \sum_{n=1}^N \sum_{d=1}^{\left\lfloor \frac{N}{n} \right\rfloor} \varphi(d) \\
&= \sum_{n=2}^N \sum_{d=1}^{\left\lfloor \frac{N}{n} \right\rfloor} \varphi(d) + \sum_{n=1}^N \varphi(n).
\end{align}
$$

### Expressing $\Phi(N)$ Recursively

Defining $\Phi(n) := \sum_{i=1}^{n} \varphi(i)$, the above equation becomes
$$
\begin{align}
\frac{N(N + 1)}{2} &= \sum_{n=2}^N \Phi\left(\left\lfloor \frac{N}{n} \right\rfloor\right) + \Phi(N) \\
\Rightarrow \Phi(N) &= \frac{N(N + 1)}{2} - \sum_{n=2}^{N} \Phi\left(\left\lfloor \frac{N}{n} \right\rfloor\right).
\end{align}
$$
Here, $\Phi(N)$ is the value we aim to compute.

### Bounding the Number of Distinct Values of $\left\lfloor \frac{N}{i} \right\rfloor$

Note that as $i$ varies from $1$ to $N$, the value $\left\lfloor \frac{N}{i} \right\rfloor$ takes at most $2\sqrt{N} - 1$ distinct values:

1. **When $i \geq \sqrt{N}$:**
   $$
   1 \leq \left\lfloor \frac{N}{i} \right\rfloor \leq \sqrt{N},
   $$
   so $\left\lfloor \frac{N}{i} \right\rfloor$ can take at most $\sqrt{N}$ distinct values.

2. **When $i \leq \sqrt{N} - 1$:**
   Since $i$ ranges from $1$ to $\sqrt{N} - 1$, $\left\lfloor \frac{N}{i} \right\rfloor$ can take at most $\sqrt{N} - 1$ distinct values (noting that $\left\lfloor \frac{N}{i \cdot j} \right\rfloor = \left\lfloor \frac{N/i}{j} \right\rfloor$).

Combining both cases, $\left\lfloor \frac{N}{i} \right\rfloor$ takes at most $2\sqrt{N} - 1$ distinct values.

### Grouping Terms with the Same $\left\lfloor \frac{N}{i} \right\rfloor$

Let's group the terms where $\left\lfloor \frac{N}{i} \right\rfloor$ is the same and compute them together. For a positive integer $k$, determine the range of $i$ such that $k = \left\lfloor \frac{N}{i} \right\rfloor$:

$$
\begin{align}
k &= \left\lfloor \frac{N}{i} \right\rfloor \\
\Leftrightarrow \quad k &\leq \frac{N}{i} < k + 1 \\
\Leftrightarrow \quad \frac{N}{k + 1} &< i \leq \frac{N}{k} \\
\Rightarrow \quad \left\lfloor \frac{N}{k + 1} \right\rfloor &< i \leq \left\lfloor \frac{N}{k} \right\rfloor.
\end{align}
$$

From this, we see that the integers $i$ satisfying $k = \left\lfloor \frac{N}{i} \right\rfloor$ are all integers such that
$$
\left\lfloor \frac{N}{k + 1} \right\rfloor < i \leq \left\lfloor \frac{N}{k} \right\rfloor,
$$
and there are exactly $\left\lfloor \frac{N}{k} \right\rfloor - \left\lfloor \frac{N}{k + 1} \right\rfloor$ such integers.

### Recursive Computation of $\Phi(m)$

From the above, for any positive integer $m$, $\Phi(m)$ can be expressed as a linear combination of $O(\sqrt{m})$ values of $\Phi(i)$ for $i < m$.

Set a positive integer threshold $k$ and precompute $\Phi(1), \Phi(2), \ldots, \Phi(k)$. For larger values of $m$, compute $\Phi(m)$ using memoization and recursion.

The time required for precomputation is $O\left(k \log\log{k}\right)$. This can be achieved similarly to the Sieve of Eratosthenes by utilizing the fact that for a positive integer $n$ with prime factors $p_1, p_2, \ldots, p_t$, the totient function can be expressed as
$$
\varphi(n) = n \prod_{i=1}^t \left(1 - \frac{1}{p_i}\right).
$$

Since $\Phi(m)$ can be written as a linear combination of $O(\sqrt{m})$ values of $\Phi(i)$, the recursion's computational complexity is
$$
O\left(\sum_{i=1}^{N/k} \sqrt{\left\lfloor \frac{N}{i} \right\rfloor}\right) = O\left(N^{1/2} \int_{x=1}^{N/k} \frac{1}{x^{1/2}} \, dx\right) = O\left(\frac{N}{\sqrt{k}}\right).
$$
Setting $k = \left(\frac{N}{\log\log{N}}\right)^{2/3}$, the overall computational complexity becomes
$$
O\left(N^{2/3} (\log\log{N})^{1/3}\right).
$$