package Catalogo.FitCompras.FitCompras.Dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateProductDTO {

    @NotBlank(message = "El nombre del producto es obligatorio")
    private String nombre;

    @Positive(message = "El precio debe ser mayor a 0")
    private double precio;

    private String descripcion;
}