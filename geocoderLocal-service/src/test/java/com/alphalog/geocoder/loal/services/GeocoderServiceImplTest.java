package com.alphalog.geocoder.loal.services;

import static org.junit.Assert.assertEquals;

import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.alphalog.geocoder.local.GeocoderLocal;
import com.alphalog.geocoder.local.model.Address;
import com.alphalog.geocoder.local.services.GeocoderService;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = GeocoderLocal.class)
public class GeocoderServiceImplTest {
	
	@Autowired
	GeocoderService geocoderService;
	
	@Test
	public void getAdresseInfomationTest() {
		Address address = new Address("20 avenue Flandre","Paris","75019","France");
		geocoderService.saveAdress(address);
		Optional<Address> addressFound = geocoderService.getAdresseInfomation(address);
		assertEquals(addressFound.get(), address);
	}

}
