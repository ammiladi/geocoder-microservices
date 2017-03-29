FROM java:8-jre 

ADD ./target/eureka-discovery.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/eureka-discovery.jar"]

EXPOSE 8761