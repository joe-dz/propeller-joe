<template>
  <div
    :class="layer.styleClassName"
    :style="{
      top: layer.position.y + 'px',
      left: layer.position.x + 'px',
      width: layer.size.x + 'px',
      height: layer.size.y + 'px'
    }"
  >
    <transition-group name="fade-quick">
      <layer-item
        v-for="item in layer.items"
        :item="item"
        :key="item.id"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import Layer from "@/models/games/common/Layer.ts";
import LayerItem from "@/components/games/common/LayerItem.vue";

defineProps({
  layer: {
    type: Layer,
    required: true
  }
})

</script>

<style scoped lang="scss">
$transition-top-60-fps: top 66ms linear;

@mixin layer {
  position: absolute;
}

.layer-background-space {
  @include layer;
  transition: $transition-top-60-fps, background 1s linear;

  background: rgba(20, 20, 20, 0.5);
}
</style>
