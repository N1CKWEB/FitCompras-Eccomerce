package Catalogo.FitCompras.FitCompras.controller;

import Catalogo.FitCompras.FitCompras.dto.ProductoDTO;
import Catalogo.FitCompras.FitCompras.entities.SubCategoria;
import Catalogo.FitCompras.FitCompras.service.ArchivosStorageService;
import Catalogo.FitCompras.FitCompras.service.ProductoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;


@RestController
@RequestMapping("/productos")
public class ProductoController {

    private final ProductoService productoService;
    private final ArchivosStorageService archivosStorageService;

    public ProductoController(ProductoService productoService, ArchivosStorageService fileStorageService) {
        this.productoService = productoService;
        this.archivosStorageService = fileStorageService;
    }

    @PostMapping
    public ResponseEntity<ProductoDTO> crearProducto(
            @RequestParam("nombre") String nombre,
            @RequestParam("precio") double precio,
            @RequestParam(value = "imagen", required = false) MultipartFile imagen,
            @RequestParam("subCategoria") SubCategoria subCategoria) {

        ProductoDTO dto = new ProductoDTO();
        dto.setNombre(nombre);
        dto.setPrecio(precio);
        dto.setSubCategoria(subCategoria);

        ProductoDTO creado = productoService.crearProducto(dto, imagen);
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
            @RequestParam("subCategoria") SubCategoria subCategoria) {

        ProductoDTO dto = new ProductoDTO();
        dto.setNombre(nombre);
        dto.setPrecio(precio);
        dto.setSubCategoria(subCategoria);

        ProductoDTO actualizado = productoService.actualizarProducto(id, dto, imagen);
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        productoService.eliminarProducto(id);
        return ResponseEntity.noContent().build();
    }
}