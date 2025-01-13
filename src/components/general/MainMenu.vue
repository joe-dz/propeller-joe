<template>
  <div
    class="flex-center main-menu width-fill-available ml-1 mr-1"
    :class="selectedMenuItem?.cssClass"
  >
    <router-link
      v-for="item in menuItems"
      class="flex-center menu-item"
      :class="item.route === route.name ? 'selected' : ''"
      :to="{name: item.route}"
      v-html="item.content"
    />
  </div>
</template>

<script setup lang="ts">

import {useRoute} from "vue-router";
import {computed} from "vue";

const route = useRoute()

const menuItems = [
  {
    route: "cv-view",
    cssClass: "menu-classic",
    content: `CV`
  },
  {
    route: "home",
    cssClass: "menu-modern",
    content: `<img src="/images/logo_propeller.png" alt="" class="logo-main-menu"/>`
  },
  {
    route: "game-galaxy-view",
    cssClass: "menu-retro",
    content: `<i class="rocket"></i>`
  }
]

const selectedMenuItem = computed(() => {
  return menuItems.find(item => item.route === route.name)
})

</script>

<style scoped lang="scss">
.main-menu {
  overflow: visible;
  gap: 1rem;

  position: absolute;
  top: 0.6rem;
  height: 3.8rem;

  transition: all 0.5s linear;

  a {
    text-decoration: none;
  }

  .menu-item {
    width: 2rem;
    height: 2rem;

    margin: 0.6rem;

    border-radius: 0.2rem;

    transition: all 0.4s linear;
  }

  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.6rem;
  }

  .selected {
    padding: 0.2rem;

    background: white;
    color: #2c3e50;
  }

}

.menu-modern {
  font-family: "Exo", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;

  .menu-item {

    &:hover {
      transform: scale(1.1);
      transition: all 0.2s ease-out;
      color: white;
    }
  }

  .selected {
    padding: 0.3rem;

    border-radius: 50%;
  }
}

.menu-classic {
  font-family: "Open Sans", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.menu-retro {
  font-family: "Orbitron", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;

  border-radius: 0.6rem;

  background: #111;
  box-shadow: 0 0 8px 8px black;
}
</style>
