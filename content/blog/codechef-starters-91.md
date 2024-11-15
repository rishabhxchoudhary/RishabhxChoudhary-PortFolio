---
title: "Solutions to Codechef Contest Starters 91 Div 2"
date: "25 May 2023"
category: "CP & Interviews"
tags: ['Codechef','Starters 91']
about: "Codechef Contest Starters provide an excellent platform for budding programmers to test their coding skills and enhance their problem-solving abilities. In this blog post, we will delve into the solutions of the problems from Codechef Contest Starters 91 Div 2. By understanding these solutions, you can sharpen your coding prowess and gain valuable insights into tackling similar challenges in the future."
---



# Problem 1 : [Blobby Volley Scores](https://www.codechef.com/START91B/problems/BLOBBYVOLLEY)

- This is a very basic Problem and can be solved by *brute force*.


My Solution:
```Python
import sys
sys.setrecursionlimit(2147483647)
input = sys.stdin.readline

for _ in range(int(input())):
    n = int(input())
    s = input().strip()
    A_is_server = True
    A_score = 0
    B_score = 0
    for i in s:
        if i == "A":
            if A_is_server:
                A_score += 1
            else:
                A_is_server = True
        else:
            if A_is_server:
                A_is_server = False
            else:
                B_score += 1
    print(A_score, B_score)
```
<br>

___

# Problem 2 : [Odd GCD Permutation](https://www.codechef.com/START91B/problems/NAS_2523)
Problem : We want to find Permutation of {1,2,3,...,N} such that GCD(P1, P3,...) > GCD(P2,P4...).

**Observation :**
1. GCD(1,x) = 1. It means that GCD of any number and 1 will always be 1.
2. Since GCD(1,x) is always 1, hence 1 cannot be on an Odd place.


- It is not hard to see now that all even numbers will be on odd places and vice versa.

- If n is odd then if is never possible to make such a Permutation.

- Now try to make the lexologically largest Permutation.

My solution :
```Python:
import sys
sys.setrecursionlimit(2147483647)
input = sys.stdin.readline

for _ in range(int(input())):
    n = int(input())
    if n & 1:
        print(-1)
        continue
    else:
        for i in reversed(range(1, n+1, 2)):
            print(i+1, i, end=" ")
        print()
```

___

# Problem 3 : [Chef Odd](https://www.codechef.com/START91B/problems/CHEFODD)
### Probelm Statement :
- Given N and K, determine whether it’s possible to partition the integers {1,2,3...N} into exactly K groups such that:
- Each group contains atleast 2 integers.
- The sum of each group is odd.

### Observations:

1. Let n be an Even number 
We know that Odd+Odd = Even and Even+Even = Odd. 

Hence We can only club Odd and Even numbers together.

if n=6:

1 2 3 4 5 6 => (1,2) (3,4) (5,6) 

Hence the maximum number of subsets if n/2; or ceil of n/2 (if n is odd)

But if N is odd, the it cannot be n/2 as minimum number of elements in each subset is 2.

Also Odd+odd+odd = Odd.
Hence if We can form 5 subsets => 0dd+0dd+0dd+0dd+0dd ==> We can also form 3 subsets => 0dd+0dd+0dd => We can also form 1 subset.

My Solution:
```Python:
import sys
sys.setrecursionlimit(2147483647)
input = sys.stdin.readline

for _ in range(int(input())):
    n, k = map(int, input().split())
    x = (n+1) >> 1
    if n & 1:
        if k == x:
            print("NO")
            continue
    if k > x:
        print("NO")
        continue
    if x & 1:
        if k & 1:
            print("YES")
        else:
            print("NO")
    else:
        if k & 1:
            print("NO")
        else:
            print("YES")

```
___

# Problem 4 : [Maximum Sum Permutatition](https://www.codechef.com/START91B/problems/MAXSUMPERM)

### Editorial :

- Brute for approach that I thought of was, We can initialize an X =  array of every element 0 , and for every query $L_i$ and $R_i$ we can add +1 for all elements in this range.
- Once this is done. I can assign the largest elements to indexes with Decreasing values in X.
- Hence we can find the permutations.
  

- -> The Tricky Part is that we have to Process the queries faster.
- Whenever we add +1 from L to R, all elements in X changes.
  
- Lets define a difference array  $$D_i = X_i - X_i-1$$

- For every query, [L,R] => D[L-1]+=1 and D[R+1]+=1.
- X can be recovered for this difference array by taking prefix sum of D.

- My solution:
```Python:
import sys
sys.setrecursionlimit(2147483647)
input = sys.stdin.readline

for _ in range(int(input())):
    n, q = map(int, input().split())
    a = sorted(list(map(int, input().split())))
    d = [0]*(n)
    for i in range(q):
        l, r = map(int, input().split())
        d[l-1] += 1
        if r < n:
            d[r] -= 1
    for i in range(1, n):
        d[i] += d[i-1]
    indexes = list(range(n))
    indexes.sort(key=lambda x: d[x])
    ans = [0]*n
    x = 0
    for i in range(n):
        ans[indexes[i]] = a[i]
        x += a[i]*d[indexes[i]]
    print(x)
    print(*ans)
```

<br>

___

# Problem 5 : [XOR & Sum](https://www.codechef.com/problems/XOR_EQ_SUM)

### PROBLEM:

Given $L$ and $R$, find the number of integers $x$ such that there exist $L \leq a \leq b \leq R$ satisfying $a+b = a\oplus b = x$.

## Editorial

if $a + b = a\oplus b$ means that i.e, a & b = 0. 

### Subtask 1
- Can be done by Brute Force, using 2 loops in $O(n^2)$


### Subtask 2
- if $L=0$ and $R = 2^k -1$, (i.e all bits = 1) then by observation, ans if $R+1$, i.e. Length of the range of [L,R]
- it means that x will take all values in the range $[L,R]$.

### Subtask 3
- Now R can be anything and $L=0$
- Just check the most significant bit (let k) of R, i.e closest power of 2 
- Answer will be $2^k$

### Subtask 4 and 5
- Now we have no constraints on L and R.
- Check the most significant bit of R.
- now as $L!=0$, X might be less than L.
- We can find all power of 2 in the range $[L,R]$
- For every power of 2 (let x), add $x-L$ to answer variable.

Code:
```
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main(){
    int t;
    cin >> t;
    while (t--){
        ll l, r;
        cin >> l >> r;
        ll ans = 0;
        if (l == 0) ans++;
        for (int i = 0; i < 66; i++){
            ll x = (1LL << i);
            if (x > r) break;
            if (x < l) continue;
            ans += x - l;
        }
        cout << ans << endl;
    }
    return 0;
}
```

<br>

___



<footer>
<br>
<br>
In this blog post, we explored the solutions to the problems from Codechef Contest Starters 91 Div 2. By understanding and implementing these solutions, you can improve your problem-solving skills and gain confidence in tackling coding challenges. Remember, practice and perseverance are key to mastering programming. Keep coding and exploring new problem sets to enhance your abilities further.
<br>
<br>
</footer>