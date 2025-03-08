package Catalogo.FitCompras.FitCompras.service;

import Catalogo.FitCompras.FitCompras.dto.SubCategoriaDTO;
import Catalogo.FitCompras.FitCompras.entities.Categoria;
import Catalogo.FitCompras.FitCompras.entities.SubCategoria;
import Catalogo.FitCompras.FitCompras.repositories.CategoriaRepository;
import Catalogo.FitCompras.FitCompras.repositories.SubCategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubCategoriaService {

    private final SubCategoriaRepository subCategoriaRepository;
    private final CategoriaRepository categoriaRepository;

    public SubCategoriaDTO crearSubCategoria(SubCategoriaDTO dto) {
        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        SubCategoria subCategoria = new SubCategoria();
        subCategoria.setNombre(dto.getNombre());
        subCategoria.setCategoria(categoria);

        subCategoria = subCategoriaRepository.save(subCategoria);
        return convertirADTO(subCategoria);
    }

    public List<SubCategoriaDTO> obtenerTodas() {
        return subCategoriaRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public SubCategoriaDTO obtenerPorId(Long id) {
        SubCategoria subCategoria = subCategoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subcategoría no encontrada"));
        return convertirADTO(subCategoria);
    }

    public SubCategoriaDTO actualizar(Long id, SubCategoriaDTO dto) {
        SubCategoria subCategoria = subCategoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subcategoría no encontrada"));

        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        subCategoria.setNombre(dto.getNombre());
        subCategoria.setCategoria(categoria);

        subCategoria = subCategoriaRepository.save(subCategoria);
        return convertirADTO(subCategoria);
    }

    public void eliminar(Long id) {
        if (!subCategoriaRepository.existsById(id)) {
            throw new RuntimeException("Subcategoría no encontrada");
        }
        subCategoriaRepository.deleteById(id);
    }

    private SubCategoriaDTO convertirADTO(SubCategoria subCategoria) {
        return new SubCategoriaDTO(
                subCategoria.getId(),
                subCategoria.getNombre(),
                subCategoria.getCategoria().getId()
        );
    }
}
