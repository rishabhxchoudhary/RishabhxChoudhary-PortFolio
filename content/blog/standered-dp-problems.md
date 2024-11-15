---
title: "Dynamic Programming Solutions for CSES and Other Problem Sets"
date: "12 July 2023"
category: "CP & Interviews"
tags: ['Dynamic Programming',"CSES"]
about: "Explore efficient solutions to dynamic programming problems from the CSES problem set and other reputable sources. Improve your algorithm optimization skills and enhance your competitive programming and interview preparation"
---

# Dice Combinations

Problem Link: https://cses.fi/problemset/task/1633

Your task is to count the number of ways to construct a sum $n$ by throwing a dice one or more times. Each throw produces an outcome between $1$ and $6$.

Solution:

- If I want to make a sum $S$, and I have options $1,2,3,4,5,6$, then I can add $1$ to $S-1, S-2, S-3, S-4, S-5$ and make the sum $S$.
- Let $DP[i]$ be the number of ways to make the sum $i$.
- $DP[i] = DP[i-1] + DP[i-2] + DP[i-3] + DP[i-4] + DP[i-5] + DP[i-6]$, as I can add $1$ to all these to make the sum $i$.

```cpp:
int main()
{
    int t;
    cin >> t;
    vector<int> dp(t + 1, 0);
    dp[0] = 1;
    for (int i = 1; i <= t; i++)
    {
        for (int j = 1; j <= 6; j++)
        {
            if (i - j < 0)
                break;
            dp[i] += dp[i - j];
            dp[i] = dp[i] % mod;
        }
    }
    cout << dp[t];
    return 0;
}
```

<br>

___

# Minimizing Coins

Problem Link: https://cses.fi/problemset/task/1634/

Consider a money system consisting of $n$ coins. Each coin has a positive integer value. Your task is to produce a sum of money $x$ using the available coins in such a way that the number of coins is minimal.

Solution:

- This is a classical DP problem.
- It is very similar to the previous problem. Let $DP[i]$ be the minimum number of coins to make the sum $i$.
- Let the target sum be $S$ and coins $c_1, c_2, c_3, \ldots, c_n$.
- $DP[i] = \min(DP[i-c_1]+1, DP[i-c_2]+1, DP[i-c_3]+1, \ldots, DP[i-c_n]+1)$, as I can add 1 coin value to all these to make the sum $i$.

Recursion + Memoization:

```cpp:
#include<bits/stdc++.h>
using namespace std;
 
#define int long long int
#define double long double
#define endl '\n'
typedef long long ll;
 
const int MOD = 1000000007;
int n,x;
vector<int> coins;
 
 
int dp(int k, vector<int> &memo){
    if (memo[k]!=0) return memo[k];
    if (k<0) return INT_MAX;
    if (k==0) return 0;
    int ans = INT_MAX;
    for (int i = 0; i < n; i++) {
        if (coins[i]>k) continue;
        ans=min(ans,dp(k-coins[i],memo)+1);
    }
    memo[k] = ans;
    return ans;
}
 
signed main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
 
    cin>>n>>x;
    coins.resize(n);
    for (int i = 0; i < n; i++) {
        cin>>coins[i];
    }
    vector<int> memo(x+1,0);
    int ans = dp(x,memo);
    if(ans!=INT_MAX){
        cout<<ans<<endl;
    } else {
        cout<<-1<<endl;
    }
    return 0;
}
```

Tabulation:
```cpp:
int main()
{
    int n,x;cin>>n>>x;

    int coins[n];

    for(int i=0;i<n;i++)cin>>coins[i];

    vector<int>dp(x+1,1e9);

    dp[0]=0;

    for(int i=1;i<=x;i++){
        for(auto c:coins){
            if (i-c>=0){
                dp[i] = min(dp[i],1+dp[i-c]);
            }
        }
    }

    if (dp[x]==1e9) cout<<-1;
    else cout<<dp[x];

    return 0;
}
```

___

# Coin Combinations I

Link: https://cses.fi/problemset/task/1635

Consider a money system consisting of $n$ coins. Each coin has a positive integer value. Your task is to calculate the number of distinct ways you can produce a money sum $x$ using the available coins.

Solution:

- Here, "distinct ways" refers to counting the total number of different combinations or arrangements of coins that can be used to produce the money sum $x$.
- For example, if the coins are ${2, 3, 5}$ and the desired sum is $9$, there are $8$ ways:
    - $2+2+5$
    - $2+5+2$
    - $5+2+2$
    - $3+3+3$
    - $2+2+2+3$
    - $2+2+3+2$
    - $2+3+2+2$
    - $3+2+2+2$
- Let $DP[i]$ be the number of ways to make the sum $i$.
- Now, similar to the previous problem, I can reach $DP[i]$ from $DP[i-c_1]$, $DP[i-c_2]$, $DP[i-c_3]$, $\ldots$, $DP[i-c_n]$.
- But this time, we do not want to minimize it.
- Let $DP[0] = 1$, because there is only $1$ way to obtain a sum of $0$, i.e., to not use any coins.
- $DP[i] = DP[i-c_1] + DP[i-c_2] + DP[i-c_3] + \ldots + DP[i-c_n]$.
- Notice that each of $DP[i-c_i]$ may contribute $1$ or more than $1$ to the answer.

Recursion + Memoization (Gives TLE on 2 testcases)
```cpp:
#include<bits/stdc++.h>
using namespace std;
 
#define endl '\n'
 
const int MOD = 1000000007;
 
int n,x;
vector<int> coins;
 
int dp(int k, vector<int> &memo){
    if (k<0) return 0;
    if (k==0) return 1;
    if (memo[k]!=0) return memo[k];
    int ans = 0;
    for (int i = 0; i < n; i++) {
        ans += dp(k-coins[i],memo);
        if (ans >= MOD)
            ans = ans - MOD;
    }
    memo[k]=ans;
    return ans;
}
 
int main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    cin>>n>>x;
    coins.resize(n);
    for (int i = 0; i < n; i++) {
        cin>>coins[i];
    }
 
    vector<int> memo(x+1,0);
    cout<<dp(x,memo)<<endl;
 
    return 0;
}
```

Tabulation:
```cpp:
int main()
{
    int n,x;
    cin>>n>>x;
    int coins[n];
    for(int i=0;i<n;i++) cin>>coins[i];
    vector<int> dp(x+1,0);
    dp[0]=1;
    for(int i=1;i<x+1;i++){
        for(auto c:coins){
            if (i-c>=0){
                dp[i]=(dp[i]+dp[i-c])%mod;
            }
        }
    }
    cout<<dp[x];
    return 0;
}
```

___


# Coin Combinations II

Link: https://cses.fi/problemset/task/1636

Consider a money system consisting of $n$ coins. Each coin has a positive integer value. Your task is to calculate the number of distinct ordered ways you can produce a money sum $x$ using the available coins.

Solution:
- Here "distinct ordered ways" refers to counting the total number of different sequences or permutations of coins that can be used to produce the money sum $x$.
- For example, if the coins are $\{2,3,5\}$ and the desired sum is 9, there are 3 ways:
   - $2+2+5$
   - $3+3+3$
   - $2+2+2+3$
- Let $DP[i][j]$ be the number of distinct ordered ways to obtain the sum $j$ using the first $i$ coins.
- Then $DP[i][0] = 0$ for all $i$.
- Iterate over the coins from $1$ to $n$. For each coin value $c$, iterate over the range from $1$ to $S$. 
- For each value $j$ in the range, update $DP[i][j]$ by adding $DP[i-1][j]$ (the number of ways to obtain the sum $j$ without using the $i$th coin) and $DP[i][j-c]$ (the number of ways to obtain the remaining sum $(j-c)$ using the $i$th coin).
- At the end, $DP[n][x]$ will represent the total number of distinct ordered ways to produce the money sum $x$ using the available coins.
- We can actually reduce the space to linear by iterating over the coins first.

Recursion + Memoization (Gives TLE) :
```cpp:
#include<bits/stdc++.h>
using namespace std;
 
#define endl '\n'
 
const int MOD = 1000000007;
 
int n,x;
vector<int> coins;
 
 
// There are 2 possibilities:
// 1) Use the jth coin.
// 2) Dont use the jth coin.
int dp(int i, int j,vector<vector<int>> &memo){
    if (i<0) return 0;
    if (i==0) return 1;
    if (j==0) return 0;
    if (memo[i][j]!=0) return memo[i][j];
    int ans = 0;
    ans+=dp(i-coins[j-1],j,memo); // use jth coin.
    if (ans>=MOD) ans-=MOD;
    ans+=dp(i,j-1,memo); // Dont use jth coin.
    if (ans>=MOD) ans-=MOD;
    return memo[i][j]=ans;
}
 
int main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    cin>>n>>x;
    coins.resize(n);
    for (int i = 0; i < n; i++) {
        cin>>coins[i];
    }
    vector<vector<int>> memo(x+1, vector<int> (n+1,0));
    cout<<dp(x,n,memo)<<endl;
 
    return 0;
}
```

Optimization using Tabulation (Gives TLE on 2 testcases):
```cpp:
#include<bits/stdc++.h>
using namespace std;
 
#define endl '\n'
 
const int MOD = 1000000007;
 
int main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    int n, x;
    cin >> n >> x;
    vector<int> coins(n);
    for (int i = 0; i < n; i++) {
        cin >> coins[i];
    }
    vector<vector<int>> dp(x + 1, vector<int>(n + 1, 0));
    // Base case: If the target sum is 0, there is one way.
    for (int j = 0; j <= n; j++) {
        dp[0][j] = 1;
    }
    for (int i = 1; i <= x; i++) {
        for (int j = 1; j <= n; j++) {
            dp[i][j] = dp[i][j - 1]; // Exclude the jth coin.
            if (i - coins[j - 1] >= 0) {
                dp[i][j] += dp[i - coins[j - 1]][j]; // Include the jth coin.
                dp[i][j] %= MOD;
            }
        }
    }
    cout << dp[x][n] << endl;
 
    return 0;
}
```

Final Optimization:
```cpp:
#include<bits/stdc++.h>
using namespace std;
 
#define endl '\n'
 
const int MOD = 1000000007;
 
int main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    int n, x;
    cin >> n >> x;
    vector<int> coins(n);
    for (int i = 0; i < n; i++) {
        cin >> coins[i];
    }
    vector<int> dp(x + 1, 0);
    dp[0] = 1;

    for (int j = 1; j <= n; j++) {
        for (int i = 1; i <= x; i++) {
            if (i - coins[j - 1] >= 0) {
                dp[i] += dp[i - coins[j - 1]];
                dp[i] %= MOD;
            }
        }
    }
    cout << dp[x] << endl;
 
    return 0;
}
```

___


# Grid Paths

Link: https://cses.fi/problemset/task/1638

Consider an $n \times n$ grid whose squares may have traps. It is not allowed to move to a square with a trap.

Solution:
- This is a problem on Grid DP.
- If a cell $(x, y)$ is normal, we can use the recurrence normally. But if cell $(x, y)$ has an asterisk, the dp-value is $0$, because no path can end on a trap.

$$\text{dp}[x][y] = \begin{cases} \text{dp}[x-1][y] + \text{dp}[x][y-1] & \text{if $(x, y)$ is not a trap} \\ 0 & \text{if $(x, y)$ is a trap} \end{cases}$$

Recursion + Memoization (Gives TLE on some Testcases):
```CPP:
#include<bits/stdc++.h>
using namespace std;

#define int long long int
#define endl '\n'

const int MOD = 1000000007;

int n;

// I can either come from left or from up.
int dp(int i,int j,vector<vector<char>> &grid,vector<vector<int>>&memo){
    if (i<0 || i>=n ||j<0 || j>=n) return 0;
    if (grid[i][j]=='*'){
        return 0;
    }
    if (i==0 && j==0) return 1;
    if (memo[i][j]!=0) return memo[i][j];
    return memo[i][j] = (dp(i-1,j,grid,memo) + dp(i,j-1,grid,memo))%MOD;
}

signed main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);

    cin>>n;
    vector<vector<char> > grid(n,vector<char> (n) );
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin>>grid[i][j];
        }
    }
    vector<vector<int>> memo(n,vector<int> (n+1,0));
    cout<<dp(n-1,n-1,grid,memo);

    return 0;
}
```

Tabulation:
```cpp:
#include<bits/stdc++.h>
using namespace std;

#define int long long int
#define endl '\n'

const int MOD = 1000000007;

int n;

int dp(vector<vector<char>>& grid, vector<vector<int>>& memo) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == '*') {
                memo[i][j] = 0;
            } else {
                if (i == 0 && j == 0) {
                    memo[i][j] = 1;
                } else {
                    int from_left = (j - 1 >= 0) ? memo[i][j - 1] : 0;
                    int from_up = (i - 1 >= 0) ? memo[i - 1][j] : 0;
                    memo[i][j] = (from_left + from_up) % MOD;
                }
            }
        }
    }
    return memo[n - 1][n - 1];
}

signed main() {
    ios_base::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);

    cin >> n;
    vector<vector<char>> grid(n, vector<char>(n));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> grid[i][j];
        }
    }
    vector<vector<int>> memo(n, vector<int>(n, 0));
    cout << dp(grid, memo);

    return 0;
}
```

___


# Book Shop

Link: https://cses.fi/problemset/task/1158

You are in a book shop which sells $n$ different books. You know the price and number of pages of each book.
You have decided that the total price of your purchases will be at most $x$. What is the maximum number of pages you can buy? You can buy each book at most once.

Solution:
- This is very similar to the classical Dynamic Programming problem known as the "Knapsack Problem". In the Knapsack Problem, you are given a set of items, each with a weight and a value, and a knapsack with a maximum weight capacity. The goal is to select items to maximize the total value while ensuring that the total weight does not exceed the capacity of the knapsack.
- The books correspond to the items in the Knapsack Problem, and the price of the books corresponds to the weight of the items. The number of pages in the books can be seen as the value of the items. You are trying to maximize the total number of pages (value) you can buy while ensuring that the total price (weight) does not exceed a given budget (capacity).
- We should try to minimize the number of rows. Read more: https://www.geeksforgeeks.org/row-wise-vs-column-wise-traversal-matrix/
- Let $DP[i][j]$ be the maximum number of pages that can be bought with a budget of $j$ considering the first $i$ books.
- $DP[0][j] = 0$ for all $j$, as with no books, the number of pages is 0.
- $DP[i][0] = 0$ for all $i$, as with no budget, the number of pages is 0.
- For each book $i$ $(1 \leq i \leq n)$ and each budget $j$ $(1 \leq j \leq x)$, we have two choices:
    1. We don't buy the current book $i$: In this case, $DP[i][j] = DP[i-1][j]$.
    2. We buy the current book $i$: In this case, $DP[i][j] = \text{pages}[i] + DP[i-1][j-\text{price}[i]]$, where
- The maximum number of pages that can be bought will be the maximum value between the two choices: $DP[i][j] = \max(DP[i-1][j], \text{pages}[i] + DP[i-1][j-\text{price}[i]])$.

Recursion + Memoization (Gives TLE probably because of function calls):

```cpp:
#include<bits/stdc++.h>
using namespace std;
#define endl '\n'
 
const int MOD = 1000000007;
 
int memo[1001][100001]{};
int prices[1001], pages[1001]{};
 
int n,x;
// For each book I have 2 choices:
// 1. Buy it.
// 2. Dont buy it.
 
// i is the amount of money i have, j is the first j books.
int dp(int currentBook, int remainingMoney) {
    // if no books left or no money left.
    if (currentBook==0 || remainingMoney == 0) return 0; 
    if (memo[currentBook][remainingMoney] != 0) {
        return memo[currentBook][remainingMoney];
    }
    // Dont buy the current book
    int ans = dp(currentBook-1,remainingMoney);
    if (remainingMoney>=prices[currentBook]){
        ans = max(ans, dp(currentBook-1,remainingMoney-prices[currentBook]) + pages[currentBook] );
    }
    return memo[currentBook][remainingMoney] = ans;
}
 
signed main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    int n,x;
    cin>>n>>x;
    for (int i = 1; i < n+1; i++) {
        cin>>prices[i];
    }
    for (int i = 1; i < n+1; i++) {
        cin>>pages[i];
    }
    cout<<dp(n,x);
    return 0;
}
```

Tabulation:
```cpp:
#include<bits/stdc++.h>
using namespace std;
#define endl '\n'
 
const int MOD = 1000000007;
 
int dp[1001][100001]{};
int prices[1001], pages[1001]{};
 
int main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
 
    int n, x;
    cin >> n >> x;
    for (int i = 1; i <= n; i++) {
        cin >> prices[i];
    }
    for (int i = 1; i <= n; i++) {
        cin >> pages[i];
    }

    for(int i=1;i<n+1;i++){
        for(int j=0;j<x+1;j++){
            dp[i][j]=dp[i-1][j]; // Dont buy
            if(j-prices[i]>=0){
                dp[i][j] = max ( dp[i][j], dp[i-1][j-prices[i]]+pages[i] ); // Buy it.
            }
        }
    }
    
    cout << dp[n][x];
    return 0;
}
```

___


# Array Description

Link: https://cses.fi/problemset/task/1746

You know that an array has n integers between 1 and m, and the absolute difference between two adjacent values is at most 1.
Given a description of the array where some values may be unknown, your task is to count the number of arrays that match the description.

Solution:
- Let $DP[i][j]$ = number of arrays ending at number i in A[:j].

Recursion + Memoization (Gives TLE for some testcases):
```cpp:
#include <bits/stdc++.h>
using namespace std;

const int MOD = 1000000007;

int n, m;
vector<int> a;
int memo[101][100001]{};

// At every 0 try all the possible values and count.

int dp(int i, int prev) {
    if (memo[prev][i] != 0) return memo[prev][i];
    if (i == n) return 1;
    if (a[i] != 0 && abs(prev - a[i]) > 1) return 0;
    if (a[i] != 0) return dp(i + 1, a[i]);

    int count = 0;
    for (int k = prev - 1; k <= prev + 1; k++) {
        if (k >= 1 && k <= m) {
            count += dp(i + 1, k);
            if (count >= MOD) count -= MOD;
        }
    }
    return memo[prev][i] = count;
}

int main() {
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);

    cin >> n >> m;
    a.resize(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    int ans = 0;
    if (a[0] == 0) {
        for (int i = 1; i <= m; i++) {
            ans += dp(1, i);
            if (ans > MOD) ans -= MOD;
        }
    } else {
        ans = dp(1, a[0]);
    }
    cout << ans;

    return 0;
}

```

Tabulation:
```cpp:
#include <bits/stdc++.h>
using namespace std;

const int MOD = 1000000007;

int main() {
    ios_base::sync_with_stdio(0);
    cin.tie(0);

    int n, m;
    cin >> n >> m;

    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    dp[a[0]][1] = (a[0] == 0) ? 1 : 0;

    for (int i = 1; i <= m; i++) {
        if (a[0] == 0 || a[0] == i) {
            dp[i][1] = 1;
        }
    }

    for (int i = 2; i <= n; i++) {
        for (int prev = 1; prev <= m; prev++) {
            if (a[i - 1] == 0 || a[i - 1] == prev) {
                for (int k = prev - 1; k <= prev + 1; k++) {
                    if (k >= 1 && k <= m) {
                        dp[prev][i] = (dp[prev][i] + dp[k][i - 1]) % MOD;
                    }
                }
            }
        }
    }

    int ans = 0;
    for (int i = 1; i <= m; i++) {
        if (a[n - 1] == 0 || a[n - 1] == i) {
            ans = (ans + dp[i][n]) % MOD;
        }
    }

    cout << ans;

    return 0;
}
```

___


# Edit Distance

Link: https://cses.fi/problemset/task/1639

The edit distance between two strings is the minimum number of operations required to transform one string into the other.

The allowed operations are:
- Add one character to the string.
- Remove one character from the string.
- Replace one character in the string.

Solution:

- This is a standard DP problem.
- Problems like Minimum ASCII Delete Sum for Two Strings, Longest Common Subsequence (LCS), and many more are special cases of this problem.
    1. Minimum ASCII Delete Sum for Two Strings:
        - In this problem, instead of counting the number of operations, we calculate the minimum sum of ASCII values of characters to delete from two strings to make them equal.
        - It is essentially the same as the edit distance problem, but the cost of each operation is the ASCII value of the character being deleted.
        - If we change the cost of deletion to the ASCII value of the character being deleted, the edit distance becomes this problem.
    2. Longest Common Subsequence (LCS):
        - The LCS problem involves finding the longest subsequence that two strings have in common.
        - You can set the cost of replacement to infinity (or a very large value), effectively making this operation impossible. The cost of deletion and insertion can be set to 0 or 1 since deleting characters is allowed.

- Initialize a 2D DP table of size $(n+1) \times (m+1)$. The extra 1 in each dimension is for accommodating the empty string as a base case.
- Initialize the first row and first column of the DP table.
    - The value at $DP[i][0]$ will represent the edit distance between $s1[0...i-1]$ and the empty string (which requires $i$ deletions).
    - Similarly, the value at $DP[0][j]$ will represent the edit distance between the empty string and $s2[0...j-1]$ (which requires $j$ insertions).
- Iterate over the DP table row by row and column by column, starting from $DP[1][1]$. For each position $DP[i][j]$, consider the characters $s1[i-1]$ and $s2[j-1]$:
    - If $s1[i-1]$ and $s2[j-1]$ are equal, the current characters match, so no operation is needed. Therefore, $DP[i][j]$ will be equal to $DP[i-1][j-1]$.
    - If $s1[i-1]$ and $s2[j-1]$ are different, we need to choose the minimum cost operation among adding, removing, or replacing a character. The three options correspond to the values $DP[i][j-1]$ (insertion), $DP[i-1][j]$ (deletion), and $DP[i-1][j-1]$ (replacement). The current $DP[i][j]$ value will be one plus the minimum of these three options.
- Once the DP table is filled, the minimum edit distance will be stored in $DP[n][m]$.


```cpp:
int main()
{
    string a,b;
    cin>>a>>b;
    int na = a.length();
    int nb = b.length();
    vector < vector<int> > dp(na+1,vector<int>(nb+1,1e9));
    dp[0][0]=0;
    for(int i=0;i<na+1;i++){
        for(int j=0;j<nb+1;j++){
            if (i>0) dp[i][j]=min(dp[i][j],1+dp[i-1][j]);
            if (j>0) dp[i][j]=min(dp[i][j],1+dp[i][j-1]);
            if (j>0 and i>0){
                if (a[i-1]==b[j-1]) dp[i][j]=min(dp[i][j],dp[i-1][j-1]);
                else{
                    dp[i][j]=min(dp[i][j],1+dp[i-1][j-1]);
                }
            }
        }
    }
    cout<<dp[na][nb]<<endl;
    return 0;
}
```

___


# Rectangle Cutting

Link: https://cses.fi/problemset/task/1744/

Given an $a \times b$ rectangle, your task is to cut it into squares. On each move, you can select a rectangle and cut it into two rectangles in such a way that all side lengths remain integers. What is the minimum possible number of moves?

Solution:

- This is a variation of the standard DP problem called "Minimum Cost of Cutting a Rod". In the standard problem, we are given a rod of length $n$ and a list of prices for different lengths of the rod. The task is to cut the rod into pieces of integer lengths to maximize the total price.
- The approach used in solving the rectangle cutting problem is similar to the standard rod cutting problem, but with some modifications to handle the two-dimensional nature of the rectangle.
- Instead of maximizing the total price, in the rectangle cutting problem, we aim to minimize the number of cuts required. The DP table stores the minimum number of cuts for subproblems, considering both horizontal and vertical cuts.
- Let $dp$ be a 2D array of size $(a+1) \times (b+1)$ with all values set to a very large number (often represented as $1e9$ to denote infinity in competitive programming).
- For each cell $(i,j)$, consider two cases:
    1. Horizontal cut:
        - For each possible cut height $h$ $(1 \leq h < i)$, calculate the minimum number of moves required for the remaining rectangle $(i-h) \times j$ and add 1 to account for the current cut.
    2. Vertical cut:
        - For each possible cut width $w$ $(1 \leq w < j)$, calculate the minimum number of moves required for the remaining rectangle $i \times (j-w)$ and add 1 to account for the current cut.
    - Take the minimum value between the horizontal cut and vertical cut for each cell and store it in $dp[i][j]$.
- Return $dp[a][b]$ as the final answer.


```cpp:
int main()
{
    int a,b;
    cin>>a>>b;
    vector< vector<int> > dp(a+1 , vector<int> (b+1,1e9));
    for(int i=0;i<a+1;i++){
        for(int j=0;j<b+1;j++){
            if(i==j){
                dp[i][j]=0;
            }
            else{
                for(int k=1;k<i;k++){
                    dp[i][j]=min(dp[i][j],dp[i-k][j]+dp[k][j]+1);
                }
                for(int k=1;k<j;k++){
                    dp[i][j]=min(dp[i][j],dp[i][j-k]+dp[i][k]+1);
                }
            }
        }
    }
    cout<<dp[a][b]<<endl;
    return 0;
}
```

___


# Money Sums

Link: https://cses.fi/problemset/task/1745

You have $n$ coins with certain values. Your task is to find all money sums you can create using these coins.

Solution:
- This problem can be seen as a variation of the subset sum problem, which is a well-known dynamic programming problem.
- In the subset sum problem, we are given a set of integers, and the goal is to determine if there exists a subset of the integers that sums up to a given target value. The solution to the subset sum problem can be modified to solve the problem of finding all money sums.

- Let's first find $S$, which is the sum of all coin values. This is the maximum sum we can get.
- Initialize a boolean array $dp$ of size $(S+1)$, where $S$ is the sum of all coin values.
- Set all elements of $dp$ to false initially.
- Set $dp[0]$ to true, indicating that we can always make a sum of 0 using an empty set.
- Iterate over each coin value from 1 to $n$ (assuming the coins are stored in an array called $coins$).
    - Iterate backward from $S$ to $coins[i]$.
    - If $dp[j - coins[i]]$ is true, set $dp[j]$ to true, indicating that we can make a sum of $j$ using the current coin.
    - By iterating backward, we ensure that each coin is used only once in creating the money sums. The dynamic programming table $dp$ keeps track of the possible sums that can be formed.
- After completing the iterations, all indices $j$ for which $dp[j]$ is true represent the money sums that can be created using the given coins.


```cpp:
signed main()
{
    int n; cin>>n;
    int coin_sum = 0;
    vector<int> coins;
    for(int i=0;i<n;i++){
        int c;cin>>c;
        coins.emplace_back(c);
        coin_sum+=c;
    }
    vector<bool>dp(coin_sum+1,false);
    dp[0]=true;

    for(int coin: coins){
        for(int i=coin_sum;i>=coin;i--){
            if (dp[i-coin]) dp[i]=true;
        }
    }
    int count = 0;
    for(int i=1;i<coin_sum+1;i++){
        if (dp[i]) count++;
    }
    cout<<count<<endl;
    for(int i=1;i<coin_sum+1;i++){
        if (dp[i]) cout<<i<<" ";
    }
    cout<<endl;
    return 0;
}
```

___


# Removal Game

Link: https://cses.fi/problemset/task/1097/

There is a list of $n$ numbers and two players who move alternately. On each move, a player removes either the first or last number from the list, and their score increases by that number. Both players try to maximize their scores.

Solution:

- This is a well-known and frequently studied problem in game theory and dynamic programming.
- It can be categorized as a variation of the classic game called "Nim," which involves two players taking turns removing objects from distinct piles.
- It is an advanced problem involving game theory and optimal decision-making in competitive scenarios.
- A solution video by MIT can be found [here](https://youtu.be/Tw1k46ywN6E?t=3267).

- For every position $(i,j)$, we have some choices:
    - We can either remove $L[i]$ or $L[j]$ and maximize the score.
    - If we pick $L[i]$:
        - $dp[i][j]$ will increase by $L[i]$.
        - The opponent will see $L[i+1:j]$, but $L[i+1:j]$ is not the list that the current player will see when they play.
        - We have to model this somehow. We cannot put $DP[i+1][j]$ there as it is not controlled by the current player.
        - The opponent has a $DP[i+1][j]$ subproblem.
        - The current player is guaranteed the $\min(DP[i+1][j-1], DP[i+2][j])$, as the opponent will obviously choose the maximum.
    - If we pick $L[j]$:
        - The opponent has a $DP[i][j-1]$ subproblem.
        - The current player is guaranteed the $\min(DP[i+1][j-2], DP[i+1][j-1])$, as the opponent will obviously choose the maximum.
    - Take the maximum of these two cases.
- Memoize the solution.


```cpp:
ll score(vector<vector<ll>> &dp, ll l[], int i, int j)
{
    if (dp[i][j] != 1e9) return dp[i][j];
 
    if (i == j)
    {
        dp[i][j] = l[i];
        return l[i];
    }
    if (i + 1 == j)
    {
        dp[i][j] = max(l[i], l[j]);
        return max(l[i], l[j]);
    }
    dp[i][j] = max(
        min(score(dp, l, i + 1, j - 1), score(dp, l, i + 2, j)) + l[i],
        min(score(dp, l, i, j - 2), score(dp, l, i + 1, j - 1)) + l[j]);
    return dp[i][j];
}
 
// Code
int main()
{
    fast;
    ll n;
    cin >> n;
    ll l[n];
    for (int i = 0; i < n; i++)
        cin >> l[i];
    vector<vector< ll > > dp(n, vector<ll>(n, 1e9));
    cout << score(dp, l, 0, n - 1);
    return 0;
}
```

___


# Two Sets II

Link: https://cses.fi/problemset/task/1093

Your task is to count the number of ways numbers $1, 2, \ldots, n$ can be divided into two sets of equal sum.

Solution:
- This is a classical problem in combinatorial mathematics. Unfortunately, finding an exact solution for large values of $n$ is a computationally difficult problem, known as an NP-complete problem.
- To solve this problem using dynamic programming, we can break it down into smaller subproblems.
- We'll build a table $dp$ to store the intermediate results, where $dp[i][j]$ represents the number of ways to divide the numbers $1, 2, \ldots, i$ into two sets with a sum of $j$.
- There is only one way to achieve a sum of 0 using an empty set, so $dp[0][0]$ is initialized to 1.
- Iterate through the numbers from 1 to $n$:
    1. For each number $i$, iterate through the possible sums $j$ from 0 to the targetSum.
    2. For each $dp[i][j]$, there are two possibilities:
        - Exclude the current number $i$: The number of ways to form the sum $j$ without including $i$ is given by $dp[i - 1][j]$. So, we assign $dp[i][j] = dp[i - 1][j]$.
        - Include the current number $i$: If $j$ is greater than or equal to $i$, it means that the current number $i$ can contribute to the sum $j$. In this case, the number of ways to form the sum $j$ by including $i$ is given by $dp[i - 1][j - i]$. So, we assign $dp[i][j] += dp[i - 1][j - i]$.
- Return the value at $dp[n][\text{targetSum}]$ as the final result.


```cpp:
int main()
{
    int n;cin>>n;
    ll x = (1ll)*n*(n+1);
    if (x%4!=0) cout<<"0"<<endl;
    else{
        x = x/4;
        vector< vector<ll> > dp(n,vector<ll>(x+1,0));
        dp[0][0]=1;
        for(ll i=1;i<n;i++){
            for(ll j=0;j<=x;j++){
                if (j>=i){ 
                    dp[i][j] += dp[i-1][j-i];
                }
                dp[i][j]=(dp[i][j]+dp[i-1][j])%mod;
            }
        }
        cout<<dp[n-1][x]<<endl;
    }
 
    return 0;
}
```

___


# Longest Pallindromic Subsequence

Link: https://www.interviewbit.com/problems/longest-palindromic-subsequence/

Solution:

- MIT Solution Video: [https://youtu.be/Tw1k46ywN6E?t=317](https://youtu.be/Tw1k46ywN6E?t=317)

- Let $DP[i][j]$ be the length of the longest palindromic subsequence in the range $A[i:j]$.
- For every $i$ and $j$ pair, we have 2 choices:
    - If $i=j$, return 1, as an array of length 1 is always a palindrome.
    - If $A[i]=A[j]$, we can try to find the length of the longest palindromic subsequence in this range:
        1. If $i+1=j$, return 2.
        2. Else, return $2 + DP[i+1][j-1]$.
    - Else, return $\max(DP[i][j-1], DP[i+1][j])$, as we have to remove either the left or right character and take the maximum.
- Memoize it for the pair $(i,j)$, then the final complexity is $O(n^2)$.

or

- It is a special case of the Longest Common Subsequence (LCS) problem. The longest palindromic subsequence is the same as the LCS of $A$ and the reversed $A$.


```
class Solution:
    # @param A : string
    # @return an integer
    def solve(self, A):
        n = len(A)
        B = A[::-1]
        dp = [[0 for i in range(n+1)] for j in range(n+1)]
        for i in range(n+1):
            for j in range(n+1):
                if i==0 or j==0:
                    dp[i][j]=0
                else:
                    if A[i-1]==B[j-1]:
                        dp[i][j]=1+dp[i-1][j-1]
                    else:
                        dp[i][j]=max(dp[i-1][j],dp[i][j-1])
        return dp[n][n]
                        
```


___


# Projects

Link: [https://cses.fi/problemset/task/1140/](https://cses.fi/problemset/task/1140/)

- This problem is based on overlapping subproblems and optimal substructure (making locally optimal choices).
- The maximum amount of money you can earn by attending projects depends on the maximum amount of money earned until the last project that ends before the current project. This dependency creates overlapping subproblems, as the same subproblems are encountered multiple times during the computation.
- Sort the projects based on their ending days in ascending order. This sorting step is important for the dynamic programming approach to work efficiently.
- Create an array, let's call it "dp," of size $n+1$, where $dp[i]$ represents the maximum amount of money you can earn until the $i$-th project (including the $i$-th project).
- Initialize $dp[0] = 0$, indicating that you haven't attended any project yet, so the maximum amount of money earned is 0.
- Iterate over each project starting from the first project:
    1. Find the last project that ends before the starting day of the current project. You can use binary search to efficiently find this project since the projects are sorted based on their ending days.
    2. Calculate the maximum amount of money you can earn by either attending the current project or skipping it. To attend the current project, add the reward of the current project to the maximum amount of money earned until the last project that ends before the starting day of the current project. To skip the current project, use the maximum amount of money earned until the previous project.
    3. Update $dp[i]$ with the maximum amount of money calculated in step 2.

```cpp:
int binary_search(vector<tuple<int, int, int>> &projects, int &target)
{
    int low = 0, high = projects.size() - 1, result = -1;
    while (low <= high)
    {
        int mid = low + (high - low) / 2;
        if (get<1>(projects[mid]) < target)
        {
            result = mid;
            low = mid + 1;
        }
        else
            high = mid - 1;
    }
    return result;
}

signed main()
{
    int n;
    cin >> n;
    vector<tuple<int, int, int>> projects;

    for (int i = 0; i < n; i++)
    {
        int a, b, c;
        cin >> a >> b >> c;
        projects.emplace_back(make_tuple(a, b, c));
    }
    sort(projects.begin(), projects.end(), [](tuple<int, int, int> &a, tuple<int, int, int> &b)
         { return get<1>(a) < get<1>(b); });

    vector<int> dp(n + 1, 0);
    for (int i = 1; i < n + 1; i++)
    {
        int j = binary_search(projects, get<0>(projects[i - 1]));
        dp[i] = max(get<2>(projects[i - 1]) + dp[j + 1], dp[i - 1]);
    }
    
    cout << dp[n];

    return 0;
}
```

___


# Elevator Rides

Link: [https://cses.fi/problemset/task/1653](https://cses.fi/problemset/task/1653)

- If we look at the constraints, $n \leq 20$ and $x \leq 10^9$. Since $n$ is very small, and $x$ is very large, the complexity can go exponential in the order of $n$ as $2^{20}$ is almost $10^{10}$. This is a hint to use DP with bitmasking.
- We want to fit as many people at a time in the lift. Finding the set of people to lift is a challenging task.
- This problem is based on DP with bitmasking.
- Let $DP[\text{mask}] = \{\text{minimum number of rides}, \text{weight carried by the lift on the last ride}\}$.
- We will iterate over all the masks from 1 to $2^n-1$.
- The mask $2^n-1$ represents $11111...$ $n$ times, hence $DP[2^n-1].\text{first}$ is our answer.
- For every mask:
    - Traverse through the weights array and try to minimize the number of lift rides.

```cpp:
signed main()
{
    int n, x;
    cin >> n >> x;
    vector<int> weights(n, 0);
    for (int i = 0; i < n; i++)
        cin >> weights[i];
    int INF = 1e9;
    vector< pair<int,int> > dp(1<<n,{INF,INF});
    dp[0] = {0,INF};
    for(int mask = 1;mask<(1<<n);mask++){
        pair<int,int> best = {INF,INF};
        for(int i=0;i<n;i++){
            pair<int,int> cur = dp[mask ^ (1<<i)];
            if (cur.second + weights[i]>x){
                cur = {cur.first+1,weights[i]};
            }
            else{
                cur.second+=weights[i];
            }
            best = min(best,cur);
        }
        dp[mask] = best;
    }
    cout<< dp[(1<<n)-1].first <<endl;
    return 0;
}
```

___


# Hamiltonian Flight

Link: https://cses.fi/problemset/task/1690

There are n cities and m flight connections between them. You want to travel from Syrjälä to Lehmälä so that you visit each city exactly once. How many possible routes are there?

Solution:

```cpp:
signed main()
{
    int n, m;
    cin >> n >> m;
    vector<vector<int>> dp((1 << n), vector<int>(n, 0));
    vector<vector<int>> graph(n, vector<int>());
    for (int i = 0; i < m; i++)
    {
        int u, v;
        cin >> u >> v;
        graph[--v].emplace_back(--u);
    }
    dp[1][0] = 1;
    for (int mask = 2; mask < (1 << n); mask++){
        if ((mask & 1) == 0) continue;
        if (((mask & (1 << (n - 1)))) && (mask != ((1 << n) - 1))) continue;
        for (int i = 0; i < n; i++){
            if ((mask & (1 << i)) == 0) continue;
            int new_mask = mask ^ (1 << i);
            for (int prev_city : graph[i]) {
                if (mask & (1 << prev_city)) {
                    dp[mask][i] += dp[new_mask][prev_city];
                    dp[mask][i] %= mod;
                }
            }
        }
    }
    cout << dp[(1 << n) - 1][n - 1] << endl;
    return 0;
}

```

___


# Counting Tilings

Link: https://cses.fi/problemset/task/2181/

Your task is to count the number of ways you can fill an n×m grid using 1×2 and 2×1 tiles.

Solution:
This is a problem of DP on broken profiles.

We'll process the grid cells column-by-column, row-by-row. Let 
$i$
 and 
$j$
denote the row and column of the current cell we are considering,
and 
$\texttt{dp}[i][j][mask]$
 be the number of ways to tile the grid so that:
- All cells from cell $(0, 0)$ to cell $(i, j - 1)$ are covered.
- All cells from cell $(i + 1, j)$ to cell $(N - 1, M - 1)$ are empty.
- $mask$ represents whether each of the remaining $N$ cells are empty, with the $k$-th bit corresponding to the cell in row $k$.

The answer will be $\texttt{dp}[N - 1][M - 1][0]$.

We now have three cases when calculating $\texttt{dp}[i][j][mask]$:

- The $i$-th bit of the mask is 0, meaning that cell $(i, j)$ is covered.
    - Case 1: we used a horizontal tile to cover it.
        - Cell $(i, j - 1)$ must have been empty, so there are $\texttt{dp}[i - 1][j][mask \oplus 2^i]$ ways to do this.
    - Case 2: we used a vertical tile to cover it.
        - This is only possible if $i > 0$.
        - Cell $(i,j-1)$ must have been covered and cell $(i-1,j)$ must have been empty, so there are $\texttt{dp}[i - 1][j][mask \oplus 2^{i - 1}]$ ways to do this.
- The $i$-th bit of the mask is 1, meaning that cell $(i, j)$ is empty.
    - Cell $(i, j - 1)$ must have been covered, so there are $\texttt{dp}[i - 1][j][mask \oplus 2^i]$ ways to do this.
        - This is the same as case 1 of when the $i$-th bit of the mask is 0, so we handle them simultaneously in the code below.
```
#include<bits/stdc++.h>
using namespace std;

typedef long long ll;
#define int ll
#define endl '\n'

const ll MOD = 1000000007;

int dp[1 << 10][2];

signed main()
{
    int n, m;
    cin >> n >> m;
    dp[0][0] = 1;
    for (int j = 0; j < m; j++)
        for (int i = 0; i < n; i++)
        {
            for (int mask = 0; mask < (1 << n); mask++)
            {
                dp[mask][1] = dp[mask ^ (1 << i)][0];
                if (i && !(mask & (1 << i)) && !(mask & (1 << (i - 1))))
                    dp[mask][1] += dp[mask ^ (1 << (i - 1))][0];
                if (dp[mask][1] >= MOD)
                    dp[mask][1] -= MOD;
            }
            for (int mask = 0; mask < (1 << n); mask++)
                dp[mask][0] = dp[mask][1];
        }
    cout << dp[0][0] << '\n';
    return 0;
}

```

<br>

___

<footer>
<br>
<br>
Thanks for Reading.
<br>
<br>
</footer>

