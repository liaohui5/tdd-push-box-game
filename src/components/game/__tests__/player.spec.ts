import { beforeEach, describe, expect, it } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { mount } from "@vue/test-utils";
import { useMove } from "@/components/game/player";
import { usePlayerStore } from "@/store/player";
import { useMapStore } from "@/store/map";

describe("player move and position", () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    const { setupMap } = useMapStore();
    setupMap([
      [2, 2, 2],
      [2, 2, 2],
      [2, 2, 2],
    ]);
  });

  it("should move to left when press ArrowLeft", () => {
    const { player } = usePlayerStore();
    player.x = 1;
    player.y = 1;

    // because useMove used onMounted/onUnmounted hook for listen event
    // so, must be use @vue/test-utils mount component
    mount({
      render() {},
      setup() {
        useMove();
      },
    });

    // trigger evnet, mock press keyboard
    window.dispatchEvent(new KeyboardEvent("keyup", { code: "ArrowLeft" }));

    expect(player.x).toBe(0);
  });
});
