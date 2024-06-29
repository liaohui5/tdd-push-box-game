import { defineStore } from "pinia";
import { reactive } from "vue";
import { type IPlayer } from "@/store/player";
import { type IPosition } from "@/hooks/usePosition";

export const useEditorPlayerStore = defineStore("editorPlayer", () => {
  const player = reactive<IPlayer>({
    x: 0,
    y: 0,
  });

  function setPlayerPos(pos: IPosition) {
    player.x = pos.x;
    player.y = pos.y;
  }

  return {
    player,
    setPlayerPos,
  };
});
