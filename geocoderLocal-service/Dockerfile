FROM java:8-jre
 
ADD ./target/geocoderLocal-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/geocoderLocal-service.jar"]

EXPOSE 9001