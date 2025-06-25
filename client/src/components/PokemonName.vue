<script setup>
import { Pop } from '@/utils/Pop.js';
import { Pokemon } from '../models/PokemonModel.js';
import { defineProps } from 'vue';
import { pokemonService } from '@/services/PokemonService.js';

const props = defineProps({
  pokeProps: { type: Pokemon, required: true }
})

function setActivePokemon(url) {
  try {
    pokemonService.getPokemonById(url)
  }
  catch (error) {
    Pop.error(error);
  }
}
</script>

<template>
  <div class="card
    text-center mb-1 border-0">
    <h2 role="button" @click="setActivePokemon(pokeProps.url)" class="pokemon-name align-self-center">{{
      props.pokeProps.name }}
    </h2>
  </div>

</template>



<style scoped>
.pokemon-name {
  font-size: 1.2em;
  margin: 8px 0;
}

.card:hover {
  color: rgb(230, 44, 15);
  transform: scale(1.25);
}
</style>
