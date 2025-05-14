<script setup>
import { Pokemon } from '../models/PokemonModel.js';
import { defineProps } from 'vue';

const props = defineProps({
  pokeProps: { type: Pokemon, required: true }
})
</script>

<template>
  <div class="card ">
    <div class="pokemon-card mb-3 pb-3 ">
      <h2 class="pokemon-name">{{ props.pokeProps?.name }}</h2>
    </div>
  </div>
</template>



<style scoped>
.pokemon-name {
  font-size: 1.2em;
  margin: 8px 0;
}
</style>
