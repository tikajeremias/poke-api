import { useState, useEffect } from "react";
// Componentes reutilizables
import PokeCard from "../components/PokeCard";
import SearchBar from "../components/SearchBar";
import FilterButtons from "../components/FilterButtons";
import SortButtons from "../components/SortButtons";
import Pagination from "../components/Pagination";
import { useFetch } from "../hooks/useFetch";

// Aca defino los datos de cada pokemon
type Pokemon = {
  id: number;
  name: string;
  image: string;
  source: string; // Si el pokemon es: 'api' o 'created'
};

export default function Home() {

  // Estado para los pokemon obtenidos desde el hook
  const { pokemons, loading, error } = useFetch();

  // Estados locales
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSource, setFilterSource] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);

  // Calculo del total de paginas basado en los pokemon filtrados
  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);

  // useEffect para aplicar busqueda, filtros y ordenar cada vez que cambien los estados
  useEffect(() => {
    // Filtrado por busqueda
    let filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filtrado por origen
    if (filterSource !== "all") {
      filtered = filtered.filter((pokemon) => pokemon.source === filterSource);
    }

    // Ordenar por nombre
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Actualizacion de pokemones filtrados
    setFilteredPokemons(filtered);

    // Ajuste de la pagina actual si excede el total de páginas disponibles
    const newTotalPages = Math.ceil(filtered.length / pokemonsPerPage);
    if (currentPage > newTotalPages) {
      // Si no hay resultados, ajusta a la página 1
      setCurrentPage(newTotalPages || 1);
    }
  }, [searchTerm, filterSource, sortOrder, pokemons, currentPage, pokemonsPerPage]);

  // Obtener los pokemones de la pagina actual
  const currentPokemons = filteredPokemons.slice(
    (currentPage - 1) * pokemonsPerPage,
    currentPage * pokemonsPerPage
  );

  return (
    <div className="flex flex-col justify-top p-4 gap-4 h-screen w-full pt-24 px-2 md:px-16 lg:px-32">

      {/* Titulo */}
      <h1 className="text-2xl font-bold select-none">Lista de Pokémon</h1>

      {/* Barra de busqueda */}
      <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      {/* Filtros */}
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <FilterButtons currentFilter={filterSource} onFilterChange={setFilterSource} />
        <SortButtons currentSort={sortOrder} onSortChange={setSortOrder} />
      </div>

      {/* Estado de carga, error o contenido */}
      {loading ? (
        // Estado de carga
        <div className="flex justify-center items-center h-12 select-none">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-800"></div>
            <span className="text-lg text-gray-700">Cargando Pokemones...</span>
          </div>
        </div>
      ) : error ? (
        // Error
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <>
          {/* Lista de Pokemones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentPokemons.map((pokemon) => (
              <PokeCard key={pokemon.id} id={pokemon.id} image={pokemon.image} name={pokemon.name} />
            ))}
          </div>
          {/* Componente de paginacion */}
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
