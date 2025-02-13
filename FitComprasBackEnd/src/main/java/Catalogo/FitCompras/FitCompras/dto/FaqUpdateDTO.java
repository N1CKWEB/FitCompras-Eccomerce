package Catalogo.FitCompras.FitCompras.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FaqUpdateDTO {
    
    @NotBlank(message = "{faq.answer.required}")
    private String answer;
}
