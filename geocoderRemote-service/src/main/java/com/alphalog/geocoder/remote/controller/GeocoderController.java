package com.alphalog.geocoder.remote.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alphalog.geocoder.remote.services.GeocoderService;


@RestController
public class GeocoderController {
	
	@Autowired
	private GeocoderService geocoderService;
	
	@RequestMapping(value="/geocoder", method = RequestMethod.GET, produces = "application/json")
	public Map<String, String> geocoder(@RequestParam(name="address", required=true) String  address){
		return  geocoderService.getAddressInformation(address);
	}

}
