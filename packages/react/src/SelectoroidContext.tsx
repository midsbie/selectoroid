import * as React from "react";

import { defaultModelConstructor } from "@selectoroid/model";

import { Context, ContextProps, ContextValue } from "./context";
import { filterByLabelSubstring } from "./functions";
import {
  defaultRenderListContainer,
  defaultRenderMenuContainer,
  defaultRenderOption,
} from "./rendering";

interface Props extends React.PropsWithChildren<ContextProps> {}

export function SelectoroidContext({
  multiple: isMultiple = false,
  options,
  value,
  onChange,
  constructModel = defaultModelConstructor,
  renderMenuContainer = defaultRenderMenuContainer,
  renderListContainer = defaultRenderListContainer,
  renderOption = defaultRenderOption,
  filterFunction = filterByLabelSubstring,
  children,
}: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const setOpen = React.useCallback((next: boolean = true) => setIsOpen(next), []);
  const setFocused = React.useCallback((next: boolean = true) => {
    setIsFocused(next);
  }, []);

  React.useEffect(() => {
    if (!isFocused) setIsOpen(false);
  }, [isFocused]);

  const ctx = React.useMemo<ContextValue>(() => {
    const model = constructModel({
      isMultiple,
      options,
      value,
      filterFunc: filterFunction(filter.trim()),
    });

    return {
      model,
      isMultiple,
      setFilter,
      onChange,
      isOpen,
      setOpen,
      toggleOpen: () => setIsOpen((o) => !o),
      isFocused,
      setFocused,
      renderMenuContainer,
      renderListContainer,
      renderOption,
    };
  }, [
    options,
    value,
    filter,
    filterFunction,
    isMultiple,
    onChange,
    isOpen,
    setOpen,
    isFocused,
    setFocused,
    constructModel,
    renderMenuContainer,
    renderListContainer,
    renderOption,
  ]);

  return <Context.Provider value={ctx}>{children}</Context.Provider>;
}
