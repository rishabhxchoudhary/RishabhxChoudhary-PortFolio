---
title: "Master Linear Dynamic Programming"
date: "22 July 2023"
category: "CP & Interviews"
tags: ['Dynamic Programming', 'Linear DP', 'Leetcode Problems']
about: Enhance your dynamic programming skills with our comprehensive collection of Linear DP problems from Leetcode, categorized by difficulty level and accompanied by detailed editorials"
---

# Linear DP

## Problem: Climbing Stairs

Link: [LeetCode - Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)

### Problem Description:
You are climbing a staircase. It takes $n$ steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

### Solution:

To solve this problem, we can use dynamic programming to build the solution bottom-up. Let's define the subproblems and the transition states:

1. **Subproblem:**
   Let $DP[i]$ be the number of distinct ways to reach step $i$ of the staircase.

2. **Base Cases:**
   - $DP[0] = 1$: There is only one way to reach step 0, and that is by doing nothing (not taking any steps).
   - $DP[1] = 1$: There is only one way to reach step 1, and that is by taking one step of size 1.
   - $DP[2] = 2$: There are two ways to reach step 2: either take two steps of size 1 or take one step of size 2.

3. **Transition State:**
   To compute $DP[i]$, we can either take a single step of size 1 from $DP[i-1]$ or take two steps of size 1 from $DP[i-2]$. Therefore, the transition equation is:
    - DP[i] = DP[i-1] + DP[i-2]
    By using this transition equation, we can fill the DP table from $DP[3]$ to $DP[n]$.

4. **Objective:**
The objective is to find $DP[n]$, which represents the number of distinct ways to reach the top of the staircase when $n$ steps are required.


Solution:
```cpp:
class Solution {
public:
    int climbStairs(int n) {
       if (n==1){
           return 1;
       }
       else if (n==2){
           return 2;
       }
       else{
            vector <int> arr(n+1,0);
            arr[1]=1; arr[2] = 2;
            for(int i=3;i<n+1;i++){
                arr[i] = arr[i-1]+arr[i-2];
            }
            // cout<<arr[0]<<arr[1]<<arr[2]<<arr[3];
            return arr[n];
       }
    }
};
```

<br>

___


## Problem: Best Time to Buy and Sell Stock

Link: [LeetCode - Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

### Problem Description:

You are given an array $prices$ where $prices[i]$ is the price of a given stock on the $i$th day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return $0$.

### Solution:

**Subproblems:**

Let $\text{DP}[i]$ be the maximum profit that can be achieved by making a single transaction up to day $i$ (buying the stock at some day before or on day $i$ and selling it on day $i$).

**Transition States:**

To compute $\text{DP}[i]$ for each $i$, we need to consider two possibilities:

1. **Buy on Day $i$:**
   If we buy the stock on day $i$, then the profit will be zero as we don't have any stock to sell. So, the maximum profit in this case will be zero:

2. **Sell on Day $i$:**
If we sell the stock on day $i$, we need to find the minimum stock price seen before day $i$ (i.e., the minimum of $prices[0:i]$) and calculate the profit that can be obtained by selling on day $i$:
$$DP[i] = prices[i] - min_so_far$$
where $min_so_far$ is the minimum stock price seen up to day $i$.


Solution:
```python:
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        n=len(prices)
        min_so_far = prices[0]
        ans=0
        for i in range(1,n):
            ans = max(ans,prices[i]-min_so_far)
            min_so_far = min(min_so_far,prices[i])
        return ans
```

<br>

___


## Problem: Decode Ways

Link: [LeetCode - Decode Ways](https://leetcode.com/problems/decode-ways/description/)

### Problem Description:

A message containing letters from A-Z can be encoded into numbers using the following mapping:

- 'A' -> "1"
- 'B' -> "2"
- ...
- 'Z' -> "26"

To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, "11106" can be mapped into:
- "AAJF" with the grouping (1 1 10 6)
- "KJF" with the grouping (11 10 6)

Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".

Given a string $s$ containing only digits, return the number of ways to decode it. The test cases are generated so that the answer fits in a 32-bit integer.

### Solution:

**Subproblems:**

Let $\text{DP}[i]$ be the number of ways to decode the substring $s[i:]$.

**Transition States:**

To compute $\text{DP}[i]$ for each $i$, we need to consider two possibilities:

1. **Decode Single Digit:**
   If $s[i]$ is not equal to "0", we can form a single digit number. So, the number of ways to decode is equal to $\text{DP}[i+1]$.
   \[ \text{DP}[i] = \text{DP}[i+1] \]

2. **Decode Double Digits:**
   If $s[i:i+2]$ forms a valid double-digit number (between 10 and 26 inclusive), we can form a double digit. So, the number of ways to decode is equal to $\text{DP}[i+2]$.
   \[ \text{DP}[i] = \text{DP}[i+2] \]

   We also need to handle the cases when $s[i:i+2]$ starts with "0" or when $s[i+1]$ is not a valid digit for a double-digit number.

   Finally, the total number of ways to decode the substring $s[0:]$ is equal to $\text{DP}[0]$.

```Python:
class Solution:
    def numDecodings(self, s: str) -> int:
        memo = {}
        def decode(i):
            if i == len(s):
                return 1
            if i > len(s):
                return 0
            if s[i] == "0":
                return 0
            if i in memo:
                return memo[i]
            ans = 0
            for j in range(1, 3):
                if int(s[i:i+j]) <= 26:
                    ans += decode(i+j)
            memo[i]=ans
            return ans
        return decode(0)
```

<br>

___


## Problem: Unique Binary Search Trees

Link: [LeetCode - Unique Binary Search Trees](https://leetcode.com/problems/unique-binary-search-trees/description/)

### Problem Description:

Given an integer $n$, return the number of unique binary search trees that can be formed using the values $1$ to $n$.

### Solution:

The problem can be solved using the concept of Catalan numbers. The $n$-th Catalan number, denoted by $C_n$, represents the number of valid binary search trees that can be formed with $n$ nodes.

The formula for the $n$-th Catalan number is:

$$C_n = \frac{{2n!}}{{(n+1)!n!}}$$

To solve the problem, we need to compute the $n$-th Catalan number using the above formula. The result will be the answer to the problem.

The algorithm for computing the Catalan numbers can be implemented using dynamic programming as shown in the solution. The function $solve(n)$ computes the $n$-th Catalan number and returns the result.

The overall time complexity of the solution is $O(n^2)$ due to the nested loop in the $solve$ function. The space complexity is $O(n)$ due to the usage of the $dp$ array.

Hence, by using the Catalan number formula and dynamic programming, we can efficiently compute the number of unique binary search trees that can be formed using the values $1$ to $n$.

```cpp:
class Solution {
public:
int solve(int n)
{
    vector<int>dp(n+1,0);    
    dp[0]=dp[1]=1;
    for(int i=2;i<=n;i++)
    {
        for(int j= 1;j<=i;j++)
        {
            dp[i]+= dp[j-1]*dp[i-j];
        }
    }
        return dp[n];
}
    int numTrees(int n) {
    return solve(n); 
    }
};
```

<br>

___


## Problem: Integer Break

Link: [LeetCode - Integer Break](https://leetcode.com/problems/integer-break/description/)

### Problem Description:

Given an integer $n$, break it into the sum of $k$ positive integers, where $k \geq 2$, and maximize the product of those integers. Return the maximum product you can get.

### Solution:
To solve this problem, we can use dynamic programming to find the maximum product. Let's define $\text{dp}[i]$ as the maximum product that can be obtained by breaking the integer $i$ into the sum of two or more positive integers.
To compute $\text{dp}[i]$, we iterate through all possible ways to break $i$ into two parts, say $j$ and $i-j$, where $1 \leq j < i$. The product of $j$ and $i-j$ will be $j \times (i-j)$. We need to find the maximum product among all possible breakings.
The final answer will be $\text{dp}[n]$.
The time complexity of the solution is $O(n^2)$ due to the nested loop. The space complexity is $O(n)$ due to the usage of the $\text{dp}$ array.
Hence, by using dynamic programming, we can efficiently find the maximum product that can be obtained by breaking the integer $n$ into the sum of two or more positive integers.

Code:
```cpp:
class Solution {
public:
    int integerBreak(int n) {
        vector<int>dp(n+1,0);
        dp[1]=1;
        dp[2]=1;
        for(int i = 2; i< n+1;i++){
            int cur = i/2;
            dp[i] = cur*(i-cur);
            for(int j=1;j<i;j++){
                dp[i] = max(dp[i],dp[j]*dp[i-j]);
            }
            if (i!=n && dp[i]<i) dp[i]=i;
        }
        return dp[n];
    }
};
```

<br>

___


## Problem: Count Numbers with Unique Digits

Link: [LeetCode - Count Numbers with Unique Digits](https://leetcode.com/problems/count-numbers-with-unique-digits/)

### Problem Description:

Given an integer $n$, return the count of all numbers with unique digits, $x$, where $0 \leq x < 10^n$.

### Solution:

To solve this problem, we can use dynamic programming to count the numbers with unique digits.
Let $\text{dp}[i]$ represent the count of all numbers with unique digits in the range $0$ to $10^i$.
To compute $\text{dp}[i]$ for each $i$ from $2$ to $n$, we need to consider two cases:
1. When $i = 2$: There are $10$ numbers with unique digits in the range $0$ to $10^2$, i.e., $0$ to $99$.
2. When $i > 2$: The count of all numbers with unique digits in the range $0$ to $10^i$ can be calculated by considering the count of numbers with unique digits in the range $0$ to $10^{i-1}$ and then adding the count of numbers with unique digits formed by choosing digits from $1$ to $9$ in the first $i-1$ positions and any digit (from $0$ to $9$) in the $i$-th position (excluding leading $0$'s).
The formula for calculating the count of numbers with unique digits in the $i$-th position is $9 \times 9 \times \ldots \times (9 - (i-2))$, where there are $i-1$ terms in the product.
The final answer will be $\text{dp}[n]$.
The time complexity of the solution is $O(n)$ due to the loop from $2$ to $n$. The space complexity is also $O(n)$ due to the usage of the $\text{dp}$ array.
Hence, by using dynamic programming, we can efficiently count the numbers with unique digits in the given range.

```Python:
class Solution:
    def countNumbersWithUniqueDigits(self, n):
        dp = [1, 10]
        for i in range(2, n+1):
            tmp = 81
            for j in range(1, i-1):
                tmp *= (9 - j)
            ans = dp[i-1] + tmp
            dp.append(ans)
        
        return dp[n]
```

<br>

___


## Problem: Wiggle Subsequence

Link: [LeetCode - Wiggle Subsequence](https://leetcode.com/problems/wiggle-subsequence/description/)

### Problem Description:

A sequence of numbers is called a wiggle sequence if the differences between successive numbers strictly alternate between positive and negative. The first difference (if one exists) may be either positive or negative. A sequence with fewer than two elements is trivially a wiggle sequence.

For example, $[1, 7, 4, 9, 2, 5]$ is a wiggle sequence because the differences $(6, -3, 5, -7, 3)$ are alternately positive and negative.

Given an integer array $\text{nums}$, return the length of the longest wiggle subsequence of $\text{nums}$.

A subsequence is obtained by deleting some elements (eventually, also zero) from the original array, leaving the remaining elements in their original order.

### Solution:

The problem asks us to find the length of the longest wiggle subsequence in the given array $\text{nums}$.

A wiggle sequence is a sequence in which the differences between successive numbers strictly alternate between positive and negative. For example, the sequence $[1, 7, 4, 9, 2, 5]$ is a wiggle sequence because the differences $(6, -3, 5, -7, 3)$ are alternately positive and negative.

To solve the problem, we can use dynamic programming. Let's define a 2D DP array $\text{dp}$, where $\text{dp}[i][0]$ represents the length of the longest wiggle subsequence ending at index $i$ with a negative difference, and $\text{dp}[i][1]$ represents the length of the longest wiggle subsequence ending at index $i$ with a positive difference.

To compute $\text{dp}[i][0]$ and $\text{dp}[i][1]$ for each index $i$ from $1$ to $n-1$, we iterate through all previous indices $j$ from $0$ to $i-1$. We check if the difference between $\text{nums}[i]$ and $\text{nums}[j]$ is positive or negative, and accordingly, update the values of $\text{dp}[i][0]$ and $\text{dp}[i][1]$. We also maintain a variable $\text{ans}$ to keep track of the maximum length of the wiggle subsequence seen so far.

Finally, the answer will be the maximum of $\text{ans}$, $\text{dp}[n-1][0]$, and $\text{dp}[n-1][1]$.

The time complexity of the solution is $O(n^2)$ due to the nested loop. The space complexity is also $O(n^2)$ due to the usage of the 2D DP array.

Hence, by using dynamic programming, we can efficiently find the length of the longest wiggle subsequence in the given array $\text{nums}$.

```cpp:
class Solution {
public:
    int wiggleMaxLength(vector<int>& nums) {
        int n = nums.size();
        // 0->neg 1->pos
        vector< vector<int> >dp(n, vector<int>(2,1));
        int ans = 1;
        for(int i=1;i<n;i++){
            for(int j=0;j<i;j++){
                if (nums[i]>nums[j]){
                    dp[i][1] = max(dp[i][1],1+dp[j][0]);
                }
                if (nums[i]<nums[j]){
                    dp[i][0] = max(dp[i][0],1+dp[j][1]);
                }
            }
            ans = max(ans,dp[i][0]);
            ans = max(ans,dp[i][1]);
        }
        return ans;
    }
};
```

<br>

___


## 416. Partition Equal Subset Sum

Link: https://leetcode.com/problems/partition-equal-subset-sum/description/

Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

Solution:



```cpp:
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int n = nums.size();
        int sum = 0;
        for(int i:nums) sum+=i;
        if (sum%2!=0) return false;
        vector<int> dp(sum+1,0);
        dp[0]=1;
        for(int i:nums){
            for(int j=sum;j>=0;j--){
                if (dp[j]>0) dp[j+i]=1;
            }
        }
        if (dp[sum/2]>0) return true;
        return false;
    }
};
```

<br>

___


## Problem: Partition Equal Subset Sum

Link: [LeetCode - Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/description/)

### Problem Description:
Given an integer array $ \text{nums} $, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal, or false otherwise.

### Solution:

To solve this problem, we can use dynamic programming. Let's assume the total sum of elements in the array is $ \text{sum} $. If $ \text{sum} $ is odd, it is not possible to divide the array into two subsets with equal sums, so we return false.

Next, we create a 1D DP array $ \text{dp} $, where $ \text{dp}[i] $ is 1 if it is possible to form a subset with sum $ i $, and 0 otherwise. We initialize $ \text{dp}[0] $ to 1, as we can always form a subset with sum 0 (by not selecting any elements).

Now, for each element $ i $ in $ \text{nums} $, we update the $ \text{dp} $ array. We iterate through the $ \text{dp} $ array from the end (i.e., from $ \text{sum} $ to 0) and if $ \text{dp}[j] $ is 1, then we update $ \text{dp}[j+i] $ to 1, indicating that it is possible to form a subset with sum $ j+i $.

Finally, if $ \text{dp}[\text{sum}/2] $ is 1, it means it is possible to partition the array into two subsets with equal sums, so we return true, otherwise, we return false.

### Complexity Analysis:

- Time complexity: $ O(n \cdot \text{sum}) $, where $ n $ is the number of elements in $ \text{nums} $ and $ \text{sum} $ is the total sum of elements in $ \text{nums} $.
- Space complexity: $ O(\text{sum}) $ due to the usage of the $ \text{dp} $ array.

Hence, by using dynamic programming, we can efficiently determine if it is possible to partition the array into two subsets with equal sums.

```cpp:
class Solution {
public:
    static bool cmp(const vector<int>& pair1, const vector<int>& pair2) {
        return pair1[1] < pair2[1];
    }
    int findLongestChain(vector<vector<int>>& pairs) {
        sort(pairs.begin(),pairs.end(),cmp);
        int n = pairs.size();
        int end = pairs[0][1];
        int ans = 1;
        for(int i=0;i<=n-1;i++){
            if (pairs[i][0]>end){
                ans++;
                end = pairs[i][1];
            }
        }
        return ans;
    }
};
```

<br>

___


## Problem: Delete and Earn

Link: [LeetCode - Delete and Earn](https://leetcode.com/problems/delete-and-earn/description/)

### Problem Description:

You are given an integer array $ \text{nums} $. You want to maximize the number of points you get by performing the following operation any number of times:

- Pick any $ \text{nums}[i] $ and delete it to earn $ \text{nums}[i] $ points.
- Afterwards, you must delete every element equal to $ \text{nums}[i] - 1 $ and every element equal to $ \text{nums}[i] + 1 $.

Return the maximum number of points you can earn by applying the above operation some number of times.

### Solution:

To solve this problem, we can first preprocess the given array to create a new array $sums$, where $sums[i]$ stores the sum of all occurrences of $i$ in the original array $nums$.

After preprocessing, the problem is now reduced to a simple "house robber" problem. In the "house robber" problem, we are not allowed to rob consecutive houses. Similarly, in our current problem, we cannot earn points by deleting two adjacent elements in $nums$ (i.e., $nums[i] - 1$ and $nums[i] + 1$).

To apply dynamic programming for the "house robber" problem, we create a new DP array $dp$, where $dp[i]$ represents the maximum points that can be earned up to the element at index $i$ (i.e., $nums[i]$). We can calculate $dp[i]$ using the following recurrence relation:

$$dp[i] = max(dp[i-1], dp[i-2] + sums[i])$$

Finally, the answer will be the maximum of $dp[n]$ and $dp[n-1]$, where $n$ is the length of $nums$.

### Complexity Analysis:

- Time complexity: $ O(n) $, where $ n $ is the length of $nums$.
- Space complexity: $ O(n) $ due to the usage of the $sums$ and $dp$ arrays.


```cpp:
class Solution {
public:
    int deleteAndEarn(vector<int>& nums) {
        int n = *max_element(nums.begin(),nums.end());
        vector<int> sums(n+1);
        for(int i:nums){
            sums[i]+=i;
        }
        // Now it is converted to simple house robber problem.
        // where each house gives a profix, but we cant rob 
        // consecutive houses.
        vector<int> dp(n+1,0);
        dp[0]=sums[0];
        dp[1]=max(dp[0],sums[1]);
        for (int i = 2; i <=n; i++) {
            dp[i] = max(dp[i-1],dp[i-2]+sums[i]);
        }
        return max(dp[n],dp[n-1]);
    }
};
```

<br>

___


## Problem: Domino and Tromino Tiling

Link: [LeetCode - Domino and Tromino Tiling](https://leetcode.com/problems/domino-and-tromino-tiling/description/)

### Problem Description:

We have two types of tiles: a 2x1 domino shape, and an "L" tromino shape. These shapes may be rotated.

Given an integer $n$, return the number of ways to tile an $2 x n$ board. The answer may be very large, so return it modulo $10^9 + 7$.

A tiling is a filling of a region with non-overlapping tiles such that every empty square in the region is covered by exactly one tile. A rotation (reflection) of a shape consists of rotating (reflecting) it in a way such that all of the angles fit between the axes of symmetry.

Note:
- $n$ will be in range $[1, 1000]$.

### Solution:

To solve this problem, we can use dynamic programming. Let's define a 1D DP array $D$, where $D[i]$ represents the number of ways to tile a $2 x i$ board.

We initialize the DP array as follows:
- $D[1] = 1$ (as there is only one way to tile a $2 x 1$ board with a single domino)
- $D[2] = 2$ (as there are two ways to tile a $2 x 2$ board, either using two dominoes or a single tromino)

Now, for $i$ from $3$ to $n$, we calculate $D[i]$ using the recurrence relation:
$$D[i] = (D[i-1]*2 + D[i-3]) % (10^9 + 7)$$

Finally, the answer will be $D[n]$.

### Complexity Analysis:

- Time complexity: $O(n)$, where $n$ is the given integer. We need to calculate $D[i]$ for all $i$ from $3$ to $n$.
- Space complexity: $O(n)$ due to the usage of the DP array $D$.


```Python:
class Solution:
    def numTilings(self, n: int) -> int:
        D = [1 for _ in range(1001)]
        D[1] = 1
        D[2] = 2
        D[3] = 5
        if n<=3: return D[n]
        for i in range(4,n+1):
            D[i] = (D[i-1]*2+D[i-3])%(1000000007)
        return int(D[n])
```

<br>

___


## Problem: Knight Dialer

Link: [LeetCode - Knight Dialer](https://leetcode.com/problems/knight-dialer/description/)

### Problem Description:

The chess knight has a unique movement - it may move two squares vertically and one square horizontally, or two squares horizontally and one square vertically (with both forming the shape of an L).

A chess knight can move as indicated in the chess diagram below:

Given an integer \( n \), return how many distinct phone numbers of length \( n \) we can dial.

You are allowed to place the knight on any numeric cell initially, and then you should perform \( n - 1 \) jumps to dial a number of length \( n \). All jumps should be valid knight jumps.

As the answer may be very large, return the answer modulo \( 10^9 + 7 \).

### Solution:

To solve this problem, we can use dynamic programming. We create a 2D DP array $dp$, where $dp[i][j]$ represents the number of distinct phone numbers of length $i$ that can be dialed starting from the numeric cell $j$.

We initialize the DP array as follows:
- For $i = 1$, all numeric cells are reachable in one step, so we set $dp[1][j] = 1$ for all $j$.
- For $i = 2$, we calculate the number of distinct phone numbers of length $2$ that can be dialed from each numeric cell. We predefine the valid knight moves for each numeric cell, and for each numeric cell $j$, we count the number of distinct phone numbers that can be dialed in one step from the valid knight moves of $j$.

Now, for $i$ from $3$ to $n$, we calculate $dp[i][j]$ using the following recurrence relation:
$dp[i][j] = sum(dp[i-1][k])$ for all valid knight moves k of j

Finally, the answer will be the sum of all $dp[n][j]$ for all $j$.

### Complexity Analysis:

- Time complexity: \( O(n) \), where $n$ is the given integer. We need to calculate $dp[i][j]$ for all $i$ from $3$ to $n$ and all $j$.
- Space complexity: \( O(n) \) due to the usage of the DP array $dp$.

```cpp:
class Solution {
public:
    int knightDialer(int n){
        vector<vector<int>> a = {{4, 6}, {6, 8}, {7, 9}, {4, 8}, {0, 3, 9}, {}, {0, 1, 7}, {2, 6}, {1, 3}, {2, 4}};
        int mod = 1e9 + 7;
        long long int ans = 0;
        vector<vector<long long int>> dp(n + 1, vector<long long int>(10, 0));
        for (int i = 0; i < 10; i++)
            dp[1][i] = 1;
        for (int i = 2; i < n + 1; i++)
            for (int j = 0; j < 10; j++){
                for (int k = 0; k < a[j].size(); k++)
                    dp[i][j] += dp[i - 1][a[j][k]];
                dp[i][j] %= mod;
            }
        for (auto x : dp[n])
            ans += x;
        return ans % mod;
    }
};
```

<br>

___


## Problem: Minimum Cost For Tickets

Link: [LeetCode - Minimum Cost For Tickets](https://leetcode.com/problems/minimum-cost-for-tickets/description/)

### Problem Description:

You have planned some train traveling one year in advance. The days of the year in which you will travel are given as an integer array $ \text{days} $. Each day is an integer from 1 to 365.

Train tickets are sold in three different ways:

- A 1-day pass is sold for $ \text{costs}[0] $ dollars.
- A 7-day pass is sold for $ \text{costs}[1] $ dollars.
- A 30-day pass is sold for $ \text{costs}[2] $ dollars.

The passes allow that many days of consecutive travel.

For example, if we get a 7-day pass on day 2, then we can travel for 7 days: 2, 3, 4, 5, 6, 7, and 8.

Return the minimum number of dollars you need to travel every day in the given list of days.

### Solution:

To solve this problem, we can use dynamic programming. Let's define a 1D DP array $ \text{dp} $, where $ \text{dp}[i] $ represents the minimum number of dollars needed to travel for the first $ i $ days in the given list of days.

We initialize the DP array as follows:
- $ \text{dp}[0] = 0 $ (as there are no days to travel, so the cost is 0)

Now, for $ i $ from 1 to $ n $ (where $ n $ is the number of days in the given list), we calculate $ \text{dp}[i] $ using the following recurrence relation:
$$dp[i] = min(dp[i-1] + costs[0], dp[j] + costs[1], dp[k] + costs[2])$$
where $ j $ is the maximum index such that the difference between the $ i $-th day and the $ j $-th day is at most 7 (i.e., the 7-day pass), and $ k $ is the maximum index such that the difference between the $ i $-th day and the $ k $-th day is at most 30 (i.e., the 30-day pass).

Finally, the answer will be $ \text{dp}[n] $, which represents the minimum number of dollars needed to travel for all the days in the given list.

### Complexity Analysis:

- Time complexity: $ O(n) $, where $ n $ is the number of days in the given list. We need to calculate $ \text{dp}[i] $ for all $ i $ from 1 to $ n $.
- Space complexity: $ O(n) $ due to the usage of the DP array $ \text{dp} $.

```cpp:
class Solution {
public:
    int mincostTickets(vector<int>& days, vector<int>& costs) {
        int n=days.size(),j=0,k=0;
        vector<int> dp(n+1,0);

        for(int i=0;i<n;i++){
            while(days[i]-days[j]>=7)j++;
            while(days[i]-days[k]>=30)k++;
            
            dp[i+1]=min(dp[i]+costs[0],min(dp[j]+costs[1],dp[k]+costs[2]));
        }

        return dp[n];
    }
};
```

<br>

___


## Problem: Partition Array for Maximum Sum

Link: [LeetCode - Partition Array for Maximum Sum](https://leetcode.com/problems/partition-array-for-maximum-sum/description/)

### Problem Description:

Given an integer array $ \text{arr} $, partition the array into (contiguous) subarrays of length at most $ k $. After partitioning, each subarray has its values changed to become the maximum value of that subarray.

Return the largest sum of the given array after partitioning. Test cases are generated so that the answer fits in a 32-bit integer.

### Solution:

To solve this problem, we can use dynamic programming. Let's define a 1D DP array $ \text{dp} $, where $ \text{dp}[i] $ represents the largest sum of the array from index $ i $ to the end, considering all possible partitions of the array from index $ i $ to the end.

We initialize the DP array as follows:
- $ \text{dp}[n] = 0 $ (as there are no elements in the array after the last index, so the sum is 0)

Now, for $ i $ from $ n-1 $ to 0, we calculate $ \text{dp}[i] $ using the following recurrence relation:
$dp[i] = max( arr[j]*(j-i+1) + dp[j+1] )$ for all j from i to min(n-1, i+k-1)

where $ j $ is the ending index of the subarray and $ (j-i+1) $ represents the length of the subarray. We iterate through all possible partitions of the array from index $ i $ to the end, and take the maximum sum among them.

Finally, the answer will be $ \text{dp}[0] $, which represents the largest sum of the array after partitioning.

### Complexity Analysis:

- Time complexity: $ O(n*k) $, where $ n $ is the number of elements in the array and $ k $ is the given integer. We need to calculate $ \text{dp}[i] $ for all $ i $ from $ n-1 $ to 0, and each calculation requires iterating through at most $ k $ elements.
- Space complexity: $ O(n) $ due to the usage of the DP array $ \text{dp} $.


```cpp:
class Solution {
public:
    int maxSumAfterPartitioning(vector<int>& arr, int k) {
        int n=arr.size();
        vector<int>dp(n+1, 0);
        // process suffixes
        for(int i=n-1; i>=0; i--){
            int ans=INT_MIN, maxi=INT_MIN, l=0;
            for(int j=i; j<min(n, i+k); j++){
                l++;
                maxi=max(maxi, arr[j]);
                int cnt=l*maxi+dp[j+1];
                ans=max(ans, cnt);
            }
            dp[i]=ans;
        }
        return dp[0];
    }
};
```

<br>

___


## Problem: Filling Bookcase Shelves

Link: [LeetCode - Filling Bookcase Shelves](https://leetcode.com/problems/filling-bookcase-shelves/)

### Problem Description:

You are given an array $books$ where $books[i] = [thickness_i, height_i]$ indicates the thickness and height of the $ith$ book. You are also given an integer $shelfWidth$.

We want to place these books in order onto bookcase shelves that have a total width $shelfWidth$.

We choose some of the books to place on this shelf such that the sum of their thickness is less than or equal to $shelfWidth$, then build another level of the shelf of the bookcase so that the total height of the bookcase has increased by the maximum height of the books we just put down. We repeat this process until there are no more books to place.

Note that at each step of the above process, the order of the books we place is the same as the given sequence of books.

Return the minimum possible height that the total bookshelf can be after placing shelves in this manner.

### Solution:

To solve this problem, we can use dynamic programming. Let's define a 1D DP array $dp$, where $dp[i]$ represents the minimum possible height of the bookshelf when placing the books from index $i$ to the end of the array.

We initialize the DP array as follows:
- $dp[n] = 0$, where $n$ is the number of books. (as there are no books to place at the end, so the minimum height is 0)

Now, for $i$ from $n-1$ to 0, we calculate $dp[i]$ using the following recurrence relation:
$dp[i] = min( books[j][1] + dp[j + 1] )$ for all j from i to n-1, where sum of thickness of books from index i to j <= shelfWidth

We iterate through all possible partitions of the books from index $i$ to the end, and take the minimum height among them.

Finally, the answer will be $dp[0]$, which represents the minimum possible height of the bookshelf when placing the books from the beginning of the array.

### Complexity Analysis:

- Time complexity: $O(n^2)$, where $n$ is the number of books. We need to calculate $dp[i]$ for all $i$ from $n-1$ to 0, and each calculation requires iterating through at most $n-1$ elements.
- Space complexity: $O(n)$ due to the usage of the DP array $dp$.


```cpp:
class Solution {
public:
    int minHeightShelves(vector<vector<int>>& books, int shelfWidth) {
        int n = books.size();
        int dp[n + 1];
        int i, j;
        dp[n] = 0;
        int sum;
        int max;
        for(i = n - 1;i > -1;i--){
            dp[i] = books[i][1] + dp[i + 1];
            sum = books[i][0];
            max = books[i][1];
            for(j = i + 1;j < n;j++){
                sum = sum + books[j][0];
                if(books[j][1] > max)
                    max = books[j][1];
                if(sum > shelfWidth)
                    break;
                dp[i] = min(dp[i], max + dp[j + 1]);
            }
        }
        return dp[0];
    }
};
```

<br>

___


## Problem: Longest Arithmetic Subsequence of Given Difference

Link: [LeetCode - Longest Arithmetic Subsequence of Given Difference](https://leetcode.com/problems/longest-arithmetic-subsequence-of-given-difference/)

### Problem Description:

Given an integer array $arr$ and an integer $difference$, return the length of the longest subsequence of the given array that is an arithmetic sequence with the difference $difference$.

A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

### Solution:

To solve this problem, we can use dynamic programming. Let's define a 1D DP array $dp$, where $dp[i]$ represents the length of the longest arithmetic subsequence with difference $difference$ ending at index $i$ of the array $arr$.

We initialize the DP array as follows:
- $dp[i] = 1$ for all $i$ from 0 to $n-1$, where $n$ is the number of elements in the array. (as a single element forms an arithmetic subsequence of length 1)

Now, for each element $arr[i]$ in the array, we check if $arr[i] - difference$ exists in the array and calculate $dp[i]$ using the following recurrence relation:

$dp[i] = dp[arr[i] - difference] + 1 if arr[i]$ - difference exists in the array, else $dp[i] = 1$
We update the answer as the maximum value of $dp[i]$ for all elements $arr[i]$ in the array.

Finally, the answer will be the maximum value in the DP array $dp$.

### Complexity Analysis:

- Time complexity: $O(n)$, where $n$ is the number of elements in the array. We need to calculate $dp[i]$ for all elements in the array.
- Space complexity: $O(n)$ due to the usage of the DP array $dp$.

```cpp:
class Solution {
public:
    int longestSubsequence(vector<int>& arr, int difference) {
        int ans = 1;
        unordered_map<int,int>m;
        for(int i:arr){
            m[i] = m[i-difference]+1;
            ans = max(ans,m[i]);
        }
        return ans;
    }
};

```

<br>

___


## Problem: Greatest Sum Divisible by Three

Link: [LeetCode - Greatest Sum Divisible by Three](https://leetcode.com/problems/greatest-sum-divisible-by-three/description/)

### Problem Description:

Given an integer array $nums$, return the maximum possible sum of elements of the array such that it is divisible by three.

### Solution:

To solve this problem, we can use dynamic programming. Let's define a 1D DP array $dp$, where $dp[i]$ represents the maximum possible sum of elements of the array such that the sum is divisible by three and the remainder of the sum modulo three is $i$.

We initialize the DP array as follows:
- $dp[0] = 0$ (as there is no element in the array, so the maximum sum divisible by three with remainder 0 is 0)

Now, for each element $nums[i]$ in the array, we update the DP array $dp$ using the following recurrence relation:
$dp[rem] = max(dp[rem], dp[(rem - nums[i]) % 3] + nums[i])$ for all rem from 0 to 2
where $rem$ represents the remainder of the sum modulo three.

We update the DP array $dp$ in such a way that at each index $i$, $dp[i]$ represents the maximum sum of elements of the array such that the sum is divisible by three and the remainder of the sum modulo three is $i$.

Finally, the answer will be $dp[0]$, which represents the maximum possible sum of elements of the array that is divisible by three.

### Complexity Analysis:

- Time complexity: $O(n)$, where $n$ is the number of elements in the array. We need to update the DP array $dp$ for all elements in the array.
- Space complexity: $O(1)$ as we are using a constant space DP array $dp$ of size 3.


```cpp:
class Solution {
public:
    int maxSumDivThree(vector<int>& nums) {
        int n = nums.size();
        int dp[3]={0};
        for(int i=0;i<n;i++){
            int curr[3];
            for(int k=0;k<3;k++)curr[k] = dp[k];
            for(int j=0;j<3;j++){
                int rem = (curr[j] + nums[i])%3;
                dp[rem] = max(dp[rem],curr[j] + nums[i]);
            }
        }
        return dp[0];
    }
};
```

<br>

___


## Problem: Student Attendance Record II

Link: [LeetCode - Student Attendance Record II](https://leetcode.com/problems/student-attendance-record-ii/)

### Problem Description:

An attendance record for a student can be represented as a string where each character signifies whether the student was absent, late, or present on that day. The record only contains the following three characters:

- $A$: Absent.
- $L$: Late.
- $P$: Present.

Any student is eligible for an attendance award if they meet both of the following criteria:

1. The student was absent ($A$) for strictly fewer than 2 days total.
2. The student was never late ($L$) for 3 or more consecutive days.

Given an integer $n$, return the number of possible attendance records of length $n$ that make a student eligible for an attendance award. The answer may be very large, so return it modulo $10^9 + 7$.

### Solution:

To solve this problem, we can use dynamic programming with memoization. Let's define a 3D DP array $mem$, where $mem[i][j][k]$ represents the number of possible attendance records of length $i$ with $j$ absences and $k$ consecutive late days that make a student eligible for an attendance award.

We initialize the DP array as follows:
- $mem[1][1][0] = 1$ (only one day, and one absence)
- $mem[1][0][1] = 1$ (only one day, and one late day)

Now, for each possible attendance record of length $i$, we calculate the number of possible attendance records with $j$ absences and $k$ consecutive late days using the following recurrence relation:
$$
mem[i][j][k] = mem[i-1][j][0] + mem[i-1][j-1][0] + mem[i-1][j][k+1]
$$
where $0 \leq i \leq n$, $0 \leq j \leq 1$, and $0 \leq k \leq 2$.

Finally, the answer will be the sum of all $mem[n][j][k]$ where $j$ is less than 2 and $k$ is less than 3.

### Complexity Analysis:

- Time complexity: $O(n)$ where $n$ is the given integer $n$. We need to calculate $mem[i][j][k]$ for all possible combinations of $i$, $j$, and $k$.
- Space complexity: $O(n)$ due to the usage of the DP array $mem$.

Hence, by using dynamic programming with memoization, we can efficiently find the number of possible attendance records of length $n$ that make a student eligible for an attendance award.


```cpp:
class Solution {
private:
    static const int MOD = 1e9 + 7, N = 1e5 + 2;
    int mem[N][2][3];
    int add(long long x, int y) {
        x += y;
        return x % MOD;
    }
    int solve(int remaining, bool isAbsent, int LateConsecutiveDays) {
        if(!remaining)
            return 1;

        int& ret = mem[remaining][isAbsent][LateConsecutiveDays];
        if(~ret)
            return ret;
        ret = 0;
        ret = solve(remaining - 1, isAbsent, 0);
        if(!isAbsent)
            ret = add(ret, solve(remaining - 1, true, 0));
        if(LateConsecutiveDays < 2)
            ret = add(ret, solve(remaining - 1, isAbsent, LateConsecutiveDays + 1));
        
        return ret;
    }
public:
    int checkRecord(int n) {
        memset(mem, -1, sizeof mem);
        return solve(n, false, 0);
    }
};

```

<br>

___


## Problem: Decode Ways II

Link: [LeetCode - Decode Ways II](https://leetcode.com/problems/decode-ways-ii/)

### Problem Description:

A message containing letters from A-Z can be encoded into numbers using the following mapping:
- $'A' \rightarrow "1"$
- $'B' \rightarrow "2"$
- ...
- $'Z' \rightarrow "26"$

To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, "11106" can be mapped into:
- "AAJF" with the grouping $(1, 1, 10, 6)$
- "KJF" with the grouping $(11, 10, 6)$
- Note that the grouping $(1, 11, 06)$ is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".
- In addition to the mapping above, an encoded message may contain the '*' character, which can represent any digit from '1' to '9' ('0' is excluded). For example, the encoded message "1*" may represent any of the encoded messages "11", "12", "13", "14", "15", "16", "17", "18", or "19". Decoding "1*" is equivalent to decoding any of the encoded messages it can represent.

Given a string $s$ consisting of digits and '*' characters, return the number of ways to decode it.

Since the answer may be very large, return it modulo $10^9 + 7$.

### Solution:

To solve this problem, we can use dynamic programming. Let's define the following helper functions:

- $oneDigit(char a)$: It returns the number of ways to decode a single digit $a$ (considering the '*' character).

- $twoDigit(char b, char a)$: It returns the number of ways to decode two digits $b$ and $a$ (considering the '*' character).

We can use these helper functions to compute the number of ways to decode the entire string $s$. We use three variables $prev2$, $prev1$, and $curr$ to keep track of the number of ways to decode the previous two characters, the previous character, and the current character, respectively.

Starting from the second character of the string, we iterate through each character and update the variables $prev2$, $prev1$, and $curr$ based on the helper functions' values. We use modular arithmetic to avoid overflow as the answer may be very large.

Finally, the answer will be stored in the variable $prev1$.

### Complexity Analysis:

- Time complexity: $O(n)$ where $n$ is the size of the input string $s$. We iterate through each character once.
- Space complexity: $O(1)$ as we use a constant amount of extra space.


```cpp:
#define mod 1000000007
class Solution {
public:
    int oneDigit(char a){
        if (a=='*')
            return 9;
        else if(a>='1')
            return 1;
        return 0;
    }
    int twoDigit(char b, char a){
        if (b=='*'){
            if (a=='*')
                return 15;
            else
                return (a>='0' && a<='6')? 2: 1;
        }
        else if (b=='1')
            return a=='*'? 9: 1;
        else if (b=='2'){
            if (a=='*')
                return 6;
            else
                return (a>='0' && a<='6')? 1: 0;
        }
        return 0;
    }
    int numDecodings(string s) {
        long long int prev2, prev1, curr;
        if (s[0]=='0')
            return 0;
        int n=s.size();
        prev1 = s[0]=='*'? 9: 1;
        prev2 = 1;
        for (int i=1; i<n; i++){
            curr = ((prev1*oneDigit(s[i])) + (prev2*twoDigit(s[i-1], s[i])))%mod;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
};

```

<br>

___


## Problem: Triples with Bitwise AND Equal To Zero

Link: [LeetCode - Triples with Bitwise AND Equal To Zero](https://leetcode.com/problems/triples-with-bitwise-and-equal-to-zero/description/)

### Problem Description:

Given an array $nums$ of integers, find the number of unique triplets $(i, j, k)$ such that $0 \leq i < j < k < \text{nums.length}$ and $nums[i]$ & $nums[j]$ & $nums[k] == 0$, where & represents the bitwise AND operator.

### Solution:

To solve this problem, we use bitwise manipulation and dynamic programming. We create an array $table$ of size $2^{16}$ (since the maximum number in the input array is at most $2^{16}-1$). The $table$ array stores the count of occurrences of each element in the $nums$ array. We then iterate through the $nums$ array and update the $table$ array accordingly.

Next, we iterate through each element in the $nums$ array and perform the bitwise NOT operation $(i = i \oplus 0xffff)$ to find the bitwise complement of the element. We then use a nested loop to find all possible subsets of the complement. For each subset, we add the count of occurrences of that subset from the $table$ array to the result.

Finally, we return the result, which represents the number of unique triplets that satisfy the given condition.

### Complexity Analysis:

- Time complexity: $O(n \cdot 2^{16})$, where $n$ is the size of the input array $nums$. We iterate through the array twice: once to build the $table$ array and once to find the unique triplets.
- Space complexity: $O(2^{16})$ for the $table$ array.

```cpp:
class Solution {
public:
    int countTriplets(vector<int>& nums) {
        int table[1<<16] = {0};
        int n = nums.size();
        for (int i = 0; i < n; ++i) {
            ++table[nums[i]];
            for (int j = i+1; j < n; ++j) {
                table[nums[i]&nums[j]]+= 2;
            }
        }
        int res = 0;
        for (int i: nums) {
            i = i ^ 0xffff; // hex value of (2^16-1)
            for (int j = i; j; j = (j-1)&i) {
                res += table[j];
            }
            res += table[0];
        }
        return res;
    }
};
```

<br>

___


## 1235. Maximum Profit in Job Scheduling

Link: https://leetcode.com/problems/maximum-profit-in-job-scheduling/description/

We have n jobs, where every job is scheduled to be done from startTime[i] to endTime[i], obtaining a profit of profit[i].

You're given the startTime, endTime and profit arrays, return the maximum profit you can take such that there are no two jobs in the subset with overlapping time range.

If you choose a job that ends at time X you will be able to start another job that starts at time X.

### Approach

To solve this problem, we can use dynamic programming. We will sort the jobs based on their start time in ascending order. Then, we will use a dynamic programming array $dp$, where $dp[i]$ represents the maximum profit we can obtain by considering jobs starting from index $i$ to the end of the jobs array.

### Algorithm

1. Sort the jobs based on their start time in ascending order, along with their corresponding index.
2. Initialize a dynamic programming array $dp$ of size $n+1$, where $n$ is the total number of jobs. Set all elements of $dp$ to 0 initially.
3. Traverse the sorted jobs array in reverse order (from the last job to the first job).
4. For each job, calculate the maximum profit that can be obtained by considering it and the jobs that can be done after it without overlapping.
5. Update the $dp$ array with the maximum profit for each job.
6. The final answer will be stored in $dp[0]$, which represents the maximum profit that can be obtained by considering all jobs.

### Complexity Analysis

The overall time complexity of the solution is $O(n \log n)$.

```cpp:
class Solution {
public:
    int jobScheduling(vector<int>& startTime, vector<int>& endTime, vector<int>& profit) {
        int totalJobs = startTime.size();
        vector<int> dp(totalJobs + 1, 0);
        vector<pair<int, int>> jobs;

        for (int i = 0; i < totalJobs; i++){
            jobs.push_back(make_pair(startTime[i], i));
        }

        sort(jobs.begin(), jobs.end());
        for (int i = totalJobs - 1; i >= 0; i--){
            dp[i] = dp[i+1];
            int curr = profit[jobs[i].second];
            int newStartTime = endTime[jobs[i].second];
            vector<pair<int, int>>::iterator it = lower_bound(jobs.begin() + i + 1, jobs.end(), make_pair(newStartTime, -1));
            
            if (it != jobs.end())
            {
                curr += dp[it - jobs.begin()];
            }

            dp[i] = max(dp[i], curr);
        }
        return dp[0];
    }
};
```

<br>

___


## 1326. Minimum Number of Taps to Open to Water a Garden

Link: https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden/description/

There is a one-dimensional garden on the x-axis. The garden starts at the point 0 and ends at the point n. (i.e The length of the garden is n).
There are n + 1 taps located at points [0, 1, ..., n] in the garden.
Given an integer n and an integer array ranges of length n + 1 where ranges[i] (0-indexed) means the i-th tap can water the area [i - ranges[i], i + ranges[i]] if it was open.
Return the minimum number of taps that should be open to water the whole garden, If the garden cannot be watered return -1.

### Approach

To solve this problem, we can use dynamic programming. We will create an array $max\_range$, where $max\_range[i]$ represents the maximum distance we can water from the $i$-th tap. Then, we will use a greedy approach to find the minimum number of taps required to water the entire garden.

### Algorithm

1. Create an array $max\_range$ of size $n+1$, where $n$ is the total number of taps. Initialize all elements of $max\_range$ to 0.
2. For each tap, calculate the leftmost and rightmost points it can water, and update the corresponding values in the $max\_range$ array.
3. After updating $max\_range$, we can treat the problem as a jump game. Initialize $start$, $end$, and $step$ to 0.
4. While $end$ is less than $n$, do the following:
   a. Increment $step$ by 1.
   b. Update $start$ to the current value of $end$.
   c. Update $end$ to the maximum of the sum of $i$ and $max\_range[i]$ for all $i$ in the range from $start$ to $end + 1$.
   d. If $start$ is equal to $end$, return -1 (indicating that the entire garden cannot be watered).
5. Return the final value of $step$, which represents the minimum number of taps required to water the entire garden.

### Complexity Analysis

The time complexity of the solution is $O(n)$, where $n$ is the total number of taps. We iterate through the taps to update the $max\_range$ array and then use a while loop to find the minimum number of taps.

The space complexity is $O(n)$, as we are using an array $max\_range$ of size $n+1$.

```
class Solution:
    def minTaps(self, n: int, ranges: List[int]) -> int:
        max_range = [0] * (n + 1)
        for i, r in enumerate(ranges):
            left, right = max(0, i - r), min(n, i + r)
            max_range[left] = max(max_range[left], right - left)
		# it's a jump game now
        start = end = step = 0
        while end < n:
            step += 1
            start, end = end, max(i + max_range[i] for i in range(start, end + 1))
            if start == end:
                return -1
        return step
```

<br>

___


## 1359. Count All Valid Pickup and Delivery Options

Link: https://leetcode.com/problems/count-all-valid-pickup-and-delivery-options/description/

Given n orders, each order consist in pickup and delivery services. 
Count all valid pickup/delivery possible sequences such that delivery(i) is always after of pickup(i). 
Since the answer may be too large, return it modulo 10^9 + 7.

### Approach

To solve this problem, we can use combinatorics. For each order, there are two choices: pickup or delivery. Since each delivery must come after its corresponding pickup, the total number of valid sequences for one order is $2 \times 1 = 2$.

To count all the valid sequences for all the orders, we can multiply the number of valid sequences for each order together.

### Algorithm

1. Initialize a variable $res$ to $1$, and a variable $mod$ to $10^9 + 7$.
2. For each order from $1$ to $n$, do the following:
   - Multiply $res$ by the number of valid sequences for the current order, which is $2 \times (2i - 1) \times i$.
   - Take the result modulo $mod$.
3. Return the final value of $res$ as the answer.

Here's the Python code implementation:

```cpp:
class Solution {
public:
    int countOrders(int n) {
        long res = 1, mod = 1e9 + 7;
        for (int i = 1; i <= n; ++i)
            res = res * (i * 2 - 1) * i % mod;
        return res;
    }
};
```

<br>

___


## 1406. Stone Game III

Link: https://leetcode.com/problems/stone-game-iii/description/

Alice and Bob continue their games with piles of stones. There are several stones arranged in a row, and each stone has an associated value which is an integer given in the array stoneValue.

Alice and Bob take turns, with Alice starting first. On each player's turn, that player can take 1, 2, or 3 stones from the first remaining stones in the row.

The score of each player is the sum of the values of the stones taken. The score of each player is 0 initially.

The objective of the game is to end with the highest score, and the winner is the player with the highest score and there could be a tie. The game continues until all the stones have been taken.

Assume Alice and Bob play optimally.

Return "Alice" if Alice will win, "Bob" if Bob will win, or "Tie" if they will end the game with the same score.

### Approach

To solve this problem, we can use dynamic programming to calculate the optimal score for each player.

Let's consider the state $dp[i]$ as the optimal score difference between the first and second players when the game starts with the $i$-th stone. We need to iterate through the stones in reverse order, starting from the last stone, and update the $dp$ values accordingly.

The three possible moves in the game (taking 1, 2, or 3 stones) correspond to the next three states. We take the maximum score difference between these states and subtract the value of the $i$-th stone to update the current $dp[i]$.

After iterating through all the stones, the final answer will be stored in $dp[0]$. If $dp[0] = 0$, it means both players will end with the same score, and we return "Tie". If $dp[0] > 0$, it means the first player (Alice) will have a higher score, and we return "Alice". Otherwise, the second player (Bob) will have a higher score, and we return "Bob".

### Complexity Analysis

The time complexity for this approach is O(n), where n is the number of stones. The space complexity is also O(n) since we use an extra array of size n for dynamic programming.


```cpp:
class Solution {
public:
    string stoneGameIII(vector<int>& stoneValue) {
        int one{0}, two{0}, three{0};
        int n = stoneValue.size();
        stoneValue.push_back(0);
        stoneValue.push_back(0);
        stoneValue.push_back(0);
        for(int i=n; i >= 0; --i){
            int f1{stoneValue[i]};
            int f2 = f1+stoneValue[i+1];
            int f3 = f2+stoneValue[i+2];
            int next = max(max(f1-one, f2-two), f3-three);
            three = two;
            two = one;
            one = next;
        }
        if (one == 0)
            return "Tie";
        return (one > 0) ? "Alice" : "Bob";
    }
};
```

<br>

___


## 1416. Restore The Array

Link: https://leetcode.com/problems/restore-the-array/description/

A program was supposed to print an array of integers. The program forgot to print whitespaces and the array is printed as a string of digits s and all we know is that all integers in the array were in the range [1, k] and there are no leading zeros in the array.

Given the string s and the integer k, return the number of the possible arrays that can be printed as s using the mentioned program. Since the answer may be very large, return it modulo 109 + 7.

### Approach

To solve this problem, we can use dynamic programming. We will maintain an array $dp$ of size $s.size()+1$ to store the number of possible arrays for each substring of $s$.

We start from the end of the string $s$ and work our way backward. For each position $i$ in the string, we calculate the number of possible arrays that can be formed starting from that position. We do this by considering all possible substrings starting from $i$ and ending at a position within the valid range of $[1, k]$. If the substring can be converted to a valid integer within the range, we add the number of possible arrays for the next position to the current position.

Finally, the answer will be stored in $dp[0]$, which represents the number of possible arrays that can be formed starting from the beginning of the string $s$.



```cpp:
class Solution {
public:
    long long dp[100001];
    const int mod = 1e9+7;
    int numberOfArrays(string s, int k) {
        memset(dp,0,sizeof(dp));
        for(int i=s.size() ; i>=0 ; i--){
            if(i==s.size()){
                dp[i] = 1;
                continue;
            }
            if(s[i]=='0'){
                dp[i] = 0;
                continue;
            }
            long long num = 0;
            for(int j=i ; j<s.size() ; j++){
                num = num*10+(s[j]-'0');
                if(num<=k){
                    dp[i] += dp[j+1]%mod;
                }
                else break;
            }
            dp[i] %= mod;
        }
        return dp[0];
    }
};
```

<br>

___


## 1449. Form Largest Integer With Digits That Add up to Target

Link: https://leetcode.com/problems/form-largest-integer-with-digits-that-add-up-to-target/

Given an array of integers cost and an integer target, return the maximum integer you can paint under the following rules:
The cost of painting a digit (i + 1) is given by cost[i] (0-indexed).
The total cost used must be equal to target.
The integer does not have 0 digits.
Since the answer may be very large, return it as a string. If there is no way to paint any integer given the condition, return "0".

### Approach
To solve this problem, we can use dynamic programming. We will maintain an array $dp$ of size $target + 1$ to store the maximum number of digits that can be formed using the given cost to reach each target value.

We start with $dp[0] = 0$, as we can form an empty string with zero cost. Then, for each target value from 1 to $target$, we iterate over the $cost$ array to check if we can form a digit at the current target value. If we can, we update the $dp$ array to store the maximum number of digits that can be formed at that target value.

Finally, we can retrieve the maximum integer that can be formed by backtracking through the $dp$ array. Starting from the $target$ value, we find the digit that can be formed at the current target value and append it to the result string. We then update the target value to exclude the cost of the digit we just appended, and continue the process until the target becomes zero.

```cpp:
class Solution {
public:
    string largestNumber(vector<int>& cost, int target) {
        vector<int>dp(target+1,INT_MIN);
        dp[0]=0;
        for(int i=1;i<=target;i++){
            for(int j=0;j<=8;j++){
                if(i>=cost[j])
                dp[i]=max(dp[i],dp[i-cost[j]]+1);
            }
        }
        if(dp[target]<0)
            return "0";
        string ans;
        while(target>0){ 
            int pos=-1;
            for(int i=8;i>=0;i--){
                if(target>=cost[i]&&(pos==-1||dp[target-cost[i]]>dp[target-cost[pos]]))
                pos=i;
            }
            ans+='1'+pos;
            target-=cost[pos];
        }
        return ans;
    }
};
```

<br>

___


## 1510. Stone Game IV

Link: https://leetcode.com/problems/stone-game-iv/description/

Alice and Bob take turns playing a game, with Alice starting first.
Initially, there are n stones in a pile. On each player's turn, that player makes a move consisting of removing any non-zero square number of stones in the pile.
Also, if a player cannot make a move, he/she loses the game.
Given a positive integer n, return true if and only if Alice wins the game otherwise return false, assuming both players play optimally.

### Approach
To solve this problem, we can use dynamic programming. We maintain a boolean array $dp$ of size $n+1$ to store the result of the game for each value from 0 to $n$. We start with $dp[0] = false$ since if there are no stones in the pile, Alice loses.

For each value $i$ from 1 to $n$, we check if Alice can make a move to force the opponent into a losing position. To do this, we iterate over all possible square numbers $j^2$ such that $j^2 \leq i$. If there exists a square number $j^2$ such that $dp[i - j^2]$ is false (meaning Alice loses in the next move), then Alice can choose $j^2$ stones and force the opponent into a losing position. Therefore, we set $dp[i] = true$.

Finally, we return the value of $dp[n]$ which represents whether Alice wins the game or not.

### Complexity Analysis
The time complexity of this approach is $O(n\sqrt{n})$ as we have nested loops iterating up to $n$ and $\sqrt{n}$, respectively. The space complexity is $O(n)$ to store the $dp$ array.

```cpp:
int dp[100001] = {};
class Solution {
public:
    bool winnerSquareGame(int n) {
        if (n == 0) return false;
        if (dp[n]) return dp[n] == 2;
        for (int i = 1; i * i <= n; i++) {
            if (!winnerSquareGame(n - i * i)) {
                dp[n] = 2;
                return true;
            }
        }
        dp[n] = 1;
        return false;
    }
};
```

<br>

___


## 714. Best Time to Buy and Sell Stock with Transaction Fee

Link: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/description/

You are given an array prices where prices[i] is the price of a given stock on the ith day, and an integer fee representing a transaction fee.
Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.
Note:
You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).
The transaction fee is only charged once for each stock purchase and sale.

### Approach
To solve this problem, we can use dynamic programming. We maintain two variables: $buy$ and $sell$, which represent the maximum profit we can achieve when we buy the stock and when we sell the stock, respectively.

We start with $buy$ initialized to a very small negative value (e.g., $INT_MIN + 50001$) and $sell$ initialized to 0. This is because on the first day, we cannot sell the stock, so the profit is 0, and we set $buy$ to a large negative value so that we can find the maximum profit on the first day when we buy the stock.

For each day, we update the $buy$ and $sell$ variables based on the following rules:

$buy$: The maximum profit we can achieve when we buy the stock is the maximum of the previous $buy$ value and the profit we can achieve by selling the stock on the current day minus the current day's stock price.

$sell$: The maximum profit we can achieve when we sell the stock is the maximum of the previous $sell$ value and the profit we can achieve by buying the stock on the current day plus the current day's stock price minus the transaction fee.

Finally, the maximum profit we can achieve is stored in the $sell$ variable.

### Complexity Analysis
The time complexity of this approach is $O(n)$, where $n$ is the number of days, as we traverse through the array only once. The space complexity is $O(1)$ as we use only a constant amount of space for the $buy$ and $sell$ variables.

```cpp:
class Solution {
    public:
    int maxProfit(vector<int>& prices, int fee) {
        int buy {INT_MIN+50001};
        int sell {0};
        for(auto price : prices) {
            if(sell-price > buy)
                buy = sell - price;
            if(buy+price-fee > sell)
                sell = buy+price-fee;
        }
        return sell;
    }
};
```

<br>

___


## 123. Best Time to Buy and Sell Stock III

Link: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/

You are given an array prices where prices[i] is the price of a given stock on the ith day.
Find the maximum profit you can achieve. You may complete at most two transactions.
Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

### Approach:
To solve this problem, we can use a dynamic programming approach. We maintain four variables: $fb$, $p1$, $sb$, and $p2$, which represent the minimum buy price for the first transaction, the maximum profit for the first transaction, the minimum buy price for the second transaction, and the maximum profit for the second transaction, respectively.

We initialize $fb$ and $sb$ to a very large value ($\text{INT_MAX}$) and $p1$ and $p2$ to 0. This is because we haven't made any transactions yet, so the maximum profit is 0, and we set $fb$ and $sb$ to large values so that we can find the minimum buy prices for the first and second transactions.

For each day, we update the four variables based on the following rules:
$fb$: The minimum buy price for the first transaction is the minimum of the previous $fb$ value and the current day's stock price.
$p1$: The maximum profit for the first transaction is the maximum of the previous $p1$ value and the profit we can achieve by selling the stock on the current day minus the first transaction's buy price.

$sb$: The minimum buy price for the second transaction is the minimum of the previous $sb$ value and the current day's stock price minus the profit we can achieve from the first transaction.

$p2$: The maximum profit for the second transaction is the maximum of the previous $p2$ value and the profit we can achieve by selling the stock on the current day minus the second transaction's buy price.

Finally, the maximum profit we can achieve is stored in the $p2$ variable.

### Complexity Analysis:
The time complexity of this approach is $O(n)$, where $n$ is the number of days, as we traverse through the array only once. The space complexity is $O(1)$, as we use only a constant amount of extra space to store the variables.

```cpp:
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int fb = INT_MAX;
        int p1 = 0;
        int sb = INT_MAX;
        int p2 = 0;
        for(int x : prices)
        {
            fb = min(fb, x);
            p1 = max(p1, x-fb);
            sb = min(sb, x-p1);
            p2 = max(p2, x-sb);
        }
        return p2;
    }
};
```

<br>

___