import { OptionValue, Options, SelectedOption, countSelected } from "@selectoroid/model";
import { Context } from "@selectoroid/react";
import classNames from "classnames";
import * as React from "react";

interface Props {
  depth: number;
  expandedOption: OptionValue | null | undefined;
  options: Options;
  onClick: (ev: React.MouseEvent, opt: SelectedOption) => void;
  onMouseOver: (ev: React.MouseEvent, opt: SelectedOption) => void;
}

export function OptionList({ depth, expandedOption, options, onClick, onMouseOver }: Props) {
  const { setOpen, renderOption } = React.useContext(Context);

  const handleMouseOver = React.useCallback(
    (ev: React.MouseEvent, opt: SelectedOption) => {
      if (opt.children != null && opt.children.length > 0) onMouseOver(ev, opt);
    },
    [onMouseOver],
  );

  return options.map((opt) => {
    const expanded = opt.value === expandedOption;
    return renderOption(
      {
        className: classNames({ expanded }),
        onClick: (ev: React.MouseEvent) => {
          setOpen(false);
          onClick(ev, { ...opt, depth });
        },
        onMouseOver: (ev: React.MouseEvent) => handleMouseOver(ev, { ...opt, depth }),
      },
      expanded,
      countSelected(opt),
      opt,
    );
  });
}
