import * as React from "react";

import { Option, OptionValue, SelectedOption } from "@selectoroid/model";

import { FilterFunction } from "./functions";

interface ChangeContextAdd {
  type: "add";
  option: SelectedOption;
}

interface ChangeContextRemove {
  type: "remove";
  option: Option;
}

interface ChangeContextClear {
  type: "clear";
}

export type ChangeContext = ChangeContextAdd | ChangeContextRemove | ChangeContextClear;

interface CommonProps {
  options: Readonly<Option[]>;
  value: Readonly<OptionValue[]>;
  onChange: (next: OptionValue[], context: ChangeContext) => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ContextProps extends CommonProps {
  multiple?: boolean;
  filter?: string;
  filterFunction?: FilterFunction;
  renderOptionContainer?(props: React.PropsWithChildren<any>): React.ReactNode;
  renderOptionList?(props: React.PropsWithChildren<any>, index: number): React.ReactNode;
  renderOption?(attrs: RenderOptionAttrs, props: RenderOptionProps): React.ReactNode;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export interface RenderOptionAttrs {
  isSelected: boolean;
  isExpanded: boolean;
  childSelectionCount: number;
  option: Option;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RenderOptionProps extends React.HTMLAttributes<any> {}

export interface ContextValue extends CommonProps {
  renderOptionContainer(props: React.PropsWithChildren<any>): React.ReactNode;
  renderOptionList(props: React.PropsWithChildren<any>, index: number): React.ReactNode;
  renderOption(attrs: RenderOptionAttrs, props: RenderOptionProps): React.ReactNode;
  filterFunction: FilterFunction;

  valueSet: Readonly<Set<OptionValue>>;
  filteredOptions: Readonly<Option[]>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  maxDepth: number;
  isOpen: boolean;
  isMultiple: boolean;
  setOpen(open?: boolean): void;
  toggleValue(option: Option): [OptionValue[], boolean];
  addValue(option: Option): [OptionValue[], boolean];
  removeValue(option: Option): [OptionValue[], boolean];
}

export const Context = React.createContext<ContextValue>(null as any);
/* eslint-enable @typescript-eslint/no-explicit-any */
