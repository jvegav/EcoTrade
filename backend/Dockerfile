# Etapa 1: Construcción
FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copiar configuración y descargar dependencias
COPY pom.xml .
RUN mvn dependency:go-offline

# Copiar código y compilar
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: Ejecución
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copiar el JAR (verifica que el nombre coincida con tu pom.xml)
COPY --from=build /app/target/ecotrade-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

# Límites de memoria para Render Free Tier
ENV JAVA_TOOL_OPTIONS="-Xmx300m -Xms250m"

ENTRYPOINT ["java", "-jar", "app.jar"]