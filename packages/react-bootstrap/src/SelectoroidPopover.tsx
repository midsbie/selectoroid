import * as React from "react";
import { OverlayTrigger, Popover, PopoverBody } from "react-bootstrap";

import { Context, MouseDownSink, Selectoroid } from "@selectoroid/react";
import { useMouseDownGlobalHandler } from "@selectoroid/react-hooks";

interface Props extends React.PropsWithChildren {}

export function SelectoroidPopover({ children }: Props) {
  const { isOpen, setOpen } = React.useContext(Context);
  const down = useMouseDownGlobalHandler();

  const handleSuppression = React.useCallback((ev: React.MouseEvent) => {
    ev.stopPropagation();
  }, []);

  React.useEffect(() => {
    if (isOpen && down) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [down]);

  return (
    <div className="selectoroid-picker">
      <OverlayTrigger
        trigger="click"
        show={isOpen}
        placement="bottom"
        onToggle={setOpen}
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
        <div onMouseDown={handleSuppression}>{children}</div>
      </OverlayTrigger>
    </div>
  );
}
