<template>
  <div class="absolute-full flex-horizontal-center" style="overflow-x: visible;">
    <div class="main-container">
      <div
        v-if="loadPanelsDelayMap[1].loaded"
        class="intro-container gap-06 mt-2 width-fill-available padding-1 hover fade-in"
      >
        <div>
          Hi, I'm Joe <span class="greet">&#128075;</span> Welcome to my website!
        </div>
        <a class="flex-row link-github hover fade-in" href="https://github.com/joe-dz/propeller-joe.git" target="_blank">
          <img class="logo-github" src="/images/logo_github.svg">
          Source code
        </a>
      </div>
      <div
        v-if="loadPanelsDelayMap[2].loaded"
        class="flex-left content-panel mt-2 hover fade-in"
      >
        <div class="text-indicator">&nbsp;</div>
        <div class="content-panel">
          Here, you can find my CV and browse a couple of pages.
          They are styled differently on purpose and aren't meant for show,
          but rather as a fun side project. Everything is made from scratch
          with VueJS 3.
        </div>
      </div>
      <div
        v-if="loadPanelsDelayMap[3].loaded"
        class="flex-left content-panel mt-2 hover fade-in"
      >
        <div class="text-indicator">&nbsp;</div>
        <div class="content-panel">
          As said in my CV, I like doing web development from start to finish.
          That includes not only building the frontend, but also the backend,
          and setting up the software and hardware infrastructure. Below are some
          of the photos of a personal cloud infrastructure proof-of-concept that
          I built for fun and to host a couple of personal projects. I assure you
          that my software and hardware are better than my photography.
        </div>
      </div>
      <div
        v-show="loadPanelsDelayMap[4].loaded"
        class="flex-center content-panel photo-panel width-fill-available fade-in gap-06 mt-3"
      >
        <template v-for="(photo, index) in photoList">
          <img
            :src="photo"
            class="photo-thumbnail"
            :class="loadPhotosDelayMap[index].loaded ? 'fade-in' : ''"
            :style="{left: (-0.5/index) + 'rem' }"
            @click.stop="showPhoto(photo)"
          />
        </template>
      </div>
    </div>
    <transition name="fade-quick">
      <div
        v-if="popupShown"
        class="absolute-full flex-center popup"
        @click.stop="() => popupShown = false"
      >
        <img :src="shownPhoto" class="photo-full modern" alt=""/>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {onBeforeRouteLeave} from "vue-router"
import {useUiStore} from "@/stores/ui.ts"
import {onMounted, ref} from "vue";

const uiStore = useUiStore()

onBeforeRouteLeave((to, from) => {
  uiStore.updateMainViewTransition(from.name, to.name)
})

const loadPanelsDelayMap: any = ref({
  1: {
    delay: 500,
    loaded: false
  },
  2: {
    delay: 750,
    loaded: false
  },
  3: {
    delay: 1000,
    loaded: false
  },
  4: {
    delay: 1250,
    loaded: false
  }
})

const loadPhotosDelayMap: any = ref({
  0: {
    delay: 1250,
    loaded: false
  },
  1: {
    delay: 1500,
    loaded: false
  },
  2: {
    delay: 1750,
    loaded: false
  }
})

const photoList: any = ref([
  "/images/cloud/start.jpg",
  "/images/cloud/final.jpg",
  "/images/cloud/dashboard.jpeg"
])

const shownPhoto = ref("")

const popupShown = ref(false)

const showPhoto = (path: string) => {
  popupShown.value = true
  shownPhoto.value = path
}

onMounted(() => {
  Object.keys(loadPanelsDelayMap.value).forEach(key => {
    setTimeout(() => loadPanelsDelayMap.value[key].loaded = true, loadPanelsDelayMap.value[key].delay)
  })

  Object.keys(loadPhotosDelayMap.value).forEach(key => {
    setTimeout(() => loadPhotosDelayMap.value[key].loaded = true, loadPhotosDelayMap.value[key].delay)
  })
})

</script>

<style scoped lang="scss">
@import "@/assets/main";

.main-container {
  overflow-y: auto;
  overflow-x: visible;

  scrollbar-width: thin;

  max-width: 32rem;
  width: 90%;

  margin: 2%;

  color: lightgrey;
  font-family: "Rubik", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.content-panel {
  height: max-content;

  padding: 0.5% 2%;

  transition: all 0.2s ease-in-out;

  &.hover {
    &:hover {
      background: rgba(255, 255, 255, 0.8);
      color: rgb(20, 20, 20);
      border-radius: 3px;

      transform: scale(1.03);
    }
  }
}

.link-github {
  display: flex;
  align-items: center;

  width: fit-content;

  padding: 0.4rem;

  border-radius: 0.6rem;

  background: white;
  color: #222;

  cursor: pointer;
  text-decoration: none;

  transition: all 0.2s ease-out;

  .logo-github {
    width: 2rem;
    height: 2rem;
  }

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
}

.text-indicator {
  width: 6px;

  border-radius: 3px;
  background: rgb(195, 65, 35);
}

.photo-panel {
  margin-top: 4rem;
}

.popup {
  z-index: 4;
  position: fixed;

  padding: 1rem;

  background: rgba(20, 20, 20, 0.95);
}

.photo-thumbnail {
  @include user-select-none;

  position: relative;
  opacity: 0;

  width: 4rem;
  height: 4rem;

  border-radius: 0.4rem;

  cursor: pointer;

  transition: all 0.4s ease-out;

  transform: perspective(0) rotateY(0) scale(1);

  @for $i from 1 through 3 {
    &:nth-child(#{$i}) {
      transform: perspective(20rem) rotateY(45deg) scale(#{1 + calc($i/5)});
    }
  }

  &:hover {
    transform: perspective(20rem) rotateY(10deg) scale(2);
    z-index: 5;
  }

  &:active {
    transform: scale(0.9);
  }
}

.photo-full {
  max-width: 90%;
  max-height: 90%;

  border-radius: 3px;
}

.intro-container {
  .greet {
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
}

@media screen and (max-width: 48rem) {
  .intro-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .photo {
    max-width: 100%;
  }
}

@media screen and (min-width: 48rem) {
  .main-container {
    margin: 1%;
  }

  .intro-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .photo {
    max-width: 49%;
  }
}

</style>
