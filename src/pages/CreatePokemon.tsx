import React, { useEffect, useState } from "react";

type Pokemon = {
  id: number;
  name: string;
  image: string;
  source: string; // 'created'
};

const CreatePokemon = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [createdPokemons, setCreatedPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState("");

  // Obtener Pokémon creados desde el localStorage
  const loadCreatedPokemons = () => {
    const storedPokemons = JSON.parse(localStorage.getItem("createdPokemons") || "[]");
    setCreatedPokemons(storedPokemons);
  };

  // Guardar Pokémon en localStorage
  const saveCreatedPokemons = (pokemons: Pokemon[]) => {
    localStorage.setItem("createdPokemons", JSON.stringify(pokemons));
  };

  // Manejar la creación de un nuevo Pokémon
  const handleCreatePokemon = () => {
    // Validaciones
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

    // Crear nuevo Pokémon
    const newPokemon: Pokemon = {
      id: Date.now(), // ID único basado en timestamp
      name,
      image,
      source: "created",
    };

    // Actualizar lista de Pokémon creados
    const updatedPokemons = [...createdPokemons, newPokemon];
    setCreatedPokemons(updatedPokemons);

    // Guardar en localStorage
    saveCreatedPokemons(updatedPokemons);

    // Limpiar campos y error
    setName("");
    setImage("");
    setError("");
  };

  // Manejar la eliminación de un Pokémon creado
  const handleDeletePokemon = (id: number) => {
    const updatedPokemons = createdPokemons.filter((pokemon) => pokemon.id !== id);
    setCreatedPokemons(updatedPokemons);
    saveCreatedPokemons(updatedPokemons);
  };

  // Cargar Pokémon creados al montar el componente
  useEffect(() => {
    loadCreatedPokemons();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Pokémon</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Formulario de creación */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nombre del Pokémon"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border mb-2 w-full"
        />
        <input
          type="text"
          placeholder="URL de la imagen"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="p-2 border mb-2 w-full"
        />
        <button
          onClick={handleCreatePokemon}
          className="px-4 py-2 bg-blue-500 text-white rounded w-full"
        >
          Crear Pokémon
        </button>
      </div>

      {/* Lista de Pokémon creados */}
      <h2 className="text-xl font-semibold mb-2">Pokémon Creados</h2>
      {createdPokemons.length === 0 ? (
        <p>No has creado ningún Pokémon aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {createdPokemons.map((pokemon) => (
            <div key={pokemon.id} className="bg-white rounded-lg shadow-md p-4 relative">
              <button
                onClick={() => handleDeletePokemon(pokemon.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                &times;
              </button>
              <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20 mb-2" />
              <h3 className="text-lg font-bold">{pokemon.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatePokemon;
