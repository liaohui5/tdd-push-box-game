import { type GameMap } from "@/store/map";
import { type IPlayer } from "@/store/player";
import { type ICargo } from "@/store/cargo";
import { type ITarget } from "@/store/target";

export interface ILevelGameData {
  map: GameMap;
  player: IPlayer;
  cargos: Array<Pick<ICargo, "x" | "y">>;
  targets: Array<Pick<ITarget, "x" | "y">>;
}

export type GameDatas = Array<ILevelGameData>;

const firstLvGameData = {
  // 第一关的数据
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ],
  player: { x: 1, y: 1 },
  cargos: [{ x: 2, y: 2 }],
  targets: [{ x: 3, y: 3 }],
};

const secondLvGameData = {
  // 第二关的数据
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ],
  player: { x: 1, y: 1 },
  cargos: [
    { x: 2, y: 2 },
    { x: 3, y: 3 },
  ],
  targets: [
    { x: 4, y: 4 },
    { x: 5, y: 5 },
  ],
};

export const gameDatas: GameDatas = [firstLvGameData, secondLvGameData];
