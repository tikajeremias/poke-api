import { useState, useEffect } from "react";
import PokeCard from "../components/PokeCard";
import SearchBar from "../components/SearchBar";
import FilterButtons from "../components/FilterButtons";
import SortButtons from "../components/SortButtons";
import Pagination from "../components/Pagination";
import { useFetch } from "../hooks/useFetch";

type Pokemon = {
  id: number;
  name: string;
  image: string;
  source: string;
};

export default function Home() {
  const { pokemons, loading, error } = useFetch();
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSource, setFilterSource] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);

  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);

  useEffect(() => {
    let filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterSource !== "all") {
      filtered = filtered.filter((pokemon) => pokemon.source === filterSource);
    }

    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredPokemons(filtered);

    // Ajustar la página actual si excede las páginas disponibles
    const newTotalPages = Math.ceil(filtered.length / pokemonsPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages || 1); // Si no hay resultados, ajusta a la página 1
    }
  }, [searchTerm, filterSource, sortOrder, pokemons, currentPage, pokemonsPerPage]);


  const currentPokemons = filteredPokemons.slice(
    (currentPage - 1) * pokemonsPerPage,
    currentPage * pokemonsPerPage
  );

  return (
    <div className="flex flex-col justify-top p-4 gap-4 h-screen w-full pt-24 px-2 md:px-16 lg:px-32">
      <h1 className="text-2xl font-bold select-none">Lista de Pokémon</h1>
      <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <FilterButtons currentFilter={filterSource} onFilterChange={setFilterSource} />
        <SortButtons currentSort={sortOrder} onSortChange={setSortOrder} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-12">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <span className="text-lg text-gray-700">Cargando Pokemones...</span>
          </div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentPokemons.map((pokemon) => (
              <PokeCard key={pokemon.id} id={pokemon.id} image={pokemon.image} name={pokemon.name} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}