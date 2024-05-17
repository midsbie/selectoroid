import * as React from "react";
import { OverlayTrigger, Popover, PopoverBody } from "react-bootstrap";

import { Context, MouseDownSink, Selectoroid } from "@selectoroid/react";

interface Props extends React.PropsWithChildren {}

export function SelectoroidPopover({ children }: Props) {
  const { isFocused, isOpen, toggleOpen } = React.useContext(Context);

  return (
    <div className="selectoroid-picker">
      <OverlayTrigger
        trigger="click"
        show={isFocused && isOpen}
        onToggle={toggleOpen}
        placement="bottom"
        overlay={
          <Popover className="selectoroid-picker-popover">
            <PopoverBody>
              <MouseDownSink>
                <Selectoroid />
              </MouseDownSink>
            </PopoverBody>
          </Popover>
        }
      >
        <div>{children}</div>
      </OverlayTrigger>
    </div>
  );
}
