package Catalogo.FitCompras.FitCompras.controller;

import Catalogo.FitCompras.FitCompras.dto.*;
import Catalogo.FitCompras.FitCompras.dto.FaqDTO;
import Catalogo.FitCompras.FitCompras.dto.FaqUpdateDTO;
import Catalogo.FitCompras.FitCompras.service.FaqService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/faqs")
public class FaqController {

    private final FaqService faqService;

    public FaqController(FaqService faqService) {
        this.faqService = faqService;
    }

    @GetMapping
    public List<FaqDTO> getFaqs() {
        return faqService.getAllFaqs();
    }

    @GetMapping("/{id}")
    public FaqDTO getFaq(@PathVariable Long id) {
        return faqService.getFaqById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FaqDTO createFaq(@Valid @RequestBody FaqCreateDTO dto) {
        return faqService.createFaq(dto);
    }

    @PutMapping("/{id}")
    public FaqDTO updateFaq(@PathVariable Long id, @Valid @RequestBody FaqUpdateDTO dto) {
        return faqService.updateFaq(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFaq(@PathVariable Long id) {
        faqService.deleteFaq(id);
    }
}

