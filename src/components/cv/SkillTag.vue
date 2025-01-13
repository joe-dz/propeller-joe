<template>
  <div class="flex-center tag-container">
    <div v-if="proficiency" :class="'indicator-' + proficiency"></div>
    <img
      v-if="icon"
      :src="`/images/logo_${icon}`"
      class="item-icon"
    />
    <div
      v-text="name"
      style="padding-top: 2px"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  proficiency: String,
  icon: String,
  name: String
})
</script>

<style scoped lang="scss">
.tag-container {
  position: relative;

  background: white;
  color: #555;

  gap: 0.4rem;

  padding: 0.4rem;

  border-radius: 0.6rem;

  border: solid 1px var(--var-color-shade);
  box-shadow: 4px 4px 8px 2px var(--var-color-shade);

  @mixin indicator {
    position: absolute;
    top: -0.1rem;
    right: -0.1rem;

    width: 0.5rem;
    height: 0.5rem;

    border-radius: 30%;
  }

  .indicator-beginner {
    @include indicator;
    background: orange;
  }

  .indicator-intermediate {
    @include indicator;
    background: deepskyblue;
  }

  .indicator-advanced {
    @include indicator;
    background: lightgreen;
  }

}

.item-icon {
  width: 1.4rem;
  height: 1.4rem;

  border-radius: 0.4rem;
}

</style>
