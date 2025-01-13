<template>
  <div :class="item.styleClassName" :style="style"></div>
</template>

<script setup lang="ts">
import LayerItem from "@/models/games/common/LayerItem.ts";
import {computed} from "vue";

const props = defineProps({
  item: {
    type: LayerItem,
    required: true
  }
})

const style = computed(() => {
  let style = {
    top: props.item.position.y + 'px',
    left: props.item.position.x + 'px',
  }

  if (!props.item.cosmetic) {
    style = Object.assign(style, {
      width: props.item.size.x + 'px',
      height: props.item.size.y + 'px'
    })
  }

  return style
})

</script>

<style scoped lang="scss">
@mixin layerItem {
  --var-pulse-shadow: orangered;

  z-index: 2;

  position: absolute;

  background-size: cover;
  background-position: center;

  transition: all 33ms linear;
}

.player {
  @include layerItem;
  background-image: url("/images/characters/player.svg");
}

@mixin player-moving {
  @include layerItem;
  background-image: url("/images/characters/player.svg");
  transition: all 0.1s linear;
}

.player-moving-left {
  @include player-moving;
  transform: perspective(30rem) rotateY(-40deg);
}

.player-moving-right {
  @include player-moving;
  transform: perspective(30rem) rotateY(40deg);
}

.enemy {
  @include layerItem;
  background-image: url("/images/characters/enemy.svg");
}

@keyframes pulse {
  0% {
    transform: scaleY(1);
    box-shadow: none;
  }
  50% {
    transform: scaleY(4);
    box-shadow: 0 0 2px 2px var(--var-pulse-shadow);
  }
  100% {
    transform: scaleY(1);
    box-shadow: none;
  }
}

.projectile-player-default {
  @include layerItem;
  --var-pulse-shadow: coral;
  background: coral;
  animation: pulse 0.5s infinite linear;
}

.projectile-enemy-default {
  @include layerItem;
  --var-pulse-shadow: lightblue;
  background: lightblue;
  animation: pulse 0.5s infinite ease-out;
}

@keyframes explosion {
  0% {
    opacity: 1;
    transform: scale(0.5);
    background: red;
  }
  50% {
    transform: scale(1.5);
    background: orangered;
  }
  80% {
    transform: scale(2.5);
    background: orange;
  }
  100% {
    opacity: 0;
    border: solid 4px orangered;
  }
}

@mixin explode {
  @include layerItem;
  width: 2rem;
  height: 2rem;

  border-radius: 50%;
  animation: explosion 0.2s ease-in-out;
}

.explode-from-top {
  @include explode;
  transform-origin: top;
}

.explode-from-bottom {
  @include explode;
  transform-origin: bottom;
}

@mixin star {
  position: absolute;

  width: 2px;
  height: 2px;

  border-radius: 50%;

  background: white;
}

.star {
  @include star;
}

.star-big {
  @include star;
  width: 4px;
  height: 4px;
}
</style>
