---
title: "Static Range Sum Queries using Prefix Sums, Segment Trees, Fenwick Trees, Mo's Algorithm and Square root Decomposition"
date: "1 December 2024"
category: "CSES Range Queries"
tags: ['Range Queries', 'Static Range Sum Queries']
about: "Static Range Sum queries using various Algorithms"
---

When dealing with **static range sum queries**—where the array does not undergo updates—it's essential to choose an approach that optimizes both preprocessing time and query response time. Below are several efficient methods to handle such queries, each with its own advantages:

### 1. **Prefix Sum (Cumulative Sum) Array**

**Description:**
- Precompute a prefix sum array where each element at index `i` represents the sum of all elements from the start up to index `i-1` in the original array.

**Implementation:**
```cpp
# Preprocessing
prefix = [0] * (n + 1)
for i in range(n):
    prefix[i + 1] = prefix[i] + array[i]

# Query Sum from L to R
def range_sum(L, R):
    return prefix[R + 1] - prefix[L]
```

**Complexity:**
- **Preprocessing Time:** $O(n)$
- **Space:** $O(n)$
- **Query Time:** $O(1)$

**Pros:**
- Extremely fast query responses.
- Simple to implement.

**Cons:**
- Requires $O(n)$ additional space.

### 2. **Segment Trees**

**Description:**
- A binary tree where each node represents the sum of a segment (subarray) of the original array. Although more commonly used for dynamic arrays (with updates), they can efficiently handle static queries as well.

**Implementation:**
- Build the segment tree by recursively dividing the array into halves.
- To query, traverse the tree to sum relevant segments.

```cpp
/*
*    Author: rishabhxchoudhary
*    Created: Sunday, 01.12.2024 11:08 AM (GMT+5:30)
*/
#include <bits/stdc++.h>
using namespace std;

#define int long long int
#define double long double
#define endl '\n'

const int MOD = 1000000007;

struct Node {
    int value;
    Node (int val = 0) {
        value = val;
    }
};

Node combine(Node a, Node b) {
    return Node(a.value + b.value);
}

vector<Node> tree;
int sz;

void pointUpdate(int pos, int val) {
    pos += sz;
    tree[pos] = Node(val);
    while(pos>1) {
        pos = pos/2;
        tree[pos] = combine(tree[2*pos], tree[2*pos+1]);
    }
}

void build(vector<int>&arr) {
    int n = arr.size();
    sz = 1;
    if (n==1) sz=2;
    while (sz<n) sz = 2*sz;
    tree.assign(2*sz,Node());
    for (int i = 0; i < n; i++) {
        pointUpdate(i,arr[i]);
    }
}

Node rangeQuery(int l, int r) {
    l += sz;
    r += sz;
    Node res;
    while (l<=r) {
        if (l%2==1) {
            res = combine(res, tree[l]);
            l++;
        }
        if (r%2==0) {
            res = combine(res,tree[r]);
            r--;
        }
        l = l/2;
        r = r/2;
    }
    return res;
}

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
    
    build(a);
    
    while(q--) {
        int l, r;
        cin>>l>>r;
        l--; r--;
        cout<<rangeQuery(l,r).value<<endl;
        
    }
    

    return 0;
}
```

**Complexity:**
- **Preprocessing Time:** $O(n)$
- **Space:** $O(n)$
- **Query Time:** $O(log n)$

**Pros:**
- Efficient for both range queries and point updates (though updates aren't needed here).
- Flexible for other range operations beyond sums.

**Cons:**
- More complex to implement compared to prefix sums.
- Slightly slower query time for static sum queries compared to prefix sums.

### 3. **Binary Indexed Trees (Fenwick Trees)**

**Description:**
- A data structure that provides efficient methods for cumulative frequency tables. Like segment trees, they are more advantageous when updates are involved but can be used for static queries.

**Implementation:**
- Initialize the tree with the original array.
- Use bit manipulation to compute prefix sums.

**Complexity:**
- **Preprocessing Time:** $O(n log n)$
- **Space:** $O(n)$
- **Query Time:** $O(log n)$

**Pros:**
- Less space overhead compared to segment trees.
- Easier to implement than segment trees for some.

**Cons:**
- Not as efficient as prefix sums for purely static queries.
- More overhead than prefix sums for this specific use case.

### 4. **Mo's Algorithm**

**Description:**
- An offline algorithm that orders queries in a way that minimizes the cost of moving from one query to the next, typically used for answering multiple range queries efficiently.

**Implementation:**
- Sort queries in a specific order (e.g., using a block size) to reduce the total number of operations required to process all queries.

**Complexity:**
- **Preprocessing Time:** $O(n)$ for sorting + O(n * sqrt(n)) for processing
- **Space:** $O(n)$
- **Query Time:** $O(1)$ per query after sorting

**Pros:**
- Efficient for a large number of queries.
- Particularly useful when queries can be reordered.

**Cons:**
- Offline: All queries must be known in advance.
- More complex to implement.
- Not as efficient as prefix sums for simple sum queries.

### 5. **Block Decomposition (Square Root Decomposition)**

**Description:**
- Divides the array into blocks of approximately √n size and precomputes the sum of each block. Queries are answered by summing complete blocks and partial blocks separately.

**Implementation:**
- Precompute the sum of each block.
- For a query, sum the necessary full blocks and the remaining elements at the ends.

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
    
    int SQRT = sqrt(n);
    vector<int>store((n+SQRT-1)/SQRT);
    for (int id = 0; id < (n+SQRT-1)/SQRT ; id++) {
        int l = id * SQRT;
        int r = l + SQRT-1;
        for (int i = l; i <= min(r,n-1); i++) {
            store[id] += a[i];
        }
    }   
    
    while (q--) {
        int l,r; cin>>l>>r;
        l--;r--;
        int l_id = l/SQRT;
        int r_id = r/SQRT;
        int ans = 0;
        for (int i = l; i <= min(r,(l_id+1)*SQRT-1); i++) {
            ans += a[i];
        }
        for (int id = l_id+1; id <= r_id-1; id++) {
            ans += store[id];
        }
        if (l_id!=r_id) {
            for (int i = r_id*SQRT; i <= r; i++) {
                ans += a[i];
            }
        }
        cout<<ans<<endl;
    }

    return 0;
}
```

**Complexity:**
- **Preprocessing Time:** $O(n)$
- **Space:** $O(√n)$
- **Query Time:** $O(√n)$

**Pros:**
- Simple to implement.
- Good trade-off between preprocessing and query time.

**Cons:**
- Slower query times compared to prefix sums and other methods for sum queries.
- Not as commonly used for range sums where prefix sums suffice.

### **Conclusion**

For **static range sum queries**, the **Prefix Sum** method is generally the most efficient and straightforward approach, offering $O(1)$ query time with minimal preprocessing and implementation complexity. Other methods like **Segment Trees** and **Binary Indexed Trees** are more suitable when updates are involved or when handling more complex query types. **Mo's Algorithm** and **Block Decomposition** are useful in specific contexts, such as when dealing with a massive number of queries or when optimizing for cache performance, but they introduce additional complexity that isn't necessary for simple static range sum queries.

---

**Summary of Methods:**

| Method               | Preprocessing Time | Query Time | Space  | Notes                                  |
|----------------------|--------------------|------------|--------|----------------------------------------|
| Prefix Sum           | $O(n)$               | $O(1)$       | $O(n)$   | Best for static sum queries            |
| Segment Tree         | $O(n)$               | $O(log n)$   | $O(n)$   | Useful for dynamic queries as well     |
| Binary Indexed Tree  | $O(n log n)$         | $O(log n)$   | $O(n)$   | Alternative to segment trees           |
| Mo's Algorithm       | O(n √n)            | $O(1)$       | $O(n)$   | Offline, best for many queries         |
| Block Decomposition  | $O(n)$               | $O(√n)$      | $O(√n)$  | Simple but slower than prefix sums     |

Choose the method that best fits the specific requirements and constraints of your application.