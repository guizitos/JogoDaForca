package com.guisc.jogoforca.controller;

import com.guisc.jogoforca.model.Usuario;
import com.guisc.jogoforca.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class JogoController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/")
    public String paginaInicial() {
        return "index"; // Arquivo index.html no diretório templates
    }

    @PostMapping("/jogar")
    public String iniciarJogo(@RequestParam String nickname, Model model) {
        Usuario usuario = usuarioService.salvarOuAtualizarUsuario(nickname, 0);
        model.addAttribute("usuario", usuario);
        return "jogo"; // Arquivo jogo.html no diretório templates
    }
}