import { beforeEach, describe, it, expect } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useCargoStore } from "@/store/cargo";

describe("cargo", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should add cargo to cargos", () => {
    const { createCargo, addCargo, cargos } = useCargoStore();
    addCargo(createCargo({ x: 1, y: 1 }));
    expect(cargos.length).toBe(1);
  });

  it("should find cargo by position", () => {
    const { createCargo, addCargo, findCargoByPos } = useCargoStore();

    const pos = {
      x: 1,
      y: 1,
    };

    addCargo(createCargo(pos));
    const targetCargo = findCargoByPos(pos);

    expect(targetCargo.x).toBe(1);
    expect(targetCargo.y).toBe(1);
  });

  it("should clear all cargos", () => {
    const { createCargo, clearCargos, addCargo, cargos } = useCargoStore();
    addCargo(createCargo({ x: 1, y: 1 }));
    addCargo(createCargo({ x: 2, y: 2 }));

    // when
    clearCargos();

    // then
    expect(cargos.length).toBe(0);
  });
});
