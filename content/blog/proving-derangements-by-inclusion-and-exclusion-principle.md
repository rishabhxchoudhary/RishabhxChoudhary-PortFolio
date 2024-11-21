---
title: "Derangement Proof by Inclusion and Exclusion Principle"
date: "28 May 2023"
category: "Mathematics"
tags: ['combinatorics', 'derangements', 'inclusion-exclusion']
about: "A comprehensive guide to understanding derangements using the inclusion and exclusion principle."
coverImage: "/images/derangements_proof/cover.jpg"
---

**Problem:**  
If there are four letters and four envelopes, what is the number of ways to arrange the letters so that none are in the correct envelope?

We will try to derive the number of ways for *n* envelopes in this blog.

This is called a **derangement**.

A derangement of $ \{ 1,2,3,4,\dots,n \} $ is a permutation of $ i_1, i_2, \dots, i_n $ such that
$$
i_1 \ne 1, \quad i_2 \ne 2, \quad \dots, \quad i_n \ne n
$$

Let this sequence be $ D_n $.

Let's try to evaluate some values for $ D_n $:

- For $ n=1 $, $ D_1 = 0 $ as there is only 1 envelope and only 1 letter, so there is no way that the first letter will not go into the first envelope.
  
- For $ n=2 $, we have only 1 way: the first letter will go in the 2nd envelope, and the 2nd letter will go into the first envelope.
  
- Similarly, for $ n=3 $, we have only 2 derangements: $ \{2,3,1\} $ and $ \{3,1,2\} $.

Thus, we have $ D_1 = 0 $, $ D_2 = 1 $, $ D_3 = 2 $, and so on...

We will solve this using the **Inclusion and Exclusion Principle**.

The total number of permutations of *n* elements is $ n! $.

Let's define event $ A_i $ as the set of permutations where the $ i $-th letter is in the $ i $-th envelope, i.e., $ P_i = i $.

Our goal is to find the number of derangements, which are permutations where none of the letters are in their correct envelopes. Mathematically, this is the number of permutations that are **not** in any of the events $ A_1, A_2, \dots, A_n $.

According to the **Inclusion and Exclusion Principle**, the number of elements not in any of the events $ A_i $ is given by:
$$
|A_1^c \cap A_2^c \cap \dots \cap A_n^c| = n! - \left( \sum_{i=1}^n |A_i| \right) + \left( \sum_{1 \leq i < j \leq n} |A_i \cap A_j| \right) - \dots + (-1)^n |A_1 \cap A_2 \cap \dots \cap A_n|
$$

Let's break this down step by step.

### Step 1: Calculating $ |A_i| $

The number of permutations where the $ i $-th letter is in the $ i $-th envelope is the number of ways to arrange the remaining $ n-1 $ letters in $ n-1 $ envelopes. Therefore:
$$
|A_i| = (n-1)!
$$

Since there are $ n $ such events $ A_1, A_2, \dots, A_n $, the first sum is:
$$
\sum_{i=1}^n |A_i| = n \times (n-1)! = n!
$$

### Step 2: Calculating $ |A_i \cap A_j| $

This is the number of permutations where both the $ i $-th and $ j $-th letters are in their correct envelopes. The remaining $ n-2 $ letters can be arranged in $ (n-2)! $ ways. Therefore:
$$
|A_i \cap A_j| = (n-2)!
$$

There are $ \binom{n}{2} $ such pairs of events, so the second sum is:
$$
\sum_{1 \leq i < j \leq n} |A_i \cap A_j| = \binom{n}{2} \times (n-2)! = \frac{n(n-1)}{2} \times (n-2)! = \frac{n!}{2}
$$

### Continuing the Pattern

Following this pattern, the general term for the intersection of $ k $ events $ A_{i_1}, A_{i_2}, \dots, A_{i_k} $ is:
$$
|A_{i_1} \cap A_{i_2} \cap \dots \cap A_{i_k}| = (n-k)!
$$

There are $ \binom{n}{k} $ such intersections, so the $ k $-th term in the Inclusion-Exclusion formula is:
$$
(-1)^k \times \binom{n}{k} \times (n-k)! = (-1)^k \times \frac{n!}{k!}
$$

### Combining All Terms

Putting it all together, the number of derangements $ D_n $ is:
$$
D_n = n! \left(1 - \frac{1}{1!} + \frac{1}{2!} - \frac{1}{3!} + \dots + (-1)^n \frac{1}{n!}\right)
$$

This can be compactly written using the summation notation:
$$
D_n = n! \sum_{k=0}^n \frac{(-1)^k}{k!}
$$

This formula gives the exact number of derangements for any positive integer $ n $.

### Recurrence Relations for Derangements

Derangements also satisfy certain recurrence relations, which can be derived using combinatorial arguments.

#### Recurrence Relation 1: $ D_n = (n-1)(D_{n-1} + D_{n-2}) $

**Derivation:**

Consider the placement of the first letter. Since it cannot go into the first envelope, it has $ n-1 $ choices. Suppose the first letter goes into the $ k $-th envelope.

There are two cases:

1. **Case 1:** The $ k $-th letter goes into the first envelope.  
   - In this scenario, we have effectively swapped the first and $ k $-th letters.
   - The remaining $ n-2 $ letters need to be deranged.
   - The number of derangements in this case is $ D_{n-2} $.

2. **Case 2:** The $ k $-th letter does **not** go into the first envelope.  
   - Here, the $ k $-th letter must go into one of the remaining $ n-2 $ envelopes.
   - The problem reduces to deranging the remaining $ n-1 $ letters.
   - The number of derangements in this case is $ D_{n-1} $.

Since there are $ n-1 $ choices for $ k $, combining both cases:
$$
D_n = (n-1)(D_{n-1} + D_{n-2})
$$

#### Recurrence Relation 2: $ D_n = n D_{n-1} + (-1)^n $

**Derivation:**

This recurrence relation can be derived using the principle of inclusion-exclusion directly.

Recall the derangement formula:
$$
D_n = n! \sum_{k=0}^n \frac{(-1)^k}{k!}
$$

Notice that:
$$
D_{n-1} = (n-1)! \sum_{k=0}^{n-1} \frac{(-1)^k}{k!}
$$

Multiplying $ D_{n-1} $ by $ n $:
$$
n D_{n-1} = n \times (n-1)! \sum_{k=0}^{n-1} \frac{(-1)^k}{k!} = n! \sum_{k=0}^{n-1} \frac{(-1)^k}{k!}
$$

Comparing this with the derangement formula:
$$
D_n = n! \sum_{k=0}^n \frac{(-1)^k}{k!} = n D_{n-1} + (-1)^n
$$

Thus, we obtain:
$$
D_n = n D_{n-1} + (-1)^n
$$

This provides an alternative way to compute derangements using a different recurrence relation.

### Conclusion

Derangements are a fascinating area of combinatorics with applications in probability, computer science, and more. By applying the inclusion-exclusion principle, we've derived both the explicit formula for derangements and two useful recurrence relations. These tools allow us to compute derangements efficiently for any number of elements.

Understanding these foundational concepts opens the door to more advanced topics in combinatorics and discrete mathematics. Whether you're a beginner or looking to refresh your knowledge, mastering derangements is a valuable step in your mathematical journey.
