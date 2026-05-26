package xyz.tumit.backend.fizzbuzz;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fizzbuzz")
class FizzBuzzController {

    @PostMapping
    FizzBuzzResponse compute(@RequestBody @Valid FizzBuzzRequest request) {
        return new FizzBuzzResponse(FizzBuzz.compute(request.n()));
    }
}
