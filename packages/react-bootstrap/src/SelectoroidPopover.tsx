import * as React from "react";
import { OverlayTrigger, OverlayTriggerProps, Popover, PopoverBody } from "react-bootstrap";

import { Context, MouseDownSink, SelectoroidMenu } from "@selectoroid/react";

interface Props extends React.PropsWithChildren<OverlayTriggerProps> {}

export function SelectoroidPopover({ children, ...props }: Props) {
  const { isFocused, isOpen } = React.useContext(Context);

  return (
    <div className="selectoroid-picker">
      <OverlayTrigger
        trigger="click"
        show={isFocused && isOpen}
        placement="bottom"
        {...props}
        overlay={
          <Popover className="selectoroid-picker-popover">
            <PopoverBody>
              <MouseDownSink>
                <SelectoroidMenu />
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
