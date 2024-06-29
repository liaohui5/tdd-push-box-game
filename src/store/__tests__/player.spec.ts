import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { usePlayerStore } from "@/store/player";
import { useMapStore } from "@/store/map";
import { useCargoStore } from "@/store/cargo";

describe("player store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("normal move", () => {
    beforeEach(() => {
      const { setupMap } = useMapStore();
      setupMap([
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
      ]);
    });

    it("should set player position", () => {
      const { player, setupPlayerPos } = usePlayerStore();
      setupPlayerPos({ x: 1, y: 1 });

      expect(player.x).toBe(1);
      expect(player.y).toBe(1);
    });

    // 普通移动
    it("should move to left", () => {
      const { player, movePlayerToLeft, setupPlayerPos } = usePlayerStore();
      setupPlayerPos({ x: 1, y: 1 });

      movePlayerToLeft();

      expect(player.x).toBe(0);
    });

    it("should move to right", () => {
      const { player, setupPlayerPos, movePlayerToRight } = usePlayerStore();
      setupPlayerPos({ x: 1, y: 1 });

      movePlayerToRight();

      expect(player.x).toBe(2);
    });

    it("should move to up", () => {
      const { player, setupPlayerPos, movePlayerToUp } = usePlayerStore();
      setupPlayerPos({ x: 1, y: 1 });

      movePlayerToUp();

      expect(player.y).toBe(0);
    });

    it("should move to Down", () => {
      const { player, setupPlayerPos, movePlayerToDown } = usePlayerStore();
      setupPlayerPos({ x: 1, y: 1 });

      movePlayerToDown();

      expect(player.y).toBe(2);
    });
  });

  describe("can't move", () => {
    // 移动撞墙
    beforeEach(() => {
      const { setupMap } = useMapStore();
      setupMap([
        [1, 1, 1],
        [1, 2, 1],
        [1, 1, 1],
      ]);
    });

    it("should not move to left", () => {
      const { player, movePlayerToLeft, setupPlayerPos } = usePlayerStore();
      setupPlayerPos({ x: 1, y: 1 });

      movePlayerToLeft();

      expect(player.x).toBe(1);
    });

    it("should not move to right", () => {
      const { player, movePlayerToRight, setupPlayerPos } = usePlayerStore();
      setupPlayerPos({ x: 1, y: 1 });

      movePlayerToRight();

      expect(player.x).toBe(1);
    });

    it("should not move to up", () => {
      const { player, movePlayerToUp, setupPlayerPos } = usePlayerStore();
      setupPlayerPos({ x: 1, y: 1 });

      movePlayerToUp();

      expect(player.y).toBe(1);
    });

    it("should not move to Down", () => {
      const { player, movePlayerToDown, setupPlayerPos } = usePlayerStore();
      setupPlayerPos({ x: 1, y: 1 });

      movePlayerToDown();

      expect(player.y).toBe(1);
    });
  });

  describe("push cargo to move", () => {
    // 推箱子移动
    beforeEach(() => {
      const { setupMap } = useMapStore();
      setupMap([
        [1, 1, 1, 1, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 1, 1, 1, 1],
      ]);
    });

    it("should push cargo move to left", () => {
      // set cargo position
      const { createCargo, addCargo } = useCargoStore();
      const cargo = createCargo({ x: 2, y: 2 });
      addCargo(cargo);

      // set player position
      const { movePlayerToLeft, setupPlayerPos, player } = usePlayerStore();
      setupPlayerPos({ x: 3, y: 2 });

      movePlayerToLeft();

      expect(player.x).toBe(2);
      expect(cargo.x).toBe(1);
    });

    it("should not move when cargo hits the wall", () => {
      // set cargo position
      const { createCargo, addCargo } = useCargoStore();
      const cargo = createCargo({ x: 1, y: 1 });
      addCargo(cargo);

      // set player position
      const { movePlayerToLeft, player, setupPlayerPos } = usePlayerStore();
      setupPlayerPos({ x: 2, y: 1 });

      movePlayerToLeft();

      expect(player.x).toBe(2);
      expect(cargo.x).toBe(1);
    });

    it("should not move when cargo hits other cargo", () => {
      // set cargo position
      const { createCargo, addCargo } = useCargoStore();
      const cargo1 = createCargo({ x: 1, y: 1 });
      const cargo2 = createCargo({ x: 2, y: 1 });
      addCargo(cargo1);
      addCargo(cargo2);

      // set player position
      const { movePlayerToLeft, player, setupPlayerPos } = usePlayerStore();
      setupPlayerPos({ x: 3, y: 1 });

      movePlayerToLeft();

      expect(cargo1.x).toBe(1);
      expect(cargo2.x).toBe(2);
      expect(player.x).toBe(3);
    });
  });
});
