package com.alphalog.geocoder.local.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alphalog.geocoder.local.model.Address;
import com.alphalog.geocoder.local.services.GeocoderService;

/**
 * Expose Rest service for local geocoder
 */
@RestController
public class GeocoderController {

	@Autowired
	private GeocoderService geocoderService;
	
	@RequestMapping(value="/geocoder", method = RequestMethod.GET, produces = "application/json")
	public Address geocoder(@RequestParam(name="street", required=true)  String  street,@RequestParam(name="city", required=true) String  city, @RequestParam(name="postalCode", required=true) String  postalCode, @RequestParam(name="country", required=true) String country){
		Address  address = new Address(street, city, postalCode, country);
		Optional<Address> result =  geocoderService.getAdresseInfomation(address);
		return result.get();
	}

}
