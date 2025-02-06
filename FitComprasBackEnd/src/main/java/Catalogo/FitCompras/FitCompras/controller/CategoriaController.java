package Catalogo.FitCompras.FitCompras.controller;

import Catalogo.FitCompras.FitCompras.dto.CategoriaDTO;
import Catalogo.FitCompras.FitCompras.service.CategoriaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @PostMapping
    public ResponseEntity<CategoriaDTO> crearCategoria(@RequestBody CategoriaDTO categoriaDTO) {
        return ResponseEntity.ok(categoriaService.crearCategoria(categoriaDTO));
    }

    @GetMapping
    public ResponseEntity<List<CategoriaDTO>> obtenerCategorias() {
        return ResponseEntity.ok(categoriaService.obtenerTodas());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaDTO> actualizarCategoria(@PathVariable Long id, @RequestBody CategoriaDTO categoriaDTO) {
        return ResponseEntity.ok(categoriaService.actualizarCategoria(id, categoriaDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCategoria(@PathVariable Long id) {
        categoriaService.eliminarCategoria(id);
        return ResponseEntity.noContent().build();
    }
}