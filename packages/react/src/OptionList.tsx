import * as React from "react";

import { Option, OptionValue, SelectedOption, countSelected } from "@selectoroid/model";
import { Context } from "@selectoroid/react";

interface Props {
  depth: number;
  expandedOption: OptionValue | null | undefined;
  options: Readonly<Option[]>;
  onClick: (ev: React.MouseEvent, opt: SelectedOption) => void;
  onMouseOver: (ev: React.MouseEvent, opt: SelectedOption) => void;
}

export function OptionList({ depth, expandedOption, options, onClick, onMouseOver }: Props) {
  const { valueSet, renderOption } = React.useContext(Context);

  const handleMouseOver = React.useCallback(
    (ev: React.MouseEvent, opt: SelectedOption) => {
      if (opt.children != null && opt.children.length > 0) onMouseOver(ev, opt);
    },
    [onMouseOver],
  );

  return options.map((opt) => {
    const isExpanded = opt.value === expandedOption;
    return renderOption(
      {
        isSelected: valueSet.has(opt.value),
        isExpanded,
        childSelectionCount: countSelected(opt, valueSet),
        option: opt,
      },
      {
        onClick: (ev: React.MouseEvent) => onClick(ev, { ...opt, depth }),
        onMouseOver: (ev: React.MouseEvent) => handleMouseOver(ev, { ...opt, depth }),
      },
    );
  });
}
