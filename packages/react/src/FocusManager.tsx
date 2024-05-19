import * as React from "react";

import { Context } from "./context";

export function FocusManager({ children }: React.PropsWithChildren) {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const { isFocused, setFocused } = React.useContext(Context);
  const isFocusedRef = React.useRef(false);
  isFocusedRef.current = isFocused;

  React.useEffect(() => {
    const handleFocusIn = (event: FocusEvent) => {
      if (parentRef.current && parentRef.current.contains(event.target as Node | null)) {
        if (!isFocusedRef.current) setFocused(true);
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      if (parentRef.current && !parentRef.current.contains(event.relatedTarget as Node | null)) {
        if (isFocusedRef.current) setFocused(false);
      }
    };

    const parentElement = parentRef.current;
    if (parentElement) {
      parentElement.addEventListener("focusin", handleFocusIn);
      parentElement.addEventListener("focusout", handleFocusOut);
    }

    return () => {
      if (parentElement) {
        parentElement.removeEventListener("focusin", handleFocusIn);
        parentElement.removeEventListener("focusout", handleFocusOut);
      }
    };
  }, []);

  return (
    <div ref={parentRef} tabIndex={-1}>
      {children}
    </div>
  );
}
