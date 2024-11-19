// src/services/pokemonService.ts
export type Pokemon = {
    id: number;
    name: string;
    image: string;
    source: string; // 'created'
};

export const loadCreatedPokemons = (): Pokemon[] => {
    return JSON.parse(localStorage.getItem("createdPokemons") || "[]");
};

export const saveCreatedPokemons = (pokemons: Pokemon[]): void => {
    localStorage.setItem("createdPokemons", JSON.stringify(pokemons));
};

export const addPokemon = (pokemon: Pokemon): Pokemon[] => {
    const currentPokemons = loadCreatedPokemons();
    const updatedPokemons = [...currentPokemons, pokemon];
    saveCreatedPokemons(updatedPokemons);
    return updatedPokemons;
};

export const deletePokemon = (id: number): Pokemon[] => {
    const currentPokemons = loadCreatedPokemons();
    const updatedPokemons = currentPokemons.filter((pokemon) => pokemon.id !== id);
    saveCreatedPokemons(updatedPokemons);
    return updatedPokemons;
};
