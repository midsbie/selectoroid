import * as React from "react";

import { ExpandedIcon } from "./ExpandedIcon";
import { RenderOptionAttrs, RenderOptionProps } from "./context";

export function defaultRenderOptionContainer<T = Element>({
  children,
  ...props
}: React.PropsWithChildren<T>) {
  return <div {...props}>{children}</div>;
}

export function defaultRenderOptionList(
  { children, ...props }: React.PropsWithChildren,
  index: number,
) {
  return (
    <div key={index} {...props} className="rcs-col">
      <div className="rcs-listgroup-wrapper">
        <ul className="rcs-list-group">{children}</ul>
      </div>
    </div>
  );
}

export function defaultRenderOption(attrs: RenderOptionAttrs, props: RenderOptionProps) {
  const { option } = attrs;
  return (
    <li key={`rcs-${option.value}`} {...props}>
      <span className="rcs-label">
        {option.label}
        <span className="rcs-badge">{attrs.childSelectionCount}</span>
      </span>

      <ExpandedIcon expanded={attrs.isExpanded} option={option} />
    </li>
  );
}
