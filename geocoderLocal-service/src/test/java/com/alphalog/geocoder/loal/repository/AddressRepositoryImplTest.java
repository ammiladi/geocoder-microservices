package com.alphalog.geocoder.loal.repository;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.alphalog.geocoder.local.GeocoderLocal;
import com.alphalog.geocoder.local.model.Address;
import com.alphalog.geocoder.local.repository.AddressRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = GeocoderLocal.class)
public class AddressRepositoryImplTest {
	
	@Autowired
	private AddressRepository addressRepository;

	@Test
	public void saveAddressTest() {
		Address address = new Address("20 avenue Flandre","Paris","75019","France");
		 addressRepository.save(address);
		assertNotNull(address.getId());
	}
	@Test
	public void searchAddressTest() {
		Address address = new Address("20 avenue Flandre","Paris","75019","France");
		addressRepository.save(address);
		Address address1 = new Address("20 avenue Flandre","Paris","","");
		Address ad = addressRepository.findAddress(address1);
		assertEquals(ad.getCountry(), "France");
	}
}
