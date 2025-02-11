package Catalogo.FitCompras.FitCompras.repositories;
import Catalogo.FitCompras.FitCompras.entities.Faq;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FaqRepository extends JpaRepository<Faq, Long> {
    Optional<Faq> findByQuestion(String question);
    boolean existsByQuestion(String question);
}
