package Catalogo.FitCompras.FitCompras.Service;

import Catalogo.FitCompras.FitCompras.Entities.Product;
import Catalogo.FitCompras.FitCompras.Repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> listarProductos() {
        return productRepository.findAll();
    }

    public Optional<Product> obtenerProductoPorId(Long id) {
        return productRepository.findById(id);
    }

    public Product guardarProducto(Product producto) {
        return productRepository.save(producto);
    }

    public Product actualizarProducto(Long id, Product productoDetalles) {
        return productRepository.findById(id).map(producto -> {
            producto.setNombre(productoDetalles.getNombre());
            producto.setPrecio(productoDetalles.getPrecio());
            producto.setDescripcion(productoDetalles.getDescripcion());
            return productRepository.save(producto);
        }).orElse(null);
    }

    public void eliminarProducto(Long id) {
        productRepository.deleteById(id);
    }
}
