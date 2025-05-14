<script setup>
import { AppState } from '@/AppState.js';
import PokemonCard from '@/components/PokemonName.vue';
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
    <div class="container">
      <div class="row">
        <div class="col-md- 3">
          <div v-for="poke in pokes" :key="poke.id" class="col-md-3">
            <PokemonCard :pokeProps="poke" />
          </div>
        </div>
        <div class="row">
          *NOTE - this where the img will go but when you click on a name you have to get the pokemon by its ID to show
          everything...I think
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
