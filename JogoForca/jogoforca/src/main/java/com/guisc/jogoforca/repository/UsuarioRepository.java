package com.guisc.jogoforca.repository;

import com.guisc.jogoforca.model.Usuario;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class UsuarioRepository {

    // Agora a lista é final, ou seja, não podemos reatribuir a referência dela.
    private final List<Usuario> usuarios = new ArrayList<>();

    public UsuarioRepository() {
        // Inicialização com alguns dados, se necessário
    }

    public Usuario findByNickname(String nickname) {
        return usuarios.stream()
                .filter(u -> u.getNickname().equals(nickname))
                .findFirst()
                .orElse(null);
    }

    public void adicionarUsuario(Usuario usuario) {
        usuarios.add(usuario);
    }

    // Pode adicionar outros métodos de manipulação de dados em memória
}
