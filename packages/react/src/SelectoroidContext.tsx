import * as React from "react";

import { Option, OptionValue, determineMaxDepth } from "@selectoroid/model";

import { Context, ContextProps, ContextValue } from "./context";
import { filterByLabelSubstring } from "./functions";
import {
  defaultRenderOption,
  defaultRenderOptionContainer,
  defaultRenderOptionList,
} from "./rendering";

interface Props extends React.PropsWithChildren<ContextProps> {}

export function SelectoroidContext({
  multi: isMulti = false,
  options,
  value,
  onChange,
  renderOptionContainer = defaultRenderOptionContainer,
  renderOptionList = defaultRenderOptionList,
  renderOption = defaultRenderOption,
  filterFunction = filterByLabelSubstring,
  children,
}: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const setOpen = React.useCallback((newOpen: boolean = true) => setIsOpen(newOpen), []);

  const toggleValue = React.useCallback(
    (option: Option): [OptionValue[], boolean] => {
      const idx = value.indexOf(option.value);
      const next = [...value];
      if (idx < 0) {
        next.push(option.value);
        return [next, true];
      }

      next.splice(idx, 1);
      return [next, false];
    },
    [value],
  );

  const addValue = React.useCallback(
    (option: Option): [OptionValue[], boolean] => {
      if (value.includes(option.value)) return [value as OptionValue[], false];
      return [[...value, option.value], true];
    },
    [value],
  );

  const removeValue = React.useCallback(
    (option: Option): [OptionValue[], boolean] => {
      const idx = value.indexOf(option.value);
      if (idx < 0) return [value as OptionValue[], false];

      const next = [...value];
      next.splice(idx, 1);
      return [next, true];
    },
    [value],
  );

  const ctx = React.useMemo<ContextValue>(() => {
    const valueSet = new Set(value);
    const maxDepth = determineMaxDepth(options);
    let filteredOptions = maxDepth < 2 ? options.filter((o) => !valueSet.has(o.value)) : options;
    const trimmedFilter = filter.trim();
    filteredOptions = filteredOptions.filter(filterFunction(trimmedFilter));

    return {
      isMulti,
      options,
      filteredOptions,
      maxDepth,
      value,
      valueSet,
      filter: trimmedFilter,
      filterFunction,
      setFilter,
      onChange,
      isOpen,
      setOpen,
      toggleValue,
      addValue,
      removeValue,
      renderOptionContainer,
      renderOptionList,
      renderOption,
    };
  }, [
    isMulti,
    options,
    value,
    filter,
    filterFunction,
    onChange,
    isOpen,
    setOpen,
    toggleValue,
    addValue,
    removeValue,
    renderOptionContainer,
    renderOptionList,
    renderOption,
  ]);

  return <Context.Provider value={ctx}>{children}</Context.Provider>;
}
