package Catalogo.FitCompras.FitCompras.Service;

import Catalogo.FitCompras.FitCompras.Dto.DescuentoDTO;
import Catalogo.FitCompras.FitCompras.Entities.Descuento;
import Catalogo.FitCompras.FitCompras.Repositories.DescuentoRepository;
import Catalogo.FitCompras.FitCompras.Util.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DescuentoService {

    private final DescuentoRepository descuentoRepository;

    public DescuentoService(DescuentoRepository descuentoRepository) {
        this.descuentoRepository = descuentoRepository;
    }

    public DescuentoDTO crearDescuento(DescuentoDTO dto) {
        Descuento descuento = new Descuento();
        descuento.setDescripcion(dto.getDescripcion());
        descuento.setPorcentaje(dto.getPorcentaje());

        Descuento saved = descuentoRepository.save(descuento);
        return convertirADescuentoDTO(saved);
    }

    public List<DescuentoDTO> obtenerTodos() {
        return descuentoRepository.findAll().stream()
                .map(this::convertirADescuentoDTO)
                .collect(Collectors.toList());
    }

    public DescuentoDTO actualizarDescuento(Long id, DescuentoDTO dto) {
        Descuento descuento = descuentoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Descuento no encontrado"));

        descuento.setDescripcion(dto.getDescripcion());
        descuento.setPorcentaje(dto.getPorcentaje());

        return convertirADescuentoDTO(descuentoRepository.save(descuento));
    }

    public void eliminarDescuento(Long id) {
        if (!descuentoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Descuento no encontrado");
        }
        descuentoRepository.deleteById(id);
    }

    private DescuentoDTO convertirADescuentoDTO(Descuento descuento) {
        return new DescuentoDTO(descuento.getId(), descuento.getDescripcion(), descuento.getPorcentaje());
    }
}