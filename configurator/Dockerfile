FROM java:8-jre

ADD ./target/configurator.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/configurator.jar"]

EXPOSE 8888