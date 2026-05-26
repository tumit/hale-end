package xyz.tumit.backend.fizzbuzz;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class FizzBuzzTest {

    @Test
    void returns_number_as_string_when_not_divisible() {
        assertThat(FizzBuzz.compute(1)).isEqualTo("1");
        assertThat(FizzBuzz.compute(2)).isEqualTo("2");
    }

    @Test
    void returns_Fizz_when_divisible_by_3() {
        assertThat(FizzBuzz.compute(3)).isEqualTo("Fizz");
        assertThat(FizzBuzz.compute(6)).isEqualTo("Fizz");
    }

    @Test
    void returns_Buzz_when_divisible_by_5() {
        assertThat(FizzBuzz.compute(5)).isEqualTo("Buzz");
        assertThat(FizzBuzz.compute(10)).isEqualTo("Buzz");
    }

    @Test
    void returns_FizzBuzz_when_divisible_by_15() {
        assertThat(FizzBuzz.compute(15)).isEqualTo("FizzBuzz");
        assertThat(FizzBuzz.compute(30)).isEqualTo("FizzBuzz");
    }
}
