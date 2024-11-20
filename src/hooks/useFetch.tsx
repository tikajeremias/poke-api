import { useState, useEffect } from "react";

// Definicion del pokemon
type Pokemon = {
    id: number;
    name: string;
    image: string;
    source: string;
};

export const useFetch = () => {
    // Estados locales
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // La URL base de la API es extraida desde las variables de entorno o ".env"
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // Iniciar la busqueda de pokemones
    useEffect(() => {
        fetchPokemons();
    }, []);

    // Funcion que realiza la obtenciin de los pokemones desde la API y desde el localStorage
    const fetchPokemons = async () => {
        try {
            let allPokemons: Pokemon[] = [];
            let offset = 0;
            const limit = 20;

            // Se realiza la primera solicitud para obtener el conteo total de pokemones disponibles
            const countResponse = await fetch(`${API_BASE_URL}/pokemon/`);
            const countData = await countResponse.json();
            const totalCount = countData.count;

            // Obtenemos los pokemones de forma paginada
            while (offset < totalCount) {
                const response = await fetch(`${API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
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

                // Agregar pokemones al array final
                const fetchedPokemons = await Promise.all(pokemonPromises);
                allPokemons = [...allPokemons, ...fetchedPokemons];
                offset += limit;
            }

            // Recuperar los Pokemones creados por el usuario desde localStorage
            const createdPokemons = JSON.parse(localStorage.getItem("createdPokemons") || "[]").map(
                (pokemon: any, index: number) => ({
                    id: index + 1000,
                    name: pokemon.name,
                    image: pokemon.image || "https://via.placeholder.com/150",
                    source: "created",
                })
            );

            // Combinar los Pokemones obtenidos desde la API y los creados por el usuario
            setPokemons([...allPokemons, ...createdPokemons]);
            setLoading(false);

        } catch (error) {
            // Caso de error
            setError("Hubo un problema al obtener los Pokémon.");
            setLoading(false);
        }
    };

    // Devuelvo el estado de los pokemones, el estado de carga y el error (si es que hay)
    return { pokemons, loading, error };
};
