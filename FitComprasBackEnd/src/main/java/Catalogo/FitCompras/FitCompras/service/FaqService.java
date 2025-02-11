package Catalogo.FitCompras.FitCompras.service;


import Catalogo.FitCompras.FitCompras.dto.FaqUpdateDTO;
import Catalogo.FitCompras.FitCompras.dto.FaqCreateDTO;
import Catalogo.FitCompras.FitCompras.dto.FaqDTO;
import Catalogo.FitCompras.FitCompras.entities.Faq;
import Catalogo.FitCompras.FitCompras.repositories.FaqRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import Catalogo.FitCompras.FitCompras.exception.FaqNotFoundException;
import Catalogo.FitCompras.FitCompras.exception.DuplicateFaqException;


@Service
public class FaqService {

    private final FaqRepository faqRepository;

    public FaqService(FaqRepository faqRepository) {
        this.faqRepository = faqRepository;
    }

    @Cacheable(value = "faqs")
    public List<FaqDTO> getAllFaqs() {
        return faqRepository.findAll().stream()
                .map(faq -> new FaqDTO(faq.getId(), faq.getQuestion(), faq.getAnswer()))
                .collect(Collectors.toList());
    }

    @Cacheable(value = "faqs", key = "#id")
    public FaqDTO getFaqById(Long id) {
        Faq faq = faqRepository.findById(id)
                .orElseThrow(() -> new FaqNotFoundException("FAQ not found"));
        return new FaqDTO(faq.getId(), faq.getQuestion(), faq.getAnswer());
    }

    @CachePut(value = "faqs", key = "#result.id")
    public FaqDTO createFaq(FaqCreateDTO dto) {
        if (faqRepository.existsByQuestion(dto.getQuestion())) {
            throw new DuplicateFaqException("FAQ already exists");
        }
        Faq faq = faqRepository.save(new Faq(null, dto.getQuestion(), dto.getAnswer()));
        return new FaqDTO(faq.getId(), faq.getQuestion(), faq.getAnswer());
    }

    @CachePut(value = "faqs", key = "#id")
    public FaqDTO updateFaq(Long id, FaqUpdateDTO dto) {
        Faq faq = faqRepository.findById(id)
                .orElseThrow(() -> new FaqNotFoundException("FAQ not found"));
        faq.setAnswer(dto.getAnswer());
        faqRepository.save(faq);
        return new FaqDTO(faq.getId(), faq.getQuestion(), faq.getAnswer());
    }

    @CacheEvict(value = "faqs", key = "#id")
    public void deleteFaq(Long id) {
        if (!faqRepository.existsById(id)) {
            throw new FaqNotFoundException("FAQ not found");
        }
        faqRepository.deleteById(id);
    }
}
