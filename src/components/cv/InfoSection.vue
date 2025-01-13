<template>
  <div class="flex-stretch-horizontal width-fill-available">
    <div v-text="model.title + ': '"></div>
    <div v-html="model.content"></div>
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
