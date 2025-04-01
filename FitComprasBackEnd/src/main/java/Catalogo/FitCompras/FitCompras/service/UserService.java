package Catalogo.FitCompras.FitCompras.service;

import Catalogo.FitCompras.FitCompras.entities.User;
import Catalogo.FitCompras.FitCompras.repositories.UserRepository;
import Catalogo.FitCompras.FitCompras.util.RegisterRequest;
import lombok.RequiredArgsConstructor;
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
}
