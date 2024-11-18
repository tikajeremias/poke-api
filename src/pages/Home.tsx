import React, { useEffect, useState } from "react";

type Pokemon = {
  id: number;
  name: string;
  image: string;
  source: string; // 'api' o 'created'
};

const ITEMS_PER_PAGE = 16;

const Home = () => {
  const [apiPokemons, setApiPokemons] = useState<Pokemon[]>([]);
  const [createdPokemons, setCreatedPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Obtener Pokémon creados desde el localStorage
  const loadCreatedPokemons = () => {
    const storedPokemons = JSON.parse(localStorage.getItem("createdPokemons") || "[]");
    setCreatedPokemons(storedPokemons);
  };

  // Obtener Pokémon de la API de forma paginada
  const fetchApiPokemons = async (page: number) => {
    const offset = (page - 1) * ITEMS_PER_PAGE;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${ITEMS_PER_PAGE}`);
      const data = await response.json();

      const fetchedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const details = await fetch(pokemon.url).then((res) => res.json());
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.front_default,
            source: "api",
          };
        })
      );

      setApiPokemons(fetchedPokemons);
      setTotalPages(Math.ceil(1010 / ITEMS_PER_PAGE)); // Número total de pokemones en la pokeapi (1010)
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  // Manejar cambio de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchApiPokemons(page);
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchApiPokemons(currentPage);
    loadCreatedPokemons();
  }, [currentPage]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todos los Pokémon</h1>

      {/* Lista de Pokémon creados */}
      <h2 className="text-xl font-semibold mb-2">Pokémon Creados</h2>
      {createdPokemons.length === 0 ? (
        <p>No has creado ningún Pokémon aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {createdPokemons.map((pokemon) => (
            <div key={pokemon.id} className="bg-white rounded-lg shadow-md p-4">
              <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20 mb-2" />
              <h3 className="text-lg font-bold">{pokemon.name}</h3>
            </div>
          ))}
        </div>
      )}

      {/* Lista de Pokémon de la API */}
      <h2 className="text-xl font-semibold mb-2">Pokémon de la API</h2>
      {apiPokemons.length === 0 ? (
        <p>Cargando Pokémon...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {apiPokemons.map((pokemon) => (
            <div key={pokemon.id} className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md p-4">
              <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20 mb-2" />
              <h3 className="text-lg font-bold">{pokemon.name}</h3>
            </div>
          ))}
        </div>
      )}

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-blue-500 text-white rounded"
        >
          Anterior
        </button>
        <span className="px-4 py-2">{`Página ${currentPage} de ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-blue-500 text-white rounded"
        >
          Siguiente
        </button>
      </div>

    </div>
  );
};

export default Home;
