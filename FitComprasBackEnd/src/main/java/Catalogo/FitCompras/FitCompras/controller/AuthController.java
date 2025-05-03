package Catalogo.FitCompras.FitCompras.controller;

import Catalogo.FitCompras.FitCompras.entities.User;
import Catalogo.FitCompras.FitCompras.repositories.UserRepository;
import Catalogo.FitCompras.FitCompras.service.UserService;
import Catalogo.FitCompras.FitCompras.util.JwtUtil;
import Catalogo.FitCompras.FitCompras.util.LoginRequest;
import Catalogo.FitCompras.FitCompras.util.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        try {
            userService.register(request);
            return ResponseEntity.ok("Usuario registrado con éxito");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // Buscar usuario por email
            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new IllegalArgumentException("❌ Usuario no encontrado"));
    
            // Verificar contraseña
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                throw new IllegalArgumentException("❌ Contraseña incorrecta");
            }
    
            // Generar token
            String token = jwtUtil.generateToken(user.getEmail());
            return ResponseEntity.ok(token);
    
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            // Captura errores no controlados
            e.printStackTrace();
            return ResponseEntity.status(500).body("❌ Error interno del servidor: " + e.getMessage());
        }
    }
    
    

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}
