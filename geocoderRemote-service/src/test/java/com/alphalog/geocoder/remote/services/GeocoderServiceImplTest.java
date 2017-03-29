package com.alphalog.geocoder.remote.services;

import static org.junit.Assert.assertEquals;

import java.util.Map;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.alphalog.geocoder.remote.GeocoderRemote;



@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = GeocoderRemote.class  )
public class GeocoderServiceImplTest {
	
	@Autowired
	private GeocoderService geocoderService;
	
	@Test
	public void googleGeocoderTest() {
		Map<String, String> result  = geocoderService.getAddressInformation("20 rue rouvet 75019 Paris");
		assertEquals(result.get("lng"), "2.3828498");
	}

}
