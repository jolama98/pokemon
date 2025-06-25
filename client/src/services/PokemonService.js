import { logger } from "@/utils/Logger.js";
import { Pokemon } from "@/models/PokemonModel.js";
import { AppState } from "@/AppState.js";
import { api } from "./AxiosService.js";


class PokemonService {
  async catchEm(url) {
    logger.log('catching em all', url)
    const response = await api.get(url)
    const newPokemon = response.data
    AppState.myPokemon.push(newPokemon)
    logger.log('my pokemon', AppState.myPokemon)

  }
  async getPokemonById(url) {
    AppState.pokemonById = null
    const response = await api.get(url)
    AppState.pokemonById = response.data
    AppState.nextPageUrl = response.data.next
    AppState.previousPageUrl = response.data.previous
  }

  async getAllPokemon() {
    const res = await api.get('api/pokemon')
    AppState.pokemon = res.data.results
    AppState.nextPageUrl = res.data.next
    AppState.previousPageUrl = res.data.previous
  }
  async changePage(url) {
    const res = await api.get(url)
    // Append the new batch of Pokémon to the existing list
    AppState.pokemon = [...AppState.pokemon, ...res.data.results]
    AppState.nextPageUrl = res.data.next
    AppState.previousPageUrl = res.data.previous
  }
}
export const pokemonService = new PokemonService()
