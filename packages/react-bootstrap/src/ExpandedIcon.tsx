import { Option, shouldShowExpandedIcon } from "@selectoroid/model";
import * as React from "react";
import { ChevronRight } from "react-bootstrap-icons";

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
