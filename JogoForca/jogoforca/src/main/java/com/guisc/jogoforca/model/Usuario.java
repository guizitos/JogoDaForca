package com.guisc.jogoforca.model;

import java.time.LocalDate;

public class Usuario {

    private Long id; 
    private String nickname;
    private int pontuacao;
    private LocalDate dataMelhorJogo;

    // Construtores
    public Usuario() {
    }

    public Usuario(Long id, String nickname, int pontuacao) {
        this.id = id;
        this.nickname = nickname;
        this.pontuacao = pontuacao;
        this.dataMelhorJogo = LocalDate.now();
    }

    // Getters e setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNickname() { return nickname; }
    public void setNickname(String nickname) { this.nickname = nickname; }

    public int getPontuacao() { return pontuacao; }
    public void setPontuacao(int pontuacao) { this.pontuacao = pontuacao; }

    public LocalDate getDataMelhorJogo() { return dataMelhorJogo; }
    public void setDataMelhorJogo(LocalDate dataMelhorJogo) { this.dataMelhorJogo = dataMelhorJogo; }
}
