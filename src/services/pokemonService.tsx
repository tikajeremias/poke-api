// Definicion del tipo pokemon
export type Pokemon = {
    id: number;
    name: string;
    image: string;
    source: string;
};

const STORAGE_KEY = "createdPokemons";

// Funcion para cargar los pokemones creados desde localStorage
export const loadCreatedPokemons = (): Pokemon[] => {
    const pokemons = localStorage.getItem("createdPokemons");
    return pokemons ? JSON.parse(pokemons) : [];
};

// Funcion para guardar los pokemones creados en localStorage
export const saveCreatedPokemons = (pokemons: Pokemon[]): void => {
    localStorage.setItem("createdPokemons", JSON.stringify(pokemons));
};

// Funcion para agregar un nuevo pokemon a la lista de Pokémon creados
export const addPokemon = (pokemon: Pokemon): Pokemon[] => {
    const currentPokemons = loadCreatedPokemons();
    const updatedPokemons = [...currentPokemons, pokemon];
    saveCreatedPokemons(updatedPokemons);
    return updatedPokemons;
};

// Funcion para eliminar un pokemon de la lista de Pokémon creados
export const deletePokemon = (id: number): Pokemon[] => {
    const currentPokemons = loadCreatedPokemons();
    const updatedPokemons = currentPokemons.filter((pokemon) => pokemon.id !== id);
    saveCreatedPokemons(updatedPokemons);
    return updatedPokemons;
};

// Funcion para actualizar un pokemon de la lista de Pokemon creados
export function updatePokemon(updatedPokemon: Pokemon): Pokemon[] {
    const pokemons = loadCreatedPokemons();
    const updatedPokemons = pokemons.map((pokemon) =>
        pokemon.id === updatedPokemon.id ? updatedPokemon : pokemon
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPokemons));
    return updatedPokemons;
}