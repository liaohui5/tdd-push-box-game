<template>
  <div class="absolute z-10" :style="position">
    <img :src="targetImage" />
  </div>
</template>

<script setup lang="ts">
import targetImage from "@/assets/target.png";
import { usePosition } from "@/hooks/usePosition";
import { type ITarget } from "@/store/target";

const props = defineProps<{ target: ITarget }>();
const position = usePosition(props.target);
</script>
