<template>
  <div class="absolute z-50" :style="position">
    <img :src="keeperImage" />
  </div>
</template>

<script setup lang="ts">
import keeperImage from "@/assets/keeper.png";
import { useMove } from "@/components/game/player";
import { usePosition } from "@/hooks/usePosition";
import { usePlayerStore } from "@/store/player";

// 处理游戏人物移动逻辑
useMove();

// 处理游戏人物的位置
const { player } = usePlayerStore();
const position = usePosition(player);
</script>
