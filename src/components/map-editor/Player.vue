<template>
  <div class="absolute z-50 border-2 border-white" :style="position">
    <img :src="keeperImage" class="w-full" />
  </div>
</template>

<script setup lang="ts">
import keeperImage from "@/assets/keeper.png";
import { usePosition, EDITOR_STEP } from "@/hooks/usePosition";
import { useEditorPlayerStore } from "@/store/editor/player";

// 处理游戏人物的位置
const { player } = useEditorPlayerStore();
const position = usePosition(player, EDITOR_STEP);
</script>
