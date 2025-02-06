package Catalogo.FitCompras.FitCompras.dto;

import Catalogo.FitCompras.FitCompras.entities.SubCategoria;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoDTO {
    private Long id;
    private String nombre;
    private Double precio;
    private String imagenBase64;
    private SubCategoria subCategoria;
}