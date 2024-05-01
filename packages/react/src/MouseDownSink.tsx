import * as React from "react";

interface Props {
  children: React.ReactNode;
}

export function MouseDownSink({ children }: Props) {
  return (
    <div
      onMouseDown={(ev) => {
        ev.preventDefault();
        ev.stopPropagation();
      }}
    >
      {children}
    </div>
  );
}
