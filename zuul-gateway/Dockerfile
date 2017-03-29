FROM java:8-jre
 
ADD ./target/zuul-gateway.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/zuul-gateway.jar"]

EXPOSE 4000