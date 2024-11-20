import { useState, useEffect } from "react";

type Pokemon = {
    id: number;
    name: string;
    image: string;
    source: string;
};

export const useFetch = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetchPokemons();
    }, []);

    const fetchPokemons = async () => {
        try {
            let allPokemons: Pokemon[] = [];
            let offset = 0;
            const limit = 20;

            const countResponse = await fetch(`${API_BASE_URL}/pokemon/`);
            const countData = await countResponse.json();
            const totalCount = countData.count;

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

                const fetchedPokemons = await Promise.all(pokemonPromises);
                allPokemons = [...allPokemons, ...fetchedPokemons];
                offset += limit;
            }

            const createdPokemons = JSON.parse(localStorage.getItem("createdPokemons") || "[]").map(
                (pokemon: any, index: number) => ({
                    id: index + 1000,
                    name: pokemon.name,
                    image: pokemon.image || "https://via.placeholder.com/150",
                    source: "created",
                })
            );

            setPokemons([...allPokemons, ...createdPokemons]);
            setLoading(false);
        } catch (error) {
            setError("Hubo un problema al obtener los Pokémon.");
            setLoading(false);
        }
    };

    return { pokemons, loading, error };
};
