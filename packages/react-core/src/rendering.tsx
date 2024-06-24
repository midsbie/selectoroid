import * as React from "react";

import { ExpandedIcon } from "./ExpandedIcon";
import { OptionProps, RenderComponents, RenderProps } from "./context";

export function Menu({ children, ...props }: RenderProps) {
  return <div {...props}>{children}</div>;
}

export function OptionsList({ children, ...props }: RenderProps) {
  return (
    <div {...props}>
      <div className="selectoroid-listgroup-wrapper">
        <ul className="selectoroid-listgroup">{children}</ul>
      </div>
    </div>
  );
}

export function Option({
  option,
  childSelectionCount,
  isSelected: _,
  isExpanded,
  ...props
}: OptionProps) {
  return (
    <li {...props}>
      <span className="selectoroid-option-label">
        {option.label}
        <span className="selectoroid-option-badge">{childSelectionCount}</span>
      </span>

      <ExpandedIcon expanded={isExpanded} option={option} />
    </li>
  );
}

export function EmptyOptions(props: RenderProps) {
  return (
    <li {...props} className="selectoroid-empty-options">
      No options available
    </li>
  );
}

export const defaultComponents: RenderComponents = {
  Menu,
  OptionsList,
  Option,
  EmptyOptions,
};
