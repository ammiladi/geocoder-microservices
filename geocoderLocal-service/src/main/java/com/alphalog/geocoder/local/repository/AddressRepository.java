package com.alphalog.geocoder.local.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.alphalog.geocoder.local.model.Address;

public interface AddressRepository extends AddressRepositoryCustom, MongoRepository<Address, String> {

}
