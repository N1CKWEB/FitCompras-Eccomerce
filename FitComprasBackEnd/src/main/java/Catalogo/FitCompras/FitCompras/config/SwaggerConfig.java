package Catalogo.FitCompras.FitCompras.config;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API Documentada con Swagger")
                        .version("1.0")
                        .description("Documentación generada automáticamente con Springdoc OpenAPI"));
    }
}