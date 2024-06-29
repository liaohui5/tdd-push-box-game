<template>
  <div>
    <div v-for="row of map" class="flex">
      <div v-for="col of row">
        <template v-if="col === MapElement.WALL">
          <img :src="wallImage" />
        </template>
        <template v-else-if="col === MapElement.FLOOR">
          <img :src="floorImage" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import floorImage from "@/assets/floor.png";
import wallImage from "@/assets/wall.png";
import { useMapStore, MapElement } from "@/store/map.ts";

const { map } = useMapStore();
</script>
