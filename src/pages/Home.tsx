import { useEffect, useState } from "react";
import PokeCard from "../components/PokeCard";
import SearchBar from "../components/SearchBar";
import FilterButtons from "../components/FilterButtons";
import SortButtons from "../components/SortButtons";
import Pagination from "../components/Pagination";

type Pokemon = {
  id: number;
  name: string;
  image: string;
  source: string; // 'api' o 'created'
};

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSource, setFilterSource] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [pokemonsPerPage] = useState(16);

  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);

  const fetchPokemons = async () => {
    try {
      let allPokemons: Pokemon[] = [];
      let offset = 0;
      const limit = 20;

      const countResponse = await fetch("https://pokeapi.co/api/v2/pokemon/");
      const countData = await countResponse.json();
      const totalCount = countData.count; // Validemos que `totalCount` no sea 0.

      while (offset < totalCount) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        const data = await response.json();

        const pokemonPromises = data.results.map(async (pokemon: any) => {
          const details = await fetch(pokemon.url);
          const detailsData = await details.json();
          return {
            id: detailsData.id,
            name: pokemon.name,
            image: detailsData.sprites.front_default,
            source: "api",
          };
        });

        const fetchedPokemons = await Promise.all(pokemonPromises);
        allPokemons = [...allPokemons, ...fetchedPokemons];
        offset += limit;
      }

      // Mezclamos con los Pokémon creados
      const createdPokemons = JSON.parse(localStorage.getItem("createdPokemons") || "[]").map(
        (pokemon: any, index: number) => ({
          id: index + 1000,
          name: pokemon.name,
          image: pokemon.image || "https://via.placeholder.com/150",
          source: "created",
        })
      );

      setPokemons([...allPokemons, ...createdPokemons]);
      setFilteredPokemons([...allPokemons, ...createdPokemons]);
      setLoading(false);
    } catch (error) {
      setError("Hubo un problema al obtener los Pokémon.");
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchPokemons();
  }, []);

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
  }, [searchTerm, filterSource, sortOrder, pokemons]);

  const currentPokemons = filteredPokemons.slice(
    (currentPage - 1) * pokemonsPerPage,
    currentPage * pokemonsPerPage
  );

  return (
    <div className="p-4 bg-gray-200 h-full w-full py-10 mt-12 px-32">
      <h1 className="text-2xl font-bold mb-4">Lista de Pokémon</h1>
      <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <div className="flex justify-between mb-4">
        <FilterButtons currentFilter={filterSource} onFilterChange={setFilterSource} />
        <SortButtons currentSort={sortOrder} onSortChange={setSortOrder} />
      </div>

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
    </div>
  );
};

export default Home;
