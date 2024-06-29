import { defineStore } from "pinia";
import { type IPosition } from "@/hooks/usePosition";

export enum MapElement {
  WALL = 1,
  FLOOR = 2,
}
export type GameMap = Array<MapElement[]>;

export const useMapStore = defineStore("map", () => {
  const map: GameMap = [];

  function isWall(pos: IPosition) {
    return map[pos.y][pos.x] === MapElement.WALL;
  }

  function setupMap(newMap: GameMap) {
    map.splice(0, map.length, ...newMap);
  }

  return {
    map,
    isWall,
    setupMap,
  };
});
