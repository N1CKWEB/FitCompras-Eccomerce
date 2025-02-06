package Catalogo.FitCompras.FitCompras.Repositories;

import Catalogo.FitCompras.FitCompras.Entities.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}