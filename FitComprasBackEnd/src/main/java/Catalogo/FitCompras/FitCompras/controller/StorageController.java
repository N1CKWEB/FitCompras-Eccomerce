package Catalogo.FitCompras.FitCompras.controller;



import Catalogo.FitCompras.FitCompras.entities.Storage;
import Catalogo.FitCompras.FitCompras.repositories.StorageRepository;
import Catalogo.FitCompras.FitCompras.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/storage")
public class StorageController {


    @Autowired
    private StorageService storageService;

    @Autowired
    private StorageRepository archivoRepository;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) Long referenciaId
    ) {
        try {
            Storage savedFile = storageService.guardarArchivo(file, categoria, referenciaId);
            return ResponseEntity.ok(savedFile);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al subir el archivo: " + e.getMessage());
        }
    }

    @GetMapping("/download/{nombreOriginal}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String nombreOriginal) {
        try {
            Resource recurso = storageService.obtenerArchivoPorNombreOriginal(nombreOriginal);
            Storage archivo = archivoRepository.findByNombreOriginal(nombreOriginal)
                    .orElseThrow(() -> new RuntimeException("Archivo no registrado"));

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(archivo.getTipo()))
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + archivo.getNombreOriginal() + "\"")
                    .body(recurso);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/view/{nombreOriginal}")
    public ResponseEntity<Resource> viewFileInline(@PathVariable String nombreOriginal) {
        try {
            Resource recurso = storageService.obtenerArchivoPorNombreOriginal(nombreOriginal);
            Storage archivo = archivoRepository.findByNombreGuardado(nombreOriginal)
                    .orElseThrow(() -> new RuntimeException("Archivo no registrado"));

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(archivo.getTipo()))
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "inline; filename=\"" + archivo.getNombreOriginal() + "\"")
                    .body(recurso);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/raw/{nombreGuardado}")
    public ResponseEntity<Resource> getRawFile(@PathVariable String nombreGuardado) {
        try {
            Resource recurso = storageService.obtenerArchivoPorNombreGuardado(nombreGuardado);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + nombreGuardado + "\"")
                    .body(recurso);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

}
