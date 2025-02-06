package Catalogo.FitCompras.FitCompras.repositories;

import Catalogo.FitCompras.FitCompras.entities.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}