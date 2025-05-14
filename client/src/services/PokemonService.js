import { logger } from "@/utils/Logger.js";
import { Pokemon } from "@/models/PokemonModel.js";
import { AppState } from "@/AppState.js";
import { api } from "./AxiosService.js";


class PokemonService {

  async getAllPokemon() {
    const response = await api.get('api/pokemon')
    logger.log('LOOK UP IN THE SKY!!!', response.data.results)
    const poke = response.data.results.map(pojo => new Pokemon(pojo))
    AppState.pokemon = poke
  }
}

// export async function getPokemon(name) {
//   try {
//     const response = await axios.get(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching Pokémon:', error);
//     throw error;
//   }
// }

export const pokemonService = new PokemonService()
