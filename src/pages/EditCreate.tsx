import { useEffect, useState } from "react";
import PokeCard from "../components/PokeCard";
import { Pokemon, loadCreatedPokemons, addPokemon, deletePokemon } from "../services/pokemonService";

export default function EditCreate() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [createdPokemons, setCreatedPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState("");

  const handleCreatePokemon = () => {
    if (!name.trim()) {
      setError("El nombre del Pokémon es obligatorio.");
      return;
    }
    if (!image.trim()) {
      setError("La URL de la imagen es obligatoria.");
      return;
    }
    if (!image.startsWith("http")) {
      setError("La URL de la imagen debe comenzar con 'http' o 'https'.");
      return;
    }

    const newPokemon: Pokemon = {
      id: Date.now(),
      name,
      image,
      source: "created",
    };

    const updatedPokemons = addPokemon(newPokemon);
    setCreatedPokemons(updatedPokemons);

    setName("");
    setImage("");
    setError("");
  };

  const handleDeletePokemon = (id: number) => {
    const updatedPokemons = deletePokemon(id);
    setCreatedPokemons(updatedPokemons);
  };

  useEffect(() => {
    setCreatedPokemons(loadCreatedPokemons());
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="max-w-3xl mx-auto">

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Crear Pokémon</h1>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="pokemon-name" className="block text-sm font-medium text-gray-700">
                Nombre del Pokémon
              </label>
              <input
                type="text"
                id="pokemon-name"
                placeholder="Ej: Pikachu"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="pokemon-image" className="block text-sm font-medium text-gray-700">
                URL de la imagen
              </label>
              <input
                type="text"
                id="pokemon-image"
                placeholder="https://ejemplo.com/imagen.png"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              />
            </div>
            <button
              onClick={handleCreatePokemon}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Crear Pokémon
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pokémon Creados</h2>
          {createdPokemons.length === 0 ? (
            <p className="text-gray-500 text-center">No has creado ningún Pokémon aún.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {createdPokemons.map((pokemon) => (
                <div key={pokemon.id} className="bg-gray-50 rounded-lg p-4 relative shadow">
                  <button
                    onClick={() => handleDeletePokemon(pokemon.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    aria-label="Eliminar Pokémon"
                  >
                    &times;
                  </button>
                  <PokeCard id={pokemon.id} image={pokemon.image} name={pokemon.name} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}