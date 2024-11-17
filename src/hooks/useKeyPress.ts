export const useKeyPress = (targetKey: string) => {
  const keyDown = (event: KeyboardEvent) => {
    if (event.key === targetKey) {
      event.preventDefault();
      return true;
    }
    return false;
  };
  const keyUp = (event: KeyboardEvent) => {
    if (event.key === targetKey) {
      event.preventDefault();
      return true;
    }
    return false;
  };
  return { keyDown, keyUp };
};
