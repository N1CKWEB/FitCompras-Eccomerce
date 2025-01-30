package Catalogo.FitCompras.FitCompras.Controller;

import Catalogo.FitCompras.FitCompras.Dto.CreateProductDTO;
import Catalogo.FitCompras.FitCompras.Dto.ProductDTO;
import Catalogo.FitCompras.FitCompras.Dto.UpdateProductDTO;
import Catalogo.FitCompras.FitCompras.Entities.Product;
import Catalogo.FitCompras.FitCompras.Service.ProductService;
import jakarta.validation.Valid;
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

    // Obtener todos los productos
    @GetMapping
    public List<ProductDTO> obtenerTodosLosProductos() {
        return productService.listarProductos();
    }

    // Obtener un producto por ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> obtenerProductoPorId(@PathVariable Long id) {
        Optional<ProductDTO> producto = productService.obtenerProductoPorId(id);
        return producto.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear un producto
    @PostMapping
    public ResponseEntity<ProductDTO> crearProducto(@Valid @RequestBody CreateProductDTO createProductDTO) {
        ProductDTO nuevoProducto = productService.guardarProducto(createProductDTO);
        return ResponseEntity.ok(nuevoProducto);
    }

    // Actualizar un producto
    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> actualizarProducto(@PathVariable Long id, @Valid @RequestBody UpdateProductDTO updateProductDTO) {
        Optional<ProductDTO> productoActualizado = productService.actualizarProducto(id, updateProductDTO);
        return productoActualizado.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Eliminar un producto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        boolean eliminado = productService.eliminarProducto(id);
        return eliminado ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
