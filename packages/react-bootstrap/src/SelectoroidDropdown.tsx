import * as React from "react";
import { Dropdown } from "react-bootstrap";

import { Context, MouseDownSink, SelectoroidMenu } from "@selectoroid/react-core";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.PropsWithChildren {}

export function SelectoroidDropdown({ children }: Props) {
  const { isFocused, isOpen } = React.useContext(Context);

  return (
    <Dropdown show={isFocused && isOpen} className="selectoroid-picker">
      {children}

      <Dropdown.Menu className="selectoroid-picker-dropdown w-100">
        <MouseDownSink>
          <SelectoroidMenu />
        </MouseDownSink>
      </Dropdown.Menu>
    </Dropdown>
  );
}
