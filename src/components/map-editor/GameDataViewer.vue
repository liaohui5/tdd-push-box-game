<template>
  <textarea class="w-full h-full border border-red-500">
 {{ levelGameData }}</textarea
  >
</template>

<script setup lang="ts">
import { computed } from "vue";
import { type ILevelGameData } from "@/components/game/gameData";
import { useEditorCargoStore } from "@/store/editor/cargo";
import { useEditorTargetStore } from "@/store/editor/target";
import { useEditorPlayerStore } from "@/store/editor/player";
import { useEditorMapStore } from "@/store/editor/map";

const levelGameData = computed<ILevelGameData>(() => {
  const { map } = useEditorMapStore();
  const { cargos } = useEditorCargoStore();
  const { targets } = useEditorTargetStore();
  const { player } = useEditorPlayerStore();

  return {
    map,
    player,
    cargos,
    targets,
  };
});
</script>
