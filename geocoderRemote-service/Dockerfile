FROM java:8-jre
 
ADD ./target/geocoderRemote-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/geocoderRemote-service.jar"]

EXPOSE 9002