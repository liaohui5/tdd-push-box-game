import { describe, it, expect, beforeEach, should } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useCargoStore } from "@/store/cargo";
import { useTargetStore } from "@/store/target";
import { useGameStore } from "@/store/game";
import { useMapStore } from "@/store/map";

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

const gameData = [firstLvGameData, secondLvGameData];

describe("game", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    const { setupMap } = useMapStore();
    setupMap([
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ]);
  });

  it("should game completed", () => {
    // set cargo position
    const { createCargo, addCargo, moveCargo } = useCargoStore();
    const cargo = createCargo({ x: 2, y: 1 });
    addCargo(cargo);

    // set target position
    const { createTarget, addTarget } = useTargetStore();
    addTarget(createTarget({ x: 1, y: 1 }));

    // move cargo to target position
    moveCargo(cargo, -1, 0);

    // then
    const { detectionGameCompleted, game } = useGameStore();
    detectionGameCompleted();
    expect(game.isCompleted).toBe(true);
  });

  it("should not game completed", () => {
    // set cargo position
    const { createCargo, addCargo, moveCargo } = useCargoStore();
    const cargo = createCargo({ x: 2, y: 1 });
    addCargo(cargo);

    // set target position
    const { createTarget, addTarget } = useTargetStore();
    addTarget(createTarget({ x: 1, y: 1 }));

    // 1. move cargo to target position
    // 2. move cargo to origin position
    moveCargo(cargo, -1, 0);
    moveCargo(cargo, 1, 0);

    // then
    const { detectionGameCompleted, game } = useGameStore();
    detectionGameCompleted();
    expect(game.isCompleted).toBe(false);
  });

  it("shold be init game data", () => {
    const { initGameData } = useGameStore();
    initGameData(gameData);

    const { map } = useMapStore();
    const { cargos } = useCargoStore();
    const { targets } = useTargetStore();
    expect(map.length).toBe(firstLvGameData.map.length);
    expect(cargos.length).toBe(firstLvGameData.cargos.length);
    expect(targets.length).toBe(firstLvGameData.targets.length);
  });

  it("should to next level", () => {
    const { game, initGameData, toNextLevel } = useGameStore();
    initGameData(gameData);

    expect(game.level).toBe(0);
    toNextLevel();
    expect(game.level).toBe(1);

    const { map } = useMapStore();
    const { cargos } = useCargoStore();
    const { targets } = useTargetStore();

    expect(map.length).toBe(secondLvGameData.map.length);
    expect(cargos.length).toBe(secondLvGameData.cargos.length);
    expect(targets.length).toBe(secondLvGameData.targets.length);
  });

  it("should be reset game completed when to next level", () => {
    const { game, toNextLevel } = useGameStore();

    // manual update "isCompleted" property for test case
    game.isCompleted = true;

    toNextLevel();

    expect(game.isCompleted).toBe(false);
  });
});
