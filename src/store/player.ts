import { defineStore } from "pinia";
import { reactive } from "vue";
import { useMapStore } from "@/store/map";
import { useCargoStore } from "@/store/cargo";
import { type IPosition } from "@/hooks/usePosition";

export interface IPlayer extends IPosition {}

export const usePlayerStore = defineStore("usePlayer", () => {
  const { isWall } = useMapStore();

  const player = reactive<IPlayer>({
    x: 0,
    y: 0,
  });

  function _movePlayer(dx: number, dy: number): void {
    const nextPosition: IPosition = {
      x: player.x + dx,
      y: player.y + dy,
    };

    // player hit the wall
    if (isWall(nextPosition)) {
      return;
    }

    // player push the cargo and move
    const { findCargoByPos, moveCargo } = useCargoStore();
    const cargo = findCargoByPos(nextPosition);
    if (cargo) {
      const isMoved = moveCargo(cargo, dx, dy);
      if (!isMoved) {
        return;
      }
    }

    // player move to target position
    setupPlayerPos(nextPosition);
  }

  function setupPlayerPos(pos: IPosition) {
    player.x = pos.x;
    player.y = pos.y;
  }

  const movePlayerToLeft = () => {
    _movePlayer(-1, 0);
  };

  const movePlayerToRight = () => {
    _movePlayer(1, 0);
  };

  const movePlayerToUp = () => {
    _movePlayer(0, -1);
  };

  const movePlayerToDown = () => {
    _movePlayer(0, 1);
  };

  return {
    player,
    setupPlayerPos,
    movePlayerToLeft,
    movePlayerToRight,
    movePlayerToUp,
    movePlayerToDown,
  };
});
