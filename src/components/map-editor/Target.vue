<template>
  <div class="absolute z-10" :style="position" @dblclick="handleDblclick">
    <img :src="targetImage" />
  </div>
</template>

<script setup lang="ts">
import targetImage from "@/assets/target.png";
import { usePosition, EDITOR_STEP } from "@/hooks/usePosition";
import { type ITarget } from "@/store/target";
import { useEditorTargetStore } from "@/store/editor/target";

const props = defineProps<{ target: ITarget }>();
const position = usePosition(props.target, EDITOR_STEP);

const { removeTarget } = useEditorTargetStore();
function handleDblclick() {
  removeTarget(props.target);
}
</script>
