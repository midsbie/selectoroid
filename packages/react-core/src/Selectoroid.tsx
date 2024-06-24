import * as React from "react";

import { FocusManager } from "./FocusManager";

export function Selectoroid({ children }: React.PropsWithChildren) {
  return (
    <div className="selectoroid">
      <FocusManager>{children}</FocusManager>
    </div>
  );
}
