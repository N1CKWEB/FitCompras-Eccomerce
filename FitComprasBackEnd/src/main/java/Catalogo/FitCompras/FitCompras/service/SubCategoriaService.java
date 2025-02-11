package Catalogo.FitCompras.FitCompras.service;

import Catalogo.FitCompras.FitCompras.dto.SubCategoriaDTO;
import Catalogo.FitCompras.FitCompras.repositories.SubCategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubCategoriaService {
    private final SubCategoriaRepository subCategoriaRepository;

    public SubCategoriaDTO crearSubCategoria ( SubCategoriaDTO dto){
        SubCategoriaDTO subCategoriaDTO = new SubCategoriaDTO();
        subCategoriaDTO.setId(dto.getId());
        subCategoriaDTO.getNombre(dto.getNombre()


        );


    }

}
