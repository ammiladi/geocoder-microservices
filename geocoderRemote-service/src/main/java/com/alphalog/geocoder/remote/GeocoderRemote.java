package com.alphalog.geocoder.remote;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

import com.alphalog.geocoder.remote.config.RestTemplateConfig;
import com.alphalog.geocoder.remote.config.SecurityConfiguration;



@SpringBootApplication
@EnableEurekaClient
@EnableHystrix
@Import({SecurityConfiguration.class, RestTemplateConfig.class})
@ComponentScan(basePackages={"com.alphalog.geocoder.remote.controller","com.alphalog.geocoder.remote.services"})
public class GeocoderRemote {

	public static void main(String[] args){
		SpringApplication.run(GeocoderRemote.class, args);
	}


}
