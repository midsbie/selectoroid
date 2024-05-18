import { Option } from "@selectoroid/model";

export type FilterFunc = (option: Option) => boolean;
export type FilterFuncFactory = (filter: string) => FilterFunc;

export function filterByLabelSubstring(filter: string) {
  if (filter.length < 1) return () => true;
  return (option: Option): boolean => option.label.toLowerCase().includes(filter.toLowerCase());
}
