package com.alphalog.geocoder.local;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

import com.alphalog.geocoder.local.config.SecurityConfiguration;


@SpringBootApplication
@EnableEurekaClient
@EnableHystrix
@Import(SecurityConfiguration.class)
@ComponentScan(basePackages={"com.alphalog.geocoder.local.controller","com.alphalog.geocoder.local.repository","com.alphalog.geocoder.local.services"})
public class GeocoderLocal {

	public static void main(String[] args){
		SpringApplication.run(GeocoderLocal.class, args);
	}


}
