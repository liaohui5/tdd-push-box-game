import { onMounted, onUnmounted } from "vue";
import { usePlayerStore } from "@/store/player";
import { useGameStore } from "@/store/game";

export function useMove() {
  const {
    movePlayerToLeft,
    movePlayerToRight,
    movePlayerToDown,
    movePlayerToUp,
  } = usePlayerStore();

  function handleKeyUp(e: KeyboardEvent) {
    switch (e.code) {
      case "ArrowLeft":
        movePlayerToLeft();
        break;

      case "ArrowRight":
        movePlayerToRight();
        break;

      case "ArrowUp":
        movePlayerToUp();
        break;

      case "ArrowDown":
        movePlayerToDown();
        break;
      default:
        console.log("unknown key for move");
        break;
    }
    // check game is completed
    const { detectionGameCompleted } = useGameStore();
    detectionGameCompleted();
  }

  onMounted(() => {
    window.addEventListener("keyup", handleKeyUp);
  });

  onUnmounted(() => {
    window.removeEventListener("keyup", handleKeyUp);
  });
}
