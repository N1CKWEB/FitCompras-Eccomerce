package Catalogo.FitCompras.FitCompras.Service;

import Catalogo.FitCompras.FitCompras.Dto.CreateProductDTO;
import Catalogo.FitCompras.FitCompras.Dto.ProductDTO;
import Catalogo.FitCompras.FitCompras.Dto.UpdateProductDTO;
import Catalogo.FitCompras.FitCompras.Entities.Product;
import Catalogo.FitCompras.FitCompras.Repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {


    @Autowired
    private ProductRepository productRepository;

    // Convertir Product a ProductDTO
    private ProductDTO convertToDTO(Product product) {
        return new ProductDTO(product.getId(), product.getNombre(), product.getPrecio(), product.getDescripcion());
    }

    // Listar productos
    public List<ProductDTO> listarProductos() {
        return productRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Obtener un producto por ID
    public Optional<ProductDTO> obtenerProductoPorId(Long id) {
        return productRepository.findById(id).map(this::convertToDTO);
    }

    // Crear un producto
    public ProductDTO guardarProducto(CreateProductDTO createProductDTO) {
        Product product = new Product();
        product.setNombre(createProductDTO.getNombre());
        product.setPrecio(createProductDTO.getPrecio());
        product.setDescripcion(createProductDTO.getDescripcion());

        product = productRepository.save(product);
        return convertToDTO(product);
    }

    // Actualizar un producto
    public Optional<ProductDTO> actualizarProducto(Long id, UpdateProductDTO updateProductDTO) {
        return productRepository.findById(id).map(product -> {
            product.setNombre(updateProductDTO.getNombre());
            product.setPrecio(updateProductDTO.getPrecio());
            product.setDescripcion(updateProductDTO.getDescripcion());

            productRepository.save(product);
            return convertToDTO(product);
        });
    }

    // Eliminar un producto
    public boolean eliminarProducto(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
