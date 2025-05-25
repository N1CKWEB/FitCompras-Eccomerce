package Catalogo.FitCompras.FitCompras.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Getter
@Setter
@Builder
@Entity
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name = "archivos")
public class Storage {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "nombre_original", nullable = false)
        private String nombreOriginal;

        @Column(name = "nombre_guardado", unique = true, nullable = false)
        private String nombreGuardado;

        @Column(name = "tipo", nullable = false)
        private String tipo; // MIME: image/jpeg, application/pdf, etc.

        @Column(name = "tamanio")
        private long tamanio;

        @Column(name = "categoria")
        private String categoria; // Ej: perfil, documento, etc.

        @Column(name = "referencia_id")
        private Long referenciaId; // ID de usuario, producto, etc.

        @Column(name = "fecha_subida")
        private LocalDateTime fechaSubida = LocalDateTime.now();


}