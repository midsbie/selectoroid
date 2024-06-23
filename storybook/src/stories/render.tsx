import { useArgs } from "@storybook/preview-api";
import * as React from "react";

import { OptionValue } from "@selectoroid/model";
import { ChangeContext, ContextProps } from "@selectoroid/react";
import {
  SelectoroidControl,
  SelectoroidPopover,
  SelectoroidProvider,
} from "@selectoroid/react-bootstrap";

import { Container } from "./Container";

export function render({
  ariaLabel,
  placeholder,
  multiple,
  options,
  value,
  onChange,
}: ContextProps) {
  const [, setArgs] = useArgs();

  const handleChange = React.useCallback((next: readonly OptionValue[], context: ChangeContext) => {
    setArgs({ value: next });
  }, []);

  return (
    <Container>
      <SelectoroidProvider
        multiple={multiple}
        options={options}
        value={value}
        onChange={handleChange}
      >
        <SelectoroidPopover>
          <SelectoroidControl ariaLabel={ariaLabel} placeholder={placeholder} />
        </SelectoroidPopover>
      </SelectoroidProvider>
    </Container>
  );
}
