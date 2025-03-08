package Catalogo.FitCompras.FitCompras.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubCategoriaDTO {
    private Long id;
    private String nombre;
    private Long categoriaId; // Referencia a la categoría padre
}

