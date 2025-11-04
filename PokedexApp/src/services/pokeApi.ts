import axios from 'axios';
import { Pokemon, PokemonListResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const pokeApi = {
  getPokemons: async (offset: number = 0, limit: number = 20): Promise<PokemonListResponse> => {
    try {
      const response = await axios.get<PokemonListResponse>(
        `${BASE_URL}?offset=${offset}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar lista de pokémons');
    }
  },

  getPokemonDetails: async (url: string): Promise<Pokemon> => {
    try {
      const response = await axios.get<Pokemon>(url);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar detalhes do pokémon');
    }
  },
};