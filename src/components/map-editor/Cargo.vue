<template>
  <div class="absolute z-20 border-2 border-white" :style="position" @dblclick="handleDblclick">
    <img :src="cargoImageSrc" class="w-full" />
  </div>
</template>

<script setup lang="ts">
  import cargoImage from "@/assets/cargo.png";
  import cargoOnTargetImage from "@/assets/cargo_on_target.png";
  import { usePosition, EDITOR_STEP } from "@/hooks/usePosition";
  import { type ICargo } from "@/store/cargo";
  import { useEditorCargoStore } from "@/store/editor/cargo";
  import { computed } from "vue";

  const props = defineProps<{ cargo: ICargo }>();
  const position = usePosition(props.cargo, EDITOR_STEP);

  const cargoImageSrc = computed(() => {
    return props.cargo.isOnTarget ? cargoOnTargetImage : cargoImage;
  });
  const { removeCargo } = useEditorCargoStore();

  function handleDblclick() {
    removeCargo(props.cargo);
  }
</script>
