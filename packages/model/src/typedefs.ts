export type OptionValue = string;

export interface Option {
  value: OptionValue;
  label: string;
  children?: Option[];
}

export interface SelectedOption extends Option {
  depth: number;
}
