import { Option } from "@selectoroid/model";

export type FilterFunction = (filter: string) => (option: Option) => boolean;

export function filterByLabelSubstring(filter: string) {
  if (filter.length < 1) return () => true;

  return function (option: Option): boolean {
    return option.label.toLowerCase().includes(filter.toLowerCase());
  };
}
