import * as React from "react";

import { defaultModelConstructor } from "@selectoroid/model";

import { Context, ContextProps, ContextValue } from "./context";
import { filterByLabelSubstring } from "./functions";
import { defaultComponents } from "./rendering";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.PropsWithChildren<ContextProps> {}

export function SelectoroidContext({
  multiple: isMultiple = false,
  options,
  value,
  onChange,
  components = defaultComponents,
  constructModel = defaultModelConstructor,
  filterFunction = filterByLabelSubstring,
  children,
}: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const setOpen = React.useCallback((next: boolean = true) => setIsOpen(next), []);
  const setFocused = React.useCallback((next: boolean = true) => setIsFocused(next), []);

  React.useEffect(() => {
    if (!isFocused) setIsOpen(false);
  }, [isFocused]);

  const ctx = React.useMemo<ContextValue>(() => {
    // First, we use `Array.isArray` for performance in the majority of cases where `value` is in
    // the same JS context.  To account for the possibility that `value` may originate from a
    // different JS context, we also verify using `Object.prototype.toString.call` to ensure `value`
    // is an array.
    const isValueArray =
      Array.isArray(value) && Object.prototype.toString.call(value) === "[object Array]";

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !isValueArray &&
      process.env.NODE_ENV === "development" &&
      console.warn("The 'value' prop is not an array.");

    const model = constructModel({
      isMultiple,
      options,
      value: isValueArray ? value : [],
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
      components,
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
    components,
    constructModel,
  ]);

  return <Context.Provider value={ctx}>{children}</Context.Provider>;
}
