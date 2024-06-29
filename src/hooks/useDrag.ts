let _isDragging: boolean = false;
export function useDrag() {
  function startDrag() {
    _isDragging = true;
  }

  function stopDrag() {
    _isDragging = false;
  }

  function isDragging(): boolean {
    return _isDragging;
  }

  return {
    startDrag,
    stopDrag,
    isDragging,
  };
}
