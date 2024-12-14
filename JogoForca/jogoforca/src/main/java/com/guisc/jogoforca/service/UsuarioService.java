package com.guisc.jogoforca.service;

import com.guisc.jogoforca.model.Usuario;
import com.guisc.jogoforca.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario salvarOuAtualizarUsuario(String nickname, int pontuacao) {
        // Busca o usuário pelo nickname
        Usuario usuario = usuarioRepository.findByNickname(nickname);
        
        // Se o usuário não existir, cria um novo
        if (usuario == null) {
            usuario = new Usuario();
            usuario.setNickname(nickname);
            usuario.setPontuacao(pontuacao);
            usuario.setDataMelhorJogo(LocalDate.now());
            
            // Adiciona o novo usuário ao repositório
            usuarioRepository.adicionarUsuario(usuario);
        } else {
            // Se o usuário existir e a pontuação for maior, atualiza
            if (pontuacao > usuario.getPontuacao()) {
                usuario.setPontuacao(pontuacao);
                usuario.setDataMelhorJogo(LocalDate.now());
            }
        }

        return usuario;
    }
}
