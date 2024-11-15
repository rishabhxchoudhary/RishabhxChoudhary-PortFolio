---
title: "Operating Systems Notes for Interviews"
date: "8 July 2023"
category: "CP & Interviews"
tags: ['Operating Systems']
about: "This blog provides short notes on operating systems, covering various topics such as types of operating systems, CPU scheduling algorithms, process synchronization, deadlock, memory management, paging, and disk scheduling."
---

# Primary Goals
- Convenience 
- User Friendliness

# Secondary Goal
- Efficiency

## Features of Operating Systems
- Process management
- Memory management
- I/O management
- File Systems
- Network Management
- Security and Protection

# Types of Operating Systems

## Batch Operating Systems
- 

## Multiprogramming Operating Systems
- Maximize CPU utilization
- Multiprocessing means having more than one process in main memory
- Processes generally require both I/O time and CPU time
- CPU is never idle unless there is no process ready to execute

Advantages:
- High CPU utilization
- Less waiting time and response time
- Useful when the load is high

Disadvantages:
- Difficult scheduling
- Main memory management is required
- Memory fragmentation occurs
- Paging (non-contiguous memory allocation) is used

## Multitasking/Multiprogramming Operating Systems
- Multitasking is multiprogramming with time sharing
- Only one CPU is available but it switches between processes so quickly that it gives the illusion that all processes are executed at the same time
- The main idea is to provide better response time and execute multiple processes together

CPU Bound Process: A process that requires most of the CPU time

I/O Bound Process: A process that requires most of the time from I/O devices

## CPU Scheduling

Non-preemptive approach:
- Priority does not matter. When a process completes its execution, the next process in the ready queue is selected to run

Preemptive Approach:
- When a new process with a higher priority arrives, the running process is preempted and put into a waiting state

Burst Time/Execution Time/Running Time: The time required for a process to run on the CPU

Waiting Time: The time spent by a process in the ready state, waiting for the CPU

Arrival Time: The time when a process enters the ready state

Exit Time: The time when a process completes execution and exits the system

Turnaround Time: The total time spent by a process in the system

# Algorithms for CPU Scheduling

Criteria: Average Waiting Time, Average Response Time, CPU Utilization, Throughput

## First Come First Serve (FCFS)
- Assigns the CPU to the process that arrives first
- Easy to understand and implement
- Always non-preemptive in nature
- High average waiting time
- Should not be used for interactive systems
- Convoy but not starvation effect occurs

Convoy Effect: Smaller processes have to wait for a longer time for bigger processes to release the CPU

Starvation: When the CPU is biased toward a process, other processes may starve for CPU resources

## Shortest Job First (Non-preemptive) / Shortest Remaining Time First (Preemptive)

- Out of all the available processes, the CPU is assigned to the process with the smallest burst time requirement (no priority, no seniority)
- If there is a tie, FCFS is used
- SRTF (preemptive) is also called optimal as it guarantees minimal average time

## Priority Algorithms
- Can be both preemptive and non-preemptive
- If the priority is the same, FCFS is used
- Provides a facility of priority, especially for system processes
- Allows running important processes first, even if they are user processes
- Processes with lower priority may starve for the CPU
- No idea of response time or waiting time
- Aging technique involves gradually increasing the priority of processes that wait for a longer time

## Round Robin Algorithm
- A circular queue is used
- Used for time-sharing systems
- Time division multiplexing
- Provides the best average response time
- Time quantum is fixed

# Process Synchronization

Problems: 
- Resource Sharing
- Race Condition
- Critical Section 

## Critical Section Problems
- Mutual Exclusion
- Progress
- Bounded Wait

## Semaphores
- A semaphore is an integer variable that, apart from initialization, is accessed only through two standard operations: wait and signal
- Solves the Critical Section Problem
- Solves the resource management problem
- Solves the order deciding problem

## Producer-Consumer Problem
- The producer produces data, and the consumer consumes data. Both the producer and the consumer are processes
- When the producer produces, it tries to store the data in a buffer. It should check for the overflow condition
- The consumer should check for the underflow condition
- Both conditions must not occur simultaneously
- Semaphores solve this problem

## Reader-Writer Problem
- More than one reader can enter
- More than one writer process must not enter simultaneously
- Two semaphores can solve this problem

## Dining Philosopher Problem
- Five philosophers are sitting at a round table. There are five chopsticks on the table and one bowl of rice
- When a philosopher thinks, they do not eat
- Two chopsticks are required to eat the rice
- From time to time, a philosopher gets hungry and tries to pick up the two chopsticks between their left and right
- A philosopher cannot take a chopstick that is already in someone else's hand

Solution using Semaphores:
```c
void Philosophers(void)
{
    while(1)
    {
        Thinking();
        wait(chopstick[i]);
        wait(chopstick([i+1]%5));
        Eat();
        signal(chopstick[i]);
        signal(chopstick([i+1]%5));
    }
}
```
In this solution, there is a deadlock when all the philosophers are hungry at the same time.

Possible Solutions: 

We can reverse the order of picking the chopsticks for the last philosopher.

# Deadlock

- In a multiprogramming system, a number of processes compete for a limited number of resources.
- If a resource is not available at that instance, the process enters a waiting state.
- If a process remains in a waiting state for an infinite time, a deadlock occurs.

## System Model
- Every process will request resources.
- If allocated, the process will use the resources.
- Processes must release the resources after use.

## Conditions for Deadlock
1. Mutual Exclusion: At least one resource must be held in a non-shareable mode.
2. Hold & Wait: A process holds at least one resource and is waiting for additional resources that are held by other processes.
3. No Preemption: Resources cannot be forcibly taken away from a process; they must be released voluntarily.
4. Circular Wait: A circular chain of two or more processes exists, where each process is waiting for a resource held by the next process in the chain.

## Deadlock Handling Methods

1. Prevention
    - Design a system that avoids at least one of the deadlock conditions, ensuring that deadlocks cannot occur.
2. Avoidance
    - The system uses resource allocation algorithms that dynamically decide whether a resource request should be granted or denied to avoid a possible deadlock.
3. Detection and Recovery
    - The system periodically checks for the occurrence of a deadlock and, if detected, takes appropriate actions to recover from it.
4. Ignorance
    - The system ignores the deadlock problem and assumes that deadlocks will never occur (not recommended).

### Prevention
- Preventing deadlocks by eliminating one or more of the necessary conditions is the most effective approach.
- For example, if mutual exclusion is not required, resources can be made shareable.
- However, this approach is often not feasible as it may limit the functionality or efficiency of the system.

### Avoidance
- Avoidance algorithms dynamically analyze the resource allocation state to determine if a resource request should be granted or denied.
- The system uses various resource allocation strategies and algorithms, such as the Banker's Algorithm, to avoid potential deadlocks.
- The key idea is to ensure that the system remains in a safe state, where it can allocate resources to all processes without leading to a deadlock.

### Detection and Recovery
- Deadlock detection involves periodically examining the state of the system to identify the presence of a deadlock.
- Once a deadlock is detected, recovery actions are taken to break the deadlock and release the resources held by the processes involved.
- Common recovery strategies include resource preemption, process termination, and resource rollback.

### Ignorance
- Ignoring the deadlock problem is not a recommended approach, as deadlocks can lead to system instability, resource wastage, and poor performance.

It's important to understand and handle deadlocks properly in operating systems to ensure the smooth execution of processes and efficient resource utilization.

# Memory Management

In an operating system, memory management is responsible for efficiently allocating and managing memory resources. Here are some key concepts related to memory management:

## Hierarchy of Memory
1. CPU
2. Cache
3. Main Memory (RAM)
4. Secondary Memory (Disk, SSD)

## Memory Fragmentation
Memory fragmentation occurs when memory is allocated and deallocated, resulting in unused memory blocks. There are two types of fragmentation:

1. Contiguous Memory Fragmentation:
   - Fast memory allocation
   - Suffers from external fragmentation, where free memory blocks are scattered throughout the system

2. Non-Contiguous Memory Fragmentation:
   - Slower memory allocation
   - Independent from external fragmentation

## Contiguous Memory Allocation
Contiguous memory allocation involves dividing the main memory into fixed-size or variable-size partitions. Some commonly used algorithms for contiguous memory allocation include:

- First Fit: Allocates the first free memory block that is large enough to accommodate the process
- Best Fit: Allocates the smallest free memory block that is large enough to accommodate the process
- Worst Fit: Allocates the largest free memory block available, leaving behind larger fragments

# Paging
Paging is a memory management scheme that allows non-contiguous memory allocation. Here are some key points about paging:

- Secondary memory is divided into partitions of equal size, known as pages.
- Main memory (RAM) is divided into equal-size partitions, known as frames.
- A page table is used to map logical addresses (pages) to physical addresses (frames).
- Paging suffers from internal fragmentation, where a page may contain more instructions than needed, resulting in wasted memory.

## Translation Lookaside Buffer (TLB)
The Translation Lookaside Buffer (TLB) is a cache that stores recently accessed page table entries. It improves the efficiency of address translation. Here are some important details about TLB:

- TLB is a small, fast-lookup cache located between the CPU and the main memory.
- TLB stores recently accessed page table entries, reducing the number of memory accesses required for address translation.
- It has a high hit ratio (above 90%), resulting in faster memory access.
- When a new process starts, the TLB is flushed.

# Disk Scheduling
Disk scheduling is an important aspect of operating systems, as it determines the order in which disk I/O requests are served. Here are some popular disk scheduling algorithms:

1. First Come First Serve (FCFS):
   - I/O requests are served in the order they arrive.
   - Simple and easy to understand, but can lead to poor performance due to the "SSTF" (shortest seek time first) problem.

2. Shortest Seek Time First (SSTF):
   - The request with the shortest seek time (distance between the current disk head position and the requested track) is served first.
   - Improves the average response time compared to FCFS, but may lead to starvation for some requests.

3. Scan Algorithm:
   - Also known as the elevator algorithm.
   - The disk head moves in a single direction, serving requests along the way until it reaches the end of the disk.
   - Then, it reverses direction and serves requests in the opposite direction.
   - Provides a fair servicing of requests but may result in delayed response time for some requests.

4. Look Algorithm:
   - Similar to the scan algorithm, but the disk head reverses direction without reaching the end of the disk.
   - Eliminates unnecessary movement of the disk head, resulting in better performance compared to the scan algorithm.

5. C-Look:
   - Similar to the look algorithm, but the disk head only moves in one direction.
   - When it reaches the end, it immediately returns to the beginning without serving any remaining requests.
   - Provides better response time compared to the scan algorithm.

Effective disk scheduling can significantly improve the overall performance of the system by reducing the average seek time and minimizing I/O bottlenecks.