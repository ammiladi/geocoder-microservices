package com.alphalog.geocoder.security.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.alphalog.geocoder.security.domain.User;

@Repository
public interface UserRepository extends CrudRepository<User, String> {

}
