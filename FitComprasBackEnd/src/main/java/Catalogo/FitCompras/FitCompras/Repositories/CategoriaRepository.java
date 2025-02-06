package Catalogo.FitCompras.FitCompras.Repositories;

import Catalogo.FitCompras.FitCompras.Entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}