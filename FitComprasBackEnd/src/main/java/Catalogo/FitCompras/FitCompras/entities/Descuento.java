package Catalogo.FitCompras.FitCompras.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Descuento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descripcion;
    private Double porcentaje;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "producto_id")
    private Producto producto;
}