---
title: "Analysis of Popular Sorting Algorithms"
date: "4 November 2023"
category: "CP & Interviews"
tags: ['Bubble Sort','Quick Sort','Insertion Sort','Selection Sort','Merge Sort','Radix Sort','Count Sort','Bucket Sort','Shell Sorting','DNF Sort','Pancake Sort','Tim Sort']
about: "Explore the most efficient Sorting Algorithms for Competitive Programming and Interviews. Learn about Bubble Sort, Quick Sort, Insertion Sort, Selection Sort, Merge Sort, Radix Sort, Count Sort, Bucket Sort, Shell Sorting, DNF Sort, Pancake Sort, and Tim Sort. Master the art of sorting with our in-depth guide."
---

# Bubble Sorting

Bubble sort is a comparison-based sorting algorithm that repeatedly steps through the list to be sorted, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, indicating that the list is sorted.

1. Start at the beginning of the list.
2. Compare the first two elements. If the first element is greater than the second element, swap them.
3. Move to the next pair of elements (i.e., the second and third elements) and repeat the comparison and swap process.
4. Continue this process, comparing and swapping adjacent elements, until you reach the end of the list.
5. After the first pass, the largest element will "bubble" to the end of the list.
6. Repeat the process, excluding the last element since it's already in its correct position, and continue for the remaining unsorted elements.
7. Continue this process for all elements, gradually sorting the list from the beginning to the end.
8. The algorithm terminates when no swaps are needed during a pass, indicating that the list is fully sorted.

Time Complexity: $O(N^2)$

Space Complexity: $O(1)$

``` CPP:
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        // Last i elements are already in place, so no need to compare them
        for (int j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements and swap them if they are in the wrong order
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
```

___

# Insertion sort

Insertion sort is a comparison-based sorting algorithm that builds the final sorted array one item at a time. It repeatedly takes an element from the unsorted part and inserts it into its correct position in the sorted part of the array.

1. Start with the first element in the array, considering it as a sorted portion.
2. Move to the next element (the first element of the unsorted portion) and compare it to the elements in the sorted portion.
3. Insert the element into the correct position within the sorted portion by shifting the larger elements to the right.
4. Repeat steps 2 and 3 until all elements are sorted.

## Time Complexity
- Best Case: $O(n)$ - This occurs when the input array is already sorted.
- Average Case: $O(n^2)$
- Worst Case: $O(n^2)$ - This occurs when the input array is sorted in reverse order.

## Space Complexity: $O(1)$

```CPP:
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        // Move elements of arr[0..i-1] that are greater than key
        // to one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }
}
```

___

# Selection Sort

Selection sort is a comparison-based sorting algorithm that divides the input array into two parts: a sorted part and an unsorted part. The algorithm repeatedly selects the smallest (or largest, depending on the sorting order) element from the unsorted part and moves it to its correct position in the sorted part.

1. Start with the entire array, considering it as the unsorted part.
2. Find the minimum (or maximum) element from the unsorted part.
3. Swap the found minimum (or maximum) element with the first element of the unsorted part.
4. Increment the index of the sorted part and reduce the size of the unsorted part.
5. Repeat steps 2-4 until the entire array is sorted.


## Time Complexity:
- Best Case: $O(n^2)$
- Average Case: $O(n^2)$
- Worst Case: $O(n^2)$

## Space Complexity: $O(1)$

```CPP:
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        // Find the minimum element in the unsorted part of the array
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap the minimum element with the current element
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}
```

___

# Quick Sort

Quick sort is a comparison-based sorting algorithm that employs a divide-and-conquer strategy. It selects a 'pivot' element from the array and partitions the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then recursively sorted.

1. Choose a pivot element from the array. The choice of the pivot can affect the efficiency of the algorithm.
2. Partition the array into two sub-arrays: elements less than the pivot and elements greater than the pivot.
3. Recursively apply quick sort to the two sub-arrays.
4. Combine the sorted sub-arrays and the pivot to obtain the final sorted array.


## Time Complexity:
- Best Case: $O(n log n)$ - This occurs when the pivot choice consistently splits the array into roughly equal halves.
- Average Case: $O(n log n)$
- Worst Case: $O(n^2)$ - This occurs when the pivot choice is consistently poor, such as choosing the smallest or largest element as the pivot.


```cpp:
int partition(int arr[], int low, int high) {
    int pivot = arr[high]; // Choose the last element as the pivot
    int i = (low - 1);     // Index of the smaller element

    for (int j = low; j < high; j++) {
        // If the current element is smaller than or equal to the pivot
        if (arr[j] <= pivot) {
            i++;
            // Swap arr[i] and arr[j]
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    // Swap arr[i+1] and arr[high] (pivot)
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    return i + 1;
}

// Function to perform Quick Sort
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        // Find the pivot element such that
        // element smaller than pivot are on the left
        // and elements greater than pivot are on the right
        int pivotIndex = partition(arr, low, high);

        // Recursively sort the elements before and after the pivot
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

// Run quickSort(arr,0,n-1);

```

___

# Heap Sort 

Heap sort is a comparison-based sorting algorithm that uses a binary heap data structure. A binary heap is a complete binary tree in which every parent node is less (in a max-heap) or greater (in a min-heap) than its children. The heap property ensures that the largest (in a max-heap) or smallest (in a min-heap) element is always at the root.

1. Build a Heap: Create a binary heap from the input array by repeatedly adding elements to the heap and ensuring the heap property is maintained.
2. Sort the Heap: Remove elements from the heap one by one. In a max-heap, the largest element is removed and placed at the end of the array. In a min-heap, the smallest element is removed and placed at the end.
3. Heapify: After each removal, restore the heap property by performing a "heapify" operation on the remaining elements.
4. Repeat: Repeat steps 2 and 3 until all elements have been removed from the heap and placed in their correct sorted order.

## Time Complexity:

Best Case: $O(n log n)$
Average Case: $O(n log n)$
Worst Case: $O(n log n)$

## Space Complexity: O(1) 

```cpp:
void heapify(vector<int>& arr, int n, int i) {
    int largest = i; // Initialize the largest as the root
    int left = 2 * i + 1; // Left child
    int right = 2 * i + 2; // Right child

    // If the left child is larger than the root
    if (left < n && arr[left] > arr[largest])
        largest = left;

    // If the right child is larger than the largest so far
    if (right < n && arr[right] > arr[largest])
        largest = right;

    // If the largest is not the root
    if (largest != i) {
        swap(arr[i], arr[largest]);

        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}

// Main function to perform Heap Sort
void heapSort(vector<int>& arr) {
    int n = arr.size();

    // Build a max heap
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    // Extract elements one by one from the heap
    for (int i = n - 1; i >= 0; i--) {
        swap(arr[0], arr[i]); // Move the current root to the end
        heapify(arr, i, 0); // Call max heapify on the reduced heap
    }
}
```

___

# Merge Sort

Merge sort is a comparison-based sorting algorithm that divides the input array into two halves, recursively sorts these halves, and then merges them to create a single sorted array. The key concept behind merge sort is the "divide and conquer" approach.

1. Divide the unsorted array into two equal halves.
2. Recursively sort each of the two halves using the merge sort algorithm.
3. Merge the two sorted halves back into a single sorted array.
4. Repeat steps 1-3 until the entire array is sorted.

## Time Complexity:
- Best Case: $O(n log n)$
- Average Case: $O(n log n)$
- Worst Case: $O(n log n)$

## Space Complexity: $O(n)$

```CPP:
// Merge two sorted subarrays into a single sorted subarray
void merge(vector<int>& arr, int left, int middle, int right) {
    int n1 = middle - left + 1;
    int n2 = right - middle;

    // Create temporary arrays to hold the data
    vector<int> L(n1);
    vector<int> R(n2);

    // Copy data to temporary arrays L[] and R[]
    for (int i = 0; i < n1; i++) {
        L[i] = arr[left + i];
    }
    for (int j = 0; j < n2; j++) {
        R[j] = arr[middle + 1 + j];
    }

    // Merge the two subarrays back into the original array
    int i = 0; // Index for the left subarray
    int j = 0; // Index for the right subarray
    int k = left; // Index for the merged subarray

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of L[], if any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy the remaining elements of R[], if any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

// Main merge sort function
void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int middle = left + (right - left) / 2;

        // Sort the first and second halves
        mergeSort(arr, left, middle);
        mergeSort(arr, middle + 1, right);

        // Merge the sorted halves
        merge(arr, left, middle, right);
    }
}
```

___

# Tim Sort

Tim Sort is a hybrid sorting algorithm that combines the principles of Merge Sort and Insertion Sort. It was designed to address the challenges posed by sorting arrays of various sizes efficiently. Tim Sort gets its name from its creator, Tim Peters, who developed it for the Python programming language.


1. Divide into Runs: The input array is divided into small "runs" or subsequences of elements. These runs are identified in a way that each run is either non-decreasing or non-increasing.
2. Sort Each Run: Each run is sorted individually using Insertion Sort. Insertion Sort is chosen because it performs well on small lists, and runs are typically short.
3. Merge Runs: The sorted runs are then merged together using a modified merge operation similar to the one used in Merge Sort. This merging step creates larger runs that are still in sorted order.
4. Repeat Merging: The merging step is repeated until the entire array is sorted. During this process, Tim Sort combines and sorts runs to create larger and larger sorted segments.

## Time Complexity:
- Best Case: $O(n)$
- Average Case: $O(n log n)$ 
- Worst Case: $O(n log n)$ 

## Space Complexity: $O(n)$

```Python:
def insertion_sort(arr, left, right):
    for i in range(left + 1, right + 1):
        key_item = arr[i]
        j = i - 1
        while j >= left and arr[j] > key_item:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key_item

def merge(arr, l, m, r):
    len1, len2 = m - l + 1, r - m
    left, right = [], []

    for i in range(0, len1):
        left.append(arr[l + i])
    for i in range(0, len2):
        right.append(arr[m + 1 + i])

    i, j, k = 0, 0, l

    while i < len1 and j < len2:
        if left[i] <= right[j]:
            arr[k] = left[i]
            i += 1
        else:
            arr[k] = right[j]
            j += 1
        k += 1

    while i < len1:
        arr[k] = left[i]
        i += 1
        k += 1

    while j < len2:
        arr[k] = right[j]
        j += 1
        k += 1

def timsort(arr):
    min_run = 32

    n = len(arr)

    for start in range(0, n, min_run):
        end = min((start + min_run - 1), (n - 1))
        insertion_sort(arr, start, end)

    size = min_run
    while size < n:
        for start in range(0, n, size * 2):
            mid = min((n - 1), (start + size - 1))
            end = min((n - 1), (start + size * 2 - 1))
            if mid < end:
                merge(arr, start, mid, end)
        size *= 2

```

___

# Counting Sort

Counting sort is a non-comparative integer sorting algorithm that works by determining the count of elements with distinct key values and using this information to place each element in its correct sorted position. It's highly efficient when sorting a small range of non-negative integers.
1. Counting: First, it counts the occurrences of each unique element in the input array and stores this count in a frequency array.
2. Cumulative Counting: Then, it calculates the cumulative sum of counts in the frequency array. This cumulative sum represents the position of each element in the sorted array.
3. Sorting: Finally, counting sort builds the sorted array by placing each element in its correct position based on the cumulative count and then decrementing the count in the frequency array.

## Time Complexity:
- Best Case: $O(n + k)$ - When k is relatively small (k is the range of input values).
- Average Case: $O(n + k)$
- Worst Case: $O(n + k)$

## Space Complexity: $O(n + k)$

```cpp:
void countingSort(vector<int>& arr) {
    int max_value = *max_element(arr.begin(), arr.end()); // Find the maximum value in the input array
    int min_value = *min_element(arr.begin(), arr.end()); // Find the minimum value in the input array

    int range = max_value - min_value + 1; // Calculate the range of input values

    // Create a frequency array to store the count of each unique element
    vector<int> frequency(range, 0);

    // Count the occurrences of each unique element in the input array
    for (int i = 0; i < arr.size(); i++) {
        frequency[arr[i] - min_value]++;
    }

    int index = 0; // Index for the sorted array

    // Reconstruct the sorted array from the frequency array
    for (int i = 0; i < range; i++) {
        while (frequency[i] > 0) {
            arr[index] = i + min_value;
            index++;
            frequency[i]--;
        }
    }
}
```

___

# Bucket Sorting

Bucket sort is a distribution-based sorting algorithm. It works by dividing the input into a finite number of "buckets" and then sorting the elements within each bucket. After that, the sorted buckets are concatenated to produce the final sorted array.

1. Determine the Number of Buckets: Determine the number of buckets you want to use. This should be a reasonable value based on the distribution of the input data.
2. Partition Elements: Divide the elements into their respective buckets based on their values. Each element is assigned to a specific bucket based on its value and the range covered by each bucket.
3. Sort Each Bucket: Sort each individual bucket. You can use any sorting algorithm, such as insertion sort or quicksort, to sort the elements within each bucket.
4. Concatenate Buckets: Combine all the sorted buckets into a single sorted array.

## Time Complexity:
- Best Case: $O(n + n^2/k + k)$ - When elements are uniformly distributed and each bucket contains approximately the same number of elements.
- Average Case: $O(n + n^2/k + k)$ - In practice, bucket sort performs well with an appropriate choice of the number of buckets.
- Worst Case: $O(n^2)$ - This occurs when all elements are placed in the same bucket, leading to quadratic time complexity. However, this is rare with a proper choice of buckets.

## Space Complexity: $O(n + k)$

```cpp:
// Function to perform bucket sort
void bucketSort(vector<float>& arr) {
    int n = arr.size();

    // Create an array of empty buckets
    vector<vector<float>> buckets(n);

    // Place elements in their respective buckets
    for (int i = 0; i < n; i++) {
        int bucketIndex = n * arr[i];
        buckets[bucketIndex].push_back(arr[i]);
    }

    // Sort each bucket (e.g., using insertion sort)
    for (int i = 0; i < n; i++) {
        sort(buckets[i].begin(), buckets[i].end());
    }

    // Concatenate the sorted buckets to form the final sorted array
    int index = 0;
    for (int i = 0; i < n; i++) {
        for (float value : buckets[i]) {
            arr[index] = value;
            index++;
        }
    }
}
```

___

# Radix Sorting

Radix sort is a non-comparative sorting algorithm that processes data by taking a look at the individual digits of each number in the dataset. It sorts numbers based on the values of their digits, starting from the least significant digit (LSD) to the most significant digit (MSD). The term "radix" refers to the base of the number system, typically binary (base-2), decimal (base-10), or hexadecimal (base-16).

1. Determine the Number of Digits: Find the number of digits in the maximum number in the dataset. This information will be used to iterate through the numbers.
2. Bucket Sort: Create ten buckets (0 to 9) to store numbers based on the least significant digit (LSD). Place each number into the appropriate bucket based on the value of the LSD.
3. Combine Buckets: Combine the buckets back into a single array, preserving the order in which they were placed in the buckets.
4. Repeat for Each Digit: Repeat steps 2 and 3 for each digit position, moving from LSD to MSD.
5. Result: After processing all digits, the numbers will be sorted.

## Time Complexity:
- Best Case: $O(nk)$
- Average Case: $O(nk)$
- Worst Case: $O(nk)$

## Space Complexity: $O(n)$

```cpp:
// Function to find the maximum element in an array
int findMax(vector<int>& arr) {
    int max = arr[0];
    for (int i = 1; i < arr.size(); i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// Function to perform counting sort based on a specific digit (e.g., 1s place, 10s place)
void countingSortByDigit(vector<int>& arr, int exp) {
    int n = arr.size();
    vector<int> output(n, 0);
    vector<int> count(10, 0);

    // Count the occurrences of each digit in the current place value
    for (int i = 0; i < n; i++) {
        count[(arr[i] / exp) % 10]++;
    }

    // Calculate the cumulative count of the digits
    for (int i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array by placing elements in the correct position
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }

    // Copy the sorted elements back to the original array
    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

// Radix Sort function
void radixSort(vector<int>& arr) {
    int max = findMax(arr);

    // Perform counting sort for each place value (1s, 10s, 100s, ...)
    for (int exp = 1; max / exp > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
}
```

___

# Shell Sorting

Shell sort is an in-place, non-comparative sorting algorithm that improves upon the insertion sort by allowing elements to move in gaps greater than one position at a time. It's named after its inventor, Donald Shell, who introduced the concept of diminishing increment gaps to speed up the sorting process.

1. Determine Increment Gaps: Select a sequence of increment gaps, which are used to divide the array into smaller subarrays.
2. Sort Subarrays: Sort the subarrays created by applying the increment gaps. Typically, insertion sort is used for this step.
3. Repeat: Decrease the size of the increment gaps and repeat the process until the gaps become 1.
4. Final Pass: Perform one more pass with a gap of 1, which is essentially a regular insertion sort.

## Time Complexity:
- Best Case: $O(n log n)$ - This occurs when the data is almost sorted, and the increment gaps are well chosen.
- Average Case: Depends on the sequence of increment gaps used. Knuth's sequence (n/3, n/9, n/27, ...) is often used and shows good performance.
- Worst Case: Depends on the sequence of increment gaps used. The worst-case time complexity is still a matter of research, but it's typically between O(n^1.25) and O(n^2).

## Space Complexity: O(1) 

```cpp:
// Function to perform Shell Sort
void shellSort(vector<int>& arr) {
    int n = arr.size();

    // Start with a large gap and reduce it in each pass
    for (int gap = n / 2; gap > 0; gap /= 2) {
        // Perform insertion sort for the elements at the current gap
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;

            // Move elements that are greater than the current element to the right
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }

            // Place the current element in its correct position
            arr[j] = temp;
        }
    }
}
```

___

# Pancake Sorting

Pancake sorting is a sorting algorithm that models the act of sorting a stack of pancakes. The algorithm sorts a disordered stack of pancakes by using a spatula to perform a sequence of flips. Each flip rearranges a portion of the stack, with the goal of achieving a fully sorted stack.

1. Iterate Over the Stack: Starting with the entire stack of pancakes, iterate through the stack from top to bottom.
2. Select a Flip Point: At each iteration, select a position in the stack where the spatula should be inserted to flip the remaining portion of the stack.
3. Flip the Stack: Use the spatula to flip the portion of the stack from the top to the selected flip point.
4. Repeat: Continue iterating, selecting flip points, and flipping the stack until the stack is sorted, meaning the largest pancake is at the bottom and the smallest is at the top.

Pancake sorting is a unique algorithm, but it's not the most efficient one for large datasets. The primary interest in pancake sorting lies in its simplicity and curiosity value.

## Time Complexity:
- Best Case: $O(n)$ - This occurs when the input stack is already sorted.
- Average Case: $O(n^2)$ - In the average case, it requires quadratic time to sort the stack.
- Worst Case: $O(n^2)$ - The worst-case time complexity also involves quadratic time.

## Space Complexity: $O(1)$

```cpp:
// Function to flip the first k elements of the array
void flip(vector<int>& arr, int k) {
    int i = 0;
    while (i < k - i) {
        swap(arr[i], arr[k - i]);
        i++;
    }
}

// Function to find the index of the maximum element in the array
int findMaxIndex(vector<int>& arr, int n) {
    int maxIndex = 0;
    for (int i = 1; i < n; i++) {
        if (arr[i] > arr[maxIndex]) {
            maxIndex = i;
        }
    }
    return maxIndex;
}

// Function to perform Pancake Sort
void pancakeSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int size = n; size > 1; size--) {
        int maxIndex = findMaxIndex(arr, size);
        
        if (maxIndex != size - 1) {
            // Flip the stack to move the maximum element to the top
            flip(arr, maxIndex);
            
            // Flip the stack to move the maximum element to its correct position
            flip(arr, size - 1);
        }
    }
}

```

___

# DNF Sorting

DNF sorting is a sorting algorithm that was designed to solve the Dutch National Flag problem. The Dutch National Flag problem is a partitioning problem in which elements are divided into three categories, typically represented by three colors: red, white, and blue. The goal is to rearrange the elements so that all the red elements come before the white elements, which in turn come before the blue elements.

1. Choose Pivot Elements: Select two pivot elements, one for the red category and one for the blue category. These pivot elements define the boundaries between the red, white, and blue regions.
2. Three-Partition Algorithm: Use a three-way partitioning algorithm to rearrange the elements into three categories:
3. All elements less than the red pivot are placed in the red category.
4. All elements greater than the blue pivot are placed in the blue category.
5. Elements between the red and blue pivots are placed in the white category.
6. Repeat: Continue to choose pivot elements and perform the three-way partitioning until all elements are sorted.

## Time Complexity : $O(n)$

## Space Complexity: $O(1)$

```cpp:
// Function to perform Dutch National Flag Sorting
void dnfSort(vector<char>& arr) {
    int n = arr.size();

    // Initialize pivot elements (red and blue)
    char red = 'R';
    char blue = 'B';

    int low = 0;        // Index for the white category
    int high = n - 1;   // Index for the unprocessed region

    int i = 0;

    while (i <= high) {
        if (arr[i] == red) {
            swap(arr[i], arr[low]);
            i++;
            low++;
        } else if (arr[i] == blue) {
            swap(arr[i], arr[high]);
            high--;
        } else {
            i++;
        }
    }
}

```
___

<footer>
<br>
Thanks for Reading.
<br>
<br>
</footer>