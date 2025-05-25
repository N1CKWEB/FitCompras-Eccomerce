package Catalogo.FitCompras.FitCompras.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class StoragePathConfiguration {

    private final FileStorageProperties properties;

    public StoragePathConfiguration(FileStorageProperties properties) {
        this.properties = properties;
    }

    @Bean
    public Path storageLocation() {
        return Paths.get(properties.getUploadDir()).toAbsolutePath().normalize();
    }
}
