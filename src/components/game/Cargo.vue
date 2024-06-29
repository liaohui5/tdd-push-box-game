<template>
  <div class="absolute z-20" :style="position">
    <img :src="cargoImageSrc" />
  </div>
</template>

<script setup lang="ts">
import cargoImage from "@/assets/cargo.png";
import cargoOnTargetImage from "@/assets/cargo_on_target.png";
import { usePosition } from "@/hooks/usePosition";
import { ICargo } from "@/store/cargo";
import { computed } from "vue";

const props = defineProps<{ cargo: ICargo }>();
const position = usePosition(props.cargo);

const cargoImageSrc = computed(() => {
  return props.cargo.isOnTarget ? cargoOnTargetImage : cargoImage;
});
</script>
