FROM openjdk:8
VOLUME /tmp
ADD ./build/libs/springbootdemo-0.0.1-SNAPSHOT.jar ecommerce-manager.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "ecommerce-manager.jar"]