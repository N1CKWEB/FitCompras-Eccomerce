package Catalogo.FitCompras.FitCompras.service;

import Catalogo.FitCompras.FitCompras.dto.ProductoDTO;
import Catalogo.FitCompras.FitCompras.entities.Producto;
import Catalogo.FitCompras.FitCompras.entities.Storage;
import Catalogo.FitCompras.FitCompras.repositories.ProductoRepository;
import Catalogo.FitCompras.FitCompras.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final ArchivosStorageService archivosStorageService;

    public ProductoService(ProductoRepository productoRepository, ArchivosStorageService fileStorageService) {
        this.productoRepository = productoRepository;
        this.archivosStorageService = fileStorageService;
    }

    public ProductoDTO crearProducto(ProductoDTO dto, Storage imagenGuardada) {
        Producto producto = new Producto();
        producto.setNombre(dto.getNombre());
        producto.setPrecio(dto.getPrecio());

        if (imagenGuardada != null) {
            producto.setImagenUrl(imagenGuardada.getNombreGuardado()); // o una URL completa si lo servís por HTTP
        }

        producto.setSubCategoria(dto.getSubCategoria());

        Producto saved = productoRepository.save(producto);
        return convertirAProductoDTO(saved);
    }

    public List<ProductoDTO> obtenerTodos() {
        return productoRepository.findAll().stream()
                .map(this::convertirAProductoDTO)
                .collect(Collectors.toList());
    }

    public ProductoDTO actualizarProducto(Long id, ProductoDTO dto, Storage imagenGuardada) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

        producto.setNombre(dto.getNombre());
        producto.setPrecio(dto.getPrecio());

        if (imagenGuardada != null) {
            producto.setImagenUrl(imagenGuardada.getNombreOriginal());
        }

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
        return new ProductoDTO(
                producto.getId(),
                producto.getNombre(),
                producto.getPrecio(),
                producto.getImagenUrl(), // cambiado
                producto.getSubCategoria(),
                producto.calcularPrecioConDescuento()

        );
    }
}
