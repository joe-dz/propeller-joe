<template>
  <div class="absolute-full fade-in transitive-05" :class="routeBgMap[route.name]">
    <main-menu/>
    <div class="absolute-full main">
      <router-view v-slot="{ Component }">
        <transition :name="uiStore.currentTransition">
          <component :is="Component"/>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainMenu from "@/components/general/MainMenu.vue";
import {useUiStore} from "@/stores/ui.ts"
import {useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute()
const uiStore = useUiStore()

const routeBgMap = ref({
  "home": "bg-modern",
  "cv-view": "bg-classic",
  "game-galaxy-view": "bg-retro"
})

</script>

<style scoped lang="scss">

.main {
  overflow: hidden;

  top: 4rem;
}

.bg-modern {
  background: rgba(32, 32, 32);
}

.bg-classic {
  background: rgb(85, 115, 195);
}

.bg-retro {
  background-image: url("/images/characters/stage.jpeg");
  background-position: center;
  background-size: cover;
}

</style>
