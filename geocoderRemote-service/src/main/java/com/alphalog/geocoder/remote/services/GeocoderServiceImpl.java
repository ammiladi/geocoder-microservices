package com.alphalog.geocoder.remote.services;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.gson.Gson;

@Service
public class GeocoderServiceImpl implements GeocoderService {

	public static final String GOOGLE_REST_SERVICE = "https://maps.googleapis.com/maps/api/geocode/json?address=";

	@Autowired
	private RestTemplate restTemplate;;

	public Map<String, String> getAddressInformation(String address) {
		Map<String, String> map = new HashMap<String, String>();
		try {
			Object result = restTemplate.getForObject(GOOGLE_REST_SERVICE.concat(address), Object.class);
			String json = (new Gson()).toJson(result, LinkedHashMap.class);
			ObjectNode node = new ObjectMapper().readValue(json, ObjectNode.class);
			map.put("lng", node.get("results").get(0).get("geometry").get("location").get("lng").asText());
			map.put("lat", node.get("results").get(0).get("geometry").get("location").get("lat").asText());
		} catch (Exception e) {

		}
		return map;
	}

}
