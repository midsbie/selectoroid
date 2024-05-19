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

interface CommonProps {
  onChange: (next: readonly OptionValue[], context: ChangeContext) => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ContextProps extends CommonProps {
  options: readonly Option[];
  value: readonly OptionValue[];
  multiple?: boolean;
  filter?: string;
  filterFunction?: FilterFuncFactory;
  constructModel?: typeof defaultModelConstructor;
  renderMenuContainer?(props: React.PropsWithChildren<any>): React.ReactNode;
  renderListContainer?(props: React.PropsWithChildren<any>, index: number): React.ReactNode;
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
  renderMenuContainer(props: React.PropsWithChildren<any>): React.ReactNode;
  renderListContainer(props: React.PropsWithChildren<any>, index: number): React.ReactNode;
  renderOption(attrs: RenderOptionAttrs, props: RenderOptionProps): React.ReactNode;

  model: Model;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  isFocused: boolean;
  isOpen: boolean;
  isMultiple: boolean;
  setOpen(open?: boolean): void;
  toggleOpen(): void;
  setFocused(focused?: boolean): void;
}

export const Context = React.createContext<ContextValue>(null as any);
/* eslint-enable @typescript-eslint/no-explicit-any */
