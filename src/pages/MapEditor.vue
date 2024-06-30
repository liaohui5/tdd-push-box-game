<template>
  <div class="flex w-full border">
    <div class="w-1/2 map-wrapper relative">
      <Map />
      <Player />

      <template v-for="cargo of cargos" :key="cargo.id">
        <Cargo :cargo="cargo" />
      </template>

      <template v-for="target of targets" :key="target.id">
        <Target :target="target" />
      </template>
    </div>
    <div class="w-1/2 json-wrapper">
      <GameDataViewer />
    </div>
  </div>
  <ElementSelector />
</template>

<script setup lang="ts">
import Map from "@/components/map-editor/Map.vue";
import Player from "@/components/map-editor/Player.vue";
import Cargo from "@/components/map-editor/Cargo.vue";
import Target from "@/components/map-editor/Target.vue";
import ElementSelector from "@/components/map-editor/ElementSelector.vue";
import GameDataViewer from "@/components/map-editor/GameDataViewer.vue";
import { useEditorCargoStore } from "@/store/editor/cargo";
import { useEditorTargetStore } from "@/store/editor/target";

const { cargos } = useEditorCargoStore();
const { targets } = useEditorTargetStore();
</script>
