package Catalogo.FitCompras.FitCompras.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private Double precio;


    private String imagenUrl; // ruta o URL donde se almacena la imagen


    @ManyToOne
    private SubCategoria subCategoria;
}