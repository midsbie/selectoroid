import * as React from "react";
import { OverlayTrigger, Popover, PopoverBody } from "react-bootstrap";

import { Options, SelectedOption } from "@power-select/model";
import { Context, MouseDownSink, PowerSelect } from "@power-select/react";
import { useMouseDownGlobalHandler } from "@power-select/react-hooks";

interface Props extends React.PropsWithChildren {
  options: Options;
  onSelect: (opt: SelectedOption) => void;
}

export function ContextualizedPowerSelect({ options, onSelect, children }: Props) {
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
    <div className="power-select-picker">
      <OverlayTrigger
        trigger="click"
        show={isOpen}
        placement="bottom"
        onToggle={setOpen}
        overlay={
          <Popover className="power-select-picker-popover">
            <PopoverBody>
              <MouseDownSink>
                <PowerSelect options={options} onSelect={onSelect} />
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
