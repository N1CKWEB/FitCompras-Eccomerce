package Catalogo.FitCompras.FitCompras.service;
<<<<<<< HEAD
=======

>>>>>>> 1c559965fbcbd5136696eecbeb71d8b0f019fbfb
import Catalogo.FitCompras.FitCompras.dto.SubCategoriaDTO;
import Catalogo.FitCompras.FitCompras.repositories.SubCategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
<<<<<<< HEAD
=======

>>>>>>> 1c559965fbcbd5136696eecbeb71d8b0f019fbfb
@Service
@RequiredArgsConstructor
public class SubCategoriaService {
    private final SubCategoriaRepository subCategoriaRepository;
<<<<<<< HEAD
=======

>>>>>>> 1c559965fbcbd5136696eecbeb71d8b0f019fbfb
    public SubCategoriaDTO crearSubCategoria ( SubCategoriaDTO dto){
        SubCategoriaDTO subCategoriaDTO = new SubCategoriaDTO();
        subCategoriaDTO.setId(dto.getId());
        subCategoriaDTO.getNombre(dto.getNombre()
<<<<<<< HEAD
        );
    }
=======


        );


    }

>>>>>>> 1c559965fbcbd5136696eecbeb71d8b0f019fbfb
}
