package Catalogo.FitCompras.FitCompras.service;


import Catalogo.FitCompras.FitCompras.entities.Storage;
import Catalogo.FitCompras.FitCompras.repositories.StorageRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Data
@AllArgsConstructor
public class StorageService {

    @Value("${archivo.upload-dir}")
    private Path directorio;

    @Autowired
    private StorageRepository archivoRepository;

    public Resource obtenerArchivoPorNombreOriginal(String nombreOriginal) throws MalformedURLException {
        Storage archivo = archivoRepository.findByNombreGuardado(nombreOriginal)
                .orElseThrow(() -> new RuntimeException("Archivo no registrado: " + nombreOriginal));

        return cargarArchivoComoRecurso(archivo.getNombreGuardado());
    }
    public Resource obtenerArchivoPorNombreGuardado(String nombreGuardado) throws MalformedURLException {
        Storage archivo = archivoRepository.findByNombreGuardado(nombreGuardado)
                .orElseThrow(() -> new RuntimeException("Archivo no registrado: " + nombreGuardado));

        return cargarArchivoComoRecurso(archivo.getNombreGuardado());
    }
    public Resource obtenerArchivoPorId(Long id) throws MalformedURLException {
        Storage archivo = archivoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Archivo no registrado con ID: " + id));

        return cargarArchivoComoRecurso(archivo.getNombreGuardado());
    }

    private Resource cargarArchivoComoRecurso(String nombreGuardado) throws MalformedURLException {
        Path archivoPath = directorio.resolve(nombreGuardado).normalize();
        Resource recurso = new UrlResource(archivoPath.toUri());

        if (!recurso.exists()) {
            throw new RuntimeException("Archivo no encontrado en el disco: " + nombreGuardado);
        }

        return recurso;
    }

    public Storage guardarArchivo(MultipartFile archivo, String categoria, Long referenciaId) throws IOException {
        String nombreOriginal = archivo.getOriginalFilename();
        String extension = FilenameUtils.getExtension(nombreOriginal);
        String nombreGuardado = UUID.randomUUID() + "." + extension;
        Path destino = directorio.resolve(nombreGuardado).normalize();

        Files.copy(archivo.getInputStream(), destino, StandardCopyOption.REPLACE_EXISTING);

        Storage nuevoArchivo = new Storage();
        nuevoArchivo.setNombreOriginal(nombreOriginal);
        nuevoArchivo.setNombreGuardado(nombreGuardado);
        nuevoArchivo.setTipo(archivo.getContentType());
        nuevoArchivo.setTamanio(archivo.getSize());
        nuevoArchivo.setCategoria(categoria);
        nuevoArchivo.setReferenciaId(referenciaId);
        nuevoArchivo.setFechaSubida(LocalDateTime.now());

        return archivoRepository.save(nuevoArchivo);
    }

}
