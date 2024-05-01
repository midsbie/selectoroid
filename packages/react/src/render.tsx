import { Option } from "@selectoroid/model";
import * as React from "react";

import { ExpandedIcon } from "./ExpandedIcon";

export function defaultRenderOptionContainer({ children, ...props }: React.PropsWithChildren<any>) {
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

export function defaultRenderOption(
  props: React.PropsWithChildren,
  expanded: boolean,
  selections: number,
  option: Option,
) {
  return (
    <li key={`rcs-${option.value}`} {...props}>
      <span className="rcs-label">
        {option.label}
        <span className="rcs-badge">{selections}</span>
      </span>

      <ExpandedIcon expanded={expanded} option={option} />
    </li>
  );
}
