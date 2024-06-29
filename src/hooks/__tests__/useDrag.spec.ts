import { describe, it, expect } from "vitest";
import { useDrag } from "@/hooks/useDrag";

describe("useDrag", () => {
  it("should start drag", () => {
    const { isDragging, startDrag } = useDrag();

    startDrag();

    expect(isDragging()).toBe(true);
  });

  it("should start drag", () => {
    const { isDragging, stopDrag } = useDrag();

    stopDrag();

    expect(isDragging()).toBe(false);
  });
});
