plugins {
    java
    id("org.springframework.boot") version "3.4.3" // Mudamos de 4.0.3 para 3.4.3
    id("io.spring.dependency-management") version "1.1.7"
}

group = "com.api"
version = "0.0.1-SNAPSHOT"
description = "Demo project for Spring Boot"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(17)
	}
}

repositories {
	mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-web")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")

	//Lombok
	compileOnly("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")

	//SQLite
	//runtimeOnly("org.xerial:sqlite-jdbc")
	runtimeOnly("com.microsoft.sqlserver:mssql-jdbc")
	//implementation("org.hibernate.orm:hibernate-community-dialects")

	//MapStruct
	implementation("org.mapstruct:mapstruct:1.5.5.Final")
	annotationProcessor("org.mapstruct:mapstruct-processor:1.5.5.Final")

	//SQLite - MapStruct
	annotationProcessor("org.projectlombok:lombok-mapstruct-binding:0.2.0")

	//Swagger
	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.4.0")

	//Spring Security
	implementation("org.springframework.boot:spring-boot-starter-security")

	//JWT
	implementation("com.auth0:java-jwt:4.4.0")

}

tasks.withType<Test> {
	useJUnitPlatform()
}
