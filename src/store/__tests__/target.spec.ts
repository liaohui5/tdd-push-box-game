import { describe, beforeEach, it, expect } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useTargetStore } from "@/store/target";

describe("target", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should be add target", () => {
    const { targets, createTarget, addTarget } = useTargetStore();
    const target = {
      x: 1,
      y: 1,
    };
    addTarget(createTarget(target));
    expect(targets.length).toBe(1);
  });

  it("should be find target by x and y", () => {
    const { createTarget, addTarget, findTargetByPos } = useTargetStore();
    const target = {
      x: 1,
      y: 2,
    };
    addTarget(createTarget(target));

    const found = findTargetByPos(target);
    expect(found!.x).toBe(1);
    expect(found!.y).toBe(2);

    const notFound = findTargetByPos({ x: 1, y: 3 });
    expect(notFound).toBeUndefined();
  });
});
