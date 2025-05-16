import { logger } from "@/utils/Logger.js";
import { Pokemon } from "@/models/PokemonModel.js";
import { AppState } from "@/AppState.js";
import { api } from "./AxiosService.js";


class PokemonService {
  async getPokemonById(url) {
    // AppState.pokemonById = null
    const response = await api.get(url)
    logger.log(response.data)
  }

  async getAllPokemon() {
    const response = await api.get('api/pokemon')
    logger.log('LOOK UP IN THE SKY!!!', response.data.results)
    const poke = response.data.results.map(pojo => new Pokemon(pojo))
    AppState.pokemon = poke
  }
}
export const pokemonService = new PokemonService()
