package Catalogo.FitCompras.FitCompras.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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

    public Double calcularPrecioConDescuento() {
        if (descuentos == null || descuentos.isEmpty()) {
            return precio; // Si no hay descuentos, retorna el precio original
        }
        double descuentoTotal = descuentos.stream()
                .mapToDouble(Descuento::getPorcentaje)
                .sum();
        return precio - (precio * (descuentoTotal / 100));
    }

    @ManyToOne
    private SubCategoria subCategoria;


    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Descuento> descuentos;
}