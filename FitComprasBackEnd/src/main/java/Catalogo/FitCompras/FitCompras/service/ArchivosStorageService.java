package Catalogo.FitCompras.FitCompras.service;


import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;


@Service
public class ArchivosStorageService {

    private final Path directorioImagenes = Paths.get("imagenes");

    public ArchivosStorageService() throws IOException {
        Files.createDirectories(directorioImagenes);
    }

    public String guardarImagen(MultipartFile archivo) {
        String nombreArchivo = UUID.randomUUID() + "_" + archivo.getOriginalFilename();
        Path destino = directorioImagenes.resolve(nombreArchivo);

        try {
            Files.copy(archivo.getInputStream(), destino, StandardCopyOption.REPLACE_EXISTING);
            return destino.toString();
        } catch (IOException e) {
            throw new RuntimeException("Error al guardar imagen", e);
        }
    }
}
