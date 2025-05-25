package Catalogo.FitCompras.FitCompras.repositories;

import Catalogo.FitCompras.FitCompras.entities.Storage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StorageRepository extends JpaRepository<Storage, Long> {

    Optional<Storage> findByNombreGuardado(String nombreGuardado);
    Optional<Storage> findByNombreOriginal(String nombreGuardado);

}
