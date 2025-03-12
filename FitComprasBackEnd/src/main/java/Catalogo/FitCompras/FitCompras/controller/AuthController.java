package Catalogo.FitCompras.FitCompras.controller;

import Catalogo.FitCompras.FitCompras.service.UserService;
import Catalogo.FitCompras.FitCompras.util.JwtUtil;
import Catalogo.FitCompras.FitCompras.util.LoginRequest;
import Catalogo.FitCompras.FitCompras.util.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        userService.register(request);
        return "Usuario registrado con éxito";
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return jwtUtil.generateToken(request.getUsername());
    }
}
