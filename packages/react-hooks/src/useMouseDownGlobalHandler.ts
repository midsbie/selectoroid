import * as React from "react";

type Options = {
  disabled?: boolean;
  onDown?: (event: React.MouseEvent) => void;
  onUp?: (event: React.MouseEvent) => void;
};

export function useMouseDownGlobalHandler({ disabled, onDown, onUp }: Options = {}): boolean {
  const [down, setDown] = React.useState(false);

  const handleMouseDown = React.useCallback(
    (ev: React.MouseEvent) => {
      setDown(true);
      try {
        if (onDown) onDown(ev);
      } catch (x) {
        // nop
      }
    },
    [onDown]
  );

  const handleMouseUp = React.useCallback(
    (ev: React.MouseEvent) => {
      setDown(false);
      try {
        if (onUp) onUp(ev);
      } catch (x) {
        // nop
      }
    },
    [onUp]
  );

  React.useEffect((): any => {
    if (disabled) return;

    window.addEventListener("mousedown", handleMouseDown as any);
    window.addEventListener("mouseup", handleMouseUp as any);

    /* eslint-disable-next-line consistent-return */
    return () => {
      window.removeEventListener("mouseup", handleMouseUp as any);
      window.removeEventListener("mousedown", handleMouseDown as any);
    };
  }, [disabled, handleMouseDown, handleMouseUp]);

  return down;
}
