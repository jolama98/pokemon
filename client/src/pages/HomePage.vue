<script setup>
import { AppState } from '@/AppState.js';
import Mypokmons from '@/components/Mypokmons.vue';
import PokemonCard from '@/components/PokemonCard.vue';

import PokemonName from '@/components/PokemonName.vue';

import { pokemonService } from '@/services/PokemonService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, onUnmounted, ref } from 'vue';

const pokes = computed(() => AppState.pokemon)
const activePoke = computed(() => AppState.pokemonById)


const loadTrigger = ref(null)
let observer = null

onMounted(() => {
  getAllPokemon()
  setupObserver()
})

function setupObserver() {
  observer = new IntersectionObserver(async (entries) => {
    const entry = entries[0]
    if (entry.isIntersecting) {
      await loadMore()
    }
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  })

  if (loadTrigger.value) {
    observer.observe(loadTrigger.value)
  }
}


onUnmounted(() => {
  if (observer && loadTrigger.value) {
    observer.unobserve(loadTrigger.value)
  }
})

async function getAllPokemon() {
  try {
    await pokemonService.getAllPokemon()
  }
  catch (error) {
    Pop.error(error);
  }
}
async function loadMore() {
  try {
    if (AppState?.nextPageUrl) {
      await pokemonService.changePage(AppState.nextPageUrl)
    }
  } catch (error) {
    Pop.error(error)
  }
}




</script>
<template>
  <div class="text-center">
    <h1>Here You Go!</h1>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <div class=" scroll-box border border-danger rounded-3 border-2 bg-light p-">
          <div v-for="poke in pokes" :key="poke.id">
            <PokemonName :pokeProps="poke" />
          </div>
          <div ref="loadTrigger" class="text-center py-2">
            <p>Loading more Pokémon...</p>
          </div>

        </div>
      </div>
      <div class="col-md-6">
        <div v-if="activePoke">
          <PokemonCard :pokeProps="activePoke" />

        </div>
      </div>
    </div>
    <div class="col-md-3">
      <Mypokmons />
      <!-- <div class="scroll-box border border-danger rounded-3 border-2 bg-light p-3">
      </div> -->
    </div>
  </div>

</template>

<style scoped lang="scss">
.pokImg {
  height: 20dvh;
}

.scroll-box {
  height: 80vh;
  /* or any fixed height */
  overflow-y: auto;
  /* scrolls vertically when needed */
  border: 1px solid #ccc;
  padding: 1rem;
}
</style>
