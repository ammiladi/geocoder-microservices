package com.alphalog.geocoder.remote.services;

import java.util.Map;
/**
 * 
 * Simple Remote ggogle geocoder Service 
 */
public interface  GeocoderService {
	/**
	 * @param address
	 * @return Map des coordonnees geoloc
	 */
	
	public Map<String, String> getAddressInformation(String address);

}
