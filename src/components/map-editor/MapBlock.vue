<template>
  <div class="border border-white z-10" @click="handleMapBlockClick" @mousedown="handleMouseDown" @mousemove="handleMouseMove">
    <img :src="mapBlockImageSrc" draggable="false" />
  </div>
</template>

<script setup lang="ts">
  import floorImage from "@/assets/floor.png";
  import wallImage from "@/assets/wall.png";
  import { MapElement } from "@/store/map";
  import { type IPosition } from "@/hooks/usePosition";
  import { computed, onMounted, onUnmounted } from "vue";
  import { useEditorMapStore } from "@/store/editor/map";
  import { useEditorActionStore } from "@/store/editor/action";
  import { useDrag } from "@/hooks/useDrag";

  const props = defineProps<IPosition>();

  const { map } = useEditorMapStore();
  const { getCurrentAction } = useEditorActionStore();

  const mapBlockImageSrc = computed(() => {
    return map[props.x][props.y] === MapElement.WALL ? wallImage : floorImage;
  });

  function executeAction() {
    const action = getCurrentAction();
    action && action.execute(props);
  }

  function handleMapBlockClick() {
    executeAction();
  }

  const { startDrag, stopDrag, isDragging } = useDrag();
  function handleMouseDown() {
    startDrag();
  }

  function handleMouseMove() {
    if (isDragging()) {
      executeAction();
    }
  }

  function handleMouseUp() {
    stopDrag();
  }

  onMounted(() => {
    window.addEventListener("mouseup", handleMouseUp);
  });
  onUnmounted(() => {
    window.removeEventListener("mouseup", handleMouseUp);
  });
</script>
