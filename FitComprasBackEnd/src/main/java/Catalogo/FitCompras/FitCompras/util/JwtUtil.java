package Catalogo.FitCompras.FitCompras.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "01234567890123456789012345678901"; // Mínimo 32 caracteres
    private static final long EXPIRATION_TIME = 86400000; // 1 día

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // ✅ Funciona en 0.11.5
                .compact();
    }

    public String extractUsername(String token) {
        try {
            Claims claims = Jwts.parserBuilder() // ✅ Esto sí funciona en 0.11.5
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.getSubject();
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Token expirado");
        } catch (MalformedJwtException e) {
            throw new RuntimeException("Token inválido");
        } catch (Exception e) {
            throw new RuntimeException("Error procesando el token");
        }
    }
}

