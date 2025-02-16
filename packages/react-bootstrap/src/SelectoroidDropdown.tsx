import * as React from "react";
import { Dropdown } from "react-bootstrap";

import { ClickEventBoundary, Context, SelectoroidMenu } from "@selectoroid/react-core";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.PropsWithChildren {}

export function SelectoroidDropdown({ children }: Props) {
  const { isFocused, isOpen } = React.useContext(Context);

  return (
    <Dropdown show={isFocused && isOpen} className="selectoroid-picker">
      {children}

      <ClickEventBoundary>
        <Dropdown.Menu className="selectoroid-picker-dropdown w-100">
          <SelectoroidMenu />
        </Dropdown.Menu>
      </ClickEventBoundary>
    </Dropdown>
  );
}
