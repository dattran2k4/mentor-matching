package com.mentormatching;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class MentorMatchingApplication {

    public static void main(String[] args) {
        SpringApplication.run(MentorMatchingApplication.class, args);
    }
}
