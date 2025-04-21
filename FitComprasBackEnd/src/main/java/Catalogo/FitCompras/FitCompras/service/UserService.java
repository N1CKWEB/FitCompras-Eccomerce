package Catalogo.FitCompras.FitCompras.service;

import Catalogo.FitCompras.FitCompras.dto.LoginResponse;
import Catalogo.FitCompras.FitCompras.entities.User;
import Catalogo.FitCompras.FitCompras.repositories.UserRepository;
import Catalogo.FitCompras.FitCompras.util.LoginRequest;
import Catalogo.FitCompras.FitCompras.util.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void register(RegisterRequest request) {
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Set.of("USER"))
                .build();
        
        userRepository.save(user);
    }
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Contraseña incorrecta");
        }

        return new LoginResponse(
                user.getId(),
                user.getUsername(),
                user.getRoles()
        );
        }

}
