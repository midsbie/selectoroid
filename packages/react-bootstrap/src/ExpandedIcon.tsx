import * as React from "react";
import { ChevronRight } from "react-bootstrap-icons";

import { Option } from "@selectoroid/model";
import { Context } from "@selectoroid/react-core";

interface Props {
  expanded?: boolean;
  option: Option;
}

export function ExpandedIcon({ expanded, option }: Props) {
  const { model } = React.useContext(Context);
  if (!model.shouldShowExpandedIcon(option, expanded)) return null;

  return (
    <div className="rcs-expanded-icon">
      <ChevronRight />
    </div>
  );
}
