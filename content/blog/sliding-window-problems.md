---
title: "Mastering Crucial Problems on Sliding Window for Interviews"
date: "27 May 2023"
excerpt: "Explore the essential challenges of sliding window methodologies in this comprehensive blog. Gain valuable insights into the complexities involved and discover effective strategies for overcoming obstacles in data processing. Enhance your understanding of sliding window techniques, equipping yourself with the knowledge needed to tackle these critical problems with confidence during interviews and competitive programming challenges."
slug: "sliding-window-problems"
categories: ["CP & Interviews"]
tags: ['Interviews','Sliding Window']
---

# 1. Maximum Sum Subarray of Size K
Given an array of integers and a positive integer k, find the maximum sum of any contiguous subarray of size k in $0(n+k)$.

Required Time Complexity: $O(n)$.

Algorithm: 
1. Initialize two variables, windowSum and maxSum, to 0.
2. Iterate from index 0 to k-1 and calculate the sum of the first k elements in the array. Assign this sum to windowSum.
3. Assign the value of windowSum to maxSum.
4. Iterate from index k to the end of the array.
    * Add the current element to windowSum and subtract the element at index (current index - k) from windowSum. This step effectively slides the window by one position to the right.
    * Update maxSum if windowSum is greater than maxSum.
5. After the loop, maxSum will contain the maximum sum of any contiguous subarray of size k.
6. Return maxSum

```Python:
def max_sum_subarray(arr, k):
    windowSum = sum(arr[:k])  
    maxSum = windowSum
    for i in range(k, len(arr)):
        windowSum += arr[i] - arr[i - k]
        maxSum = max(maxSum, windowSum)
    return maxSum
```

<br>

___

# 2. Longest Substring Without Repeating Characters: 
Given a string, find the length of the longest substring without repeating characters.

Required Time Complexity: $O(n)$.

Algorithm:

1. Initialize two pointers, start and end, to point to the start and end of the current window.
2. Initialize a variable maxLen to 0 to keep track of the maximum length of the substring.
3. Initialize an empty set, seen, to keep track of the unique characters seen so far.
4. Iterate the end pointer from 0 to the end of the string.
    * If the character at the end pointer is not in the seen set, it's a new character.
        * Add the character to the seen set.
        * Calculate the current length of the substring as (end - start + 1).
        * Update maxLen if the current length is greater than maxLen.
    * If the character at the end pointer is already in the seen set, it's a repeating character.
        * Move the start pointer to the right until the repeating character is no longer in the current window.
        * Remove the characters encountered in the process from the seen set.
5. After the loop, maxLen will contain the length of the longest substring without repeating characters.
6. Return maxLen

```Python:
# Using Set 
def longest_substring_without_repeating_chars(s):
    start = 0
    maxLen = 0
    seen = set()

    for end in range(len(s)):
        if s[end] not in seen:
            seen.add(s[end])
            maxLen = max(maxLen, end - start + 1)
        else:
            while s[end] in seen:
                seen.remove(s[start])
                start += 1
            seen.add(s[end])
    return maxLen

# Using HashMap
def longest_substring_without_repeating_chars(s):
    start = 0
    maxLen = 0
    charDict = {}
    for end in range(len(s)):
        if s[end] in charDict:
            start = max(start, charDict[s[end]] + 1)
        charDict[s[end]] = end
        maxLen = max(maxLen, end - start + 1)
    return maxLen
```

<br>

___

# 3. Longest Substring with At Least K Repeating Characters
Given a string s and an integer k, return the length of the longest substring of s such that the frequency of each character in this substring is greater than or equal to k.

Required Time Complexity: $O(n)$.

Alogithm:
1. If all the characters in the string appear atlease K times, then answer will be the whole string.
2. Otherwise we will have to split the string where these character appear (that appear less than k times) and try to calculae max length in these split substrings.

```Python:
def count_substring(s, k):
    if len(s) == 0 or len(s) < k:
        return 0
    if k == 0:
        return len(s)
    count = {}
    for end in range(len(s)):
        if s[end] in count:
            count[s[end]] += 1
        else:
            count[s[end]] = 1
    for c in count:
        if count[c] < k:
            return max(count_substring(t, k) for t in s.split(c))
    return len(s)
```

<br>

___

# 4. Longest Substring with At Most st K Repeating Characters
Given a string s and an integer k, return the length of the longest substring of s such that the frequency of each character in this substring is greater than or equal to k.

Required Time Complexity: $O(n)$.

Algorithm:
1. Initialize two pointers, left and right, to track the current substring.
2. Initialize a frequency map, freq, to keep track of the frequency of characters in the current substring.
3. Initialize variables maxLen and uniqueCount to keep track of the length of the longest valid substring and the number of unique characters in the current substring, respectively. Set them both to 0.
4. Iterate over the string using the right pointer, and for each character encountered:
    * Increment its frequency in the freq map.
    * If the frequency of the character becomes 1 (indicating it was not present in the current substring), increment uniqueCount.
    * If uniqueCount exceeds k, it means we have more than k unique characters in the current substring. In this case, we need to move the left pointer to maintain the validity of the substring.
    * Decrement the frequency of the character at left in the freq map.
    * If the frequency becomes 0 (indicating it was the only occurrence of that character in the current substring), decrement uniqueCount.
    * Move the left pointer one step to the right.
    * Calculate the length of the current substring as right - left + 1.
    * If the current length is greater than maxLen, update maxLen.
    * Move the right pointer one step to the right.
5. After the loop, return maxLen as the result.

```Python:
def count_substring(s, k):
    left = maxLen = uniqueCount = 0
    freq = {}
    for right in range(len(s)):
        freq[s[right]] = freq.get(s[right], 0) + 1
        if freq[s[right]] == 1:
            uniqueCount += 1
        if uniqueCount > k:
            freq[s[left]] -= 1
            if freq[s[left]] == 0:
                uniqueCount -= 1
            left += 1
        currLen = right - left + 1
        maxLen = max(maxLen, currLen)
    return maxLen
```

<br>

___

# 5. Longest Substring with K Repeating Characters
Given a string you need to print the size of the longest possible substring that has exactly K unique characters.

Required Time Complexity: $O(n)$.

Algorithm:
1. Initialize two pointers, left and right, to the beginning of the string.
2. Initialize a dictionary or a hash map to keep track of the count of each character in the current window.
3. Initialize a variable max_length to store the maximum length found so far.
4. While the right pointer is less than the length of the string:
    * Increment the count of the character at the right pointer in the dictionary.
    * If the number of distinct characters in the dictionary is greater than K, move the left pointer to the right until the number of distinct characters becomes K.
    * Update max_length if the length of the current window (right - left + 1) is greater than max_length and all characters in the window occur at least K times.
    * Move the right pointer to the right.
5. Return max_length as the result.

```Python:
def count_substring(s, k):
    max_length = 0
    left = 0
    char_count = {}
    for right in range(len(s)):
        char_count[s[right]] = char_count.get(s[right], 0) + 1
        while len(char_count) > k:
            char_count[s[left]] -= 1
            if char_count[s[left]] == 0:
                del char_count[s[left]]
            left += 1
        if len(char_count) == k:
            max_length = max(max_length, right - left + 1)
    return max_length
```

<br>

___

# 6. Minimum Window Substring 
Given two strings s and t of lengths m and n respectively, return the minimum window 
substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

Required Time Complexity: $O(n^{2}) + O(2m)$ where $n$ is length of s and $m$ is length of t.

Algorithm:
1. Create two dictionaries or hash maps: target and window. The target dictionary will store the count of each character in string t, while the window dictionary will keep track of the count of characters in the current window.
2. Initialize two pointers, left and right, to the beginning of the string s. Also, initialize variables formed = 0 and required to length of target. The formed variable keeps track of the number of unique characters of s formed in the current window, and required represents the total number of unique characters in t.
3. Iterate the right pointer over the string s until it reaches the end.
    * Increment the count of the current character in the window dictionary.
    * If the count of the current character in the window dictionary is equal to its count in the target dictionary, increment the formed variable.
4. Once the formed variable is equal to required, it means we have found a window containing all the characters of t. Now, we need to minimize the window size while still maintaining the condition.
    * While the count of the character at the left pointer in the window dictionary is greater than its count in the target dictionary or it doesn't exist in the target dictionary, we can shrink the window by moving the left pointer.
    * Calculate the current window size and update the minimum window size and corresponding substring if necessary.
    * Decrement the count of the character at the left pointer in the window dictionary and decrement the formed variable if it was a required character.
    * Move the left pointer one step to the right.
5. Repeat steps 3 and 4 until the right pointer reaches the end of the string s.
6. If a valid window was found, return the minimum window substring; otherwise, return an empty string.

```Python:
from collections import defaultdict
def count_substring(s, t):
    target = defaultdict(int)
    window = defaultdict(int)
    for char in t:
        target[char] += 1
    required = len(target)
    left = right = 0
    formed = 0
    min_len = float('inf')
    min_substr = ''
    while right < len(s):
        char = s[right]
        window[char] += 1
        if char in target and window[char] == target[char]:
            formed += 1
        while formed == required and left <= right:
            char = s[left]
            if right - left + 1 < min_len:
                min_len = right - left + 1
                min_substr = s[left:right+1]
            window[char] -= 1
            if char in target and window[char] < target[char]:
                formed -= 1
            left += 1
        right += 1
    return min_substr
```

<br>

___

# 7. Sliding Window Maximum
You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.
```
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

Required Time Complexity: $O(n)$.

Algorithm:
1. Initialize an empty deque and a results array to store the maximum values.
2. Iterate through the input array nums from left to right:
    * While the deque is not empty and the current element is greater than or equal to the element at the back of the deque, remove the back element from the deque since it cannot be the maximum anymore (it is either smaller or outside the window).
    * Add the index of the current element to the back of the deque.
    * If the index at the front of the deque is outside the window (i.e., it is i - k), remove it from the front since it is no longer in the window.
    * If the current index is greater than or equal to k - 1 (which means the first window has been formed), add the maximum element (the element at the front of the deque) to the results array.
3. Return the results array containing the maximum sliding window values.

```Python:
def max_window(nums,k):
    results = []
    window = deque()
    for i in range(len(nums)):
        while window and nums[i] >= nums[window[-1]]:
            window.pop()
        window.append(i)
        if window[0] <= i - k:
            window.popleft()
        if i >= k - 1:
            results.append(nums[window[0]])
    return results
```

<br>

___

# 8. Longest Repeating Character Replacement: 
Given a string that consists of only uppercase English letters, you can replace any letter in the string with another letter at most k times. Find the length of a longest substring containing repeating letters you can get.

Required Time Complexity: $O(n)$.

Algorithm:

1. Initialize variables:
    * Set two pointers, left and right, to the start of the string.
    * Initialize a frequency map to track the count of each character in the current window.
    * Set the maxFrequency variable to keep track of the maximum frequency of any character in the current window.
    * Initialize the maxLength variable to 0, which will store the length of the longest substring.
2. Slide the window:
    * Increment the right pointer to expand the window by one character.
    * Update the frequency of the newly added character in the frequency map.
    * Update the maxFrequency if the frequency of the newly added character is higher.
    * Check if the number of replacements required (window size - maxFrequency) is greater than k.
        * If it is, move the left pointer to shrink the window and maintain the number of replacements within the allowed limit.
        * Decrement the frequency of the character being removed from the window.
    * Update the maxLength if the current window's length is longer than the previous maxLength.
3. Repeat step 2 until the right pointer reaches the end of the string.
4. Return the maxLength as the result.
```Python:
def characterReplacement(s, k):
    left = 0
    maxFrequency = 0
    maxLength = 0
    frequency = [0] * 26
    for right in range(len(s)):
        frequency[ord(s[right]) - ord('A')] += 1
        maxFrequency = max(maxFrequency, frequency[ord(s[right]) - ord('A')])
        if (right - left + 1 - maxFrequency) > k:
            frequency[ord(s[left]) - ord('A')] -= 1
            left += 1
        maxLength = max(maxLength, right - left + 1)
    return maxLength
```

<br>

___

# 9. Find All Anagrams in a String: 
Given two strings, one being a pattern and the other a text, find all occurrences of the pattern in the text as an anagram.

Required Time Complexity: $O(n)$.

Algorithm:
1. Create a frequency dictionary for the pattern string. Iterate through the pattern and count the occurrences of each character, storing them in a dictionary.
2. Initialize two pointers, left and right, to represent the window boundaries. Set them to the start of the text.
3. Create a frequency dictionary for the current window by iterating through the text from the left pointer to the right pointer and counting the occurrences of each character in the window.
4. Compare the frequency dictionaries of the pattern and the current window. If they are equal, it means the window contains an anagram of the pattern. Store the starting index of the window.
5. Slide the window to the right by moving the right pointer. Increase the frequency of the current character in the window's frequency dictionary.
6. If the window size is greater than the pattern's length, slide the window to the left by moving the left pointer. Decrease the frequency of the character that is being removed from the window and remove it from the frequency dictionary if its count reaches zero.
7. Repeat steps 4 to 6 until the right pointer reaches the end of the text.
8. Return the list of starting indices where anagrams of the pattern were found.

```Python:
from collections import Counter

def find_anagrams(pattern, text):
    pattern_freq = Counter(pattern)
    window_freq = Counter(text[:len(pattern)])
    anagram_indices = []
    left = 0
    right = len(pattern) - 1
    while right < len(text):
        if pattern_freq == window_freq:
            anagram_indices.append(left)

        window_freq[text[left]] -= 1
        if window_freq[text[left]] == 0:
            del window_freq[text[left]]
        left += 1
        right += 1
        if right < len(text):
            window_freq[text[right]] += 1
    return anagram_indices
```

<br>

___

# 10. Permutation in String: 
Given two strings s1 and s2, write a function to check if s2 contains the permutation of s1.

Required Time Complexity: $O(n)$.

Algorithm:
1. Initialize two frequency arrays: count_s1 and count_s2, both of size 26 (assuming only lowercase letters are considered). These arrays will store the frequencies of characters in s1 and a sliding window of s2, respectively.
2. Iterate over the characters of s1 and s2 up to the length of s1 and update the frequency arrays accordingly. Increment the count for the character in s1 and decrement the count for the character in the current window of s2.
3. Define two pointers, left and right, initially pointing to the start of s2 (index 0). These pointers will create a sliding window of the same length as s1 within s2.
4. Slide the window by moving the right pointer to the right until it reaches the end of s2. At each step, update the frequency arrays by incrementing the count for the character at the right pointer and decrementing the count for the character at the left pointer. This effectively maintains the frequencies of characters within the sliding window.
5. Check if the frequency arrays are equal at each step. If the arrays are equal, it means the current window of s2 contains a permutation of s1. Return True.
6. After the loop ends, return False since no permutation of s1 was found within s2

```Python:
def checkInclusion(s1, s2):
    if len(s1) > len(s2):
        return False
    count_s1 = [0] * 26
    count_s2 = [0] * 26
    for i in range(len(s1)):
        count_s1[ord(s1[i]) - ord('a')] += 1
        count_s2[ord(s2[i]) - ord('a')] += 1
    left, right = 0, len(s1)
    while right < len(s2):
        if count_s1 == count_s2:
            return True
        count_s2[ord(s2[left]) - ord('a')] -= 1
        count_s2[ord(s2[right]) - ord('a')] += 1
        left += 1
        right += 1
    if count_s1 == count_s2:
        return True
    return False

```
<br>

___


<footer>
<br>
Thanks for Reading.
<br>
<br>
</footer>