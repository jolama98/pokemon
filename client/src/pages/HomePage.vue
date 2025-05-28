<script setup>
import { AppState } from '@/AppState.js';
// import PokemonCard from '@/components/PokemonCard.vue';
import PokemonName from '@/components/PokemonName.vue';

import { pokemonService } from '@/services/PokemonService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, onUnmounted, ref } from 'vue';

const pokes = computed(() => AppState.pokemon)
const activePoke = computed(() => AppState.pokemonById)


const loadTrigger = ref(null)
let observer = null

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

onMounted(() => {
  getAllPokemon()
  setupObserver()
})

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
    if (AppState.nextPageUrl) {
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
        <div class="border border-danger rounded-3 border-2 bg-light p-3">


          <div class="row">
            <div class="col-12">
              <div class="d-flex justify-content-between p-1 mb-1 border rounded-4 border-4 border-success">
                <p>{{ activePoke?.name }}</p>
                <p>No. {{ activePoke?.id }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="pb-1">
                <img class="img-fluid" :src="activePoke?.img" alt="">
              </div>
            </div>
          </div>

          <div class="border rounded-2 border-4 border-success p-1">
            <div class="row">
              <div class="col-12">
                <div class="d-flex justify-content-start ">
                  <div class="m-1">
                    grass
                  </div>
                  <div class="m-1">
                    poison
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <div>
                      Health: ................... {{ activePoke?.height }} hp
                    </div>
                    <div>
                      Attack: ................... {{ activePoke?.attack }} ap
                    </div>
                    <div>
                      Defense: ................... {{ activePoke?.defense }} dp
                    </div>
                    <div>
                      Speed: ................... {{ activePoke?.speed }} spd
                    </div>
                    <div>
                      Weight: ................... {{ activePoke?.weight }} hg
                    </div>
                    <div>
                      Height: ................... {{ activePoke?.height }} dm
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="d-flex justify-content-center">
                <p>Catch em!</p>
              </div>
            </div>
          </div>


          <!-- <div v-for="activePoke in pokes" :key="activePoke.id">
            <PokemonCard :pokeProps="activePoke" />
          </div> -->
        </div>
      </div>
      <div class="col-md-3">
        <div class="border border-danger rounded-3 border-2 bg-light p-3">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.img {
  height: 250px;
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
