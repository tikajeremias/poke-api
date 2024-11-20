import React from "react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// Componente de navegacion
const SearchBar = ({ value, onChange }: Props) => {
  return (
    <input
      type="text"
      placeholder="Buscar Pokémon..."
      value={value}
      onChange={onChange}
      className="p-2 border w-full"
    />
  );
};

export default SearchBar;
