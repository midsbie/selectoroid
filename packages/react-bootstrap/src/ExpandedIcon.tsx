import * as React from "react";
import { ChevronRight } from "react-bootstrap-icons";

import { Option, shouldShowExpandedIcon } from "@power-select/model";

interface Props {
  expanded?: boolean;
  option: Option;
}

export function ExpandedIcon({ expanded, option }: Props) {
  if (!shouldShowExpandedIcon(expanded, option)) return null;

  return (
    <div className="rcs-expanded-icon">
      <ChevronRight />
    </div>
  );
}
