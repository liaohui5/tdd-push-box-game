import { defineStore } from "pinia";
import { reactive } from "vue";
import { IPosition } from "@/hooks/usePosition";
import { generateId } from "@/utils/id";

export interface ITarget extends IPosition {
  id: number;
}

export const useTargetStore = defineStore("target", () => {
  const targets = reactive<ITarget[]>([]);

  function addTarget(target: ITarget) {
    targets.push(target);
  }

  function findTargetByPos(target: IPosition) {
    return targets.find((item) => item.x === target.x && item.y === target.y);
  }

  function createTarget(pos: IPosition) {
    return {
      id: generateId(),
      x: pos.x,
      y: pos.y,
    };
  }

  function clearTargets() {
    targets.splice(0, targets.length);
  }

  return {
    targets,
    addTarget,
    createTarget,
    findTargetByPos,
    clearTargets,
  };
});
