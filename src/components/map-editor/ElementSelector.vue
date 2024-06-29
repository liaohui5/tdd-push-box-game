<template>
  <div>
    <div class="m-2 flex">
      <div class="w-12">row</div>
      <input type="number" min="1" v-model.number="row" class="border border-red-400" />
    </div>
    <div class="m-2 flex">
      <div class="w-12">col</div>
      <input type="number" min="1" v-model.number="col" class="border border-red-400" />
    </div>
  </div>

  <div class="flex py-2">
    <div class="w-24 mx-2 inline-flex items-center">选择元素</div>
    <img
      class="mr-5 border"
      v-for="item of actions"
      :src="item.image"
      :key="item.type"
      :class="currentAction?.type === item.type ? 'border-red-500' : ''"
      @click="setCurrentAction(item.type)"
    />
  </div>
</template>

<script setup lang="ts">
  import { useEditorMapStore } from "@/store/editor/map";
  import { useEditorActionStore, actions } from "@/store/editor/action";
  import { watchEffect, toRefs, computed } from "vue";

  const { setCurrentAction, getCurrentAction } = useEditorActionStore();
  const { updateMapCol, updateMapRow } = useEditorMapStore();
  const { col, row } = toRefs(useEditorMapStore());
  const currentAction = computed(() => getCurrentAction()); // becase pinia currentAction losted reactivity

  watchEffect(() => {
    if (row.value && row.value > 0) {
      updateMapRow();
    }
  });

  watchEffect(() => {
    if (col.value && col.value > 0) {
      updateMapCol();
    }
  });
</script>
