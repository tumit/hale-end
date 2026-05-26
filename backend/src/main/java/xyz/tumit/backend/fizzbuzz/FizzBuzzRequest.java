package xyz.tumit.backend.fizzbuzz;

import jakarta.validation.constraints.Positive;

record FizzBuzzRequest(@Positive int n) {}
