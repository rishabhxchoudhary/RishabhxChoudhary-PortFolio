---
title: "Crucial Problems on Modified Binary Search for Technical Interviews"
date: "28 May 2023"
category: "CP & Interviews"
tags: ['Interviews','Binary Search']
about: "Discover important problems related to Modified Binary Search that commonly arise in technical interviews. Binary Search is a vital algorithm utilized for efficient searching of a target element in a sorted array. This blog delves into key problem variations, effective strategies, and potential pitfalls, equipping aspiring tech interviewees with essential knowledge to confidently tackle Binary Search challenges."
---

# 1. Kth Smallest Element in a Sorted Matrix
Given an n x n matrix where each of the rows and columns is sorted in ascending order, return the kth smallest element in the matrix. Note that it is the kth smallest element in the sorted order, not the kth distinct element. 

* It can be solved by using Heaps in $O(K log N)$
* The binary search approach has a time complexity of $O(N log(max - min))$, where N is the total number of elements in the matrix, and max and min are the maximum and minimum values in the matrix, respectively.
* This approach is suitable when the value of K is relatively large compared to the size of the matrix. It works well when you need to find the Kth smallest element where K is close to or greater than the total number of elements in the matrix.
* The binary search approach does not require additional space beyond the input matrix.

Algorithm:
1. Define the range of possible values for the binary search. The smallest element in the matrix will be at matrix[0][0], and the largest 2. element will be at matrix[n-1][n-1], where n is the number of rows (assuming a square matrix).
2. Perform binary search on the range. Set the low and high values as the smallest and largest elements, respectively.
3. Calculate the mid value as the average of low and high: mid = (low + high) // 2.
4. Count the number of elements in the matrix that are less than or equal to the mid value. You can do this by traversing the matrix row by row and counting the elements until the current element is greater than the mid value.
5. Adjust the low or high value based on the count of elements:
    * If the count is less than K, update the low value to mid + 1 to search in the higher range.
    * If the count is greater than or equal to K, update the high value to mid to search in the lower range.
6. Repeat steps 3 to 5 until the low and high values converge (low > high).
7. At the end of the binary search, the low value will be the Kth smallest element.

```Python:
def kthSmallest(matrix, k):
    n = len(matrix)
    low = matrix[0][0]
    high = matrix[n-1][n-1]
    while low <= high:
        mid = (low + high) // 2
        count = 0
        j = n - 1
        for i in range(n):
            while j >= 0 and matrix[i][j] > mid:
                j -= 1
            count += j + 1
        
        if count < k:
            low = mid + 1
        else:
            high = mid - 1
    return low
```

<br>

___

# 2. Longest Increasing Subsequence in $O(NlogN)$
Given an integer array nums, return the length of the longest strictly increasing 
subsequence.

This is also called Patience Sorting algorithm.

Algorithm:
1. Create an array called "tails" of length n, where n is the length of the input sequence. Each element in "tails" will represent the smallest tail element of all increasing subsequences of a particular length. Initialize the first element of "tails" with the first element of the input sequence.
2. Iterate through the remaining elements of the input sequence, starting from the second element.
3. For each element, perform a binary search on the "tails" array to find the smallest element greater than or equal to the current element. If such an element is found, update it with the current element. Otherwise, append the current element to the "tails" array.
4. At the end of the iteration, the length of the "tails" array will be the length of the LIS. Return this length as the result.

```Python:
def lengthOfLIS(nums):
    n = len(nums)
    tails = [0] * n
    size = 0
    for x in nums:
        left, right = 0, size
        while left < right:
            mid = (left + right) // 2
            if tails[mid] < x:
                left = mid + 1
            else:
                right = mid
        tails[left] = x
        size = max(size, left + 1)
    return size
```

<br>

___

# 3. Find Peak Element in $O(logN)$
A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.

Algorithm:
1. Initialize two pointers, left and right, to the start and end indices of the input array.
2. While left is less than or equal to right, perform the following steps:
    * Calculate the mid index as mid = (left + right) / 2.
    * Check if the mid element is a peak by comparing it with its neighboring elements:
        * If the mid element is greater than both its previous and next elements, it is a peak. Return the mid index as the result.
        * If the mid element is smaller than its next element, there must be a peak on the right side. Update left = mid + 1 to search in the right half of the array.
        * If the mid element is smaller than its previous element, there must be a peak on the left side. Update right = mid - 1 to search in the left half of the array.
3. If no peak is found during the search, return -1 or any other suitable value to indicate that no peak element exists in the array.

```Python:
def find_peak_element(nums):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if (mid == 0 or nums[mid] > nums[mid - 1]) and (mid == len(nums) - 1 or nums[mid] > nums[mid + 1]):
            return mid
        elif mid < len(nums) - 1 and nums[mid] < nums[mid + 1]:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

<br>

___

# 4. Find First and Last Position of Element in Sorted Array
```
def searchRange(nums, target):
    first = -1
    last = -1
    # Find first occurrence
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            first = mid
            right = mid - 1
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    # Find last occurrence
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            last = mid
            left = mid + 1
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return [first, last]
```

<br>

___

# 5. Search in Rotated Sorted Array
Given a rotated sorted array, search for a target element. The array does not contain any duplicates.

Algorithm:
1. Initialize two pointers, left and right, to the start and end of the array respectively.
2. Perform a binary search while left <= right:
    * Calculate the middle index as mid = (left + right) // 2.
    * If the target value is found at the middle index, return mid.
    * Check if the subarray from left to mid is non-decreasing (sorted):
        * If it is sorted, check if the target value falls within the range nums[left] to nums[mid].
            * If the target is within this range, update right = mid - 1 to search in the left half of the array.
            * Otherwise, update left = mid + 1 to search in the right half of the array.
        * If it is not sorted, then the right half of the array is sorted. In this case, check if the target value falls within the range nums[mid+1] to nums[right].
            * If the target is within this range, update left = mid + 1 to search in the right half of the array.
            * Otherwise, update right = mid - 1 to search in the left half of the array.
3. If the target value is not found after the binary search loop, return -1 to indicate that it doesn't exist in the array.

```Python:
def search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        if nums[left] <= nums[mid]:
            if nums[left] <= target <= nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] <= target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1
```

<br>

___

# 6. Count of Smaller Numbers After Self in $O(N log N)$
Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].

This problem can be solved by Binary Search and Merge sort.
Both have time complexity $O(N log N)$ and Space complexity $O(n)$.
The merge sort approach is stable, meaning it preserves the relative order of elements with equal values. It ensures that elements with the same value are counted in the correct order. if stability is an important requirement, the merge sort approach is a better choice.

Algorithm:
1. Create a new array, result, to store the counts of smaller elements after each element in the input array.
2. Traverse the input array from right to left. For each element num at index i:
    * Perform a binary search on the sorted portion of the array to the right of num to find its correct position pos. This position represents the index where num should be inserted to maintain a sorted order.
    * The count of smaller numbers after num is equal to the number of elements that appear before pos in the sorted portion of the array. Update result[i] with this count.
    * Insert num at index pos in the sorted portion of the array.
3. Return the result array.

```Python:
def countSmaller(nums):
    result = [0] * len(nums)
    sorted_nums = []

    for i in range(len(nums) - 1, -1, -1):
        left, right = 0, len(sorted_nums)
        while left < right:
            mid = (left + right) // 2
            if sorted_nums[mid] >= nums[i]:
                right = mid
            else:
                left = mid + 1
        result[i] = left
        sorted_nums.insert(left, nums[i])

    return result
```

<br>

___

# 7. Median of Two Sorted Arrays
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

Time Complexity: $O(log ( min(m,n) ))$

Space Complexity: $O(1)$

Algorithm:
1. Ensure that the smaller array is chosen as the first input array. If the first array is larger, swap the arrays.
2. Perform a binary search on the smaller array.
3. Partition the two arrays into two parts at a certain position in the smaller array.
4. Calculate the partition positions in the two arrays based on the partition in the smaller array.
5. Determine if the partitioning is balanced:
    * If the combined length of the left partitions is equal to the combined length of the right partitions, it means the median has been found.
    * If not, adjust the partitioning based on the values at the partition positions.
6. Repeat steps 2 to 5 until the median is found or the search space is exhausted.

```Python:
def findMedianSortedArrays(nums1, nums2):
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    x = len(nums1)
    y = len(nums2)
    low = 0
    high = x
    while low <= high:
        partition_x = (low + high) // 2
        partition_y = (x + y + 1) // 2 - partition_x

        max_left_x = float('-inf') if partition_x == 0 else nums1[partition_x - 1]
        min_right_x = float('inf') if partition_x == x else nums1[partition_x]
        max_left_y = float('-inf') if partition_y == 0 else nums2[partition_y - 1]
        min_right_y = float('inf') if partition_y == y else nums2[partition_y]

        if max_left_x <= min_right_y and max_left_y <= min_right_x:
            if (x + y) % 2 == 0:
                return (max(max_left_x, max_left_y) + min(min_right_x, min_right_y)) / 2.0
            else:
                return max(max_left_x, max_left_y)
        elif max_left_x > min_right_y:
            high = partition_x - 1
        else:
            low = partition_x + 1
```

<br>

___

# 8. Find Minimum in Rotated Sorted Array
Suppose an array sorted in ascending order is rotated at some pivot unknown to you. Find the minimum element in logarithmic time complexity.

Approach:
1. Initialize two pointers, left and right, pointing to the start and end of the array, respectively.
2. While the value at left is greater than the value at right, perform the following steps:
    * Calculate the middle index as mid = (left + right) // 2.
    * If the value at mid is greater than the value at right, it means the minimum element lies to the right of mid. So, update left = mid + 1.
    * Otherwise, the minimum element lies to the left of mid or is equal to the value at mid. So, update right = mid.
3. When the while loop condition is no longer true, the minimum element will be at the left index.
4. Return the value at the left index, which is the minimum element in the rotated sorted array.
```Python:
def find_minimum(nums):
    left = 0
    right = len(nums) - 1

    while nums[left] > nums[right]:
        mid = (left + right) // 2

        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid

    return nums[left]
```
<br>

___

# 9. Search a 2D Matrix
Given a 2D matrix where each row and column are sorted, write an efficient algorithm to search for a target element.

Required Time Complexity: $O(m+n)$

Algorithm:
1. Start at the top-right corner of the matrix (or alternatively, the bottom-left corner).
2. Compare the current element with the target value:
    * If they are equal, return true since the target is found.
    * If the current element is greater than the target, move one column to the left.
    * If the current element is less than the target, move one row down.
3. Repeat step 2 until you either find the target or move outside the matrix boundaries.

The time complexity of $O(m + n)$ is the best time complexity achievable for this problem, considering that we need to examine at least one element from each row and column to determine the presence of the target.

```Python:
def searchMatrix(matrix, target):
    if not matrix or len(matrix[0]) == 0:
        return False

    rows, cols = len(matrix), len(matrix[0])
    row, col = 0, cols - 1

    while row < rows and col >= 0:
        if matrix[row][col] == target:
            return True
        elif matrix[row][col] > target:
            col -= 1
        else:
            row += 1

    return False
```

<br>

___


# 10. Find K Closest Elements
Given a sorted array, two integers k and x, find the k closest elements to x in the array.

Algorithm:
1. Initialize two pointers, "left" and "right," to the start and end of the array, respectively.
2. While the difference between the elements at the "left" and "right" pointers is greater than k:
* Calculate the absolute difference between x and the element at the "left" pointer and store it in a variable, "diffLeft."
* Calculate the absolute difference between x and the element at the "right" pointer and store it in a variable, "diffRight."
* If diffLeft is greater than diffRight, move the "left" pointer one step to the right.
* Otherwise, move the "right" pointer one step to the left.
3. At this point, the elements between the "left" and "right" pointers (inclusive) are the k closest elements to x. Return this subarray.

```Python:
def findClosestElements(arr, k, x):
    left = 0
    right = len(arr) - 1
    
    while right - left + 1 > k:
        diffLeft = abs(x - arr[left])
        diffRight = abs(x - arr[right])
        
        if diffLeft > diffRight:
            left += 1
        else:
            right -= 1
    
    return arr[left:right+1]
```
<br>

___

<br>

Thanks For Reading 

<br>
