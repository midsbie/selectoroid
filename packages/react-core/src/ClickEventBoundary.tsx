import * as React from "react";

interface Props {
  children: React.ReactNode;
}

export function ClickEventBoundary({ children }: Props) {
  const handleStopPropagation = React.useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return (
    <div
      onClick={handleStopPropagation}
      onMouseUp={handleStopPropagation}
      onMouseDown={handleStopPropagation}
    >
      {children}
    </div>
  );
}
