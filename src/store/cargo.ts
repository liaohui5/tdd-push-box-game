import { defineStore } from "pinia";
import { reactive } from "vue";
import { IPosition } from "@/hooks/usePosition";
import { generateId } from "@/utils/id";
import { useMapStore } from "@/store/map";
import { useTargetStore } from "./target";

export interface ICargo extends IPosition {
  id: number;
  isOnTarget: boolean;
}

export const useCargoStore = defineStore("cargo", () => {
  const cargos: ICargo[] = reactive<ICargo[]>([]);
  const { isWall } = useMapStore();

  function createCargo(pos: IPosition): ICargo {
    return {
      id: generateId(),
      x: pos.x,
      y: pos.y,
      isOnTarget: false,
    };
  }

  function addCargo(cargo: ICargo) {
    cargos.push(cargo);
  }

  function findCargoByPos(pos: IPosition): ICargo | void {
    return cargos.find((cargo) => cargo.x === pos.x && cargo.y === pos.y);
  }

  function moveCargo(cargo: ICargo, dx: number, dy: number): boolean {
    const cargoNextPos = {
      x: cargo.x + dx,
      y: cargo.y + dy,
    };
    if (isWall(cargoNextPos)) {
      return false;
    }

    const isNextCargo = findCargoByPos(cargoNextPos);
    if (isNextCargo) {
      return false;
    }

    cargo.x = cargoNextPos.x;
    cargo.y = cargoNextPos.y;

    _detectionOnTarget(cargo);

    return true;
  }

  function _detectionOnTarget(cargo: ICargo) {
    const { findTargetByPos } = useTargetStore();
    cargo.isOnTarget = Boolean(findTargetByPos(cargo));
  }

  function clearCargos() {
    cargos.splice(0, cargos.length);
  }

  return {
    cargos,
    createCargo,
    addCargo,
    findCargoByPos,
    moveCargo,
    clearCargos,
  };
});
