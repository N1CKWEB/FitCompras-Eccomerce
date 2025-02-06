package Catalogo.FitCompras.FitCompras.Controller;

import Catalogo.FitCompras.FitCompras.Dto.ProductoDTO;
import Catalogo.FitCompras.FitCompras.Service.ProductoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productos")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @PostMapping
    public ResponseEntity<ProductoDTO> crearProducto(@RequestBody ProductoDTO productoDTO) {
        return ResponseEntity.ok(productoService.crearProducto(productoDTO));
    }

    @GetMapping
    public ResponseEntity<List<ProductoDTO>> obtenerProductos() {
        return ResponseEntity.ok(productoService.obtenerTodos());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductoDTO> actualizarProducto(@PathVariable Long id, @RequestBody ProductoDTO productoDTO) {
        return ResponseEntity.ok(productoService.actualizarProducto(id, productoDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        productoService.eliminarProducto(id);
        return ResponseEntity.noContent().build();
    }
}