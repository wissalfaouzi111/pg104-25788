// Given an integer `n`, returns the factorial of `n`
function factorial(n) {
    if (n <= 1)
        return 1;
    else
        return n * factorial(n-1);
}

// export { factorial };
