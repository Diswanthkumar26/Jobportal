package com.jobportal.server.dto;

public class LoginResponse {
    private String token;
    private String role;
    private boolean profileCompleted;
    private Long userId;
    private String email;

    public LoginResponse(String token,
                         String role,
                         boolean profileCompleted,
                         Long userId,
                         String email) {
        this.token = token;
        this.role = role;
        this.profileCompleted = profileCompleted;
        this.userId = userId;
        this.email = email;
    }

    public String getToken() { return token; }
    public String getRole() { return role; }
    public boolean isProfileCompleted() { return profileCompleted; }
    public Long getUserId() { return userId; }
    public String getEmail() { return email; }
}
