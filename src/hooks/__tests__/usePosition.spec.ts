import { describe, expect, it } from "vitest";
import { reactive } from "vue";
import { EDITOR_STEP, usePosition } from "@/hooks/usePosition";

describe("usePosition", () => {
  it("should be return position object for style", () => {
    const position = usePosition({
      x: 1,
      y: 1,
    });

    expect(position.value).toEqual({
      left: "32px",
      top: "32px",
    });
  });

  it("should be return position object for editor style", () => {
    const position = usePosition({ x: 1, y: 1 }, EDITOR_STEP);

    expect(position.value).toEqual({
      left: "34px",
      top: "34px",
    });
  });

  it("should be update position when reactive data changed", () => {
    const pos = reactive({
      x: 1,
      y: 1,
    });

    const position = usePosition(pos);
    pos.x = 2;

    expect(position.value).toEqual({
      left: "64px",
      top: "32px",
    });
  });
});
