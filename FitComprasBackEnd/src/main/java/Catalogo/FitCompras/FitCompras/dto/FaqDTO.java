package Catalogo.FitCompras.FitCompras.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FaqDTO {
    private Long id;
    private String question;
    private String answer;
}
