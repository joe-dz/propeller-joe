<template>
  <div class="absolute-full cv-container fade-in">
    <c-v/>
  </div>
</template>

<script setup lang="ts">
import CV from "@/components/cv/CV.vue";
import {onBeforeRouteLeave} from "vue-router"
import {useUiStore} from "@/stores/ui.ts"

const uiStore = useUiStore()

onBeforeRouteLeave((to, from) => {
  uiStore.updateMainViewTransition(from.name, to.name)
})

</script>

<style scoped lang="scss">
.cv-container {
  display: flex;
  justify-content: center;

  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;

  color: lightgrey;
  font-family: "Rubik", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;

  background: rgb(85, 115, 195);
}
</style>
