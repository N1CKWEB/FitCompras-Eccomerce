package Catalogo.FitCompras.FitCompras.controller;

import Catalogo.FitCompras.FitCompras.dto.ProductoDTO;
import Catalogo.FitCompras.FitCompras.entities.Storage;
import Catalogo.FitCompras.FitCompras.entities.SubCategoria;
import Catalogo.FitCompras.FitCompras.repositories.SubCategoriaRepository;
import Catalogo.FitCompras.FitCompras.service.ArchivosStorageService;
import Catalogo.FitCompras.FitCompras.service.ProductoService;
import Catalogo.FitCompras.FitCompras.service.StorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;

import java.util.List;

@RestController
@RequestMapping("/productos")
public class ProductoController {

    private final ProductoService productoService;
    private final ArchivosStorageService archivosStorageService;
    private final SubCategoriaRepository subCategoriaRepository;
    private final StorageService storageService;

    public ProductoController(
            ProductoService productoService,
            ArchivosStorageService fileStorageService,
            SubCategoriaRepository subCategoriaRepository,
            StorageService storageService) {
        this.productoService = productoService;
        this.archivosStorageService = fileStorageService;
        this.subCategoriaRepository = subCategoriaRepository;
        this.storageService = storageService;
    }

    @PostMapping
    public ResponseEntity<ProductoDTO> crearProducto(
            @RequestParam("nombre") String nombre,
            @RequestParam("precio") double precio,
            @RequestParam(value = "imagen", required = false) MultipartFile imagen,
            @RequestParam("subCategoriaId") Long subCategoriaId) {

        ProductoDTO dto = new ProductoDTO();
        dto.setNombre(nombre);
        dto.setPrecio(precio);

        SubCategoria subCategoria = subCategoriaRepository.findById(subCategoriaId)
                .orElseThrow(() -> new RuntimeException("Subcategoría no encontrada"));
        dto.setSubCategoria(subCategoria);

        Storage imagenGuardada = null;
        if (imagen != null && !imagen.isEmpty()) {
            try {
                imagenGuardada = storageService.guardarArchivo(imagen, "producto", null); // o pasar ID si aplica
            } catch (IOException e) {
                throw new RuntimeException("Error al guardar la imagen", e);
            }
        }

        ProductoDTO creado = productoService.crearProducto(dto, imagenGuardada);
        return ResponseEntity.ok(creado);
    }

    @GetMapping
    public ResponseEntity<List<ProductoDTO>> obtenerProductos() {
        return ResponseEntity.ok(productoService.obtenerTodos());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductoDTO> actualizarProducto(
            @PathVariable Long id,
            @RequestParam("nombre") String nombre,
            @RequestParam("precio") Double precio,
            @RequestParam(value = "imagen", required = false) MultipartFile imagen,
            @RequestParam(value = "subCategoriaId", required = false) Long subCategoriaId) {

        ProductoDTO dto = new ProductoDTO();
        dto.setNombre(nombre);
        dto.setPrecio(precio);

        if (subCategoriaId != null) {
            subCategoriaRepository.findById(subCategoriaId).ifPresent(dto::setSubCategoria);
        }

        Storage imagenGuardada = null;
        if (imagen != null && !imagen.isEmpty()) {
            try {
                imagenGuardada = storageService.guardarArchivo(imagen, "producto", id);
            } catch (IOException e) {
                throw new RuntimeException("Error al guardar la imagen", e);
            }
        }

        ProductoDTO actualizado = productoService.actualizarProducto(id, dto, imagenGuardada);
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        productoService.eliminarProducto(id);
        return ResponseEntity.noContent().build();
    }
}
