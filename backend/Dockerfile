# Etapa 1: Construcción (Build)
FROM maven:3.9.9-eclipse-temurin-25-alpine AS build
WORKDIR /app

# 1. Copiar el archivo de configuración de Maven
COPY pom.xml .

# 2. Descargar dependencias (esto acelera futuras compilaciones)
RUN mvn dependency:go-offline

# 3. Copiar el código fuente y construir el JAR
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: Ejecución (Runtime)
FROM eclipse-temurin:25-jdk-alpine
WORKDIR /app

# Copiamos el JAR generado en la etapa anterior
# El nombre debe coincidir con el artifactId y version de tu pom.xml
COPY --from=build /app/target/ecotrade-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto que usa Spring Boot
EXPOSE 8080

# Comando para arrancar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]