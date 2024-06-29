import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useEditorPlayerStore } from "@/store/editor/player";

describe("editor player store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("should set player position", () => {
    const { setPlayerPos, player } = useEditorPlayerStore();
    setPlayerPos({ x: 1, y: 1 });

    expect(player.x).toBe(1);
    expect(player.y).toBe(1);
  });
});
