---
title: "Matrix Exponentiation for Competitive Programming — from Fibonacci to Wild Multistate Recurrences"
date: "25 May 2025"
category: "Competitive Programming"
tags: ['matrix exponentiation', 'linear recurrence', 'dynamic programming', 'algorithms', 'competitive programming', 'fast exponentiation', 'logarithmic time', 'modulo arithmetic']
about: "Unlock blazing-fast solutions for linear recurrences! This comprehensive guide breaks down matrix exponentiation from basic Fibonacci to complex multi-state and polynomial-term recurrences, with C++, Java, Python, Rust, and JavaScript examples for N up to 10^18."
---

# Matrix Exponentiation for Competitive Programming — from Fibonacci to Wild Multistate Recurrences

Hey there, future coding wizards! 👋 Ever found yourself waiting for your program to finish calculating the millionth Fibonacci number, counting the seconds (or minutes... 😬)? Today, we're going to learn a super-cool technique called **Matrix Exponentiation**. It's like a magical shortcut that can take calculations that would normally take ages (linear time, or $O(n)$) and do them in the blink of an eye (logarithmic time, or $O(\log n)$)!

Imagine you're on a quest to find the $n$-th treasure spot. The map says each spot's location is based on the previous few spots. You *could* walk step-by-step, visiting every spot. That's $O(n)$. But what if you had a teleporter? Matrix exponentiation is like a special teleporter for these kinds of problems. It figures out the "rules" of moving from one spot to many spots ahead, and then it *zaps* you to the $n$-th spot in a few giant leaps!

This technique is a staple in competitive programming for solving problems involving **linear recurrences** and some dynamic programming problems really, *really* fast. Stick with me, and you'll be teleporting through sequences like a pro!

## What's the Big Idea? (The Mathy Bit, Made Easy)

A linear recurrence is a way to define a sequence where each term is a sum of previous terms. Fibonacci is a classic: $F(n) = F(n-1) + F(n-2)$.

The core idea of matrix exponentiation is:
1.  **State Vector**: We represent the terms needed to calculate the next term as a vector (a list of numbers in a column). For Fibonacci, this might be $\begin{pmatrix} F(n-1) \\ F(n-2) \end{pmatrix}$. Let's call this $S_{n-1}$.
2.  **Transition Matrix**: We find a special matrix (a grid of numbers), let's call it $T$, that "transitions" the state from one step to the next. So, $S_n = T \cdot S_{n-1}$.
3.  **Teleport!**: If we apply this rule $n$ times, we get $S_n = T \cdot T \cdot \dots \cdot T \cdot S_0 = T^n \cdot S_0$.
4.  **Fast Power**: Calculating $T^n$ can be done super fast using **binary exponentiation** (also known as exponentiation by squaring). Instead of $n$ multiplications, it takes about $\log_2 n$ multiplications. If $T$ is a $k \times k$ matrix, each matrix multiplication takes $O(k^3)$ time. So, we can find $S_n$ in $O(k^3 \log n)$ time!

Don't worry if this sounds like a lot of math jargon. We'll break it down with examples!

First, a quick C++ template for our matrix operations. Similar structures will be used for Java, Python, Rust, and JavaScript.

```cpp
#include <vector>

long long MOD = 1e9 + 7; // Example Modulus

struct Matrix {
    std::vector<std::vector<long long>> mat;
    int rows, cols;

    Matrix(int r, int c) : rows(r), cols(c), mat(r, std::vector<long long>(c, 0)) {}

    static Matrix identity(int size) {
        Matrix I(size, size);
        for (int i = 0; i < size; ++i) {
            I.mat[i][i] = 1;
        }
        return I;
    }

    Matrix operator*(const Matrix& other) const {
        // Matrix multiplication
        // Assert(cols == other.rows);
        Matrix result(rows, other.cols);
        for (int i = 0; i < rows; ++i) {
            for (int j = 0; j < other.cols; ++j) {
                for (int k = 0; k < cols; ++k) {
                    result.mat[i][j] = (result.mat[i][j] + mat[i][k] * other.mat[k][j]) % MOD;
                }
            }
        }
        return result;
    }
};

Matrix matrix_pow(Matrix base, long long exp) {
    // Assert(base.rows == base.cols);
    Matrix result = Matrix::identity(base.rows);
    while (exp > 0) {
        if (exp % 2 == 1) result = result * base;
        base = base * base;
        exp /= 2;
    }
    return result;
}
```
*(Similar templates for other languages will be shown with the first full example)*

## Warm-ups: The Usual Suspects

Let's start with something familiar.

### Fibonacci Numbers: $F(n) = F(n-1) + F(n-2)$

The Fibonacci sequence: $0, 1, 1, 2, 3, 5, 8, \dots$. Let $F(0)=0, F(1)=1$.
A simple loop computes $F(n)$ in $O(n)$ time. For $N=10^{18}$, this is too slow!

**Matrix Magic Time!**

1.  **State Vector**: To get $F(n)$, we need $F(n-1)$ and $F(n-2)$. Let our state at step $k$ be $S_k = \begin{pmatrix} F(k) \\ F(k-1) \end{pmatrix}$.
    Our goal is to find a matrix $T$ such that $S_k = T \cdot S_{k-1}$.
    $S_{k-1} = \begin{pmatrix} F(k-1) \\ F(k-2) \end{pmatrix}$.

2.  **Transition Matrix $T$**:
    We want $\begin{pmatrix} F(k) \\ F(k-1) \end{pmatrix} = \begin{pmatrix} T_{00} & T_{01} \\ T_{10} & T_{11} \end{pmatrix} \cdot \begin{pmatrix} F(k-1) \\ F(k-2) \end{pmatrix}$.
    Let's write out the equations:
    *   $F(k) = F(k-1) + F(k-2)$. So, $F(k) = 1 \cdot F(k-1) + 1 \cdot F(k-2)$. This means $T_{00}=1, T_{01}=1$.
    *   For the second row of our state vector $S_k$, we need $F(k-1)$. This is simply $F(k-1) = 1 \cdot F(k-1) + 0 \cdot F(k-2)$. So, $T_{10}=1, T_{11}=0$.

    Our transition matrix is $T = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}$.

3.  **Applying the Power**:
    We have $S_k = T \cdot S_{k-1}$.
    So, $S_2 = T \cdot S_1$, $S_3 = T \cdot S_2 = T^2 \cdot S_1$, and generally $S_n = T^{n-1} \cdot S_1$.
    Our base state vector $S_1 = \begin{pmatrix} F(1) \\ F(0) \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$.
    Thus, $\begin{pmatrix} F(n) \\ F(n-1) \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}^{n-1} \cdot \begin{pmatrix} 1 \\ 0 \end{pmatrix}$.
    The value $F(n)$ will be the top element of the resulting vector.
    **Note:** If $n=0$, $F(0)=0$. $n-1 = -1$ is problematic. Many prefer $S_k = \begin{pmatrix} F(k+1) \\ F(k) \end{pmatrix}$. Then $S_0 = \begin{pmatrix} F(1) \\ F(0) \end{pmatrix}$ and $S_n = T^n S_0$ gives $\begin{pmatrix} F(n+1) \\ F(n) \end{pmatrix}$. We'll usually compute $T^N$ and then multiply by $S_{base}$ to get $S_{N+base\_idx}$. For $F(n)$ with $n=0$ case, $F(0)=0$. For $n \ge 1$, use $T^{n-1} \cdot \begin{pmatrix} F(1) \\ F(0) \end{pmatrix}$.

Let's find $F(n)$ for $n$ up to $10^{18}$.
The matrix size is $2 \times 2$. Time complexity: $O(2^3 \log n) = O(\log n)$. Space: $O(2^2) = O(1)$.

**Code Example (Fibonacci)**

Here's how you'd implement this. We'll provide full runnable code for C++, Java, Python, Rust, and JavaScript.

<details>
<summary>C++17 Code</summary>

```cpp
#include <iostream>
#include <vector>

long long MOD = 1e9 + 7;

struct Matrix {
    std::vector<std::vector<long long>> mat;
    int rows, cols;

    Matrix(int r, int c) : rows(r), cols(c), mat(r, std::vector<long long>(c, 0)) {}

    static Matrix identity(int size) {
        Matrix I(size, size);
        for (int i = 0; i < size; ++i) {
            I.mat[i][i] = 1;
        }
        return I;
    }

    Matrix operator*(const Matrix& other) const {
        Matrix result(rows, other.cols);
        for (int i = 0; i < rows; ++i) {
            for (int j = 0; j < other.cols; ++j) {
                for (int k = 0; k < cols; ++k) {
                    result.mat[i][j] = (result.mat[i][j] + mat[i][k] * other.mat[k][j]) % MOD;
                }
            }
        }
        return result;
    }
};

Matrix matrix_pow(Matrix base, long long exp) {
    Matrix result = Matrix::identity(base.rows);
    while (exp > 0) {
        if (exp % 2 == 1) result = result * base;
        base = base * base;
        exp /= 2;
    }
    return result;
}

long long fibonacci(long long n) {
    if (n == 0) return 0;
    if (n == 1) return 1;

    Matrix T(2, 2);
    T.mat[0][0] = 1; T.mat[0][1] = 1;
    T.mat[1][0] = 1; T.mat[1][1] = 0;

    Matrix Tn_minus_1 = matrix_pow(T, n - 1);

    // Initial state S_1 = {F(1), F(0)} = {1, 0}
    // Result is Tn_minus_1 * S_1
    // F(n) = Tn_minus_1.mat[0][0] * F(1) + Tn_minus_1.mat[0][1] * F(0)
    // F(n) = Tn_minus_1.mat[0][0] * 1 + Tn_minus_1.mat[0][1] * 0
    return Tn_minus_1.mat[0][0];
}

int main() {
    std::cout << "F(10) mod 1e9+7: " << fibonacci(10) << std::endl; // Expected: 55
    std::cout << "F(100) mod 1e9+7: " << fibonacci(100) << std::endl; // Expected: 687995182 (for 1e9+7)
    return 0;
}

```
</details>

<details>
<summary>Java 17 Code</summary>

```java
import java.util.Arrays;

class MatrixExponentiation {
    static long MOD = 1_000_000_007;

    static class Matrix {
        long[][] mat;
        int rows, cols;

        Matrix(int r, int c) {
            rows = r;
            cols = c;
            mat = new long[r][c];
        }

        static Matrix identity(int size) {
            Matrix I = new Matrix(size, size);
            for (int i = 0; i < size; i++) {
                I.mat[i][i] = 1;
            }
            return I;
        }

        Matrix multiply(Matrix other) {
            Matrix result = new Matrix(rows, other.cols);
            for (int i = 0; i < rows; i++) {
                for (int j = 0; j < other.cols; j++) {
                    for (int k = 0; k < cols; k++) {
                        result.mat[i][j] = (result.mat[i][j] + mat[i][k] * other.mat[k][j]) % MOD;
                    }
                }
            }
            return result;
        }
    }

    static Matrix matrixPow(Matrix base, long exp) {
        Matrix result = Matrix.identity(base.rows);
        while (exp > 0) {
            if (exp % 2 == 1) result = result.multiply(base);
            base = base.multiply(base);
            exp /= 2;
        }
        return result;
    }

    static long fibonacci(long n) {
        if (n == 0) return 0;
        if (n == 1) return 1;

        Matrix T = new Matrix(2, 2);
        T.mat[0][0] = 1; T.mat[0][1] = 1;
        T.mat[1][0] = 1; T.mat[1][1] = 0;

        Matrix Tn_minus_1 = matrixPow(T, n - 1);
        return Tn_minus_1.mat[0][0]; // As F(1)=1, F(0)=0
    }

    public static void main(String[] args) {
        System.out.println("F(10) mod 1e9+7: " + fibonacci(10)); // Expected: 55
        System.out.println("F(100) mod 1e9+7: " + fibonacci(100)); // Expected: 687995182
    }
}
```
</details>

<details>
<summary>Python 3.11 Code</summary>

```python
MOD = 10**9 + 7

class Matrix:
    def __init__(self, r, c, initial_val=0):
        self.rows = r
        self.cols = c
        if isinstance(initial_val, list): # Pass a list of lists
            self.mat = initial_val
        else: # Pass a fill value
            self.mat = [[initial_val] * c for _ in range(r)]

    @staticmethod
    def identity(size):
        I = Matrix(size, size)
        for i in range(size):
            I.mat[i][i] = 1
        return I

    def __mul__(self, other):
        # assert self.cols == other.rows
        result = Matrix(self.rows, other.cols)
        for i in range(self.rows):
            for j in range(other.cols):
                sum_val = 0
                for k in range(self.cols): # or other.rows
                    sum_val = (sum_val + self.mat[i][k] * other.mat[k][j]) % MOD
                result.mat[i][j] = sum_val
        return result

def matrix_pow(base, exp):
    # assert base.rows == base.cols
    result = Matrix.identity(base.rows)
    while exp > 0:
        if exp % 2 == 1:
            result = result * base
        base = base * base
        exp //= 2
    return result

def fibonacci(n):
    if n == 0: return 0
    if n == 1: return 1

    T = Matrix(2, 2, [[1, 1], [1, 0]])
    
    Tn_minus_1 = matrix_pow(T, n - 1)
    # S_n = Tn-1 * S_1 where S_1 = [[F(1)], [F(0)]] = [[1], [0]]
    # F(n) = Tn_minus_1.mat[0][0] * F(1) + Tn_minus_1.mat[0][1] * F(0)
    return Tn_minus_1.mat[0][0]

if __name__ == "__main__":
    print(f"F(10) mod {MOD}: {fibonacci(10)}") # Expected: 55
    print(f"F(100) mod {MOD}: {fibonacci(100)}") # Expected: 687995182
```
</details>

<details>
<summary>Rust 1.77 Code</summary>

```rust
static MOD: i64 = 1_000_000_007;

#[derive(Clone)]
struct Matrix {
    mat: Vec<Vec<i64>>,
    rows: usize,
    cols: usize,
}

impl Matrix {
    fn new(r: usize, c: usize) -> Self {
        Matrix {
            mat: vec![vec![0; c]; r],
            rows: r,
            cols: c,
        }
    }

    fn identity(size: usize) -> Self {
        let mut I = Matrix::new(size, size);
        for i in 0..size {
            I.mat[i][i] = 1;
        }
        I
    }

    fn multiply(&self, other: &Matrix) -> Self {
        // assert_eq!(self.cols, other.rows);
        let mut result = Matrix::new(self.rows, other.cols);
        for i in 0..self.rows {
            for j in 0..other.cols {
                for k in 0..self.cols {
                    result.mat[i][j] = (result.mat[i][j] + self.mat[i][k] * other.mat[k][j]) % MOD;
                }
            }
        }
        result
    }
}

fn matrix_pow(mut base: Matrix, mut exp: i64) -> Matrix {
    // assert_eq!(base.rows, base.cols);
    let mut result = Matrix::identity(base.rows);
    while exp > 0 {
        if exp % 2 == 1 {
            result = result.multiply(&base);
        }
        base = base.multiply(&base);
        exp /= 2;
    }
    result
}

fn fibonacci(n: i64) -> i64 {
    if n == 0 { return 0; }
    if n == 1 { return 1; }

    let mut t_mat = Matrix::new(2, 2);
    t_mat.mat[0][0] = 1; t_mat.mat[0][1] = 1;
    t_mat.mat[1][0] = 1; t_mat.mat[1][1] = 0;

    let tn_minus_1 = matrix_pow(t_mat, n - 1);
    tn_minus_1.mat[0][0] // F(n) = tn_minus_1.mat[0][0] * F(1) + tn_minus_1.mat[0][1] * F(0)
}

fn main() {
    println!("F(10) mod {}: {}", MOD, fibonacci(10)); // Expected: 55
    println!("F(100) mod {}: {}", MOD, fibonacci(100)); // Expected: 687995182
}
```
</details>

<details>
<summary>JavaScript (ES2023, Node) Code</summary>

```javascript
const MOD = 10**9 + 7;

class Matrix {
    constructor(rows, cols, fillValueOrMat = 0) {
        this.rows = rows;
        this.cols = cols;
        if (Array.isArray(fillValueOrMat)) {
            this.mat = fillValueOrMat.map(row => row.map(val => BigInt(val)));
        } else {
            this.mat = Array(rows).fill(null).map(() => Array(cols).fill(BigInt(fillValueOrMat)));
        }
    }

    static identity(size) {
        const I = new Matrix(size, size);
        for (let i = 0; i < size; i++) {
            I.mat[i][i] = 1n;
        }
        return I;
    }

    multiply(other) {
        // console.assert(this.cols === other.rows);
        const result = new Matrix(this.rows, other.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < other.cols; j++) {
                let sumVal = 0n;
                for (let k = 0; k < this.cols; k++) {
                    sumVal = (sumVal + this.mat[i][k] * other.mat[k][j]) % BigInt(MOD);
                }
                result.mat[i][j] = sumVal;
            }
        }
        return result;
    }
}

function matrixPow(base, exp) {
    // console.assert(base.rows === base.cols);
    let result = Matrix.identity(base.rows);
    // exp must be BigInt if it can be very large, but for typical N up to 10^18, Number is fine.
    // However, operations within matrix use BigInt if numbers can exceed 2^53-1 before modulo.
    // Here exp is just a counter, so Number is fine.
    exp = BigInt(exp); 
    while (exp > 0n) {
        if (exp % 2n === 1n) result = result.multiply(base);
        base = base.multiply(base);
        exp /= 2n;
    }
    return result;
}

function fibonacci(n_val) {
    const n = BigInt(n_val);
    if (n === 0n) return 0n;
    if (n === 1n) return 1n;

    const T = new Matrix(2, 2, [[1, 1], [1, 0]]);
    
    const Tn_minus_1 = matrixPow(T, n - 1n);
    return Tn_minus_1.mat[0][0];
}

console.log(`F(10) mod ${MOD}: ${fibonacci(10)}`); // Expected: 55
console.log(`F(100) mod ${MOD}: ${fibonacci(100)}`); // Expected: 687995182
// For JavaScript, it returns BigInt, so 55n, 687995182n
```
</details>

### Tribonacci: $T(n) = T(n-1) + T(n-2) + T(n-3)$

Let $T(0)=0, T(1)=0, T(2)=1$. We want $T(n)$.
1.  **State Vector**: $S_k = \begin{pmatrix} T(k) \\ T(k-1) \\ T(k-2) \end{pmatrix}$.
2.  **Transition Matrix**:
    *   $T(k) = 1 \cdot T(k-1) + 1 \cdot T(k-2) + 1 \cdot T(k-3)$
    *   $T(k-1) = 1 \cdot T(k-1) + 0 \cdot T(k-2) + 0 \cdot T(k-3)$
    *   $T(k-2) = 0 \cdot T(k-1) + 1 \cdot T(k-2) + 0 \cdot T(k-3)$
    So, $M = \begin{pmatrix} 1 & 1 & 1 \\ 1 & 0 & 0 \\ 0 & 1 & 0 \end{pmatrix}$.
3.  **Applying the Power**:
    We need to be careful with base cases and powers. Let's aim for $S_k = \begin{pmatrix} T(k+2) \\ T(k+1) \\ T(k) \end{pmatrix}$.
    Then $S_0 = \begin{pmatrix} T(2) \\ T(1) \\ T(0) \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$.
    And $S_n = M^n \cdot S_0$ gives $\begin{pmatrix} T(n+2) \\ T(n+1) \\ T(n) \end{pmatrix}$.
    We want $T(n)$, which is the last element of $S_n$.
    So, $T(n) = (M^n \cdot S_0)_2$.
    If $n=0$, $M^0=I$. $I \cdot S_0 = S_0$. $T(0)$ is $S_0$'s last element, which is $0$. Correct.
    If $n=1$, $M^1 \cdot S_0 = \begin{pmatrix} 1 & 1 & 1 \\ 1 & 0 & 0 \\ 0 & 1 & 0 \end{pmatrix} \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} = \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix}$. Last element is $0$, so $T(1)=0$. Correct.
    If $n=2$, $M^2 \cdot S_0 = M \cdot \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 1 & 1 & 1 \\ 1 & 0 & 0 \\ 0 & 1 & 0 \end{pmatrix} \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 2 \\ 1 \\ 1 \end{pmatrix}$. Last element is $1$, so $T(2)=1$. Correct.
    The desired element is $(M^n)_{20} \cdot T(2) + (M^n)_{21} \cdot T(1) + (M^n)_{22} \cdot T(0)$.
    Since $T(1)=T(0)=0$ and $T(2)=1$, $T(n)=(M^n)_{20}$.

Matrix size is $3 \times 3$. Time: $O(3^3 \log n) = O(\log n)$.

## Parameterised Linear Recurrences: $f(n) = a \cdot f(n-1) + b \cdot f(n-2)$

This is like Fibonacci, but with coefficients $a$ and $b$.
Let $f(0), f(1)$ be given.
1.  **State Vector**: $S_k = \begin{pmatrix} f(k) \\ f(k-1) \end{pmatrix}$.
2.  **Transition Matrix**:
    *   $f(k) = a \cdot f(k-1) + b \cdot f(k-2)$
    *   $f(k-1) = 1 \cdot f(k-1) + 0 \cdot f(k-2)$
    So, $T = \begin{pmatrix} a & b \\ 1 & 0 \end{pmatrix}$.
3.  **Applying the Power**:
    $\begin{pmatrix} f(n) \\ f(n-1) \end{pmatrix} = T^{n-1} \cdot \begin{pmatrix} f(1) \\ f(0) \end{pmatrix}$ for $n \ge 1$.
    $f(n)$ is $(T^{n-1})_{00} \cdot f(1) + (T^{n-1})_{01} \cdot f(0)$.
    (Handle $n=0$ as a base case separately).

## Recurrences with Constants: $f(n) = f(n-1) + f(n-2) + C$

Oh, a wild constant $C$ appeared! How do we deal with that?
The trick is to add the constant to our state vector, making it part of what gets transformed.
Assume $f(0), f(1)$ are given.
1.  **State Vector**: $S_k = \begin{pmatrix} f(k) \\ f(k-1) \\ C \end{pmatrix}$. The $C$ in the vector must remain $C$ after transformation.
2.  **Transition Matrix**:
    We need $S_k = T \cdot S_{k-1}$, where $S_{k-1} = \begin{pmatrix} f(k-1) \\ f(k-2) \\ C \end{pmatrix}$.
    *   $f(k) = 1 \cdot f(k-1) + 1 \cdot f(k-2) + 1 \cdot C$
    *   $f(k-1) = 1 \cdot f(k-1) + 0 \cdot f(k-2) + 0 \cdot C$
    *   $C = 0 \cdot f(k-1) + 0 \cdot f(k-2) + 1 \cdot C$ (to keep $C$ constant)
    So, $T = \begin{pmatrix} 1 & 1 & 1 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix}$.
3.  **Applying the Power**:
    Let's use base state $S_2 = \begin{pmatrix} f(2) \\ f(1) \\ C \end{pmatrix}$ if we need $f(0), f(1)$ to start.
    If we transform $S_{k-1}$ to $S_k$, and we start with $S_1 = \begin{pmatrix} f(1) \\ f(0) \\ C \end{pmatrix}$, then
    $\begin{pmatrix} f(n) \\ f(n-1) \\ C \end{pmatrix} = T^{n-1} \cdot \begin{pmatrix} f(1) \\ f(0) \\ C \end{pmatrix}$ for $n \ge 1$.
    $f(n)$ is the first component of the result.
    (Handle $n=0$ separately: $f(0)$.)

Matrix size $3 \times 3$. Time: $O(3^3 \log n)$.

## Piecewise or Parity-Dependent Recurrences

Example: $f(n)=\begin{cases}f(n-1)&\text{if } n \text{ is odd}\\f(n-2)&\text{if } n \text{ is even}\end{cases}$
Base cases: $f(0), f(1)$.

The transition rule changes based on $n$. We can't use a single matrix $T$ for one step.
But, we can define a matrix for a **block of steps**, say two steps.
Let $S_k = \begin{pmatrix} f(k) \\ f(k-1) \end{pmatrix}$.
If $k$ is odd: $f(k) = f(k-1)$. Matrix $T_O = \begin{pmatrix} 1 & 0 \\ 1 & 0 \end{pmatrix}$ (since $f(k-1)$ is the first element of $S_{k-1}$).
So $S_k = T_O \cdot S_{k-1} = \begin{pmatrix} 1 & 0 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} f(k-1) \\ f(k-2) \end{pmatrix} = \begin{pmatrix} f(k-1) \\ f(k-1) \end{pmatrix}$. Correct.

If $k$ is even: $f(k) = f(k-2)$. Matrix $T_E = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$.
So $S_k = T_E \cdot S_{k-1} = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} f(k-1) \\ f(k-2) \end{pmatrix} = \begin{pmatrix} f(k-2) \\ f(k-1) \end{pmatrix}$. Correct.

Now consider a 2-step transition from $S_{k-2}$ to $S_k$:
If $k$ is even, then $k-1$ is odd.
$S_k = T_E \cdot S_{k-1}$
$S_{k-1} = T_O \cdot S_{k-2}$
So $S_k = T_E \cdot T_O \cdot S_{k-2}$.
Let $M_{2step} = T_E \cdot T_O = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 1 & 0 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 1 & 0 \end{pmatrix}$.
This matrix $M_{2step}$ takes $\begin{pmatrix} f(k-2) \\ f(k-3) \end{pmatrix}$ to $\begin{pmatrix} f(k) \\ f(k-1) \end{pmatrix}$ when $k$ is even.
Let $k=2m$. Then $S_{2m} = M_{2step} \cdot S_{2m-2}$.
So $\begin{pmatrix} f(2m) \\ f(2m-1) \end{pmatrix} = (M_{2step})^{m-1} \cdot \begin{pmatrix} f(2) \\ f(1) \end{pmatrix}$.
Base cases $f(0), f(1)$. Calculate $f(2) = f(0)$ (since 2 is even).
So $\begin{pmatrix} f(2m) \\ f(2m-1) \end{pmatrix} = (M_{2step})^{m-1} \cdot \begin{pmatrix} f(0) \\ f(1) \end{pmatrix}$ for $m \ge 1$.
If $N$ is even, $N=2m$. Compute $(M_{2step})^{m-1}$, multiply by $\begin{pmatrix} f(0) \\ f(1) \end{pmatrix}$. The top element is $f(N)$.
If $N$ is odd, $N=2m+1$. First find $f(2m)$ and $f(2m-1)$. Then $f(N) = f(2m+1) = f(2m)$ (since $N$ is odd).
Handle small $N$ ($0, 1$) as base cases.
For $N=0$, $f(0)$. For $N=1$, $f(1)$. For $N=2$, $m=1$. $(M_{2step})^0 = I$. $\begin{pmatrix} f(2) \\ f(1) \end{pmatrix} = I \cdot \begin{pmatrix} f(0) \\ f(1) \end{pmatrix} = \begin{pmatrix} f(0) \\ f(1) \end{pmatrix}$. So $f(2)=f(0)$. This is correct.
The exponent should be $m$ if base is $S_0=\begin{pmatrix} f(0) \\ f(-1)\end{pmatrix}$ (problematic) or $m$ if base is $S_0=\begin{pmatrix} f(0) \\ f(1)\end{pmatrix}$ but the matrix describes transformation from $S_{2(m-1)}$ to $S_{2m}$.
If base state vector is $S_{start} = \begin{pmatrix} f(1) \\ f(0) \end{pmatrix}$ (note order reversed to simplify $f(2)$):
$f(2)=f(0)$, $f(1)=f(1)$.
$\begin{pmatrix} f(2m) \\ f(2m-1) \end{pmatrix}$. The first component is $f(2m)$.
The power is $(N/2)$ if $N$ is even. If $N$ is odd, compute for $N-1$, then $f(N)=f(N-1)$.
Example: $f(0)=A, f(1)=B$.
$f(2)=f(0)=A$. $f(3)=f(2)=A$. $f(4)=f(2)=A$. $f(5)=f(4)=A$. Seems like $f(n)=A$ for $n \ge 2$ if $n$ even, and $f(n)=f(n-1)$ for $n$ odd.
$M_{2step} = \begin{pmatrix} 1 & 0 \\ 1 & 0 \end{pmatrix}$.
$\begin{pmatrix} f(2) \\ f(1) \end{pmatrix} = \begin{pmatrix} A \\ B \end{pmatrix}$.
$S_{2m} = (M_{2step})^{m-1} \cdot S_2$.
$\begin{pmatrix} f(2m) \\ f(2m-1) \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 1 & 0 \end{pmatrix}^{m-1} \cdot \begin{pmatrix} A \\ B \end{pmatrix}$.
$\begin{pmatrix} 1 & 0 \\ 1 & 0 \end{pmatrix}^2 = \begin{pmatrix} 1 & 0 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 1 & 0 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 1 & 0 \end{pmatrix}$.
So $(M_{2step})^{p} = M_{2step}$ for $p \ge 1$.
If $m-1 \ge 1$ (i.e. $m \ge 2$, $2m \ge 4$):
$\begin{pmatrix} f(2m) \\ f(2m-1) \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 1 & 0 \end{pmatrix} \cdot \begin{pmatrix} A \\ B \end{pmatrix} = \begin{pmatrix} A \\ A \end{pmatrix}$. So $f(2m)=A, f(2m-1)=A$ for $2m \ge 4$.
This gives: $f(0)=A, f(1)=B, f(2)=A, f(3)=f(2)=A, f(4)=A, f(5)=A$. Sequence: $A, B, A, A, A, A, \dots$
This is correct behavior.

## Coupled Systems (Two sequences intertwined)

Consider:
$\begin{aligned}
g(n) &= 2g(n-1) + 2g(n-2) + f(n) \\
f(n) &= 2f(n-1) + 2f(n-2)
\end{aligned}$
The term $f(n)$ in the definition of $g(n)$ means $f(n)$ should be expressed using terms from step $n-1$ or earlier. Substitute $f(n)$:
$g(n) = 2g(n-1) + 2g(n-2) + (2f(n-1) + 2f(n-2))$.
$f(n) = 2f(n-1) + 2f(n-2)$.

1.  **State Vector**: We need $g(k-1), g(k-2), f(k-1), f(k-2)$ to find $g(k)$ and $f(k)$.
    $S_k = \begin{pmatrix} g(k) \\ g(k-1) \\ f(k) \\ f(k-1) \end{pmatrix}$.
    So $S_{k-1} = \begin{pmatrix} g(k-1) \\ g(k-2) \\ f(k-1) \\ f(k-2) \end{pmatrix}$.
2.  **Transition Matrix**:
    *   $g(k) = 2g(k-1) + 2g(k-2) + 2f(k-1) + 2f(k-2)$
    *   $g(k-1) = 1g(k-1) + 0g(k-2) + 0f(k-1) + 0f(k-2)$
    *   $f(k) = 0g(k-1) + 0g(k-2) + 2f(k-1) + 2f(k-2)$
    *   $f(k-1) = 0g(k-1) + 0g(k-2) + 1f(k-1) + 0f(k-2)$
    $T = \begin{pmatrix}
    2 & 2 & 2 & 2 \\
    1 & 0 & 0 & 0 \\
    0 & 0 & 2 & 2 \\
    0 & 0 & 1 & 0
    \end{pmatrix}$.
3.  **Applying the Power**:
    Given $f(0), f(1), g(0), g(1)$.
    $S_1 = \begin{pmatrix} g(1) \\ g(0) \\ f(1) \\ f(0) \end{pmatrix}$.
    Then $S_n = T^{n-1} \cdot S_1$ for $n \ge 1$. We can get $g(n)$ and $f(n)$ from $S_n$.

Matrix size $4 \times 4$. Time $O(4^3 \log n)$.

## Generic $k$-Order Linear Recurrences: $f(n) = \sum_{i=1}^k c_i f(n-i)$

E.g., $f(n) = c_1 f(n-1) + c_2 f(n-2) + \dots + c_k f(n-k)$.
1.  **State Vector**: $S_j = \begin{pmatrix} f(j) \\ f(j-1) \\ \vdots \\ f(j-k+1) \end{pmatrix}$.
2.  **Transition Matrix**: $S_j = T \cdot S_{j-1}$.
    $S_{j-1} = \begin{pmatrix} f(j-1) \\ f(j-2) \\ \vdots \\ f(j-k) \end{pmatrix}$.
    $T = \begin{pmatrix}
    c_1 & c_2 & c_3 & \dots & c_{k-1} & c_k \\
    1   & 0   & 0   & \dots & 0       & 0   \\
    0   & 1   & 0   & \dots & 0       & 0   \\
    \vdots & \vdots & \ddots & \ddots & \vdots & \vdots \\
    0   & 0   & \dots & 1   & 0       & 0
    \end{pmatrix}$.
    The first row sets $f(j)$ based on the recurrence. Other rows just shift values down: $f(j-1)$ becomes the new $f(j-1)$, $f(j-2)$ becomes the new $f(j-2)$, etc.
    More precisely, $f(j-1)$ from $S_{j-1}$ becomes $f(j-1)$ in $S_j$. $f(j-2)$ from $S_{j-1}$ becomes $f(j-2)$ in $S_j$, etc.
3.  **Applying the Power**:
    Base state: $S_{k-1} = \begin{pmatrix} f(k-1) \\ f(k-2) \\ \vdots \\ f(0) \end{pmatrix}$.
    Then $S_n = T^{n-(k-1)} \cdot S_{k-1}$ for $n \ge k-1$.
    $f(n)$ is the top element of $S_n$.

Matrix size $k \times k$. Time $O(k^3 \log n)$.

### Example: $f(n)=a \cdot f(n-1)+c \cdot f(n-3)$
This is $k=3$ with $c_1=a, c_2=0, c_3=c$.
State: $\begin{pmatrix} f(j) \\ f(j-1) \\ f(j-2) \end{pmatrix}$.
$T = \begin{pmatrix} a & 0 & c \\ 1 & 0 & 0 \\ 0 & 1 & 0 \end{pmatrix}$.
Base state: $S_2 = \begin{pmatrix} f(2) \\ f(1) \\ f(0) \end{pmatrix}$. Result $S_n = T^{n-2} S_2$. $f(n)$ is top element.

### Example: $f(n)=a f(n-1)+c f(n-3)+d f(n-4)+E$
This is $k=4$ with a constant $E$.
$f(n) = a f(n-1) + 0 f(n-2) + c f(n-3) + d f(n-4) + E \cdot 1$.
1.  **State Vector**: $S_j = \begin{pmatrix} f(j) \\ f(j-1) \\ f(j-2) \\ f(j-3) \\ 1 \end{pmatrix}$. (Size $(k+1) \times 1$).
2.  **Transition Matrix**:
    $T = \begin{pmatrix}
    a & 0 & c & d & E \\
    1 & 0 & 0 & 0 & 0 \\
    0 & 1 & 0 & 0 & 0 \\
    0 & 0 & 1 & 0 & 0 \\
    0 & 0 & 0 & 0 & 1
    \end{pmatrix}$. (Size $(k+1) \times (k+1)$).
3.  **Applying the Power**: Use appropriate base state vector and exponent. E.g., if $f(0)..f(3)$ known:
    $S_3 = \begin{pmatrix} f(3) \\ f(2) \\ f(1) \\ f(0) \\ 1 \end{pmatrix}$. Then $S_n = T^{n-3} \cdot S_3$. $f(n)$ is top element.

## Into the Wilds: More Complex Recurrences

Let's tackle some trickier problems!

### 1. Counting Paths of Length $N$ in a Graph

Given a directed graph with $V$ vertices, find the number of distinct paths of length exactly $N$ from a source vertex $u$ to a target vertex $v$.
Let $dp[len][i]$ be the number of paths of length $len$ ending at vertex $i$.
$dp[len][i] = \sum_{j \text{ s.t. edge } (j,i) \text{ exists}} dp[len-1][j]$.
This is a linear recurrence!
1.  **State Vector**: $S_{len} = \begin{pmatrix} dp[len][0] \\ dp[len][1] \\ \vdots \\ dp[len][V-1] \end{pmatrix}$.
2.  **Transition Matrix**: Let $A$ be the adjacency matrix of the graph, where $A_{ij}=1$ if there's an edge from $i$ to $j$, and $0$ otherwise.
    The recurrence for $dp[len][i]$ uses edges $(j,i)$ *into* $i$. If $A_{ji}=1$ means edge $j \to i$, then $dp[len][i] = \sum_j A_{ji} \cdot dp[len-1][j]$.
    This implies $S_{len} = A^T \cdot S_{len-1}$ (where $A^T$ is transpose of $A$, so $A^T_{ij} = A_{ji}$).
    Alternatively, if $A_{ij}$ means edge $j \to i$: $S_{len} = A \cdot S_{len-1}$.
    Let's assume $A_{ij}$ is 1 if edge $j \to i$ exists (rows are destinations, columns are sources). Then $S_{len} = A \cdot S_{len-1}$.
3.  **Applying the Power**:
    The base state $S_0$ depends on the starting vertex. If we start at $u$: $dp[0][u]=1$, and $dp[0][j]=0$ for $j \ne u$. So $S_0$ is a vector with $1$ at index $u$ and $0$ elsewhere.
    Then $S_N = A^N \cdot S_0$.
    The number of paths from $u$ to $v$ of length $N$ is the $v$-th component of $S_N$.
    This is equivalent to $(A^N)_{vu}$ (if $A_{ij}$ is $j \to i$) or $(A^N)_{uv}$ (if $A_{ij}$ is $i \to j$).
    It's a known property that $(M^k)_{xy}$ counts paths of length $k$ from $x$ to $y$ if $M$ is an adjacency matrix (where $M_{xy}=1$ if edge $x \to y$).

Matrix size $V \times V$. Time $O(V^3 \log N)$.

### 2. Recurrence with Polynomial Term: $f(n) = f(n-1) + f(n-2) + n^2$

The $n^2$ term is a polynomial in $n$. We need to keep track of powers of $n$ in our state.
For $n^2$, we'll need $n^2, n, 1$.
1.  **State Vector**: $S_k = \begin{pmatrix} f(k) \\ f(k-1) \\ k^2 \\ k \\ 1 \end{pmatrix}$.
    We need to define $S_k$ from $S_{k-1} = \begin{pmatrix} f(k-1) \\ f(k-2) \\ (k-1)^2 \\ (k-1) \\ 1 \end{pmatrix}$.
2.  **Transition Matrix**:
    *   $f(k) = 1 \cdot f(k-1) + 1 \cdot f(k-2) + 1 \cdot k^2$. We need $k^2$ in terms of $(k-1)^2, (k-1), 1$.
        $k^2 = ((k-1)+1)^2 = (k-1)^2 + 2(k-1) + 1$.
        So, $f(k) = 1 \cdot f(k-1) + 1 \cdot f(k-2) + 1 \cdot (k-1)^2 + 2 \cdot (k-1) + 1 \cdot 1$.
    *   $f(k-1) = 1 \cdot f(k-1)$. (Shift down)
    *   $k^2 = 1 \cdot (k-1)^2 + 2 \cdot (k-1) + 1 \cdot 1$.
    *   $k = 0 \cdot (k-1)^2 + 1 \cdot (k-1) + 1 \cdot 1$.
    *   $1 = 0 \cdot (k-1)^2 + 0 \cdot (k-1) + 1 \cdot 1$.
    $T = \begin{pmatrix}
    1 & 1 & 1 & 2 & 1 \\  // f(k)
    1 & 0 & 0 & 0 & 0 \\  // f(k-1)
    0 & 0 & 1 & 2 & 1 \\  // k^2
    0 & 0 & 0 & 1 & 1 \\  // k
    0 & 0 & 0 & 0 & 1     // 1
    \end{pmatrix}$.
3.  **Applying the Power**:
    Base cases $f(0), f(1)$.
    Base state $S_1 = \begin{pmatrix} f(1) \\ f(0) \\ 1^2 \\ 1 \\ 1 \end{pmatrix} = \begin{pmatrix} f(1) \\ f(0) \\ 1 \\ 1 \\ 1 \end{pmatrix}$.
    Then $S_n = T^{n-1} \cdot S_1$. $f(n)$ is the top element.
    (If $n=0$, handle separately. Or, define $S_0 = \begin{pmatrix} f(0) \\ f(-1) \text{ (careful!)} \\ 0^2 \\ 0 \\ 1 \end{pmatrix}$ and compute $T^n S_0$).
    The size of the matrix is $(k+d+1) \times (k+d+1)$ where $k$ is order of recurrence and $d$ is degree of polynomial. Here $k=2, d=2$, so $2+2+1=5$. Matrix size $5 \times 5$.

### 3. Sum of Fibonacci Numbers: $S_F(n) = \sum_{i=0}^n F(i)$

We want $S_F(n)$. The recurrence is $S_F(n) = S_F(n-1) + F(n)$.
1.  **State Vector**: We need $S_F(k-1)$ and $F(k)$. $F(k)$ itself comes from $F(k-1), F(k-2)$.
    $S_k = \begin{pmatrix} S_F(k) \\ F(k) \\ F(k-1) \end{pmatrix}$.
    $S_{k-1} = \begin{pmatrix} S_F(k-1) \\ F(k-1) \\ F(k-2) \end{pmatrix}$.
2.  **Transition Matrix**:
    *   $S_F(k) = S_F(k-1) + F(k) = S_F(k-1) + (F(k-1) + F(k-2))$.
        $S_F(k) = 1 \cdot S_F(k-1) + 1 \cdot F(k-1) + 1 \cdot F(k-2)$.
    *   $F(k) = 1 \cdot F(k-1) + 1 \cdot F(k-2)$.
    *   $F(k-1) = 1 \cdot F(k-1) + 0 \cdot F(k-2)$.
    $T = \begin{pmatrix} 1 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 1 & 0 \end{pmatrix}$.
3.  **Applying the Power**:
    Base cases: $F(0)=0, F(1)=1$. $S_F(0)=F(0)=0$.
    For $F(-1)$: $F(1)=F(0)+F(-1) \implies 1=0+F(-1) \implies F(-1)=1$.
    Base state $S_0 = \begin{pmatrix} S_F(0) \\ F(0) \\ F(-1) \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}$.
    Then $S_n = T^n \cdot S_0$. $S_F(n)$ is the top element.
    Let's check for $n=1$: $S_1 = T \cdot S_0 = \begin{pmatrix} 1 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 1 & 0 \end{pmatrix} \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix} = \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix}$.
    This is $\begin{pmatrix} S_F(1) \\ F(1) \\ F(0) \end{pmatrix}$. $S_F(1)=1, F(1)=1, F(0)=0$.
    $S_F(1)=F(0)+F(1)=0+1=1$. Correct.

Matrix size $3 \times 3$.

## Bonus Round: Pro Tips & Tricks

*   **Modulo Arithmetic**: All matrix calculations (addition and multiplication) should be done modulo $M$.
    *   When $C_{ij} = \sum A_{ik} B_{kj}$, compute sum modulo $M$: `sum = (sum + A[i][k] * B[k][j]) % M;`.
*   **Negative Numbers**: If coefficients or base cases are negative, `x % M` in C++/Java can be negative. Use `(x % M + M) % M` to ensure positive result. Python's `%` handles this nicely.
*   **64-bit Overflow for Products**: Each product $A_{ik} \cdot B_{kj}$ can be up to $(M-1)^2$. If $M \approx 10^9$, this is $\approx 10^{18}$, which fits in a 64-bit integer (`long long` in C++, `long` in Java).
    *   If $M$ is larger, e.g., $M > 3 \cdot 10^9$, then $(M-1)^2$ might overflow. You might need:
        *   `__int128` in C++ (if available and $M^2$ fits).
        *   Russian Peasant Multiplication (or "multiply function") to do $(X \cdot Y) \pmod M$ using additions, taking $O(\log Y)$ time:
            ```cpp
            long long multiply_mod(long long a, long long b, long long m) {
                long long res = 0;
                a %= m;
                while (b > 0) {
                    if (b % 2 == 1) res = (res + a) % m;
                    a = (a * 2) % m; // Or (a+a)%m if a*2 overflows
                    b /= 2;
                }
                return res;
            }
            ```
            (Note: `a = (a * 2) % m` can be `a = (a + a) % m` if $2a$ overflows. If $M > LLONG_MAX/2$, then $2a$ could overflow. For $M \approx 10^{12}$, $a < 10^{12}$, $2a < 2 \cdot 10^{12}$ fits `long long`. So simple `a = (a * 2) % m` is usually fine.)
*   **Constant Factor Optimizations**:
    *   **Bitsets for Boolean Matrices**: If matrix entries are 0/1 (e.g., graph reachability where $M=2$), matrix multiplication can be optimized using bitsets to $O(k^3/w)$ where $w$ is word size (e.g., 64).
    *   **Unrolling loops**: For very small fixed-size matrices ($2 \times 2, 3 \times 3$), manually unrolling the multiplication loops can be faster than generic loops.
    *   **Advanced techniques**: For finding $f(n)$ for a fixed linear recurrence, Cayley-Hamilton theorem can be used to speed up computation to $O(k^2 \log n)$ or even $O(k \log k \log n)$ after an $O(k^2)$ precomputation for coefficients. See KACTL's `LinearRecurrence.h` for an example. This is generally for when $k$ is large (e.g. $k=1000$).

## Conclusion: You've Got the Power!

Phew! That was a wild ride from simple Fibonacci to complex recurrences. Matrix exponentiation is a versatile and powerful technique. The key steps are always:
1.  Identify the **state** needed at each step.
2.  Construct the **transition matrix** that takes you from state $S_{k-1}$ to $S_k$.
3.  Determine the **base state vector** $S_{base}$.
4.  Calculate $T^{\text{exponent}}$ using binary exponentiation.
5.  Multiply by the base state: $S_N = T^{\text{exponent}} \cdot S_{base}$.
6.  Extract your answer from $S_N$.

**Common Pitfalls**:
*   **Off-by-one errors**: The exponent ($N, N-1, N-k$?) is tricky. Test with small values!
*   **Matrix dimensions**: Ensure your matrix and vector sizes match.
*   **Base cases**: Incorrect initial vector $S_0$ or handling of small $N$.
*   **Modulo issues**: Forgetting modulo, negative results, or overflow in intermediate products.
*   **State vector contents**: Forgetting to include constants or all necessary polynomial terms.