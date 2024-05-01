import * as React from "react";

import { Dict, Option } from "@power-select/model";

export interface ContextProps {
  renderOptionContainer(props: React.PropsWithChildren): React.ReactNode;
  renderOptionList(props: React.PropsWithChildren, index: number): React.ReactNode;
  renderOption(props: Dict, expanded: boolean, selections: number, option: Option): React.ReactNode;
}

export interface ContextValue {
  isOpen: boolean;
  setOpen(open?: boolean): void;
  renderOptionContainer(props: React.PropsWithChildren<any>): React.ReactNode;
  renderOptionList(props: React.PropsWithChildren<any>, index: number): React.ReactNode;
  renderOption(props: Dict, expanded: boolean, selections: number, option: Option): React.ReactNode;
}

export const Context = React.createContext<ContextValue>(null as any);
