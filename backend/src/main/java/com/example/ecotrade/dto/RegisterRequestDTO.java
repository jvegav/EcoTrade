package com.example.ecotrade.dto;

public class RegisterRequestDTO {
    private String name;
    private String email;
    private String nationality;
    private String supabaseId;

    public RegisterRequestDTO() {
    }

    public RegisterRequestDTO(String name, String email, String nationality, String supabaseId) {
        this.name = name;
        this.email = email;
        this.nationality = nationality;
        this.supabaseId = supabaseId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getSupabaseId() {
        return supabaseId;
    }

    public void setSupabaseId(String supabaseId) {
        this.supabaseId = supabaseId;
    }
}
