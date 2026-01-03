package com.example.ecotrade.dto;

public class LoginRequestDTO {
    private String email;
    private String supabaseId;

    public LoginRequestDTO() {
    }

    public LoginRequestDTO(String email, String supabaseId) {
        this.email = email;
        this.supabaseId = supabaseId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSupabaseId() {
        return supabaseId;
    }

    public void setSupabaseId(String supabaseId) {
        this.supabaseId = supabaseId;
    }
}
