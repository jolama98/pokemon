import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";

class PokemonService {

  async getAllPokemon() {
    const response = await api.get('api/poke')
    logger.log('THIS IS POKEMON!!', response.data)
  }
}

export const pokemonService = new PokemonService()
