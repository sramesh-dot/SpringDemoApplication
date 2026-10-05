package com.example.studentApp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
//@Import(TestCacheConfig.class)
@ActiveProfiles("test")
class DemoApplicationTests {

	@Test
	void contextLoads() {
	}

}
