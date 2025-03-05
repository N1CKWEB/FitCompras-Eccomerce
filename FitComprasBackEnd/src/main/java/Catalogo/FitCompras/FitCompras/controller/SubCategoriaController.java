package Catalogo.FitCompras.FitCompras.controller;

import Catalogo.FitCompras.FitCompras.dto.SubCategoriaDTO;
import Catalogo.FitCompras.FitCompras.service.SubCategoriaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subcategorias")
public class SubCategoriaController {

    private final SubCategoriaService subCategoriaService;

    public SubCategoriaController(SubCategoriaService subCategoriaService) {
        this.subCategoriaService = subCategoriaService;
    }

    @GetMapping
    public ResponseEntity<List<SubCategoriaDTO>> listarSubCategorias() {
        return ResponseEntity.ok(subCategoriaService.obtenerTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubCategoriaDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(subCategoriaService.obtenerPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubCategoriaDTO> actualizarSubCategoria(@PathVariable Long id, @RequestBody SubCategoriaDTO subCategoriaDTO) {
        return ResponseEntity.ok(subCategoriaService.actualizar(id, subCategoriaDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarSubCategoria(@PathVariable Long id) {
        subCategoriaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
