package Catalogo.FitCompras.FitCompras.repositories;

import Catalogo.FitCompras.FitCompras.entities.Descuento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DescuentoRepository extends JpaRepository<Descuento, Long> {
}