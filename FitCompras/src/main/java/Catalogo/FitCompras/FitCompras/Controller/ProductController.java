package Catalogo.FitCompras.FitCompras.Controller;

import Catalogo.FitCompras.FitCompras.Entities.Product;
import Catalogo.FitCompras.FitCompras.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/productos")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> obtenerTodosLosProductos() {
        return productService.listarProductos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> obtenerProductoPorId(@PathVariable Long id) {
        Optional<Product> producto = productService.obtenerProductoPorId(id);
        return producto.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Product crearProducto(@RequestBody Product producto) {
        return productService.guardarProducto(producto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> actualizarProducto(@PathVariable Long id, @RequestBody Product productoDetalles) {
        Product productoActualizado = productService.actualizarProducto(id, productoDetalles);
        return (productoActualizado != null) ? ResponseEntity.ok(productoActualizado) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        productService.eliminarProducto(id);
        return ResponseEntity.noContent().build();
    }
}
