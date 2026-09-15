package com.example.studentApp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/students/**").permitAll()
                        .anyRequest().permitAll()
                );

        return http.build();
    }
//public class SecurityConfig {
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http)
//            throws Exception {
//
//        http
//                .csrf(csrf -> csrf.disable())
//                // Enable CORS
//                .cors(Customizer.withDefaults())
//                .authorizeHttpRequests(auth -> auth
//
//                        .requestMatchers(HttpMethod.GET, "/students/**")
//                        .hasAnyRole("USER", "ADMIN")
//
//                        .requestMatchers(HttpMethod.POST, "/students/**")
//                        .hasRole("ADMIN")
//
//                        .requestMatchers(HttpMethod.PUT, "/students/**")
//                        .hasRole("ADMIN")
//
//                        .requestMatchers(HttpMethod.DELETE, "/students/**")
//                        .hasRole("ADMIN")
//
//                        .anyRequest()
//                        .authenticated()
//
//                )
//                .httpBasic(Customizer.withDefaults());
//
//        return http.build();
//    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:5173")
        );

        configuration.setAllowedMethods(
                List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")
        );

        configuration.setAllowedHeaders(
                List.of("Authorization", "Content-Type")
        );

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
//
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {

        UserDetails admin = User.builder()
                .username("admin")
                .password(passwordEncoder().encode("admin123"))
                .roles("ADMIN")
                .build();

        UserDetails ramesh = User.builder()
                .username("ramesh")
                .password(passwordEncoder().encode("user123"))
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(admin, ramesh);
    }
//
//    /*@Bean
//    public UserDetailsService userDetailsService() {
//
//        UserDetails admin = User.builder()
//                .username("admin")
//                .password("{noop}admin123")
//                .roles("ADMIN")
//                .build();
//
//        UserDetails ramesh = User.builder()
//                .username("ramesh")
//                .password("{noop}user123")
//                .roles("USER")
//                .build();
//
//        return new InMemoryUserDetailsManager(admin, ramesh);
//    }*/
}
