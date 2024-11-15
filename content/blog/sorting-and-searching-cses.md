---
title: "Solutions for CSES Sorting and Searching Problems | CSES Problem Set Guide"
date: "15 July 2023"
category: "CP & Interviews"
tags: ["CSES", "Sorting", "Searching"]
about: "Explore efficient solutions to the Sorting and Searching section in the CSES Problem Set. Master essential algorithms and optimize your code for optimal performance."
---

Important problems are marked with *

# Distinct Numbers

Link: [https://cses.fi/problemset/task/1621](https://cses.fi/problemset/task/1621)

You are given a list of $n$ integers, and your task is to calculate the number of distinct values in the list.

Solution:
- There are several approaches to solve this problem.
- One of the approaches is to store all the elements in a set and display the length of the set.

```cpp:
#include<bits/stdc++.h>
using namespace std;
 
typedef long long ll;
#define endl '\n'
 
const ll mod = 1000000007;
 
int main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    int t;cin>>t;
    set<int>s;
    while(t--){
        int x;
        cin>>x;
        s.insert(x);
    }
    cout<<s.size();
 
    return 0;
}
```

<br>

___

# Apartments

Link: https://cses.fi/problemset/task/1084

There are $n$ applicants and $m$ free apartments. Your task is to distribute the apartments so that as many applicants as possible will get an apartment.

Each applicant has a desired apartment size, and they will accept any apartment whose size is close enough to the desired size.

Solution:

- This problem is based on sorting and the two-pointer approach.
- Sort both arrays of apartments and requirements.
- Create two pointers, $i$ and $j$, pointing to the first elements of the arrays.
- Increase $j$ if $requirement[i] - k > apartments[j]$, as the requirement is too big, and we cannot assign any apartment.
- Increase $i$ if $requirement[i] + k < apartments[j]$, as the requirement is too small, and we cannot assign any apartment.
- Otherwise, assign the apartment and increase the count.

```cpp:
int main()
{
    fast;
    int n,m,k;
    cin>>n>>m>>k;
    vector<int>a(n,0);
    vector<int>b(m,0);
    for(int i=0;i<n;i++) cin>>a[i];
    for(int i=0;i<m;i++) cin>>b[i];
    sort(a.begin(),a.end());
    sort(b.begin(),b.end());
    int i=0,j=0;
    int count=0;
    while(i<n && j<m){
        if (a[i]-k>b[j])j++;
        else if (a[i]+k<b[j])i++;
        else{
            count++;
            i++;j++;
        }
    }
    cout<<count<<endl;
    return 0;
}
```

<br>

___

# Ferris Wheel

Link: [https://cses.fi/problemset/task/1090](https://cses.fi/problemset/task/1090)

There are $n$ children who want to go to a Ferris wheel, and your task is to find a gondola for each child.
Each gondola may have one or two children in it, and in addition, the total weight in a gondola may not exceed $x$. You know the weight of every child.
What is the minimum number of gondolas needed for the children?

Solution:

- Look at the constraints, $n$ is in the order of $10^5$. Also, the number of children in a gondola is at most 2. Hence, it can be solved greedily.
- Sort the array and create 2 pointers. Set $i$ to the start of the array and $j$ to the end of the array.
- Check if $i$ and $j$ both can sit in the same gondola. If yes, then increase $i$ and decrease $j$. Otherwise, only decrease $j$.

```cpp:
signed main()
{
    int n,x;
    cin>>n>>x;
    vector<int>a(n,0);
    for(int i=0;i<n;i++) cin>>a[i];
    sort(a.begin(),a.end());
    int i=0,j=n-1;
    int ans = 0;
    while(i<j){
        if (a[i]+a[j]>x){
            ans++; j--;
        }
        else{
            ans++;
            i++;j--;
        }
    }
    if (i==j) ans++;
    cout<<ans<<endl;
    return 0;
}
```

<br>

___

# *Concert Tickets

Link: [https://cses.fi/problemset/task/1091](https://cses.fi/problemset/task/1091)

There are $n$ concert tickets available, each with a certain price. Then, $m$ customers arrive, one after another.
Each customer announces the maximum price they are willing to pay for a ticket, and after this, they will get a ticket with the nearest possible price such that it does not exceed the maximum price.

Solution:
- Clearly, the problem is based on sorting and binary search.
- First, we will sort the array of prices. But we will create a new array of pairs ${\text{{value}}, \text{{index}}}$ to print the index.
- We can also use a multiset instead of an array.
- For every person, we will use binary search to find the closest maximum price ticket.
- This can be done very easily using the upper bound in C++, or a custom binary search function in other languages.
- But there is one problem here, we cannot assign two people the same tickets.
- Once a ticket is used, we cannot re-assign it.
- One possible solution will be to simply remove it from the sorted array after assigning it.
- Removing the elements is a heavy task, and this makes binary search unreliable.
- A much better approach is to maintain a replacement array so that if the value is already used, this replacement array will store the previously used value for the same index.


```cpp:
int check(int pos, vector<int> &replacement)
{
    if (pos < 0)
        return -1; // not found.
    if (replacement[pos] == -2)
    {
        // found and unused ticket. next time a new ticket comes,
        // we want to use the ticket at pos-1.
        replacement[pos] = pos - 1;
        return pos;
    }
    // otherwise keep searching till we find a ticket.
    replacement[pos] = check(replacement[pos], replacement);
    return replacement[pos];
}
 
signed main()
{
    int n, m;
    cin >> n >> m;
    vector<int> tickets(n, 0), replacement(n, -2);
    for (int i = 0; i < n; i++)
        cin >> tickets[i];
    sort(tickets.begin(), tickets.end());
    while (m--)
    {
        int k;
        cin >> k;
        int pos = upper_bound(tickets.begin(), tickets.end(), k) - tickets.begin() - 1;
        int index = check(pos, replacement);
        if (index < 0)
            cout << -1 << endl;
        else
            cout << tickets[index] << endl;
    }
 
    return 0;
}

```

<br>

___

# *Restaurant Customers

Link: [https://cses.fi/problemset/task/1619](https://cses.fi/problemset/task/1619)

You are given the arrival and leaving times of $n$ customers in a restaurant.
What was the maximum number of customers in the restaurant at any time?

Solution:
- This is a standard problem on maximum overlapping intervals.
- In such interval-related problems, we either have to sort the intervals by start time or end time.
- We can solve it by sorting all the intervals by start time (sweep line algorithm).
- Alternatively, for every interval, we can create a list of $\{\text{{start\_time}},+1\}$, $\{\text{{end\_time}},-1\}$ and sort them.
- Check for the maximum value while traversing.


```python:
def main():
    l=[]
    for _ in range(int(_input())):
        a,b = map(int,_input().split())
        l.append((a,1))
        l.append((b,-1))
    l.sort()
    ans=0
    x=0
    for i in l:
        x+=i[1]
        ans=max(ans,x)
    print(ans)
main()
```

<br>

___

# Movie Festival

Link: [https://cses.fi/problemset/task/1629](https://cses.fi/problemset/task/1629)

In a movie festival, $n$ movies will be shown. You know the starting and ending time of each movie. What is the maximum number of movies you can watch entirely?

Solution:
- This problem is also based on overlapping intervals.
- The difference from the previous problem is that intervals must not overlap as we cannot watch 2 movies at the same time, and we want to maximize the number of movies.
- In such interval-related problems, we either have to sort the intervals by start time or end time. In this case, we have to sort them by end time.
- To see why sorting by start time does not work, consider the intervals: (1,100), (2,3), (4,5), (6,7)
  - If we select the first interval after sorting by start time, we will have to select (1,100).
  - Now, until time 100, we cannot select the intervals (2,3), (4,5), (6,7).
- Hence, we have to sort them by end time.


```python:
def main():
    l=[]
    for _ in range(int(_input())):
        a,b = map(int,_input().split())
        l.append((a,b))
    
    l = sorted(l,key=lambda x:x[1])
    count=0
    end_time=0
    for i in l:
        if end_time<=i[0]:
            count+=1
            end_time=i[1]
    print(count)
main()
```
<br>

___

# Sum of Two Values

Link: [https://cses.fi/problemset/task/1640/](https://cses.fi/problemset/task/1640/)

You are given an array of $n$ integers, and your task is to find two values (at distinct positions) whose sum is $x$.

Solution:
- There are several ways to solve this problem. A simple approach is to use a map to store the elements and their indices, which will pass all the test cases.
- A more advanced and optimal approach would be to use radix sort and two pointers.

```cpp:
int main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    int n,x;
    cin>>n>>x;
    bool check = false;
    map<int,int>m;
    for(int i=1;i<=n;i++){
        int k;
        cin>>k;
        int req = x-k;
        if (m.find(req)==m.end()){
            m[k]=i;
        }
        else{
            cout<<i<<" "<<m[req];
            check=true;
            break;
        }
 
    }
    if (!check) cout<<"IMPOSSIBLE";
 
    return 0;
}
```

<br>

___

# Maximum Subarray Sum

Link: [https://cses.fi/problemset/task/1643](https://cses.fi/problemset/task/1643)

Given an array of $n$ integers, your task is to find the maximum sum of values in a contiguous, nonempty subarray.

Solution:
- This is a very standard problem based on Kadane's algorithm.
- You can also solve it using Dynamic Programming. Both approaches work in $O(n)$ time complexity, but Kadane's algorithm works in constant space.

```python:
def main():
    n=int(_input())
    l = list(map(int,_input().split()))
    if n==1: print(l[0])
    else:
        a=l[0]
        b=float("-inf")
        for i in range(1,n):
            x = a+l[i]
            if x>l[i]:
                a=x
            else: a=l[i]
            b=max(b,a)
        print(b)
main()
```

# Stick Lengths

Link: [https://cses.fi/problemset/task/1074](https://cses.fi/problemset/task/1074)

There are $n$ sticks with some lengths. Your task is to modify the sticks so that each stick has the same length.
You can either lengthen or shorten each stick. Both operations cost $x$, where $x$ is the difference between the new and original length.
What is the minimum total cost?

Solution:
- This is also a very common problem.
- In problems like this, where we have to make all the elements equal and minimize the cost, it is generally a good idea to make all of them equal to the median of the lengths.


```Python:
def main():
    n=int(_input())
    l=sorted(list(map(int,_input().split())))
    x = l[n//2]
    ans=0
    for i in l:
        ans+=abs(x-i)
    print(ans)
main()
```

<br>

___

# *Missing Coin Sum

Link: [https://cses.fi/problemset/task/2183](https://cses.fi/problemset/task/2183)

You have $n$ coins with positive integer values. What is the smallest sum you cannot create using a subset of the coins?

Solution:
- A very similar problem is to print all the possible values we can create using a set of coins, which can be solved using Dynamic Programming in $O(n \cdot \text{{sum(coins)}})$.
- We can modify the above approach to solve it in $O(n \cdot \text{{sum(coins)}})$.
- We can also use sorting and cumulative sums/prefix sums to solve this problem. It works in $O(n \log n)$.
- Sort the array and traverse the prefix sum. If $\text{{arr}}[i] > \text{{prefix_sum}}[i] + 1$, then we will never be able to make $\text{{prefix_sum}}[i] + 1$.
- Actually, we can save space. We do not need the previous values less than $i$ once we use them. Hence, take the cumulative sum in a variable.
- For the given constraints, since the maximum sum of coins can go up to $10^9 \times 2 \times 10^5$, the first approach will not work.
- We can even reduce the sorting time by using algorithms like radix sort and optimize the solution to $O(n)$.


```cpp:
int main()
{
    int n;
    cin >> n;
    vector<int> a(n, 0);
    for (int i = 0; i < n; i++)
        cin >> a[i];
    sort(a.begin(), a.end());
    if (a[0] != 1){
        cout << 1 << endl;
        return 0;
    }
    int cumulative_sum = 0;
    for (int i = 0; i < n; i++){
        cumulative_sum += a[i];
        int k = cumulative_sum + 1;
        if (i != n - 1){
            if (a[i + 1] > k)
            {
                cout << k << endl;
                return 0;
            }
        }
        else
            cout << k << endl;
    }
    return 0;
}
```

<br>

___


# Collecting Numbers

Link: [https://cses.fi/problemset/task/2216](https://cses.fi/problemset/task/2216)

You are given an array that contains each number between 1…n exactly once. Your task is to collect the numbers from 1 to n in increasing order.
On each round, you go through the array from left to right and collect as many numbers as possible. What will be the total number of rounds?

Solution:
- We can simply take as many numbers as possible in each round. Keep a boolean array to check if this number has been picked or not. Keep doing this until all the numbers are collected.
- Another approach would be to use the fact that every number occurs once. We can actually make a position array instead of a normal array.
- For every element $x$, $arr[x] = i$ instead of the normal $arr[i] = x$.
- Then, in this array, if $arr[i] > arr[i+1]$, increase the number of rounds by 1.


```Python:
def main():
    n = int(_input())
    l = list(map(int,_input().split()))
    v = [0 for i in range(n+1)]
    for i in range(n):
        v[l[i]]=i
    rounds = 0
    for i in range(n):
        if v[i]>v[i+1]:
            rounds+=1
    print(rounds+1)
main()
```

<br>

___


# Collecting Numbers II

```cpp:
int main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    int n,q;
    cin>>n>>q;
    vector<int> values(n+1);
    vector<int> positions(n+1);
    for(int i=1;i<n+1;i++){
        cin>>values[i];
        positions[values[i]]=i;
    }
    int ans=1;
    for(int i=1;i<n;i++){
        ans+=(positions[i]>positions[i+1]);
    }
    int l,r;
    set < pair<int,int> > updated;
    while(q--){
        cin>>l>>r;
        if (values[l]+1<=n){
            updated.insert({values[l],values[l]+1});
        }
        if (values[l]-1>=1){
            updated.insert({values[l]-1,values[l]});
        }
        if (values[r]+1<=n){
            updated.insert({values[r],values[r]+1});
        }
        if (values[r]-1>=1){
            updated.insert({values[r]-1,values[r]});
        }
 
        for(auto p:updated){
            ans-=positions[p.first]>positions[p.second];
        }
        swap(values[l],values[r]);
        positions[values[l]]=l;
        positions[values[r]]=r;
        for(auto p:updated){
            ans+=positions[p.first]>positions[p.second];
        }
        cout<<ans<<endl;
        updated.clear();
    } 
    return 0;
}
```

<br>

___

# Playlist

You are given a playlist of a radio station since its establishment. The playlist has a total of $n$ songs.
What is the longest sequence of successive songs where each song is unique?

Solution:
- This is a standard problem on sliding window known as maximum subarray with unique elements.
- We can solve it using a map or set.


```cpp
signed main()
{
    int n;
    cin>>n;
    vector<int>songs(n,0);
    map<int,int> last_seen;
    map<int,int>::iterator itr;
    int ans = 0;
    int start = 0;
    for(int end=0;end<n;end++){
        int x;cin>>x;
        itr = last_seen.find(x);
        if (itr!=last_seen.end()){
            start = max(start,last_seen[x]+1);
        }
        ans = max(ans,end-start+1);
        last_seen[x]=end;
    }
    cout<<ans<<endl;
    return 0;
}
```

<br>

___

# Towers

Link: [https://cses.fi/problemset/task/1073/](https://cses.fi/problemset/task/1073/)

You are given $n$ cubes in a certain order, and your task is to build towers using them. Whenever two cubes are one on top of the other, the upper cube must be smaller than the lower cube.

You must process the cubes in the given order. You can always either place the cube on top of an existing tower or begin a new tower. What is the minimum possible number of towers?

Solution:
- This problem can easily be solved using a multiset or a vector.
- For every cube, take the upper bound of the cube in the multiset or vector and decide if we want to place it on a tower. If there is no tower greater than the current one, add it to the multiset or vector.
- Erase the value of the tower we place the new cube on from the multiset.
- Print the size of the multiset or vector.

```cpp:
int main()
{
    int n;
    cin >> n;
    vector<int> arr;
    while (n--){
        int k;
        cin >> k;
        auto it = upper_bound(arr.begin(), arr.end(), k);
        if (it != arr.end()){
            *it = k;
        }
        else{
            arr.push_back(k);
        }
    }
    cout << arr.size() << endl;
    return 0;
}
```

<br>

___

# Traffic Lights

Link: [https://cses.fi/problemset/task/1163/](https://cses.fi/problemset/task/1163/)

There is a street of length $x$ whose positions are numbered 0, 1, ..., $x$. Initially, there are no traffic lights, but $n$ sets of traffic lights are added to the street one after another.
Your task is to calculate the length of the longest passage without traffic lights after each addition.

Solution:
- This problem can be solved by maintaining a set of partitions and a multiset of lengths of these partitions.
- Whenever we add a traffic light $p$, we add $p$ to the set. Then we get the next and previous value in the set and delete the length of the next-prev partition from the multiset.
- We add the two new lengths $p$-prev and $p$-next to the length multiset.


```cpp:
signed main()
{
    int x, n;
    cin >> x >> n;
    set<int> partitions;
    multiset<int> lengths;
    partitions.insert(0);
    partitions.insert(x);
    lengths.insert(x);
    for (int i = 0; i < n; i++)
    {
        int p;
        cin >> p;
        partitions.insert(p);
        auto itr = partitions.find(p);
        int pre = *(prev(itr));
        int nxt = *(next(itr));
        auto itr1 = lengths.find(nxt - pre);
        lengths.erase(itr1);
        lengths.insert(p - pre);
        lengths.insert(nxt - p);
        cout << *(lengths.rbegin()) << " ";
    }
    return 0;
}
```

<br>

___

# Josephus Problem I

Link: [https://cses.fi/problemset/task/2162](https://cses.fi/problemset/task/2162)

Consider a game where there are $n$ children (numbered 1, 2, ..., $n$) in a circle. During the game, every other child is removed from the circle until there are no children left. In which order will the children be removed?

Solution:
- The Josephus problem is a famous theoretical problem that involves a group of people standing in a circle. Starting from a designated person, you count a fixed number of people in a clockwise direction and eliminate them one by one until only one person remains. The goal is to find the position of the last remaining person.
- There is no standard approach to print the children one by one. Any solution with a time complexity of O($n \log n$) or better will work.
- For $k = 1$, we will see a pattern of direction and step size.
- The following code works in O($n$).
- In the next problem, we will discuss a general approach using a segment tree with a time complexity of O($n \log n$). That code will also work here for $k = 1$.

```cpp:
signed main()
{
    int n;
    cin >> n;
    int cur_position = 0, step_size = 1, remaining_people = n, direction = 1;
    while (cur_position + 1 <= n)
    {
        for (int i = cur_position + direction * step_size + 1; i <= n; i += 2 * step_size)
        {
            cout << i << " ";
        }
        int s = (remaining_people + 1 - direction) / 2;
        cur_position += (1 - direction) * step_size;
        step_size *= 2;
        direction = (remaining_people + direction) % 2;
        remaining_people -= s;
    }
}
```

<br>

___

# Josephus Problem II

Link: [https://cses.fi/problemset/task/2163/](https://cses.fi/problemset/task/2163/)

Consider a game where there are $n$ children (numbered 1, 2, ..., $n$) in a circle. During the game, repeatedly $k$ children are skipped, and one child is removed from the circle. In which order will the children be removed?

Solution:
- You can simulate it using an ordered set or a Segment Tree in $O(n \log n)$.
- An ordered set allows deletion in $O(\log n)$.
- Below is an implementation using a Segment Tree.


```cpp:
void findNextAlive(int cp, int tp, vector<int>& tree) {
    tree[cp]--;
    if (cp >= tree.size() / 2) {
        cout << cp - (tree.size() / 2) + 1 << " ";
        return;
    }
    if (tree[2 * cp] >= tp)
        findNextAlive(2 * cp, tp, tree);
    else
        findNextAlive(2 * cp + 1, tp - tree[2 * cp], tree);
}

int main() {
    int n, k;
    cin >> n>>k;
    int p = 0;
    while ((1 << p) < n) p++;
    int mx = 1 << p;
    vector<int> tree(mx * 2, 0);
    for (int i = 0; i < n; i++) {
        tree[i + mx] = 1;
    }
    for (int i = mx - 1; i >= 1; i--)
        tree[i] += tree[2 * i] + tree[2 * i + 1];
    int pos = 0, length = n;
    for (int i = 0; i < n; i++) {
        int step = (k + 1) % length;
        if (pos == 0 && step == 0) step = length;
        pos += step;
        if (pos > length) pos -= length;
        findNextAlive(1, pos, tree);
        pos--;
        length--;
    }
    return 0;
}
```

<br>

___

# Nested Ranges Check

Given n ranges, your task is to determine for each range if it contains some other range and if some other range contains it.
Range [a,b] contains range [c,d] if a≤c and d≤b.

Solution:
```cpp
struct range {
    int l,r,index;
    bool operator < (const range &other) const{
        if (l==other.l){
            return r>other.r;
        }
        return l<other.l;
    }
};
 
int main()
{
    int n; cin>>n;
    if (n==2){
        cout<<"1 0\n0 1";return 0;
    }
    vector<range> ranges(n);
    vector<bool> contained(n);
    vector<bool> contains(n);
    for(int i=0;i<n;i++){
        cin>>ranges[i].l;
        cin>>ranges[i].r;
        ranges[i].index=i;
    }
 
    sort(ranges.begin(),ranges.end());
 
    int maxEnd = 0;
    for(int i=0;i<n;i++){
        if (ranges[i].r<=maxEnd){
            contained[ranges[i].index]=true;
        }
        maxEnd = max(maxEnd,ranges[i].r);
    }
 
    int minEnd = 1e9;
    for(int i=n-1;i>=0;i--){
        if (ranges[i].r>=minEnd){
            contains[ranges[i].index]=true; 
        }
        minEnd = min(minEnd,ranges[i].r);
    }
 
    for(int i=0;i<n;i++){
        cout<<contains[i]<<" ";
    }
    cout<<endl;
 
    for(int i=0;i<n;i++){
        cout<<contained[i]<<" ";
    }
    cout<<endl;
    return 0;
}
```

<br>

___


# Room Allocation

There is a large hotel, and $n$ customers will arrive soon. Each customer wants to have a single room.
You know each customer's arrival and departure day. Two customers can stay in the same room if the departure day of the first customer is earlier than the arrival day of the second customer.
What is the minimum number of rooms that are needed to accommodate all customers? And how can the rooms be allocated?

Solution:
- This problem can be solved using a min heap or a priority queue.
- We will add the intervals to a min heap/priority queue. Whenever a new interval comes, if the start time of the new interval is greater than the end time of the topmost interval of the priority queue, we can allocate the room of the topmost interval to the new interval. Pop that interval from the priority queue and add the new interval.
- Otherwise, we will need a new room to accommodate the new interval.


```cpp:
signed main()
{
    int t;
    cin >> t;
    vector<pair<pair<int, int>, int>> customers(t);
    for (int i = 0; i < t; i++)
    {
        cin >> customers[i].first.first >> customers[i].first.second;
        customers[i].second = i;
    }
    sort(customers.begin(), customers.end());
    vector<int> roomassignmed(t, -1);
    int roomID = 1;
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> rooms;
    for (int i = 0; i < t; i++)
    {
        if (rooms.size() == 0)
        {
            roomassignmed[customers[i].second] = roomID++;
            rooms.push(make_pair(customers[i].first.second, roomID - 1));
        }
        else
        {
            if (rooms.top().first < customers[i].first.first)
            {
                roomassignmed[customers[i].second] = rooms.top().second;
                pair<int, int> x = rooms.top();
                rooms.pop();
                rooms.push(make_pair(customers[i].first.second, x.second));
            }
            else
            {
                roomassignmed[customers[i].second] = roomID++;
                rooms.push(make_pair(customers[i].first.second, roomID - 1));
            }
        }
    }
    cout << roomID - 1 << endl;
    for (int x : roomassignmed)
    {
        cout << x << " ";
    }

    return 0;
}
```

<br>

___

# *Factory Machines

Link: [https://cses.fi/problemset/task/1620](https://cses.fi/problemset/task/1620)

A factory has $n$ machines which can be used to make products. Your goal is to make a total of $t$ products.
For each machine, you know the number of seconds it needs to make a single product. The machines can work simultaneously, and you can freely decide their schedule.
What is the shortest time needed to make $t$ products?

Solution:
- First, look at the constraints. $n$ is on the order of $2 \times 10^5$.
- This question expects a solution in $O(n \log n)$.
- We are given the number of products and asked to find the minimum time taken to make these products.
- Let's try to solve a different problem. Suppose we are given a time $x$. We also have an array $machines$, where $machines[i]$ represents the time taken to make 1 product by the $i$th machine. What is the maximum number of products you can make in time $x$?
- This problem can be solved in $O(n)$ using the formula $\sum_{i=1}^{n} \frac{x}{{\text{machines}[i]}}$.
- Now we can use this to solve the main problem.
- The lower bound to make products is 1, and the upper bound is $10^{18}$.
- We can apply modified binary search to solve this. The bounds represent time. At each iteration, we get the middle time. If the number of products I can make in mid time is less than $t$, then I will need more time, so we set $low = \text{{mid}} + 1$.
- If the number of products is greater than or equal to $t$, then I should try to check if it's possible to make the same number of products in an even lesser time.
- At each step, check for integer overflows.


```cpp:
signed main()
{ 
    int n, m;
    cin >> n >> m;
 
    vector<int> machines(n, 0);
    for (int i = 0; i < n; i++)
        cin >> machines[i];
    int low = 1;
    int high = 1e18;
    int ans = 1e18;
    while (low < high)
    {
        int mid = low + (high - low) / 2;
        int products = 0;
        for (int i = 0; i < n; i++){
            int x = min(mid / machines[i], (int)1e18);
            if (x+products<1e18) products+=x;
        }
        if (products >= m)
        {
            high = mid;
            ans = min(ans, mid);
        }
        else
        {
            low = mid + 1;
        }
    }
    cout << ans << endl;
    return 0;
}
```

<br>

___

# Tasks and Deadlines

Link: [https://cses.fi/problemset/task/1630/](https://cses.fi/problemset/task/1630/)

You have to process $n$ tasks. Each task has a duration and a deadline, and you will process the tasks in some order one after another. Your reward for a task is $d-f$ where $d$ is its deadline and $f$ is your finishing time. (The starting time is 0, and you have to process all tasks even if a task would yield negative reward.)
What is your maximum reward if you act optimally?

Solution:
- The optimal strategy in this case is to process the tasks in ascending order of their duration.
- Proof by Exchange Arguments:
  - Suppose the Shortest Processing Time (SPT) algorithm processes the tasks in the order A, B, C, ..., N, where the tasks are indexed in the order they are processed. The completion times for these tasks are $t(A)$, $t(B)$, $t(C)$, ..., $t(N)$, respectively.
  - Now, let's consider an optimal ordering of the tasks that yields a higher reward than the SPT algorithm. In this optimal ordering, let's say there are two adjacent tasks, X and Y, such that X is processed before Y, but Y has a shorter processing time than X. Therefore, X comes before Y in the optimal ordering.
  - If we swap the positions of X and Y in the ordering, we create a new ordering where Y is processed before X. Let's analyze the effect of this swap on the total reward.
  - Before the swap:
    - Reward(X) = $d(X) - t(X)$ [Reward for task X]
    - Reward(Y) = $d(Y) - t(Y)$ [Reward for task Y]
  - After the swap:
    - Reward(X') = $d(X) - t(Y)$ [Reward for task X after the swap]
    - Reward(Y') = $d(Y) - t(X)$ [Reward for task Y after the swap]
  - Since we assumed that the optimal ordering yields a higher reward, we have:
    - $Reward(X') + Reward(Y') > Reward(X) + Reward(Y)$
  - Substituting the expressions, we get:
    - $d(X) - t(Y) + d(Y) - t(X) > d(X) - t(X) + d(Y) - t(Y)$
  - Simplifying the inequality:
    - $d(X) - t(Y) + d(Y) - t(X) > d(X) + d(Y) - t(X) - t(Y)$
  - Rearranging the terms:
    - $t(X) - t(Y) > - t(X) - t(Y)$
  - We can observe that all the terms on both sides of the inequality cancel out, leaving us with:
    - $0 > 0$
  - This is a contradiction because we have reached an inequality that is always false. Therefore, our initial assumption that an optimal ordering exists with a higher reward than the SPT algorithm is false.
  - Hence, we can conclude that the SPT algorithm is indeed optimal for maximizing the reward in this scenario, as proven by the exchange arguments.


```cpp:
int main()
{
    int n; cin>>n;
    vector< pair<int,int> > tasks;
    for(int i=0;i<n;i++){
        int a,b;
        cin>>a>>b;
        tasks.emplace_back(make_pair(a,b));
    }
    sort(tasks.begin(),tasks.end());
    int time = 0;
    int reward = 0;
    for(int i=0;i<n;i++){
        time+=tasks[i].first;
        reward+=tasks[i].second - time;
    }
    cout<<reward<<endl;
    return 0;
}
```

<br>

___

# *Reading Books

Link: [https://cses.fi/problemset/task/1631/](https://cses.fi/problemset/task/1631/)

There are $n$ books, and Kotivalo and Justiina are going to read them all. For each book, you know the time it takes to read it.
They both read each book from beginning to end, and they cannot read a book at the same time. What is the minimum total time required?

Solution:
- Let the largest time taken be $T$.
- Let the sum of all times be $S$.
- The minimum time taken will be $\min(2 \times T, S)$.

Proof:
1. Case 1: $T \geq S/2$
    - If the largest time taken, $T$, is greater than or equal to half the sum of all times, $S/2$, then it would be more efficient for Kotivalo and Justiina to read the books individually rather than simultaneously. In this case, the minimum total time required would be $S$, as both Kotivalo and Justiina can read the books one after the other without overlapping.

2. Case 2: $T < S/2$
    - If the largest time taken, $T$, is less than half the sum of all times, $S/2$, then it is more efficient for Kotivalo and Justiina to read the books simultaneously. In this case, the minimum total time required would be $2 \times T$ because both of them can start reading the two longest books simultaneously and then continue with the remaining books once they finish those.

By considering these two cases, we can see that the minimum time taken will be either $S$ or $2 \times T$, whichever is smaller. This is because if $T$ is greater than or equal to $S/2$, it is more efficient to read the books individually, resulting in a total time of $S$. On the other hand, if $T$ is less than $S/2$, it is more efficient to read the books simultaneously, resulting in a total time of $2 \times T$. Therefore, the minimum time taken can be calculated as $\min(2 \times T, S)$.


```cpp:
int main()
{
    int n;cin>>n;
    vector < int > books(n,0);
    ll sum = 0;
    ll largest_book=0;
    for(int i=0;i<n;i++){
        cin>>books[i];
        sum+=books[i];
        largest_book=max(largest_book,(ll)books[i]);
    }
    cout<<max(2*largest_book,sum);
    return 0;
}
```

<br>

___

# Sum of Three Values

Link: [https://cses.fi/problemset/task/1641](https://cses.fi/problemset/task/1641)

You are given an array of $n$ integers, and your task is to find three values (at distinct positions) whose sum is $x$.

Solution:
- We can fix the first element, then the problem becomes finding the sum of 2 values for the remaining part of the array.

```cpp:
int main()
{
    int n;ll x;
    cin>>n>>x;
    vector< pair<ll,int> > a(n);
    for(int i=0;i<n;i++){
        cin>>a[i].first;
        a[i].second=i+1;
    }
    sort(a.begin(),a.end());
    for(int i=0;i<n;i++){
        ll x2 = x-a[i].first;
        for(int j=i+1,k=n-1;j<k;j++){
            while (a[j].first+a[k].first>x2) k--;
            if(j<k && a[j].first+a[k].first==x2){
                cout<<a[i].second<<" "<<a[j].second<<" "<<a[k].second;
                return 0;
            }
        }
    }
    cout<<"IMPOSSIBLE";
    return 0;
}
```

<br>

___

# Sum of Four Values

Link: [https://cses.fi/problemset/task/1642/](https://cses.fi/problemset/task/1642/)

You are given an array of $n$ integers, and your task is to find four values (at distinct positions) whose sum is $x$.

Solution:
- Store the sum of pairs in a dictionary/map and check if there are two pairs whose sum is $x$ optimally.

```cpp:
int main()
{
    int n,x;
    cin>>n>>x;
    vector<int> values(n);
    for (int i = 0; i < n; i++){
        cin>>values[i];
    }
    map<int,pair<int,int>>v2p;
    for(int i=0;i<n;i++){
        for(int j=i+1;j<n;j++){
            if (v2p.count(x-values[i]-values[j])){
                cout<<i+1<<" "<<j+1<<" "<<v2p[x-values[i]-values[j]].first+1<<" "<<v2p[x-values[i]-values[j]].second+1;
                return 0;
            }
        }
        for(int j=0;j<i;j++){
            v2p[values[i]+values[j]] = {i,j};
        }
    }
    cout<<"IMPOSSIBLE";
    return 0;
}
```

<br>

___

# Nearest Smaller Values

Link: [https://cses.fi/problemset/task/1645/](https://cses.fi/problemset/task/1645/)

Given an array of $n$ integers, your task is to find, for each array position, the nearest position to its left that has a smaller value.

Solution:
- This is a standard problem on the Stack data structure.
- Pop the stack until the top element is smaller than the current element, then push the position of the current element onto the stack.

```cpp:
int main()
{
    int n;
    cin>>n;
    vector<int> a(n,0);
    for(int i=0;i<n;i++) cin>>a[i];
    stack<int>s;
    s.push(1);
    cout<<0<<" ";
    for(int i=1;i<n;i++){
        while( !s.empty() && a[s.top()-1]>=a[i] ){
            s.pop();
        }
        int pos;
        if (s.empty()) pos=0;
        else pos=s.top();
        cout<<pos<<" ";
        s.push(i+1);
    }
    return 0;
}
```

<br>

___

# Subarray Sums I

Link: [https://cses.fi/problemset/task/1660/](https://cses.fi/problemset/task/1660/)

Given an array of $n$ positive integers, your task is to count the number of subarrays that have a sum of $x$.

Solution:
- We can solve it using two pointers and a sliding window approach.
- Since all the elements in the array are greater than 0, we can use two pointers. Shifting the right pointer by 1 will only increase the sum, and shifting the left pointer will always decrease the sum of the window.

```cpp:
int main()
{
    int n,x;
    cin>>n>>x;
    vector<int> a(n,0);
    for(int i=0;i<n;i++) cin>>a[i];
    int window_sum = 0;
    int l = 0;
    int ans = 0;
    for(int r=0;r<n;r++){
        window_sum+=a[r];
        while(l<r && window_sum>x){
            window_sum-=a[l];
            l++;
        }
        if (window_sum==x){
            ans++;
        }
    }
    cout<<ans<<endl;
    return 0;
}
```

# Subarray Sums II

Link: [https://cses.fi/problemset/task/1661/](https://cses.fi/problemset/task/1661/)

Given an array of $n$ integers, your task is to count the number of subarrays that have a sum of $x$.

Solution:
- The only difference between this problem and the previous problem is that we can have negative numbers in the array.
- Remember that we can find the sum of a subarray using prefix sums with the formula:
    - $\text{Sum}(A[i:j]) = \text{prefix\_sum}(A[j]) - \text{prefix\_sum}(A[i-1])$
- Using this, we can store the prefix sums in a map and calculate our answer.

```cpp:
signed main()
{
    int n, x;
    cin >> n >> x;
    vector<int> a(n, 0);
    for (int i = 0; i < n; i++)
        cin >> a[i];
    unordered_map<int, int> seen_prefix_sum;
    int prefix_sum = 0;
    seen_prefix_sum[prefix_sum] = 1;
    int ans = 0;
    for (int i = 0; i < n; i++)
    {
        prefix_sum += a[i];
        int y = prefix_sum - x;
        ans += seen_prefix_sum[y];
        seen_prefix_sum[prefix_sum]++;
    }
    cout << ans << endl;

    return 0;
}
```

<br>

___

# Subarray Divisibility

Link: https://cses.fi/problemset/task/1662/

Given an array of n integers, your task is to count the number of subarrays where the sum of values is divisible by n.

Solution:

```cpp:
signed main()
{
    int n;
    cin >> n;
    vector<int> a(n, 0);
    for (int i = 0; i < n; i++)
        cin >> a[i];
    map<long long, int> seen_prefix_sum;
    int prefix_sum = 0;
    seen_prefix_sum[prefix_sum]++;
    int ans = 0;
    for (int i = 0; i < n; i++)
    {
        prefix_sum = (prefix_sum+a[i])%n;
        if (prefix_sum<0) prefix_sum+=n;
        ans+= seen_prefix_sum[prefix_sum];
        seen_prefix_sum[prefix_sum]++;
    }
    cout << ans << endl;

    return 0;
}
```

<br>

___

# Subarray Distinct Values

Link: https://cses.fi/problemset/task/2428

Given an array of n integers, your task is to calculate the number of subarrays that have at most k distinct values.

Solution:
```cpp:
int main()
{
    int n,k; cin>>n>>k;
    vector<int> values(n);
    for(int i=0;i<n;i++) cin>>values[i];
    ll ans=0;
    map<int,int> seen;
    int j=0;
    for(int i=0;i<n;i++){
        while(j<n && ( (int)seen.size()<k || seen.count(values[j])>0 )){
            seen[values[j]]++;
            j++;
        }
        ans+=j-i;
        seen[values[i]]--;
        if (seen[values[i]]==0){
            seen.erase(values[i]);
        }
    }
    cout<<ans;
    return 0;
}
```

<br>

___

# Array Division

Link: https://cses.fi/problemset/task/1085

You are given an array containing n positive integers.
Your task is to divide the array into k subarrays so that the maximum sum in a subarray is as small as possible.

Solution:

```cpp:
int main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    int n;cin>>n;
    int k;cin>>k;
    vector < int > values(n,0);
    int maxValue = 0;
    for (int i = 0; i < n; i++)
    {
        cin>>values[i];
        maxValue = max(maxValue,values[i]);
    }
    ll low = maxValue;
    ll high = 1e18;
    ll maximumSum = 1e18;
    while(low<=high){
        ll mid = (low+high)/2;
        int blocks = 1;
        ll sum=0;
        for (int i = 0; i < n; i++)
        {
            if (sum+values[i]>mid){
                sum=0;
                blocks++;
            }
            sum+=values[i];
        }
        if (blocks>k){
            low = mid+1;
        }
        else{
            if (mid<maximumSum){
                maximumSum=mid;
            }
            high =mid-1;
        }
    }
    cout<<maximumSum;
    
 
    return 0;
}
```

<br>

___

# Sliding Median

Link: [https://cses.fi/problemset/task/1076/](https://cses.fi/problemset/task/1076/)

You are given an array of $n$ integers. Your task is to calculate the median of each window of $k$ elements, from left to right.
The median is the middle element when the elements are sorted. If the number of elements is even, there are two possible medians, and we assume that the median is the smaller of them.

Solution:
- One possible way is to use two heaps.
- Another approach is to use policy-based data structures like ordered_set, which allow insertion and deletion in $O(\log n)$ time complexity to simulate the process.
- We can also use 2 multisets.
- Another approach is to use fenwick tree to stimulate the ordred set.


```cpp:
#include<bits/stdc++.h>
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
using namespace __gnu_pbds;
using namespace std;
template<class T> using ordered_set =tree<T, null_type, less<T>, rb_tree_tag,tree_order_statistics_node_update> ;
signed main(){
    ordered_set < pair<int,int> > s;
    int n,k;
    cin>>n>>k;
    vector<int> nums(n,0);
    for(int i=0;i<n;i++) cin>>nums[i];
    for(int i=0;i<k;i++)
    {
        s.insert({nums[i],i});
    }
    cout<<(s.find_by_order((k-1)/2)->first)<<" ";
    int j=0;
    for(int i=k;i<n;i++)
    {
        s.erase({nums[j],j});
        s.insert({nums[i],i});
        cout<<(s.find_by_order((k-1)/2)->first)<<" ";
        cout<<val<<" ";
        j++;
    }
    return 0;
}
```

OR

```
void insert(int val, multiset<int>&low, multiset<int>&high,int &k){
    int a = *low.rbegin(); // current median
    if (a<val){
        high.insert(val);
        if (high.size()>k/2){
            low.insert(*high.begin());
            high.erase(high.find(*high.begin()));
        }
    } else {
        low.insert(val);
        if (low.size()>(k+1)/2){
            high.insert(*low.rbegin());
            low.erase(low.find(*low.rbegin()));
        }
    }
 
}
void erase(int val, multiset<int>&low, multiset<int>&high){
	if (high.find(val) != high.end()) high.erase(high.find(val));
	else low.erase(low.find(val));
	if (low.empty()) {
		low.insert(*high.begin());
		high.erase(high.find(*high.begin()));
	}
}
 
signed main()
{ 
    multiset<int>low,high;
    int n,k;
    cin>>n>>k;
    vector < int > a(n,0);
    for (int i = 0; i < n; i++) cin>>a[i];
    low.insert(a[0]);
    for (int i = 1; i < k; i++) insert(a[i],low,high,k);
    cout<<*low.rbegin()<<" ";
    for (int i = k; i < n; i++) {
        if (k==1){
            insert(a[i],low,high,k);
            erase(a[i-1],low,high);
        }
        else{
            erase(a[i-k],low,high);
            insert(a[i],low,high,k);
        }
        cout<<*low.rbegin()<<" ";
    }
    cout<<endl;
 
    return 0;
}
```

<br>

___


# Sliding Cost

Link: https://cses.fi/problemset/task/1077

You are given an array of n integers. Your task is to calculate for each window of k elements, from left to right, the minimum total cost of making all elements equal.
You can increase or decrease each element with cost x where x is the difference between the new and the original value. The total cost is the sum of such costs.

Solution:

- This problem is an extension of the previous problem.
- Idea is to use 2 multisets for lower k/2 and upper k/2 elements.
- We know that we have to change all the elements to the median of the window.
- Hence we must find the sum distances of all the elements from the median.
- we'll split the elements in the window into two groups and calculate the cost.
- The smallest $K/2$ elements in the window will be in the lower group while the largest $K/2$ elements in the window will be in the upper group.

- The cost of the window can be expressed as a function of $K,S_1,S_2$, and $M$, where $S_1$ and $S_2$ denote the sum of elements in the lower and upper group respectively, and $M$ denotes the median of the window. 
- The cost of the lower group will be $\sum_{i=1}^{K/2} M-e_i$, and the cost of the upper group will be $\sum_{i=1}^{K/2} e_i-M$, where $e$ represents an element in the group. 
- These expressions can be simplified to $M\times K/2 - S_1$ and $S_2 - M\times K/2$.
- The total cost of the window is the sum of the costs contributed by both groups, or $S_2-S_1$.

```cpp:
void insert(int val, multiset<int>&low, multiset<int>&high,int &k,int &sum_high,int &sum_low){
    int a = *low.rbegin(); // current median
    if (a<val){
        high.insert(val);
        sum_high+=val;
        if (high.size()>k/2){
            sum_low+=*high.begin();
            sum_high-=*high.begin();
            low.insert(*high.begin());
            high.erase(high.find(*high.begin()));
        }
    } else {
        low.insert(val);
        sum_low+=val;
        if (low.size()>(k+1)/2){
            sum_low-= *low.rbegin();
            sum_high+= *low.rbegin();
            high.insert(*low.rbegin());
            low.erase(low.find(*low.rbegin()));
        }
    }

}

void erase(int val, multiset<int>&low, multiset<int>&high,int &sum_high,int &sum_low){
	if (high.find(val) != high.end()) {high.erase(high.find(val)); sum_high-=val;}
	else {low.erase(low.find(val)); sum_low-=val;}
	if (low.empty()) {
        sum_high-=*high.begin();
        sum_low+=*high.begin();
		low.insert(*high.begin());
		high.erase(high.find(*high.begin()));
	}
}

int med(int &k,multiset<int> &low){
    return (k % 2 == 0) ? 0 : (*low.rbegin());
}

signed main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);

    multiset<int>low,high;
    int n,k,sum_low=0,sum_high=0;
    cin>>n>>k;
    vector < int > a(n,0);
    for (int i = 0; i < n; i++) cin>>a[i];
    low.insert(a[0]);
    sum_low+=a[0];
    for (int i = 1; i < k; i++) insert(a[i],low,high,k,sum_high,sum_low);
    cout<<sum_high-sum_low+med(k,low)<<" ";
    for (int i = k; i < n; i++) {
        if (k==1){
            insert(a[i],low,high,k,sum_high,sum_low);
            erase(a[i-1],low,high,sum_high,sum_low);
        }
        else{
            erase(a[i-k],low,high,sum_high,sum_low);
            insert(a[i],low,high,k,sum_high,sum_low);
        }
       cout<<sum_high-sum_low+med(k,low)<<" ";
    }
    cout<<endl;

    return 0;
}
```

<br>

___


# Movie Festival II

Link: https://cses.fi/problemset/task/1629

In a movie festival n movies will be shown. You know the starting and ending time of each movie. What is the maximum number of movies you can watch entirely?

Solution:
- Just like in the problem Movie Festival, end time matters, so we will sort all the intervals by end time.
- We can use a multiset or priority queue to get the closest member who is not watching a movie currently and assign it.

```cpp
signed main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);

    int n,k;
    cin>>n>>k;
    vector < pair<int,int >  > v;
    for (int i = 0; i < n; i++) {
        int startTime,endTime; cin>>startTime>>endTime;
        v.push_back(make_pair(endTime,startTime));
    }
    sort(v.begin(),v.end());
    int ans = 0;
    multiset<int> endTimes;
    multiset<int>::iterator it;

    for (int i = 0; i < k; i++) endTimes.insert(0);

    for (int i = 0; i < n; i++) {
        it = endTimes.upper_bound(v[i].second);
        if (it==endTimes.begin()) continue;
        endTimes.erase(prev(it));
        endTimes.insert(v[i].first);
        ans++;
    }
    cout<<ans;

    return 0;
}
```

<br>

___


# Maximum Subarray Sum II

Link: https://cses.fi/problemset/task/1644

Given an array of n integers, your task is to find the maximum sum of values in a contiguous subarray with length between a and b.

Solution:
- Notice that we are trying to maximize $\textrm{prefixSum}[i] - \textrm{prefixSum}[j]$. 
- Since $j$ is guaranteed to be within the window $[i-b,i]$, we can construct a sliding window of size b, and compute $ \max_{A\le i \le B}(\textrm{prefixSum}[i]-\textrm{prefixSum}[j])$.

```cpp:
signed main()
{
    int n,a,b;
    cin>>n>>a>>b;

    vector < int > prefix_sum(n+1);
	for (int i = 1; i <= n; i++) {
		int a; cin >> a;
		prefix_sum[i] = a + prefix_sum[i - 1];
	} 

    int ans = -1e18;
    multiset<int> prefixes;

    for (int i = a; i <= n; i++) {
        if (i>b){
            prefixes.erase(prefixes.find(prefix_sum[i-b-1]));
        }
        prefixes.insert(prefix_sum[i-a]);
        ans = max(ans,prefix_sum[i]-*prefixes.begin());
    }
    cout<<ans;
    return 0;
}
```

<br>

___

<br>
<br>
Thanks for Reading.
<br>
<br>