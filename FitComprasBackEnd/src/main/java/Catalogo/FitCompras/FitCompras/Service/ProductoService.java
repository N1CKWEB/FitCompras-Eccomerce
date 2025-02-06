package Catalogo.FitCompras.FitCompras.Service;

import Catalogo.FitCompras.FitCompras.Dto.ProductoDTO;
import Catalogo.FitCompras.FitCompras.Entities.Producto;
import Catalogo.FitCompras.FitCompras.Repositories.ProductoRepository;
import Catalogo.FitCompras.FitCompras.Util.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public ProductoDTO crearProducto(ProductoDTO dto) {
        Producto producto = new Producto();
        producto.setNombre(dto.getNombre());
        producto.setPrecio(dto.getPrecio());
        producto.setImagenBase64(dto.getImagenBase64());
        producto.setSubCategoria(dto.getSubCategoria());
        
        Producto saved = productoRepository.save(producto);
        return convertirAProductoDTO(saved);
    }

    public List<ProductoDTO> obtenerTodos() {
        return productoRepository.findAll().stream()
                .map(this::convertirAProductoDTO)
                .collect(Collectors.toList());
    }

    public ProductoDTO actualizarProducto(Long id, ProductoDTO dto) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
        
        producto.setNombre(dto.getNombre());
        producto.setPrecio(dto.getPrecio());
        producto.setImagenBase64(dto.getImagenBase64());
        producto.setSubCategoria(dto.getSubCategoria());

        return convertirAProductoDTO(productoRepository.save(producto));
    }

    public void eliminarProducto(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Producto no encontrado");
        }
        productoRepository.deleteById(id);
    }

    private ProductoDTO convertirAProductoDTO(Producto producto) {
        return new ProductoDTO(producto.getId(), producto.getNombre(), producto.getPrecio(), producto.getImagenBase64(), producto.getSubCategoria());
    }
}