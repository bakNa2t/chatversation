import { KeyboardEventHandler } from "react";

export const useKeyPress = (targetKey: string, callback: () => void) => {
  const keyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === targetKey) {
      callback();
    }
  };
  return { keyDown };
};
