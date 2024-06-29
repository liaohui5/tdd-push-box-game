import { defineStore } from "pinia";
import { reactive } from "vue";
import { type ITarget } from "@/store/target";
import { type IPosition } from "@/hooks/usePosition";
import { generateId } from "@/utils/id";

export const useEditorTargetStore = defineStore("editorTarget", () => {
  const targets = reactive<ITarget[]>([]);

  function createTarget(pos: IPosition): ITarget {
    return {
      id: generateId(),
      x: pos.x,
      y: pos.y,
    };
  }

  function addTarget(target: ITarget) {
    targets.push(target);
  }

  function removeTarget(pos: IPosition) {
    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];
      if (target.x == pos.x && target.y === pos.y) {
        targets.splice(i, 1);
        break;
      }
    }
  }

  function findTargetByPos(pos: IPosition) {
    return targets.find((item) => item.x === pos.x && item.y === pos.y);
  }

  return {
    targets,
    createTarget,
    addTarget,
    removeTarget,
    findTargetByPos,
  };
});
