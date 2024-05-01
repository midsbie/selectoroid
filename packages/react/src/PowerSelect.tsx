import * as React from "react";

import {
  Option,
  OptionValue,
  Options,
  SelectedOption,
  determineExpandedOptions,
  getOptionLeaf,
} from "@power-select/model";
import { OptionList } from "@power-select/react";

import { Context } from "./context";

interface Props {
  options: Options;
  onSelect: (opt: SelectedOption) => void;
}

export function PowerSelect({ options, onSelect }: Props) {
  const { renderOptionContainer, renderOptionList } = React.useContext(Context);

  const [expanded, setExpanded] = React.useState<OptionValue[]>(() => {
    const r = determineExpandedOptions(options);
    if (r.length > 0) return r;

    for (const opt of options) return [opt.value];
    return [];
  });

  const handleClick = React.useCallback(
    (_ev: React.MouseEvent, opt: SelectedOption) => onSelect(opt),
    [onSelect]
  );

  const handleSetActive = React.useCallback(
    (depth: number, opt: Option) => {
      setExpanded((av) => {
        av = av.slice(0, depth);
        av[depth] = opt.value;
        return av;
      });
    },
    [setExpanded]
  );

  const body = [];
  let topt = options;
  for (let i = 0, l = Math.max(expanded.length, 2); i < l; ++i) {
    body.push(
      renderOptionList(
        {
          className: "rcs-options",
          children: (
            <OptionList
              depth={i}
              expandedOption={expanded[i]}
              options={topt}
              onClick={handleClick}
              onMouseOver={(_ev, opt) => handleSetActive(i, opt)}
            />
          ),
        },
        i
      )
    );

    topt = getOptionLeaf(topt, expanded[i]);
  }

  return renderOptionContainer({ className: "power-select", children: body });
}
