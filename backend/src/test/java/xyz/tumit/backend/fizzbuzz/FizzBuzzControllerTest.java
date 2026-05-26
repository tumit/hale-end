package xyz.tumit.backend.fizzbuzz;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static net.javacrumbs.jsonunit.assertj.JsonAssertions.assertThatJson;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(FizzBuzzController.class)
class FizzBuzzControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    void returns_fizzbuzz_result_for_valid_input() throws Exception {
        var result = mockMvc.perform(post("/api/fizzbuzz")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "n": 15 }
                                """))
                .andExpect(status().isOk())
                .andReturn();

        assertThatJson(result.getResponse().getContentAsString())
                .isEqualTo("""
                        { "result": "FizzBuzz" }
                        """);
    }

    @Test
    void returns_400_problem_detail_for_non_positive_number() throws Exception {
        var result = mockMvc.perform(post("/api/fizzbuzz")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "n": -1 }
                                """))
                .andExpect(status().isBadRequest())
                .andReturn();

        assertThatJson(result.getResponse().getContentAsString())
                .node("status").isEqualTo(400);
    }
}
