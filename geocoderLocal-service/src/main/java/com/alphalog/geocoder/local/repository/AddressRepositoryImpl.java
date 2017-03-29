package com.alphalog.geocoder.local.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import com.alphalog.geocoder.local.model.Address;

/**
 * Implementation of the Custum Repository 
 */
public class AddressRepositoryImpl implements AddressRepositoryCustom {

	@Autowired
	private MongoOperations mongoOperations;

	public Address findAddress(Address address) {
		Query query = new Query();
		query.addCriteria(Criteria.where("street").is(address.getStreet()));
		query.addCriteria(Criteria.where("city").is(address.getCity()));

		return mongoOperations.findOne(query, Address.class);
	}

}
