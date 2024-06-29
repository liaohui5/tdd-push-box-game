import { describe, beforeEach, it, expect } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useEditorCargoStore } from "@/store/editor/cargo";

describe("editor cargo store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should be create a cargo object", () => {
    const { createCargo } = useEditorCargoStore();
    const cargo = createCargo({
      x: 1,
      y: 1,
    });

    expect(cargo).toMatchInlineSnapshot(`
      {
        "id": 1,
        "isOnTarget": false,
        "x": 1,
        "y": 1,
      }
    `);
  });

  it("should be add cargo to cargos", () => {
    const { cargos, createCargo, addCargo } = useEditorCargoStore();
    addCargo(createCargo({ x: 1, y: 1 }));

    expect(cargos.length).toBe(1);
  });

  it("should be remove cargo from cargos", () => {
    const { cargos, createCargo, addCargo, removeCargo } = useEditorCargoStore();
    const cargo = createCargo({ x: 1, y: 1 });
    addCargo(cargo);
    removeCargo(cargo);

    expect(cargos.length).toBe(0);
  });

  it("should be find cargo by position in cargos", () => {
    const { findCargoByPos, addCargo, createCargo } = useEditorCargoStore();
    addCargo(createCargo({ x: 1, y: 1 }));

    expect(findCargoByPos({x:1, y: 1})).toBeTruthy();

    expect(findCargoByPos({x: 1, y: 2})).toBeUndefined();
  });

});
