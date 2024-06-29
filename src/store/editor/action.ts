import cargoImage from "@/assets/cargo.png";
import targetImage from "@/assets/target.png";
import floorImage from "@/assets/floor.png";
import wallImage from "@/assets/wall.png";
import playerImage from "@/assets/keeper.png";
import { defineStore } from "pinia";
import { ref } from "vue";
import { type IPosition } from "@/hooks/usePosition";
import { MapElement } from "@/store/map";
import { useEditorMapStore } from "@/store/editor/map";
import { useEditorPlayerStore } from "@/store/editor/player";
import { useEditorCargoStore } from "@/store/editor/cargo";
import { useEditorTargetStore } from "@/store/editor/target";

export enum EditorActionType {
  FLOOR = "floor",
  WALL = "wall",
  PLAYER = "player",
  TARGET = "target",
  CARGO = "cargo",
}

export interface EditorAction {
  type: EditorActionType;
  image: string;
  execute: (pos: IPosition) => void;
}

export const actions: Array<EditorAction> = [
  {
    type: EditorActionType.FLOOR,
    image: floorImage,
    execute: (pos: IPosition) => {
      const { setMapBlockElement } = useEditorMapStore();
      setMapBlockElement(pos, MapElement.FLOOR);
    },
  },
  {
    type: EditorActionType.WALL,
    image: wallImage,
    execute: (pos: IPosition) => {
      const { setMapBlockElement } = useEditorMapStore();
      setMapBlockElement(pos, MapElement.WALL);
    },
  },
  {
    type: EditorActionType.PLAYER,
    image: playerImage,
    execute: (pos: IPosition) => {
      const { setPlayerPos } = useEditorPlayerStore();
      setPlayerPos(pos);
    },
  },
  {
    type: EditorActionType.CARGO,
    image: cargoImage,
    execute: (pos: IPosition) => {
      const { findCargoByPos, addCargo, createCargo } = useEditorCargoStore();
      const targetCargo = findCargoByPos(pos);
      if (!targetCargo) {
        addCargo(createCargo(pos));
      }
    },
  },
  {
    type: EditorActionType.TARGET,
    image: targetImage,
    execute: (pos: IPosition) => {
      const { addTarget, createTarget, findTargetByPos } = useEditorTargetStore();
      const foundTarget = findTargetByPos(pos);
      if (!foundTarget) {
        addTarget(createTarget(pos));
      }
    },
  },
];

export const useEditorActionStore = defineStore("editorAction", () => {
  const currentAction = ref<EditorAction | void>();

  function getCurrentAction() {
    return currentAction.value;
  }

  function setCurrentAction(type: EditorActionType) {
    currentAction.value = actions.find((item) => item.type === type);
  }

  return {
    getCurrentAction,
    setCurrentAction,
  };
});
