package com.jobportal.server.dto;

public class LoginResponse {
    private String token;
    private String role;
    private boolean profileCompleted;

    public LoginResponse(String token, String role, boolean profileCompleted) {
        this.token = token;
        this.role = role;
        this.profileCompleted = profileCompleted;
    }

    public String getToken() { return token; }
    public String getRole() { return role; }
    public boolean isProfileCompleted() { return profileCompleted; }
}
