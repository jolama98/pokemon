<script setup>
import Example from '@/components/Example.vue';
import { pokemonService } from '@/services/PokemonService.js';
import { Pop } from '@/utils/Pop.js';
import { onMounted } from 'vue';


onMounted(() => {
  getAllPokemons()
})

async function getAllPokemons() {
  try {
    await pokemonService.getAllPokemon()

  }
  catch (error) {
    Pop.error(error);
  }
}
</script>

<template>
  <Example />
</template>

<style scoped lang="scss"></style>
