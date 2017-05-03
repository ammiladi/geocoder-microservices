package com.alphalog.geocoder.local.services;


import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.alphalog.geocoder.local.model.Address;
import com.alphalog.geocoder.local.repository.AddressRepository;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;


@Service
public class GeocoderServiceImpl implements GeocoderService{

	@Autowired
	private AddressRepository  addressRepository;
	
	
	@Override
	@HystrixCommand(fallbackMethod = "showDefaultAdress")
	public Optional<Address> getAdresseInfomation(Address address) {
		Address AddressFound = addressRepository.findAddress(address);
		if(AddressFound!=null){
			return Optional.of( AddressFound);
		}
		else{
			Map<String, String> param = new HashMap<>(); param.put("address", address.toString());
			@SuppressWarnings("unchecked")
			//FIXME
			Map<String,String> coord = ( new RestTemplate()).getForObject("http://localhost:4000/geocoderRemote/geocoder?address="+address, Map.class, address);
			address.setLatitude(coord.get("lat"));
			address.setLongitude(coord.get("lng"));
			addressRepository.save(address);
			return Optional.of(address);
		}
		
		
	}
	 private Optional<Address> showDefaultAdress(Address address) {
	        return  Optional.of(address);
	    }


	@Override
	public void saveAdress(Address address) {
		addressRepository.save(address);
	}

}
