import * as React from "react";

import { Context } from "./context";

/**
 * FocusManager handles focus state for a container and its descendants.
 *
 * IMPORTANT: This component uses native DOM event listeners for focusin/focusout instead of React's
 * synthetic events. This is necessary because:
 *
 * 1. React doesn't synthesize focusin/focusout events (only focus/blur)
 * 2. Unlike focus/blur, focusin/focusout events bubble up the DOM tree
 * 3. We need to detect focus events on any descendant element, not just the container itself
 *
 * Alternative approaches using React's onFocus/onBlur would require attaching event handlers to
 * every focusable child element, which would be impractical.
 */
export function FocusManager({ children }: React.PropsWithChildren) {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const { isFocused, setFocused } = React.useContext(Context);

  // We need a ref to track the latest focus state because the event listener callbacks are only
  // created once (due to empty dependency array in useEffect).  Without this ref, they would
  // capture the initial value of isFocused and never see updates.
  const isFocusedRef = React.useRef(isFocused);

  React.useEffect(() => {
    isFocusedRef.current = isFocused;
  }, [isFocused]);

  const handleFocusIn = React.useCallback((event: FocusEvent) => {
    if (parentRef.current && parentRef.current.contains(event.target as Node | null)) {
      if (!isFocusedRef.current) setFocused(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFocusOut = React.useCallback((event: FocusEvent) => {
    if (parentRef.current && !parentRef.current.contains(event.relatedTarget as Node | null)) {
      if (isFocusedRef.current) setFocused(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set up native DOM event listeners for focusin/focusout.  We use these instead of React's
  // synthetic events because:
  //
  // - focusin/focusout bubble up the DOM tree (unlike focus/blur)
  // - React doesn't provide synthetic events for focusin/focusout
  // - We need to detect focus events on any descendant element
  React.useEffect(() => {
    const parentElement = parentRef.current;
    if (!parentElement) return;

    parentElement.addEventListener("focusin", handleFocusIn);
    parentElement.addEventListener("focusout", handleFocusOut);

    return () => {
      parentElement.removeEventListener("focusin", handleFocusIn);
      parentElement.removeEventListener("focusout", handleFocusOut);
    };
  }, [handleFocusIn, handleFocusOut]);

  return (
    <div ref={parentRef} tabIndex={-1}>
      {children}
    </div>
  );
}
