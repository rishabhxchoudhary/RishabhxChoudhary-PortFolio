---
title: "Mastering Important Problems with the Two Pointer Approach"
date: "26 May 2023"
category: "CP & Interviews"
tags: ['Interviews','Two Pointers']
about: "Unlock the potential of the Two Pointer Approach with this comprehensive guide. Explore a curated selection of problems that harness the efficiency of this technique to solve a wide range of coding challenges. From basic tasks like finding pairs with a given sum to more complex problems like three-sum variants and array transformations, this guide offers real-world examples, detailed explanations, and comprehensive solutions. Sharpen your skills and gain confidence in tackling coding challenges by mastering the art of the Two Pointer Approach."
---

# 1. Check if a linked list is a Pallindrome
* Define two pointers, slow and fast, and initialize them to the head of the linked list.
* Use the fast pointer to reach the middle of the linked list. Move the fast pointer by two steps and the slow pointer by one step at a time until the fast pointer reaches the end of the list. This ensures that the slow pointer will be at the middle of the list when the fast pointer reaches the end.
* Reverse the second half of the linked list starting from the node pointed to by the slow pointer. This can be done by reversing the next pointers of the nodes.
* Reset the fast pointer to the head of the linked list, and move both pointers (fast and slow) one step at a time, comparing the values of the nodes they are pointing to. If at any point the values are not equal, the linked list is not a palindrome.
* If the pointers reach the end of the list without any unequal values, the linked list is a palindrome.
```CPP:
ListNode* reverseList(ListNode* head) {
    ListNode *cur = head, *prev=NULL,*nxt=NULL;
    while(cur!=NULL){
        nxt = cur->next;
        cur->next = prev;
        prev = cur;
        cur = nxt;
    }
    return prev;
}
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        ListNode *slow = head,*fast = head;
        if (head==NULL || head->next==NULL)
            return true;
        while (fast!=NULL && fast->next!=NULL){
            slow = slow->next;
            fast = fast->next->next;
        }
        slow = reverseList(slow);
        while(head!=NULL && slow!=NULL){
            if (slow->val!=head->val){
                return false;
            }
            slow = slow->next;
            head = head->next;
        }
        return true;
    }
};
```

<br>

___

# 2. Intersection of Two Linked Lists

* Initialize two pointers, ptr1 and ptr2, to the heads of the two linked lists, respectively.
* Traverse both linked lists simultaneously by moving the pointers ptr1 and ptr2 one node at a time.
    * If either pointer reaches the end of its respective linked list (i.e., becomes None), move that pointer to the head of the other linked list. This effectively allows the pointers to "catch up" with each other when they reach the end of their initial linked list.
    Continue moving the pointers until they either meet at an intersection point (i.e., the same node reference) or both reach the end of the linked lists (i.e., become None).
    * If the pointers meet at an intersection point, return that node. Otherwise, if both pointers become None, there is no intersection, and you can return None.

```CPP:
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        ListNode *a = headA, *b = headB;
        while(a!=b){
            if (a==NULL) a = headB;
            else a = a->next;
            if (b==NULL) b = headA;
            else b = b->next;
        }
        return a;
    }
};
```


<br>

___

# 3. Linked List Cycle Detection

Floyd's cycle-finding algorithm / Tortoise and Hare algorithm:

1. Initialize two pointers, slow and fast, to the head of the linked list.
2. Move the slow pointer by one step and the fast pointer by two steps at a time.
3. Check if the fast pointer or its next node becomes None. If it does, there is no cycle in the linked list, so return False.
4. If the slow and fast pointers meet (i.e., they point to the same node), it indicates the presence of a cycle in the linked list. Return True.
5. Repeat steps 2 to 4 until a cycle is detected or the end of the linked list is reached.

```CPP:
class Solution {
public:
    bool hasCycle(ListNode *head) {
        if(head==NULL || head->next==NULL) return false;
        ListNode *fast = head, *slow = head;
        while(fast!=NULL && fast->next!=NULL){
            fast = fast->next->next;
            slow = slow->next;
            if (fast==slow) return true;
        }
        return false;
    }
};
```

<br>

___

# 4. Container With Most Water

**Problem** : 

You are given an integer array height of length $n$. There are n vertical lines drawn such that the two endpoints of the $i^{th}$ line are $(i, 0)$ and $(i, height[i])$.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

**Algorithm**:
* Initialize two pointers, left and right, to the first and last indices of the array, respectively.
* Initialize a variable, maxArea, to store the maximum area encountered.
* While the left pointer is less than the right pointer:
* Calculate the current area using the formula: (right - left) * min(height[left], height[right]).
* Update maxArea if the current area is greater than maxArea.
* Move the pointer with the smaller height inward. If height[left] < height[right], move the left pointer one step to the right; otherwise, move the right pointer one step to the left.
* Return the maxArea as the result.

```Python:
def maxArea(self, height: List[int]) -> int:
    left = 0
    right = len(height) - 1
    maxArea = 0
    while left < right:
        currentArea = (right - left) * min(height[left], height[right])
        maxArea = max(maxArea, currentArea)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return maxArea
```

<br>

___


# 5. Find the Duplicate Number

**Problem :**
Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.

You must solve the problem without modifying the array nums and uses only constant extra space.

**Algorithm**
1. Initialize two pointers, slow and fast, to the first element of the array.
2. Move the slow pointer one step at a time and the fast pointer two steps at a time until they meet.
    * This step is similar to finding the cycle in a linked list using the Floyd's Tortoise and Hare algorithm.
3. Once the pointers meet, reset the slow pointer to the first element of the array and keep the fast pointer where it is.
4. Move both pointers one step at a time until they meet again.
    * At this point, both pointers will be at the duplicate number.
    * The duplicate number is the intersection point of the cycle in the array.

```Python:
def find_duplicate(nums):
    slow = nums[0]
    fast = nums[0]
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    return slow
```


<br>

___

# 6. Dutch National Flag ( DNF Sort ) Algorithm

**Problem:**: Sort an array consisting of 0, 1 and 2.

Algorithm:
1. Initialize two pointers, one pointing to the start of the array (left pointer) and another pointing to the end of the array (right pointer).
2. Initialize a third pointer (mid pointer) that starts at the beginning of the array.
3. Iterate while the mid pointer is less than or equal to the right pointer:
    * If the value at the mid pointer is 0, swap the values at the mid and left pointers, and increment both the mid and left pointers.
    * If the value at the mid pointer is 1, increment the mid pointer.
    * If the value at the mid pointer is 2, swap the values at the mid and right pointers, and decrement the right pointer.
4. Repeat step 3 until the mid pointer is greater than the right pointer.
5. The array will be sorted in place, with all the 0s at the beginning, followed by all the 1s, and then all the 2s.

```Python:
def DNF_Sort(arr):
    left = 0
    mid = 0
    right = len(arr) - 1
    while mid <= right:
        if arr[mid] == 0:
            arr[mid], arr[left] = arr[left], arr[mid]
            mid += 1
            left += 1
        elif arr[mid] == 1:
            mid += 1
        elif arr[mid] == 2:
            arr[mid], arr[right] = arr[right], arr[mid]
            right -= 1
    return arr
```

<br>

___

# 7. Remove Nth Node From End of List in One Pass

1. Initialize two pointers, first and second, both pointing to the head of the linked list.
2. Move the second pointer n steps forward, where n is the desired distance from the end of the list.
3. If the second pointer becomes None, it means that the node to be removed is the head of the list. In this case, update the head to head.next and return the new head.
4. Move both the first and second pointers simultaneously until the second pointer reaches the last node of the list.
5. Update the next pointer of the node pointed by first to skip the next node (the node to be removed).
6. Return the head of the linked list.

```Python:
def remove_nth_from_end(head, n):
    dummy = ListNode(0)
    dummy.next = head
    first = dummy
    second = dummy
    for _ in range(n):
        second = second.next
    if not second:
        return head.next
    while second.next:
        first = first.next
        second = second.next
    first.next = first.next.next
    return dummy.next
```

<br>

___

# 8. Rotate Array
Rotate an array right by k steps.

```Python
def rotate(nums,k):
    def reverse_array(nums, start, end):
        while start < end:
            nums[start], nums[end] = nums[end], nums[start]
            start += 1
            end -= 1
    n = len(nums)
    k %= n

    # Reverse the entire array
    reverse_array(nums, 0, n - 1)

    # Reverse the first k elements
    reverse_array(nums, 0, k - 1)

    # Reverse the remaining n - k elements
    reverse_array(nums, k, n - 1)
```

<br>

___

# 9. Trapping Rain Water
Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

```Python:
def trap(self, height):
    l = 0
    r = len(height)-1
    ans = 0
    left_max = height[l]
    right_max = height[r]
    while l<r:
        if left_max<right_max:
            l+=1
            lm = max(left_max,height[l])
            ans+= left_max - height[l]
        else:
            r-=1
            right_max = max(right_max,height[r])
            ans+= right_max - height[r]
    return ans
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