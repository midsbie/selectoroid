import * as React from "react";
import { OverlayTrigger, OverlayTriggerProps, Popover, PopoverBody } from "react-bootstrap";

import { Context, MouseDownSink, SelectoroidMenu } from "@selectoroid/react-core";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.PropsWithChildren<Omit<OverlayTriggerProps, "overlay">> {}

export function SelectoroidPopover({ children, ...props }: Props): JSX.Element {
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
