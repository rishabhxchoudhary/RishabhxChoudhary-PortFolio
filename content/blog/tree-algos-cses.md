---
title: "Master Tree Algorithms: Solutions for CSES and Other Problem Sets"
date: "19 July 2023"
category: "CP & Interviews"
tags: ['Tree Algorithms',"CSES"]
about: "Become a Tree Algorithms expert with our comprehensive solutions for CSES and various problem sets. Prepare for competitive programming and interviews like a pro!"
---


# Subordinates

Link: https://cses.fi/problemset/task/1674

Given the structure of a company, your task is to calculate for each employee the number of their subordinates.

Solution:
- Use DFS and calculate the size.

```cpp:
#include<bits/stdc++.h>
using namespace std;
 
typedef long long ll;
#define int ll
#define endl '\n'
 
const ll mod = 1000000007;
vector<int> tree[200001];
int sz[200001]{};
 
void dfs(int node,int parent){
    sz[node] = 1;
    for(int child:tree[node]){
        if (child!=parent){
            dfs(child,node);
            sz[node]+=sz[child];
        }
    }
}
signed main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    int n; cin>>n;
    for (int i = 2; i < n+1; i++) {
        int x; cin>>x;
        tree[x].push_back(i);
        tree[i].push_back(x);
    }
    dfs(1,0);
    for (int i = 1; i <= n; i++) {
        cout<<sz[i]-1<<" ";
    }
    return 0;
}
```

<br>

___


# Tree Matching

Link: https://cses.fi/problemset/task/1130

You are given a tree consisting of n nodes.
A matching is a set of edges where each node is an endpoint of at most one edge. What is the maximum number of edges in a matching?

Solution:
- Start assigning from the leaf nodes to the root.

```cpp:
#include<bits/stdc++.h>
using namespace std;
 
typedef long long ll;
#define int ll
#define endl '\n'
 
const int N = 2e5+1;
vector<int> adj[N];
bool check[N+1];
 
int ans = 0;
 
void dfs(int node, int parent){
    for (int child: adj[node]) {
        if (child!=parent){
            dfs(child,node);
            if (!check[child] && !check[node]){
                check[child]=true; check[node]=true;
                ans++;
            }
        }
    }
}
 
signed main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    int n;
    cin>>n;
    for (int i = 0; i < n-1; i++) {
        int a,b;
        cin>>a>>b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    dfs(1,0);
    cout<<ans<<endl;
    return 0;
}
```

<br>

___


# Tree Diameter

Link: https://cses.fi/problemset/task/1131

You are given a tree consisting of n nodes.
The diameter of a tree is the maximum distance between two nodes. Your task is to determine the diameter of the tree.

Solution:
- Standered problem on tree diameter.
- Read more: https://codeforces.com/blog/entry/101271

```cpp:
#include<bits/stdc++.h>
using namespace std;
 
typedef long long ll;
#define int ll
#define endl '\n'
 
const ll mod = 1000000007;
const int N = 2e5+1;
vector<int> adj[N];
 
pair<int,int> dfs(int node, int parent, int dist){
    int max_dist = dist;
    int max_node  = node;
    for(int child: adj[node]){
        if(child!=parent){
            pair<int,int> x = dfs(child,node,dist+1);
            if (x.second>max_dist){
                max_dist = x.second;
                max_node = x.first;
            }
        }
    }
    return {max_node,max_dist};
}
 
signed main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    int n;
    cin>>n;
    for (int i = 0; i < n-1; i++) {
        int a,b;
        cin>>a>>b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    pair<int,int> a = dfs(1,0,0);
    pair<int,int> b = dfs(a.first,0,0);
    cout<<b.second;
    return 0;
}
```

<br>

___


## Tree Distances I

Link: https://cses.fi/problemset/task/1132

You are given a tree consisting of n nodes.
Your task is to determine for each node the maximum distance to another node.

Solution:
- Calculate the diameter of the tree.
- Let the end nodes of the diameter be $a$ and $b$.
- Now for every node, calculate $max ( dist(a,node), dist(b,node) )$ using DFS and dynamic programming.

```CPP:
#include<bits/stdc++.h>
using namespace std;
 
#define int long long int
#define endl '\n'
typedef long long ll;
 
const int MOD = 1000000007;

const int N = 2e5+1;
 
vector<int> adj[N];
 
int dist[2][N]{};
 
int dfs(int node,int parent,int d,int i){
    dist[i][node] = d;
    int last_node = -1;
    for(int child: adj[node]){
        if (child==parent) continue;
        int x = dfs(child,node,d+1,i);
        if ( last_node==-1 || dist[i][x]>dist[i][last_node] ) last_node = x;
    }
    if (last_node!=-1) return last_node;
    return node;
}
 
signed main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    int n;
    cin>>n;
    for (int i = 0; i < n-1; i++) {
        int a,b;
        cin>>a>>b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    int a = dfs(1,1,0,0);
    int b = dfs(a,a,0,0);
    dfs(b,b,0,1);
	for (int i = 1; i <= n; i++) {
		cout << max(dist[0][i], dist[1][i])<<" ";
	}
    cout<<endl;
    return 0;
}
```

<br>

___

# *Tree Distances II

Link: https://cses.fi/problemset/task/1133

You are given a tree consisting of n nodes.
Your task is to determine for each node the sum of the distances from the node to all other nodes.

Solution:
- The key observation is that if we reroot the tree at node 1's neighbour (let's say node 2), then
    - The depths of all nodes in node 2's subtree decrease by 1.
    - The depths of all nodes outside of its subtree increase by 1.
    - Observe that the change in answer is only n-2 $n - 2(\text{node 2's subtree size})$.

```cpp:
#include<bits/stdc++.h>
using namespace std;

typedef long long ll;
#define int ll
#define endl '\n'

const ll mod = 1000000007;
const int N = 2e5+1;
vector<int> adj[N];
int dp[N]{};
int ans[N]{};
int n;

void dfs1(int node = 1, int parent = 0, int depth = 0){
    ans[1] += depth;
    dp[node] = 1;
    for(int i:adj[node]){
        if (i==parent) continue;
        dfs1(i,node,depth+1);
        dp[node]+=dp[i];
    }
}

void dfs2(int node = 1,int parent = 0){
    for(int i:adj[node]){
        if (i==parent) continue;
        ans[i] = ans[node] + n - 2*dp[i];
        dfs2(i,node);
    }
}

signed main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);

    int a,b;
    cin>>n;
    for (int i = 0; i < n-1; i++) {
        cin>>a>>b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    dfs1();
    dfs2();
    for (int i = 1; i <= n; i++) {
        cout<<dp[i]<<" ";
    }
    cout<<endl;
    for (int i = 1; i <= n; i++) {
        cout<<ans[i]<<" ";
    }

    return 0;
}
```

<br>

___


# Company Queries I

Link: https://cses.fi/problemset/task/1687

A company has n employees, who form a tree hierarchy where each employee has a boss, except for the general director.

Your task is to process q queries of the form: who is employee x's boss k levels higher up in the hierarchy?

Solution:
- Use binary lifting.

```cpp:
#include<bits/stdc++.h>
using namespace std;
 
typedef long long ll;
#define int ll
#define endl '\n'
 
const ll mod = 1000000007;
 
const int N = 2e5+1;
int sparseTable[N][18]{};
 
int getPar(int x,int k){
    for(int i=0;i<18;i++){
        if (k&(1<<i)){
            x = sparseTable[x][i];
        }
    }
    return x == 0 ? -1 : x;
}
 
signed main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    
    int n,q;
    cin>>n>>q;
    for (int i = 2; i <= n; i++) {
        int x;
        cin>>x;
        sparseTable[i][0]=x;
    }
    for (int cur = 2; cur <= n; cur++) {
        for (int j = 1; j < 18; j++) {
            sparseTable[cur][j] = sparseTable[ sparseTable[cur][j-1] ][j-1];
        }
    }
 
    while(q--){
        int x,k;
        cin>>x>>k;
        cout<<getPar(x,k)<<endl;
    }
 
    return 0;
}
```

<br>

___


# Company Queries II

Link: https://cses.fi/problemset/task/1688

A company has n employees, who form a tree hierarchy where each employee has a boss, except for the general director.
Your task is to process q queries of the form: 
-  who is the lowest common boss of employees a and b in the hierarchy?

Solution:
- Find LCA using binary lifting.

```cpp:
#include<bits/stdc++.h>
using namespace std;
 
typedef long long ll;
#define int ll
#define endl '\n'
 
const ll mod = 1000000007;
 
const int N = 2e5+5;
vector<int> adj[N];
int sparseTable[N][20]{};
int depth[N];
 
int getLCA(int u,int v){
    if (depth[u]<depth[v]) swap(u,v);
    int diff = depth[u]-depth[v];
    for (int i = 0; i < 20; i++) {
        if ((diff>>i)&1){
            u = sparseTable[u][i];
        }
    }
    if (u==v) return u;
    for (int i = 19; i >= 0 ; i--) {
        if (sparseTable[u][i] != sparseTable[v][i]){
            u = sparseTable[u][i];
            v = sparseTable[v][i];
        }
    }
    return sparseTable[u][0];
}
 
void dfs(int node){
    for(int i=1;i<20;i++){
        sparseTable[node][i] = sparseTable[ sparseTable[node][i-1] ][i-1];
    }
    for(int child:adj[node]){
        if (child == sparseTable[node][0]) continue;
        sparseTable[child][0]=node;
        depth[child] = depth[node]+1;
        dfs(child);
    }
}
 
signed main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    int n,q;
    cin>>n>>q;
    for (int i = 2; i <= n; i++) {
        int x;
        cin>>x;
        sparseTable[i][0]=x;
        adj[x].push_back(i);
    }
    depth[1]=0;
    dfs(1);
    while(q--){
        int u,v;
        cin>>u>>v;
        cout<<getLCA(u,v)<<endl;
    }
    return 0;
}
```

<br>

___

# Subtree Queries

Link: https://cses.fi/problemset/task/1137

You are given a rooted tree consisting of n nodes. The nodes are numbered 1,2,…,n, and node 1 is the root. Each node has a value.

Your task is to process following types of queries:
1. change the value of node s to x
2. calculate the sum of values in the subtree of node s

Solution:
- Flatten the tree using Euiler tour and use prefix sums.
- Use BIT tree or segment tree for point updates.

```cpp:
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
#define int ll
#define endl '\n'
#define N 200001

const ll mod = 1000000007;

int BIT[N]{};

void update(int idx, int x){
    while (idx <= N){
        BIT[idx] += x;
        idx += idx & -idx;
    }
}

int query(int idx){
    int total = 0;
    while (idx > 0){
        total += BIT[idx];
        idx -= idx & -idx;
    }
    return total;
}

int nodeVal[N];
vector<int> adj[N];
int startAt[N]{}, endAt[N]{};
int timer = 1;
void dfs(int node, int par){
    startAt[node] = timer++;
    for (int child : adj[node]){
        if (child != par){
            dfs(child, node);
        }
    }
    endAt[node] = timer;
}

signed main(){
    int n, q, u, v;
    cin >> n >> q;
    for (int i = 1; i <= n; i++){
        cin >> u;
        nodeVal[i] = u;
    }
    for (int i = 0; i < n - 1; i++){
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    dfs(1, -1);
    for (int i = 1; i <= n; i++){
        update(startAt[i], nodeVal[i]);
    }
    while (q--){
        int t;
        cin >> t;
        if (t == 1){
            int node, val;
            cin >> node >> val;
            int temp = nodeVal[node];
            update(startAt[node], val-temp);
            nodeVal[node] = val;
        }
        else{
            int node;
            cin >> node;
            int end_sum = query(endAt[node]-1);
            int start_sum = query(startAt[node] - 1);
            cout << end_sum - start_sum << endl;
        }
    }
    return 0;
}
```

<br>

___


# Distance Queries

Link: https://cses.fi/problemset/task/1135

You are given a tree consisting of n nodes.
Your task is to process q queries of the form: what is the distance between nodes a and b?

Solution:
- Find distance using LCA and binary lifting.

```cpp:
#include<bits/stdc++.h>
using namespace std;
 
typedef long long ll;
#define int ll
#define endl '\n'
 
const ll mod = 1000000007;
 
const int N = 2e5+1;
vector<int> adj[N];
int sparseTable[N][20]{};
int depth[N];
 
int getLCA(int u,int v){
    if (depth[u]<depth[v]) swap(u,v);
 
    int diff = depth[u]-depth[v];
    for (int i = 19; i >= 0 ; i--) {
        if ((diff)&(1<<i)){
            u = sparseTable[u][i];
        }
    }
 
    if (u==v) return u;
    for (int i = 19; i >= 0 ; i--) {
        if (sparseTable[u][i] != sparseTable[v][i]){
            u = sparseTable[u][i];
            v = sparseTable[v][i];
        }
    }
 
    return sparseTable[u][0];
}
void dfs(int node,int par){
    depth[node] = depth[par]+1;
    sparseTable[node][0]=par;
    for(int i=1;i<20;i++){
        sparseTable[node][i] = sparseTable[ sparseTable[node][i-1] ][i-1];
    }
    for(int child:adj[node]){
        if (child == par) continue;
        dfs(child,node);
    }
}
 
int dist(int a,int b){
    return depth[a] + depth[b] - 2*depth[getLCA(a,b)];
}
 
signed main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    int n,q;
    cin>>n>>q;
    for (int i = 0; i < n-1; i++) {
        int a,b;
        cin>>a>>b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    depth[0]=-1;
    dfs(1,0);
    depth[0]=0;
    while(q--){
        int u,v;
        cin>>u>>v;
        cout<<dist(u,v)<<endl;
    }
 
    return 0;
}
```

<br>

___


# Path Queries

Link: https://cses.fi/problemset/task/1138/

You are given a rooted tree consisting of n nodes. The nodes are numbered 1,2,…,n, and node 1 is the root. Each node has a value.
Your task is to process following types of queries:
1. change the value of node s to x
2. calculate the sum of values on the path from the root to node s

Solution:
- Use Euiler tour to flatten the tree into an array. 
- Calculate the path sum for every node.
- Use segment tree/fenwick tree for range updates.
- Read more here: https://usaco.guide/CPH.pdf#page=175
- For BIT tree implementation: https://cp-algorithms.com/data_structures/fenwick.html#3-range-updates-and-range-queries

```cpp:
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
#define int ll
#define endl '\n'
#define N 200001

const ll mod = 1000000007;

int B1[N]{}, B2[N]{};

void add(int *b,int idx, int val){
    while (idx<=N){
        b[idx]+=val;
        idx += idx & -idx;
    }
}

void range_add(int l, int r, int x){
    add(B1, l, x);
    add(B1, r+1, -x);
    add(B2, l, x*(l-1));
    add(B2, r+1, -x*r);
}

int sum(int *b, int idx){
    int total = 0;
    while (idx>0){
        total += b[idx];
        idx -= idx & -idx;
    }
    return total;
}

int prefix_sum(int idx){
    return sum(B1,idx)*idx - sum(B2,idx);
}

int range_sum(int l,int r){
    return prefix_sum(r) - prefix_sum(l-1);
}


int nodeVal[N];
int pathSum[N];
vector<int> adj[N];
int startAt[N]{}, endAt[N]{};
int timer = 1;

void dfs(int node, int par){
    pathSum[node] = pathSum[par]+nodeVal[node];
    startAt[node] = timer++;
    for (int child : adj[node]){
        if (child != par){
            dfs(child, node);
        }
    }
    endAt[node] = timer;
}

signed main(){
    int n, q, u, v;
    cin >> n >> q;
    for (int i = 1; i <= n; i++){
        cin >> u;
        nodeVal[i] = u;
    }
    for (int i = 0; i < n - 1; i++){
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    dfs(1, 0);
    for (int i = 1; i <= n; i++){
        range_add(startAt[i],startAt[i], pathSum[i]);
    }
    while (q--){
        int t;
        cin >> t;
        if (t == 1){
            int node, val;
            cin >> node >> val;
            int temp = nodeVal[node];
            range_add(startAt[node],endAt[node]-1, val-temp);
            nodeVal[node] = val;
        }
        else{
            int node;
            cin >> node;
            cout<<range_sum(startAt[node],startAt[node])<<endl;
        }
    }
    return 0;
}
```

<br>

___

# Distinct Colors

Link: https://cses.fi/problemset/task/1139

You are given a rooted tree consisting of n nodes. The nodes are numbered 1,2,…,n, and node 1 is the root. Each node has a color.
Your task is to determine for each node the number of distinct colors in the subtree of the node.

Solution:

- Always merge smaller set into larger set.

```cpp:
#include <bits/stdc++.h>
using namespace std;
 
typedef long long ll;
#define int ll
#define endl '\n'
#define N 200001
 
const ll mod = 1000000007;
vector<int> adj[N];
set<int> colors[N];
int ans[N];
 
void dfs(int node, int par)
{
    for (int child : adj[node])
    {
        if (child == par)
            continue;
        dfs(child,node);
        if (colors[node].size()<colors[child].size()){
            swap(colors[node],colors[child]);
        }
        for (int item : colors[child])
        {
            colors[node].insert(item);
        }
    }
    ans[node] = colors[node].size();
}
 
signed main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
 
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++)
    {
        int c;
        cin >> c;
        colors[i].insert(c);
    }
    for (int i = 1; i < n; i++)
    {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    dfs(1, 0);
	for (int i = 1; i <= n; i++) {
		cout << ans[i] << " ";
	}
    return 0;
}
```

<br>

___



# Finding a Centroid

Link: https://cses.fi/problemset/task/2079

Given a tree of n nodes, your task is to find a centroid, i.e., a node such that when it is appointed the root of the tree, each subtree has at most ⌊n/2⌋ nodes.

Solution:
- if the current node has all children of size n/2, it is a centroid.
- else move to child of biggest size.

```
#include<bits/stdc++.h>
using namespace std;
 
typedef long long ll;
#define int ll
#define endl '\n'
#define N 200001
 
const ll mod = 1000000007;
 
vector<int> adj[N];
int subtreeSize[N]{};
 
void dfs(int node,int par){
    subtreeSize[node] = 1;
    for(int child: adj[node]){
        if (child==par) continue;
        dfs(child,node);
        subtreeSize[node]+=subtreeSize[child];
    }
}
 
int getCentroid(int node, int par, int sz){
    for(int child: adj[node]){
        if (child!=par){
            if (subtreeSize[child]*2 >sz){
                return getCentroid(child,node,sz);
            }
        }
    }
    return node;
}
 
 
signed main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    int n;
    cin>>n;
 
    for (int i = 0; i < n-1; i++) {
        int u,v;
        cin>>u>>v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    dfs(1,0);
    cout<<getCentroid(1,0,n);
 
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