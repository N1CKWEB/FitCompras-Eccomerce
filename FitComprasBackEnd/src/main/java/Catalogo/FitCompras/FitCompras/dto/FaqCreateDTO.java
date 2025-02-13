package Catalogo.FitCompras.FitCompras.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FaqCreateDTO {
    
    @NotBlank(message = "{faq.question.required}")
    private String question;
    
    @NotBlank(message = "{faq.answer.required}")
    private String answer;
}