package com.alphalog.geocoder.local.repository;

import com.alphalog.geocoder.local.model.Address;


/**
 * Custom Repository
 */
public interface AddressRepositoryCustom  {

	public Address findAddress(Address address);
	
}
