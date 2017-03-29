package com.alphalog.geocoder.local.services;

import java.util.Optional;

import com.alphalog.geocoder.local.model.Address;

/**
 * Local geocoder service 
 *
 */
public interface GeocoderService {

	public Optional<Address> getAdresseInfomation(Address address);
	
	public void saveAdress(Address address);

}
