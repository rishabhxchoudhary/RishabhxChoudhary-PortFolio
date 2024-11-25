---
title: "Unveiling 2-Edge Connected Components with DFS Lowlinking"
date: "25 November 2024"
category: "CP & Interviews"
tags: ["Graph Theory", "Algorithms", "Bridges"]
# coverImage: "/images/all_sql_queries/cover.webp"
about: "In the realm of graph theory, understanding the connectivity of a network is crucial for numerous applications, from network reliability to circuit design. One fascinating aspect of connectivity is identifying 2-edge connected components in an undirected graph. These components remain connected even after the removal of any single edge, highlighting their robustness against single points of failure."
---

# Unveiling 2-Edge Connected Components with DFS Lowlinking

**Category:** Computer Science

**Tags:** Graph Theory, Algorithms, Depth-First Search, Bridges, Connectivity, Data Structures

## Introduction

In the realm of graph theory, understanding the connectivity of a network is crucial for numerous applications, from network reliability to circuit design. One fascinating aspect of connectivity is identifying **2-edge connected components** in an undirected graph. These components remain connected even after the removal of any single edge, highlighting their robustness against single points of failure.

In this blog post, we'll delve into an efficient algorithm using Depth-First Search (DFS) and the concept of **low-link values** to find and print all 2-edge connected components in an undirected graph. We'll break down the intuition, provide mathematical proofs, and walk through the algorithm step by step, ensuring even beginners can grasp the concepts.

## Understanding Key Concepts

### Undirected Graphs

An **undirected graph** is a set of objects (called **vertices** or **nodes**) connected by edges, where the edges have no direction. Formally, a graph is represented as $G = (V, E)$, where $V$ is the set of vertices and $E$ is the set of edges.

### Connectivity

A graph is **connected** if there's a path between every pair of vertices. **2-edge connected components** are maximal subsets of vertices where any two vertices are connected by at least two disjoint paths, meaning the removal of any single edge does not disconnect the component.

### Bridges

An edge is called a **bridge** if its removal increases the number of connected components in the graph. Identifying bridges is key to finding 2-edge connected components because bridges are the edges that, when removed, split the graph into separate components.

### Depth-First Search (DFS)

DFS is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It's particularly useful for connectivity problems in graphs.

## Intuition Behind the Algorithm

The core idea is to use DFS to traverse the graph and compute two values for each node:

1. **In-Time ($in\_time[u]$):** The time when a node $u$ is first visited during the DFS traversal.
2. **Low-Link Value ($low[u]$):** The lowest in-time reachable from $u$ (including $u$ itself and its descendants in the DFS tree).

By comparing the in-time and low-link values, we can identify bridges:

- If for an edge $(u, v)$, $low[v] > in\_time[u]$, then $(u, v)$ is a bridge.

Once we've found all the bridges, we can perform another DFS, this time avoiding the bridges, to identify and count the 2-edge connected components.

## Detailed Explanation

### Finding Bridges Using DFS Lowlinking

#### Step 1: Initialize Variables

We initialize:

- **Timer:** A global variable to assign in-time values.
- **In-Time Array ($in\_time$):** Stores the time at which each node is visited.
- **Low-Link Array ($low$):** Stores the lowest in-time reachable from each node.
- **Bridges Set:** To store all identified bridges.

#### Step 2: DFS Traversal

We perform DFS starting from an arbitrary node. For each node $u$, we:

1. Set $in\_time[u] = low[u] = timer++$.
2. For each adjacent node $v$:
   - If $v$ is the parent of $u$, we skip it to prevent trivial cycles.
   - If $v$ is not visited, we recursively call DFS for $v$.
     - After returning, we update $low[u] = \min(low[u], low[v])$.
     - **Bridge Condition:** If $low[v] > in\_time[u]$, then $(u, v)$ is a bridge.
   - If $v$ is already visited (back edge), we update $low[u] = \min(low[u], in\_time[v])$.

#### Mathematical Proof

The crucial part is proving that an edge $(u, v)$ is a bridge if and only if $low[v] > in\_time[u]$.

- **If $low[v] > in\_time[u]$:** There is no back edge from the subtree rooted at $v$ to $u$ or any of its ancestors. Removing $(u, v)$ disconnects $v$'s subtree from $u$, making $(u, v)$ a bridge.
- **If $low[v] \leq in\_time[u]$:** There is a back edge, so even if we remove $(u, v)$, there is another path connecting $v$ and $u$, so $(u, v)$ is not a bridge.

#### Code Snippet

```cpp
void dfs(int u, int parent) {
    in_time[u] = low[u] = timer++;
    for(int v : graph[u]) {
        if(v == parent) continue;
        if(!in_time[v]) {
            dfs(v, u);
            low[u] = min(low[u], low[v]);
            if(low[v] > in_time[u]) {
                bridges.insert({u, v});
                bridges.insert({v, u});
            }
        } else {
            low[u] = min(low[u], in_time[v]);
        }
    }
}
```

<!-- ### Visual Representation

![Diagram illustrating DFS traversal with in-time and low-link values, highlighting bridges.]

*Description:* This image shows an undirected graph with nodes labeled with their in-time and low-link values during DFS traversal. Bridges are highlighted in red, demonstrating where the removal would disconnect the graph. -->

### Finding 2-Edge Connected Components

#### Step 3: Second DFS to Identify Components

After identifying all bridges, we perform another DFS to find 2-edge connected components by:

1. Initializing a **visited array** to keep track of visited nodes.
2. For each unvisited node, we perform DFS, assigning a **component ID** to all reachable nodes without crossing any bridges.
3. We skip any edge that's a bridge during this traversal.

#### Code Snippet

```cpp
void dfs_component(int u, int component_id) {
    visited[u] = component_id;
    for(int v : graph[u]) {
        if(bridges.count({u, v})) continue;
        if(!visited[v]) {
            dfs_component(v, component_id);
        }
    }
}
```

### Explanation of the Algorithm

- **Why Skip Bridges?** Bridges are the edges that, if removed, increase the number of connected components. By skipping them, we ensure that we only traverse within a 2-edge connected component.
- **Component Identification:** Each DFS traversal without crossing a bridge will visit all nodes in a single 2-edge connected component.
<!-- 
### Flowchart of the Algorithm

![Flowchart depicting the steps of the algorithm: starting from DFS traversal to find bridges, followed by a second DFS to identify 2-edge connected components.]

*Description:* This image provides a flowchart illustrating the algorithm's steps, making it easier to understand the sequence and logic of operations. -->

## Complete Algorithm Implementation

Here's the complete code combining both steps:

```cpp
#include <bits/stdc++.h>
using namespace std;

#define endl '\n'

vector<int> graph[100005];
vector<int> in_time(100005, 0);
vector<int> low(100005, 0);
set<pair<int, int>> bridges;
vector<int> visited(100005, 0);
int timer = 1;

void dfs(int u, int parent) {
    in_time[u] = low[u] = timer++;
    for(int v : graph[u]) {
        if(v == parent) continue;
        if(!in_time[v]) {
            dfs(v, u);
            low[u] = min(low[u], low[v]);
            if(low[v] > in_time[u]) {
                bridges.insert({u, v});
                bridges.insert({v, u});
            }
        } else {
            low[u] = min(low[u], in_time[v]);
        }
    }
}

void dfs_component(int u, int component_id) {
    visited[u] = component_id;
    for(int v : graph[u]) {
        if(bridges.count({u, v})) continue;
        if(!visited[v]) {
            dfs_component(v, component_id);
        }
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    // Build the graph
    for(int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        graph[u].push_back(v);
        graph[v].push_back(u);
    }
    // Find bridges
    for(int i = 1; i <= n; i++) {
        if(!in_time[i]) dfs(i, -1);
    }
    // Find 2-edge connected components
    int component_id = 1;
    map<int, vector<int>> components;
    for(int i = 1; i <= n; i++) {
        if(!visited[i]) {
            dfs_component(i, component_id);
            component_id++;
        }
    }
    // Output the components
    cout << component_id - 1 << endl;
    for(int i = 1; i < component_id; i++) {
        cout << components[i].size() << " ";
        for(int node : components[i]) {
            cout << node << " ";
        }
        cout << endl;
    }
    return 0;
}
```

### Explanation of the Code

- **Graph Construction:** Reads the number of nodes and edges and constructs the adjacency list.
- **Finding Bridges:** Calls `dfs` for each unvisited node to find all bridges.
- **Identifying Components:** Uses `dfs_component` to assign component IDs, skipping bridges.
- **Output:** Prints the number of 2-edge connected components and lists their nodes.

## Conclusion

By leveraging DFS and low-link values, we can efficiently identify bridges in an undirected graph, which in turn allows us to find all 2-edge connected components. This algorithm is vital for understanding the resilience of networks and can be applied in various fields like network design, biology, and sociology.

Understanding this algorithm enhances our grasp of graph connectivity and traversal techniques. Future developments might focus on optimizing the algorithm for larger graphs or adapting it to dynamic graphs where edges are frequently added or removed.

## References

- [Tarjan's Algorithm - Wikipedia](https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm)
- [Graph Theory - GeeksforGeeks](https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/)
- [Bridges in Graph - CP-Algorithms](https://cp-algorithms.com/graph/cutpoints.html)