export interface Dict<V = any> {
  [key: string]: V;
}

export type OptionValue = string | number;

export interface Option {
  value: OptionValue;
  label: string;
  isSelected: boolean;
  children?: Option[];
}

export interface SelectedOption extends Option {
  depth: number;
}

export type Options = Option[];
