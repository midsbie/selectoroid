import { FilterFunc, Option } from "@selectoroid/model";

export type FilterFuncFactory = (filter: string) => FilterFunc;

export function filterByLabelSubstring(filter: string) {
  if (filter.length < 1) return () => true;
  return (option: Option): boolean => option.label.toLowerCase().includes(filter.toLowerCase());
}
