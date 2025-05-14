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
  </div>
  <div class="container d-flex justify-content-evenly">
    <div class="row">
      <div class="col-md-3">
        <div class="border border-danger  bg-light p-">
          <div v-for="poke in pokes" :key="poke.id">
            <PokemonCard :pokeProps="poke" />
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border border-danger  bg-light p-3">
          <img class="img-fluid"
            src="https://images.unsplash.com/photo-1643725173053-ed68676f1878?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9rZW1vbnxlbnwwfHwwfHx8MA%3D%3D"
            alt="">
        </div>
      </div>
      <div class="col-md-3">
        <div class="border border-danger  bg-light p-3">

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
