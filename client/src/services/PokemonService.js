import { logger } from "@/utils/Logger.js";
import { pokeApi } from "./AxiosService.js";

class PokemonService {

  async getAllPokemon() {
    const response = await pokeApi.get('pokemon')
    logger.log(response.data)
  }
}

export const pokemonService = new PokemonService()
