import * as React from "react";

import { Context, ContextProps } from "./context";
import {
  defaultRenderOption,
  defaultRenderOptionContainer,
  defaultRenderOptionList,
} from "./render";

interface Props extends React.PropsWithChildren<Partial<ContextProps>> {}

export function SelectoroidContext({
  renderOptionContainer,
  renderOptionList,
  renderOption,
  children,
}: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const setOpen = React.useCallback((newOpen: boolean = true) => setIsOpen(newOpen), []);

  const ctx = React.useMemo(
    () => ({
      isOpen,
      setOpen,
      renderOptionContainer: renderOptionContainer ?? defaultRenderOptionContainer,
      renderOptionList: renderOptionList ?? defaultRenderOptionList,
      renderOption: renderOption ?? defaultRenderOption,
    }),
    [isOpen, setOpen, renderOptionContainer, renderOptionList, renderOption]
  );

  return <Context.Provider value={ctx}>{children}</Context.Provider>;
}
