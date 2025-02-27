package Catalogo.FitCompras.FitCompras.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DescuentoDTO {
    private Long id;
    private String descripcion;
    private Double porcentaje;
}