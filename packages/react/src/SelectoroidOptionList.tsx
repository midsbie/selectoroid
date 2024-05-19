import * as React from "react";

import { Option, OptionValue, SelectedOption } from "@selectoroid/model";

import { Context } from "./context";

interface Props {
  depth: number;
  expandedOption: Readonly<OptionValue> | null | undefined;
  options: readonly Option[];
  onClick: (ev: React.MouseEvent, opt: SelectedOption) => void;
  onMouseOver: (ev: React.MouseEvent, opt: SelectedOption) => void;
}

export function SelectoroidOptionList({
  depth,
  expandedOption,
  options,
  onClick,
  onMouseOver,
}: Props) {
  const { model, components } = React.useContext(Context);
  const { OptionsList, Option, EmptyOptions } = components;

  const handleMouseOver = React.useCallback(
    (ev: React.MouseEvent, opt: SelectedOption) => {
      if (opt.children != null && opt.children.length > 0) onMouseOver(ev, opt);
    },
    [onMouseOver],
  );

  const nodes = options
    .map((opt) => {
      const isExpanded = opt.value === expandedOption;
      return (
        <Option
          key={`sel-${opt.value}`}
          isSelected={model.isSelected(opt.value)}
          isExpanded={isExpanded}
          childSelectionCount={model.countSelections(opt)}
          option={opt}
          onClick={(ev: React.MouseEvent) => onClick(ev, { ...opt, depth })}
          onMouseOver={(ev: React.MouseEvent) => handleMouseOver(ev, { ...opt, depth })}
        />
      );
    })
    .filter(Boolean);

  if (nodes.length < 1) return <EmptyOptions />;
  return <OptionsList className="selectoroid-option-list">{nodes} </OptionsList>;
}
