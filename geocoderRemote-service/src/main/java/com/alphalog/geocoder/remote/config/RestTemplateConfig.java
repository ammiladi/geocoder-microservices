package com.alphalog.geocoder.remote.config;

 

import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.Proxy.Type;

import org.springframework.context.annotation.Bean;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

public class RestTemplateConfig {
	
	@Bean
	public RestTemplate restTemplate() {
	    SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();

	    Proxy proxy= new Proxy(Type.HTTP, new InetSocketAddress("vip-px.main.aviva.eu.corp", 8080));
	    requestFactory.setProxy(proxy);
	    return new RestTemplate(requestFactory);
	   // return new RestTemplate();
	}

}
