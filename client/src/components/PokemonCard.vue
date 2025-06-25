<script setup>
import { AppState } from '@/AppState.js';
import { Pokemon } from '@/models/PokemonModel.js'; import { pokemonService } from '@/services/PokemonService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, onUnmounted, ref } from 'vue';


const activePoke = computed(() => AppState.pokemonById)

async function catchEm() {
  try {
    await pokemonService.catchEm(activePoke.value.url)
  } catch (error) {
    Pop.error(error);
  }

}
</script>


<template>
  <div class="container">

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
          <div class="pb-1 d-flex justify-content-center">
            <img class="img-fluid pokImg" :src="activePoke?.sprites?.
              front_default" alt="">
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
          <div class="pt-2 d-flex justify-content-center">
            <button @click="catchEm()" class="text-bg-success rounded-3 border-3 bg-light p-1">Catch
              em!</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<style lang="scss" scoped></style>
