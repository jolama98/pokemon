<script setup>
import { AppState } from '@/AppState.js';
import PokemonCard from '@/components/PokemonCard.vue';
import PokemonName from '@/components/PokemonName.vue';

import { pokemonService } from '@/services/PokemonService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const pokes = computed(() => AppState.pokemon)

onMounted(() => {
  getAllPokemon()
})

async function getAllPokemon() {
  try {
    await pokemonService.getAllPokemon()
  }
  catch (error) {
    Pop.error(error);
  }
}
</script>

<template>
  <div class="text-center">
    <h1>Here You Go!</h1>
  </div>
  <div class="container d-flex justify-content-evenly">
    <div class="row">
      <div class="col-md-3">
        <div class="border border-danger rounded-2 border-3 bg-light p-">
          <div v-for="poke in pokes" :key="poke.id">
            <PokemonName :pokeProps="poke" />
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border border-danger rounded-2 border-3 bg-light p-3">
          <PokemonCard />
        </div>
      </div>
      <div class="col-md-3">
        <div class="border border-danger rounded-2 border-3   bg-light p-3">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.img {
  height: 250px;

}
</style>
