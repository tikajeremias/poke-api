// components/SearchBar.tsx
import React from "react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ value, onChange }: Props) => {
  return (
    <input
      type="text"
      placeholder="Buscar Pokémon..."
      value={value}
      onChange={onChange}
      className="p-2 border mb-4 w-full"
    />
  );
};

export default SearchBar;
