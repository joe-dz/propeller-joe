<template>
  <div class="flex-start control-panel padding-1 theme-bright">
    <div v-text="'Role: ' + model.role" class="font-weight-500"></div>
    <div v-text="'Sector(s): ' + model.sectors" class="font-weight-500"></div>
    <div class="font-weight-500">Client: <slot name="client"/></div>
    <div v-text="'Duration: ' + model.duration" class="font-weight-500"></div>
    <div class="font-weight-500">Description:</div>
    <div v-html="model.description"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  model: {
    type: Object,
    required: true
  }
})
</script>

<style scoped lang="scss">

</style>
