import { defineStore } from "pinia";
import { reactive } from "vue";
import { useCargoStore } from "@/store/cargo";
import { useMapStore } from "@/store/map";
import { useTargetStore } from "@/store/target";
import { usePlayerStore } from "@/store/player";
import { GameDatas } from "@/components/game/gameData";

export interface IGame {
  isCompleted: boolean;
  level: number;
  datas: GameDatas;
}

export const useGameStore = defineStore("game", () => {
  const game = reactive<IGame>({
    isCompleted: false,
    level: 0,
    datas: [],
  });

  function detectionGameCompleted() {
    const { cargos } = useCargoStore();
    game.isCompleted = cargos.every((item) => item.isOnTarget);
  }

  function initGameData(gameDatas: GameDatas) {
    game.datas = gameDatas;
    const levelGameData = gameDatas[game.level];
    if (!levelGameData) {
      // last level game data, next is undefined
      return;
    }

    const { setupPlayerPos } = usePlayerStore();
    const { setupMap } = useMapStore();
    const { createCargo, addCargo } = useCargoStore();
    const { createTarget, addTarget } = useTargetStore();
    setupMap(levelGameData.map);
    setupPlayerPos(levelGameData.player);
    levelGameData.cargos.forEach((c) => addCargo(createCargo(c)));
    levelGameData.targets.forEach((t) => addTarget(createTarget(t)));
  }

  function toNextLevel() {
    const { clearCargos } = useCargoStore();
    const { clearTargets } = useTargetStore();

    game.level += 1;
    game.isCompleted = false;
    clearCargos();
    clearTargets();
    initGameData(game.datas);
  }

  return {
    game,
    detectionGameCompleted,
    initGameData,
    toNextLevel,
  };
});
