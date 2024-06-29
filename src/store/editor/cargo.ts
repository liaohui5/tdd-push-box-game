import { defineStore } from "pinia";
import { reactive } from "vue";
import { generateId } from "@/utils/id";
import { type IPosition } from "@/hooks/usePosition";
import { type ICargo } from "@/store/cargo";

export const useEditorCargoStore = defineStore("editorCargo", () => {
  const cargos = reactive<ICargo[]>([]);

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
    return cargos.find((item) => item.x === pos.x && item.y === pos.y);
  }

  function removeCargo(pos: IPosition) {
    for (let i = 0; i < cargos.length; i++) {
      const cargo = cargos[i];
      if (cargo.x === pos.x && cargo.y === pos.y) {
        cargos.splice(i, 1);
        break;
      }
    }
  }

  return {
    cargos,
    createCargo,
    addCargo,
    removeCargo,
    findCargoByPos,
  };
});
