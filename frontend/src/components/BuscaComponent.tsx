import React from "react";

interface BuscaComponentProps {
  busca: string;
  onBuscaChange: (valor: string) => void;
}

export function BuscaComponent({ busca, onBuscaChange }: BuscaComponentProps) {
  return (
    <label className="campo">
      Pesquisar Pokémon
      <input
        type="search"
        value={busca}
        placeholder="Digite nome ou número"
        onChange={(event) => onBuscaChange(event.target.value)}
      />
    </label>
  );
}
