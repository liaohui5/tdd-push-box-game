<template>
  <div v-for="(row, i) of map" class="flex">
    <div v-for="(_, j) of row">
      <MapBlock :x="j" :y="i" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MapBlock from "@/components/map-editor/MapBlock.vue";
import { useEditorMapStore } from "@/store/editor/map";

const { map, initMap } = useEditorMapStore();
initMap();
</script>
