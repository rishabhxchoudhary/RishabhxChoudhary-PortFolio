---
title: "The Problem of Dividing Balls into Boxes"
date: "23 July 2023"
category: "CP & Interviews"
tags: ['Maths','PnC']
about: "This document discusses various variants of the problem of dividing n balls into *m* boxes. Markdown styles and MathJax have been added to improve readability and to display mathematical equations correctly."
coverImage: "/images/balls_and_boxes/cover.webp"
---

# The problem of dividing balls into boxes

This document discusses various variants of the problem of dividing *n* balls into *m* boxes. Markdown styles and MathJax have been added to improve readability and to display mathematical equations correctly.

## Variants of the Problem

1. **Boxes can be empty:**
    - Balls and boxes are identical.
    - Balls are identical, boxes are distinct.
    - Balls are distinct, and boxes are identical.
    - Balls and boxes are distinct.

2. **Boxes cannot be empty:**
    - Balls and boxes are identical.
    - Balls are identical, boxes are distinct.
    - Balls are distinct, and boxes are identical.
    - Balls and boxes are distinct.

# Variant 1: Boxes cannot be empty

## 1. Both boxes and balls are identical.

In this case, there are *n* identical balls and *m* identical boxes. The goal is to partition the *n* balls into *m* parts, where each part (box) must contain at least one ball.

For this, we can use a partition function which can be calculated using the formula:

$$ P(n,r) = P(n-r,r-1) $$

where $ P(n,n) = 1 $ and $ P(n, 0) = 0 $.

This can be calculated using dynamic programming and memoization.

## 2. Balls are identical, and boxes are distinct.

Given *n* identical balls and *m* distinct boxes, this problem can be modeled as a linear equation:

$$ x_1 + x_2 + x_3 + \ldots + x_m = n $$

where each $ x \geq 1 $.

The number of solutions is given by:

$$ \text{ans} = \binom{n-1}{m-1} $$

## 3. Balls are distinct, but boxes are identical.

There are *n* distinct balls and *m* identical boxes. The solution is given by Stirling number of the Second kind, $ S(n,r) $:

$$ S(n,r) = \frac{1}{r!} \left( \binom{r}{0} \cdot n^r - \binom{r}{1} \cdot (r-1)^n + \binom{r}{2} \cdot (r-2)^n - \ldots + (-1)^{r-1} \cdot 1^n \right) $$

## 4. Both balls and boxes are distinct.

This problem is the same as the number of onto functions from a set containing *n* elements to a set containing *r* elements. It is given by:

$$ r^n - \left( \binom{n}{1} \cdot (r-1)^n - \binom{r}{2} \cdot (r-2)^n + \ldots + (-1)^{r-1} \cdot 1^n \right) $$

# Variant 2: Boxes can be empty

## 1. Both boxes and balls are distinct.

There are *n* distinct balls and *m* identical boxes. This is the same as the number of elements that can be assigned to a set containing *n* elements to a set containing *m* elements.

$$ \text{ans} = m^n $$

## 2. Balls are identical, and boxes are distinct.

Given *n* identical balls and *m* distinct boxes, this problem can be modeled as a linear equation:

$$ x_1 + x_2 + x_3 + \ldots + x_m = n $$

where each $ x \geq 0 $.

The number of solutions is given by:

$$ \text{ans} = \binom{n+m-1}{m-1} $$

## 3. Balls are distinct, but boxes are identical.

There are *n* distinct balls and *m* identical boxes. The solution is given by Bell number $ B_n $:

$$ B_n = \sum_{k=0}^{r} S(n,k) $$

where $ S $ is the Stirling number of the Second kind.

## 4. Both balls and boxes are Identical.

In this case, there are *n* identical balls and *m* identical boxes. The goal is to partition the *n* balls into *m* parts, where some parts can be empty.

For this, we can use a partition function which can be calculated using the formula:

$$ P(n,r) = P(n-1,r-1) + P(n-r,r) $$

where $ P(n,n) = 1 $ and $ P(n, 0) = 0 $.

This can be calculated using dynamic programming and memoization.
