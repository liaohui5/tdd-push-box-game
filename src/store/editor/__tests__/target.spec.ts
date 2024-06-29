import { expect, describe, it, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useEditorTargetStore } from "@/store/editor/target";

describe("editor target store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should be create target object", () => {
    const { createTarget } = useEditorTargetStore();

    const target = createTarget({ x: 1, y: 1 });
    expect(target).toMatchInlineSnapshot(`
      {
        "id": 1,
        "x": 1,
        "y": 1,
      }
    `);
  });

  it("should be add target object to targets", () => {
    const { createTarget, addTarget, targets } = useEditorTargetStore();

    addTarget(createTarget({ x: 1, y: 1 }));

    expect(targets.length).toBe(1);
  });

  it("should be remove target object from targets", () => {
    const { createTarget, addTarget, removeTarget, targets } = useEditorTargetStore();
    const pos = { x: 1, y: 1 };
    addTarget(createTarget(pos));

    removeTarget(pos);
    expect(targets.length).toBe(0);
  });

  it("should be find target object by x and y from targets", () => {
    const { createTarget, addTarget, findTargetByPos } = useEditorTargetStore();
    const pos = { x: 1, y: 1 };
    addTarget(createTarget(pos));

    expect(findTargetByPos({ x: 1, y: 2 })).toBeFalsy();
    expect(findTargetByPos(pos)).toBeTruthy();
  });
});
