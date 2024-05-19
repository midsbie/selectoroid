import * as React from "react";

import {
  Model,
  Option,
  OptionValue,
  SelectedOption,
  defaultModelConstructor,
} from "@selectoroid/model";

import { FilterFuncFactory } from "./functions";

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
export interface RenderProps extends React.AllHTMLAttributes<unknown> {}

export interface RenderComponents {
  Menu: React.FC<RenderProps>;
  OptionsList: React.FC<RenderProps>;
  Option: React.FC<OptionProps>;
  EmptyOptions: React.FC<RenderProps>;
}

interface CommonProps {
  onChange: (next: readonly OptionValue[], context: ChangeContext) => void;
}

export interface ContextProps extends CommonProps {
  options: readonly Option[];
  value: readonly OptionValue[];
  multiple?: boolean;
  filter?: string;
  filterFunction?: FilterFuncFactory;
  constructModel?: typeof defaultModelConstructor;
  components?: RenderComponents;
}

export interface OptionProps extends RenderProps {
  isSelected: boolean;
  isExpanded: boolean;
  childSelectionCount: number;
  option: Option;
}

export interface ContextValue extends CommonProps {
  components: RenderComponents;
  model: Model;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  isFocused: boolean;
  isOpen: boolean;
  isMultiple: boolean;
  setOpen(open?: boolean): void;
  toggleOpen(): void;
  setFocused(focused?: boolean): void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const Context = React.createContext<ContextValue>(null as any);
/* eslint-enable @typescript-eslint/no-explicit-any */
