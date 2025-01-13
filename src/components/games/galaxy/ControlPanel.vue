<template>
  <div class="flex-center control-panel theme-red font-orbitron-400">
    <div
      v-text="hasTouch ? '&#9204;' : 'A = LEFT'"
      class="button flex-center user-select-none left"
      :class="hasTouch ? 'font-x-large' : ''"
      @touchstart.passive="startLeftAction"
      @touchend.passive="stopLeftAction"
      @touchmove.passive="stopLeftAction"
    ></div>
    <div
      v-text="hasTouch ? '&#9205;' : 'D = RIGHT'"
      class="button flex-center user-select-none right"
      :class="hasTouch ? 'font-x-large' : ''"
      @touchstart.passive="startRightAction"
      @touchend.passive="stopRightAction"
      @touchmove.passive="stopRightAction"
    ></div>
    <div
      v-text="hasTouch ? '&#128907;' : 'W = SHOOT'"
      class="button flex-center user-select-none center"
      :class="hasTouch ? 'font-x-large' : ''"
      @touchstart.passive="startCenterAction"
      @touchend.passive="stopCenterAction"
      @touchmove.passive="stopCenterAction"
    ></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  leftAction: {
    type: Function,
    required: true
  },
  centerAction: {
    type: Function,
    required: true
  },
  rightAction: {
    type: Function,
    required: true
  },
  frameTime: {
    type: Number,
    required: true
  }
})

let leftActionInterval: any = null
let centerActionInterval: any = null
let rightActionInterval: any = null

const startLeftAction = (event: Event) => {
  stopRightAction()
  leftActionInterval = setInterval(() => props.leftAction(), props.frameTime)
}

const stopLeftAction = () => {
  clearInterval(leftActionInterval)
}

const startCenterAction = () => {
  centerActionInterval = setInterval(() => props.centerAction(), props.frameTime)
}

const stopCenterAction = () => {
  clearInterval(centerActionInterval)
}

const startRightAction = () => {
  stopLeftAction()
  rightActionInterval = setInterval(() => props.rightAction(), props.frameTime)
}

const stopRightAction = () => {
  clearInterval(rightActionInterval)
}

const hasTouch = "ontouchstart" in document.documentElement
</script>

<style scoped lang="scss">
@import "@/assets/main";

.theme-red {
  --var-color-background: rgb(195, 65, 35);
  --var-color-shade-main: rgba(170, 40, 10, 0.5);
  --var-color-shade-side: rgba(170, 90, 60, 0.6);
  --var-color-border: rgb(180, 50, 20);
  --var-color-border-shine-top: rgba(210, 80, 0, 0.5);
  --var-color-border-shine-side: rgba(210, 130, 100, 0.5);
  --var-color-border-shine-middle: rgba(180, 100, 70, 0.6);

  --var-color-control-hover: rgb(205, 125, 95);
  --var-color-control-border-active: rgb(180, 100, 70);
}

.control-panel {
  gap: 0.8rem;

  position: absolute;
  bottom: 0;

  transform: perspective(10rem) rotateX(20deg);

  width: 90%;
  max-width: 24rem;
  height: 4rem;

  border-radius: 0.6rem;
  border: solid 1px var(--var-color-border);
  border-bottom: solid 4px var(--var-color-border);
  border-top: none;
  background: var(--var-color-background);
  box-shadow: 0 6px 4px 0 var(--var-color-shade-main),
  2px 12px 40px 0 var(--var-color-shade-side),
  -2px 12px 40px 0 var(--var-color-shade-side);
}

.button {
  @include user-select-none;

  width: 27%;
  height: 2.7rem;

  border-radius: 0.3rem;
  border: solid 2px var(--var-color-border);
  border-top: solid 1px var(--var-color-border-shine);
  border-bottom: solid 4px var(--var-color-border);
  background: var(--var-color-background);

  cursor: pointer;

  transition: all 0.1s linear;

  &.center {
    border-left: solid 1px var(--var-color-border-shine-middle);
    border-right: solid 1px var(--var-color-border-shine-middle);
  }

  &.left {
    border-left: solid 1px var(--var-color-border-shine-side);
  }

  &.right {
    border-right: solid 1px var(--var-color-border-shine-side);
  }

  &:hover {
    background: var(--var-color-control-hover);
  }

  &:active {
    border: solid 1px var(--var-color-control-border-active);
  }

}
</style>
