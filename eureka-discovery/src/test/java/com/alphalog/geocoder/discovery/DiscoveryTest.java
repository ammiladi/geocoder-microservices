package com.alphalog.geocoder.discovery;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertNotNull;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.client.RestTemplate;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = DiscoveryApplication.class)
public class DiscoveryTest {

	@Test
	public void dicoverEurekaTest() throws Exception {
		RestTemplate restTemplate = new RestTemplate();
		String retour = restTemplate.getForObject("http://localhost:8761/env", String.class);
		assertTrue(retour.contains("{\"local.server.port\":8761}"));
	}

}
