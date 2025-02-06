package Catalogo.FitCompras.FitCompras.Repositories;

import Catalogo.FitCompras.FitCompras.Entities.Descuento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DescuentoRepository extends JpaRepository<Descuento, Long> {
}