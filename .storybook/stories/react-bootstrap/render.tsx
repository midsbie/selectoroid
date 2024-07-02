import { useArgs } from "@storybook/preview-api";
import * as React from "react";

import { OptionValue } from "@selectoroid/model";
import {
  SelectoroidControl,
  SelectoroidDropdown,
  SelectoroidPopover,
  SelectoroidProvider,
} from "@selectoroid/react-bootstrap";
import { ChangeContext, ContextProps } from "@selectoroid/react-core";

import { Container } from "./Container";

export function renderPopover({
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

export function renderDropdown({
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
        <SelectoroidDropdown>
          <SelectoroidControl ariaLabel={ariaLabel} placeholder={placeholder} />
        </SelectoroidDropdown>
      </SelectoroidProvider>
    </Container>
  );
}
