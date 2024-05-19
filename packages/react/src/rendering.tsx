import * as React from "react";

import { ExpandedIcon } from "./ExpandedIcon";
import { RenderOptionAttrs, RenderOptionProps } from "./context";

export function defaultRenderMenuContainer<T = Element>({
  children,
  ...props
}: React.PropsWithChildren<T>) {
  return <div {...props}>{children}</div>;
}

export function defaultRenderListContainer(
  { children, ...props }: React.PropsWithChildren,
  index: number,
) {
  return (
    <div key={index} {...props}>
      <div className="selectoroid-listgroup-wrapper">
        <ul className="selectoroid-listgroup">{children}</ul>
      </div>
    </div>
  );
}

export function defaultRenderOption(attrs: RenderOptionAttrs, props: RenderOptionProps) {
  const { option } = attrs;
  return (
    <li key={`sel-${option.value}`} {...props}>
      <span className="selectoroid-option-label">
        {option.label}
        <span className="selectoroid-option-badge">{attrs.childSelectionCount}</span>
      </span>

      <ExpandedIcon expanded={attrs.isExpanded} option={option} />
    </li>
  );
}

export function defaultRenderEmptyOptions() {
  return <li className="selectoroid-empty-options">No options available</li>;
}
