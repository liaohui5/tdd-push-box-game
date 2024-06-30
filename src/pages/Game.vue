<template>
  <div class="relative z-0">
    <Map />
    <Player />

    <template v-for="cargo of cargos" :key="cargo.id">
      <Cargo :cargo="cargo" />
    </template>

    <template v-for="target of targets" :key="target.id">
      <Target :target="target" />
    </template>

    <button
      class="w-36 rounded-sm mt-5 py-2 px-4 text-white bg-green-500"
      v-if="game.isCompleted"
      @click="toNextLevel"
    >
      下一关
    </button>
  </div>
</template>

<script setup lang="ts">
import Map from "@/components/game/Map.vue";
import Player from "@/components/game/Player.vue";
import Cargo from "@/components/game/Cargo.vue";
import Target from "@/components/game/Target.vue";
import { useCargoStore } from "@/store/cargo";
import { useTargetStore } from "@/store/target";
import { useGameStore } from "@/store/game";
import { gameDatas } from "@/components/game/gameData";

const { cargos } = useCargoStore();
const { targets } = useTargetStore();
const { game, toNextLevel, initGameData } = useGameStore();

initGameData(gameDatas);
</script>
