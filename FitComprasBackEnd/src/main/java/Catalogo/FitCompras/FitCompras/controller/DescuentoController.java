package Catalogo.FitCompras.FitCompras.controller;

import Catalogo.FitCompras.FitCompras.dto.DescuentoDTO;
import Catalogo.FitCompras.FitCompras.service.DescuentoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/descuentos")
public class DescuentoController {

    private final DescuentoService descuentoService;

    public DescuentoController(DescuentoService descuentoService) {
        this.descuentoService = descuentoService;
    }

    @PostMapping
    public ResponseEntity<DescuentoDTO> crearDescuento(@RequestBody DescuentoDTO descuentoDTO) {
        return ResponseEntity.ok(descuentoService.crearDescuento(descuentoDTO));
    }

    @GetMapping
    public ResponseEntity<List<DescuentoDTO>> obtenerDescuentos() {
        return ResponseEntity.ok(descuentoService.obtenerTodos());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DescuentoDTO> actualizarDescuento(@PathVariable Long id, @RequestBody DescuentoDTO descuentoDTO) {
        return ResponseEntity.ok(descuentoService.actualizarDescuento(id, descuentoDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarDescuento(@PathVariable Long id) {
        descuentoService.eliminarDescuento(id);
        return ResponseEntity.noContent().build();
    }
}