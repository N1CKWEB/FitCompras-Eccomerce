package Catalogo.FitCompras.FitCompras.controller;
import java.util.List;
import Catalogo.FitCompras.FitCompras.entities.User;
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

    @GetMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return jwtUtil.generateToken(request.getUsername());
    }
    
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    
    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "Usuario eliminado con éxito";
    }
}
