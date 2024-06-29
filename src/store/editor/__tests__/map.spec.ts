import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useEditorMapStore } from "@/store/editor/map";
import { MapElement } from "@/store/map";

describe("editor map store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should be init editor map data", () => {
    const { map, initMap } = useEditorMapStore();
    initMap(3, 4);
    expect(map.length).toEqual(3);
    expect(map[0].length).toEqual(4);
  });

  it("should be add new line when increase row", () => {
    const { map, setRow, updateMapRow, initMap } = useEditorMapStore();
    initMap(2, 2);
    setRow(3);

    updateMapRow();

    expect(map).toMatchInlineSnapshot(`
      [
        [
          2,
          2,
        ],
        [
          2,
          2,
        ],
        [
          2,
          2,
        ],
      ]
    `);
  });

  it("should be remove lines when decrease row", () => {
    const { map, setRow, updateMapRow, initMap } = useEditorMapStore();
    initMap(3, 3);
    setRow(1);

    updateMapRow();

    expect(map).toMatchInlineSnapshot(`
      [
        [
          2,
          2,
          2,
        ],
      ]
    `);
  });

  it("should be add columns when increase col", () => {
    const { map, setCol, updateMapCol, initMap } = useEditorMapStore();
    initMap(2, 2);
    setCol(3);

    updateMapCol();

    expect(map).toMatchInlineSnapshot(`
      [
        [
          2,
          2,
          2,
        ],
        [
          2,
          2,
          2,
        ],
      ]
    `);
  });

  it("should be remove columns when decrease col", () => {
    const { map, setCol, updateMapCol, initMap } = useEditorMapStore();
    initMap(3, 3);
    setCol(1);

    updateMapCol();

    expect(map).toMatchInlineSnapshot(`
      [
        [
          2,
        ],
        [
          2,
        ],
        [
          2,
        ],
      ]
    `);
  });

  it("should be set map block element", () => {
    const { map, initMap, setMapBlockElement } = useEditorMapStore();
    initMap(3, 3);
    setMapBlockElement({ x: 1, y: 1 }, MapElement.WALL);

    expect(map[1][1]).toBe(MapElement.WALL);
  });
});
