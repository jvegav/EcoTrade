# Etapa 1: Construcción (Build)
# Usamos una imagen de Maven sobre JDK 21 (que es estable) para compilar, 
# pero apuntamos a que el resultado sea compatible con Java 25.
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copiar el archivo de configuración
COPY pom.xml .

# Descargar dependencias
RUN mvn dependency:go-offline

# Copiar el código fuente y compilar
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: Ejecución (Runtime)
# Aquí es donde usamos Java 25 para correr tu app
FROM eclipse-temurin:25-jdk
WORKDIR /app

# Copiamos el JAR generado
COPY --from=build /app/target/ecotrade-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

# Configuración de memoria para el plan gratuito de Render
ENV JAVA_TOOL_OPTIONS="-Xmx300m -Xms250m"

ENTRYPOINT ["java", "-jar", "app.jar"]