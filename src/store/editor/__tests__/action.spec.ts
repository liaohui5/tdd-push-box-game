import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useEditorMapStore } from "@/store/editor/map";
import { useEditorPlayerStore } from "@/store/editor/player";
import { useEditorActionStore, EditorActionType } from "@/store/editor/action";
import { MapElement } from "@/store/map";

describe("editor action store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should be change to wall when current action is wall action", () => {
    const { map, initMap } = useEditorMapStore();
    const { setCurrentAction, getCurrentAction } = useEditorActionStore();
    initMap(3, 3);
    setCurrentAction(EditorActionType.WALL);

    getCurrentAction()?.execute({ x: 1, y: 1 });

    expect(map[1][1]).toBe(MapElement.WALL);
  });

  it("should be change to floor when current action is floor action", () => {
    const { map, initMap } = useEditorMapStore();
    const { setCurrentAction, getCurrentAction } = useEditorActionStore();

    initMap(3, 3);
    setCurrentAction(EditorActionType.FLOOR);

    getCurrentAction()?.execute({ x: 1, y: 1 });
    expect(map[1][1]).toBe(MapElement.FLOOR);
  });

  it("should be set player position when current action is player action", () => {
    const { player } = useEditorPlayerStore();
    const { setCurrentAction, getCurrentAction } = useEditorActionStore();

    setCurrentAction(EditorActionType.PLAYER);

    getCurrentAction()?.execute({ x: 1, y: 1 });
    expect(player.x).toBe(1);
    expect(player.y).toBe(1);
  });
});
