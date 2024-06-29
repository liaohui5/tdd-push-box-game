import { it, expect, describe, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useMapStore } from "@/store/map";

describe("game map", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("setupMap", () => {
    const { map, setupMap } = useMapStore();
    const newMap = [
      [1, 1, 1, 1],
      [1, 2, 2, 1],
      [1, 2, 2, 1],
      [1, 1, 1, 1],
    ];
    setupMap(newMap);
    expect(map).toEqual(newMap);
  });
});
