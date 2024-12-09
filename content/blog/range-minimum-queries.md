---
title: "Unleashing the Power of Sparse Tables for O(1) Range Minimum Queries"
date: "9 December 2024"
category: "Range Queries"
tags: ['Range Minimum Query','Sparse Table']
about: ""
---

## Introduction

Have you ever faced the challenge of efficiently querying the minimum element in a subrange of an array? Traditional approaches—like scanning from start to end of the query range—can be time-consuming, particularly if you need to run a large number of queries. This is where **Range Minimum Query (RMQ)** data structures come to the rescue.

One of the most elegant and efficient solutions to the RMQ problem is the **Sparse Table**. Sparse Tables enable you to answer queries in constant time, after an initial preprocessing phase that costs only $O(n \log n)$ time, where $n$ is the size of the array.

In this blog post, we'll explore the concept of Sparse Tables for RMQ, step-by-step. We’ll define the problem, build the intuition behind Sparse Tables, show the complete construction, and then demonstrate how to query them in $O(1)$ time. Additionally, we’ll discuss the C++ implementation provided and walk through it so that you can adapt it to your own projects.

## Understanding the Range Minimum Query Problem

**Problem Statement:** Given an array $A$ of length $n$, we need to answer multiple queries of the form: 

- **Query:** What is $\min(A[l \ldots r])$?

We want to answer these queries as efficiently as possible. Let’s break down why a naive solution might not be sufficient and how Sparse Tables excel in this scenario.

### Naive Approaches

1. **Brute Force:**  
   For each query, simply iterate over the range from $l$ to $r$ and track the minimum.  
   - **Time Complexity:** $O(n)$ per query.  
   If you have $q$ queries, this is $O(nq)$, which becomes expensive for large inputs.

2. **Preprocessing with Prefix/Suffix Minimums:**  
   While prefix and suffix arrays can help find minimums over certain types of queries, they don’t directly solve the general RMQ problem for arbitrary $[l, r]$ ranges. They might give partial speedups but not a general $O(1)$ query time.

### Sparse Table to the Rescue

A **Sparse Table** is a data structure that leverages the idea of precomputing the answers for intervals of lengths that are powers of two. By cleverly merging these precomputed results, we can answer any RMQ in constant time.

## What is a Sparse Table?

A Sparse Table is a 2D table `st[k][i]`, where:

- $i$ is an index in the array (from $0$ to $n-1$).
- $k$ is a power-of-two "step size."

More concretely, `st[k][i]` will store the minimum value of the subarray starting at index $i$ of length $2^k$. The value of $k$ typically ranges from $0$ to $\lfloor \log_2(n) \rfloor$, ensuring we cover all power-of-two lengths up to the size of the array.

### Key Idea

Consider the array $A$:

- For $k = 0$, $st[0][i]$ is just $A[i]$, the minimum of the subarray of length $2^0 = 1$ starting at $i$.
- For $k = 1$, $st[1][i]$ is the minimum over $A[i \ldots i+1]$, i.e., subarray of length $2^1 = 2$.
- For $k = 2$, $st[2][i]$ is the minimum over $A[i \ldots i+3]$, i.e., subarray of length $2^2 = 4$.

And so forth, until $2^k$ surpasses $n$.

By building this table, any query interval $[l, r]$ can be viewed as the intersection of two intervals of length $2^k$ that cover the entire range without overlapping.

## Building the Sparse Table

### Step-by-Step Construction

1. **Precompute $\log_2$ values:**
   To quickly determine which power of two to use for each range, we precompute a `log_table` such that:
   - $logtable [1] = 0$
   - $logtable[x] = \lfloor \log_2(x) \rfloor$

   This helps us determine the largest power-of-two length that fits in a given range length.

2. **Initialize the Sparse Table for the Base Case ($k=0$):**
   For every index $i$, `st[0][i] = A[i]`.

3. **Fill in the Higher-Level Intervals ($k > 0$):**
   Use the recurrence:
   $$ st[k][i] = \min(st[k-1][i], \; st[k-1][i + 2^{k-1}]) $$

   This recurrence effectively merges two intervals of length $2^{k-1}$ into one of length $2^k$.

### Complexity Analysis

- **Preprocessing Complexity:**  
  Computing the Sparse Table takes $O(n \log n)$ time since for each of the $O(\log n)$ levels, we fill approximately $n$ entries, and each fill operation takes $O(1)$.
  
- **Space Complexity:**  
  Storing the table takes $O(n \log n)$ space.

## Answering Queries in O(1)

For a query $[l, r]$, let $len = r - l + 1$ and $j = log\_table[len]$. We know that $2^j \leq len$.

We can cover the entire interval $[l, r]$ by combining the minimum of two intervals of length $2^j$:

- The first interval: $[l, \; l + 2^j - 1]$
- The second interval: $[r - 2^j + 1, \; r]$

Because these two intervals overlap or just touch at the boundaries and together cover $[l, r]$, the minimum of these two precomputed values gives the overall minimum for $[l, r]$.

Formally:
$$
\min(A[l \ldots r]) = \min(st[j][l], \; st[j][r - 2^j + 1])
$$

This lookup is $O(1)$.

## Example to Illustrate

Consider an array $A = [2, 1, 4, 3, 9, 7]$ and a query $l=2, r=5$ (0-based indexing, i.e., $A[2] = 4$).

1. The length of the query range is $r - l + 1 = 5 - 2 + 1 = 4$.
2. $\log_2(4) = 2$, so $j = 2$.
3. We know $2^j = 4$.
4. Therefore:
   - First interval: $[2, 2+4-1] = [2, 5]$
   - Second interval: $[5-4+1, 5] = [2, 5]$

   In this case, it's actually the same interval. But generally, for a non-power-of-two length, it would be two distinct intervals. Since we stored `st[2][2]` (the minimum of $A[2 \ldots 5]$) already, we directly get the result:
   
   $$ \min(A[2 \ldots 5]) = st[2][2]. $$

   This returns the minimum in $O(1)$ time without traversing the array.

<!-- ![First image suggestion: A diagram of an array with intervals highlighted at various powers of two (e.g., show intervals of length 1, 2, 4 overlapping the array).]

*(Image Description: The image could show an array of elements and highlight how intervals of length $2^k$ cover the array. For example, show the array indices on a horizontal line, and beneath it, visualize intervals of length 1 (just single elements), length 2 (pairs of elements), length 4 (groups of four elements), stacked or layered to represent the Sparse Table construction.)* -->

## Implementation in C++

```cpp
#include <bits/stdc++.h>
using namespace std;

#define int long long int
#define double long double
#define endl '\n'

const int MOD = 1000000007;

signed main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);

    int n,q;
    cin>>n>>q;
    vector<int>a(n);
    for (int i = 0; i < n; i++) {
        cin>>a[i];
    }
    
    // Step 1: Precompute log values
    vector<int>log_table(n+1);
    log_table[1] = 0;
    for (int i = 2; i <= n; i++) {
        log_table[i] = log_table[i/2]+1;
    }

    // Step 2: k is the maximum power of two that fits in n
    int k = log_table[n]+1;
    vector<vector<int>> st(k,vector<int>(n, INT_MAX));

    // Step 3: Initialize st[0][i]
    for (int i = 0; i < n; i++) {
        st[0][i] = a[i];
    }

    // Step 4: Fill in st for intervals of length 2^j
    for (int j = 1; j < k; j++) {
        for (int i = 0; i + (1ll<<j) <= n; i++) {
            st[j][i] = min(st[j-1][i], st[j-1][i + (1<<(j-1))]);
        }
    }

    // Handling queries
    while (q--) {
        int l,r;cin>>l>>r;
        l--; r--;
        int length = r - l + 1;
        int j = log_table[length];
        int minimum = min(st[j][l], st[j][r - (1<<j) +1]);
        cout << minimum << "\n";
    }

    return 0;
}
```

### Code Explanation

1. **Input Reading:**
   - Reads $n$ (array size) and $q$ (number of queries).
   - Reads the array $a$.

2. **Logarithm Precomputation:**
   - `log_table[i]` gives $\lfloor \log_2(i) \rfloor$. This helps in quickly determining the largest power-of-two interval length for each query.
   
3. **Sparse Table Construction:**
   - `k = log_table[n] + 1` calculates the maximum exponent needed to cover intervals up to length $n$.
   - `st` is declared as a 2D vector: `st[k][n]`.
   - `st[0][i] = a[i]` simply initializes the first level with the actual elements.
   - The double loop then fills in the table:
     $$ st[j][i] = \min(st[j-1][i], \; st[j-1][i + 2^{j-1}]) $$

4. **Query Processing:**
   - For each query $(l,r)$, we convert them to zero-based indexing: `l--, r--`.
   - Determine the length of the segment: `length = r - l + 1`.
   - Find `j = log_table[length]`.
   - Query the two intervals and take the minimum:
     $$ \min(st[j][l], \; st[j][r - 2^j + 1]) $$

   This returns the minimum in constant time.

<!-- ![Second image suggestion: A flowchart illustrating the query step. Start from the query (l, r), compute the length, find j from log_table, and then show the two intervals merging into a final minimum result.]

*(Image Description: The second image could be a flowchart that starts from a query (l, r), then goes to a step "Compute length = r-l+1", then "Compute j = log_table[length]", then shows a decision box or step "Compute min from st[j][l] and st[j][r - 2^j + 1]", finally arriving at "Output the minimum".)* -->

## Conclusion

Sparse Tables provide a powerful method to answer range minimum queries with outstanding efficiency. After an $O(n \log n)$ preprocessing step, each query can be answered in $O(1)$ time. This approach is especially useful when the array is static (no updates), and you have a large number of queries.

**Key Takeaways:**

- Sparse Tables leverage power-of-two intervals.
- Preprocessing takes $O(n \log n)$ time and space.
- Querying the minimum is done in $O(1)$ time.
- Ideal for static arrays with many queries.

As arrays grow large and queries become frequent, the Sparse Table approach ensures that your query operations remain lightning-fast. With the provided code and explanation, you should now be equipped to implement and utilize Sparse Tables for RMQ in your own projects.

**Further Reading and References:**

- [CP-Algorithms: Sparse Table](https://cp-algorithms.com/data_structures/sparse_table.html)
- [GeeksforGeeks: Sparse Table RMQ](https://www.geeksforgeeks.org/sparse-table/)

Sparse Tables are a fundamental technique widely used in competitive programming and algorithmic problem-solving. Mastering them opens doors to efficiently solving a variety of range query problems.