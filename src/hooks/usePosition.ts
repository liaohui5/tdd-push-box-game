import { computed } from "vue";

export interface IPosition {
  x: number;
  y: number;
}

// 图片素材宽度
export const GMAE_STEP = 32;
export const EDITOR_STEP = 34;

export function usePosition(pos: IPosition, step: number = GMAE_STEP) {
  return computed(() => {
    return {
      left: step * pos.x + "px",
      top: step * pos.y + "px",
    };
  });
}
