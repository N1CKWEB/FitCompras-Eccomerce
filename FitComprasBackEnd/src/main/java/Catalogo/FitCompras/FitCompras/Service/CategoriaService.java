package Catalogo.FitCompras.FitCompras.Service;

import Catalogo.FitCompras.FitCompras.Dto.CategoriaDTO;
import Catalogo.FitCompras.FitCompras.Entities.Categoria;
import Catalogo.FitCompras.FitCompras.Repositories.CategoriaRepository;
import Catalogo.FitCompras.FitCompras.Util.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public CategoriaDTO crearCategoria(CategoriaDTO dto) {
        Categoria categoria = new Categoria();
        categoria.setNombre(dto.getNombre());
        
        Categoria saved = categoriaRepository.save(categoria);
        return convertirACategoriaDTO(saved);
    }

    public List<CategoriaDTO> obtenerTodas() {
        return categoriaRepository.findAll().stream()
                .map(this::convertirACategoriaDTO)
                .collect(Collectors.toList());
    }

    public CategoriaDTO actualizarCategoria(Long id, CategoriaDTO dto) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));

        categoria.setNombre(dto.getNombre());

        return convertirACategoriaDTO(categoriaRepository.save(categoria));
    }

    public void eliminarCategoria(Long id) {
        if (!categoriaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Categoría no encontrada");
        }
        categoriaRepository.deleteById(id);
    }

    private CategoriaDTO convertirACategoriaDTO(Categoria categoria) {
        return new CategoriaDTO(categoria.getId(), categoria.getNombre());
    }
}