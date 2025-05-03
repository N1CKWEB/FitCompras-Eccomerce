package Catalogo.FitCompras.FitCompras.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class LoginResponse {
    private Long id;
    private String username;
    private Set<String> roles;

    public LoginResponse(Long id, String username, Set<String> roles) {
        this.id = id;
        this.username = username;
        this.roles = roles;
    }
}

