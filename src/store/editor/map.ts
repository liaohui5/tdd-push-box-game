import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { MapElement, type GameMap } from "@/store/map";
import { IPosition } from "@/hooks/usePosition";

export interface IEditorMapTable {
  col: number;
  row: number;
}

export const useEditorMapStore = defineStore("editorMap", () => {
  const map = reactive<GameMap>([]);

  const row = ref(6);
  const col = ref(6);
  function setRow(rows: number) {
    row.value = rows;
  }
  function setCol(cols: number) {
    col.value = cols;
  }
  function initMap(_row?: number, _col?: number) {
    _row && setRow(_row);
    _col && setCol(_col);

    for (let i = 0; i < row.value; i++) {
      const rows = [];
      for (let j = 0; j < col.value; j++) {
        rows.push(MapElement.FLOOR);
      }
      map.push(rows);
    }
  }
  function updateMapRow() {
    const newRow = row.value;
    const oldRow = map.length;
    if (newRow > oldRow) {
      const diff = newRow - oldRow;
      for (let i = 0; i < diff; i++) {
        map.push(new Array(col.value).fill(MapElement.FLOOR));
      }
    } else if (newRow < oldRow) {
      const diff = oldRow - newRow;
      map.splice(oldRow - diff, oldRow);
    }
  }

  function updateMapCol() {
    const newCol = col.value;
    const oldCol = map[0].length;
    if (newCol > oldCol) {
      const diff = newCol - oldCol;
      const newItems = new Array(diff).fill(MapElement.FLOOR);
      map.forEach((item) => item.splice(item.length, 0, ...newItems));
    } else if (oldCol > newCol) {
      const diff = oldCol - newCol;
      map.forEach((item) => item.splice(oldCol - diff, oldCol));
    }
  }

  function setMapBlockElement(pos: IPosition, type: MapElement) {
    map[pos.x][pos.y] = type;
  }

  return {
    map,
    row,
    col,
    setRow,
    setCol,
    initMap,
    updateMapRow,
    updateMapCol,
    setMapBlockElement,
  };
});
