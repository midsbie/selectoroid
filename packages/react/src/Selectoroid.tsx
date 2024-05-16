import * as React from "react";

import {
  Option,
  OptionValue,
  SelectedOption,
  determineExpandedOptions,
  getOptionLeaf,
} from "@selectoroid/model";
import { OptionList } from "@selectoroid/react";

import { Context } from "./context";

export function Selectoroid() {
  const {
    filteredOptions,
    value,
    valueSet,
    toggleValue,
    maxDepth,
    isMulti,
    setOpen,
    onChange,
    renderOptionContainer,
    renderOptionList,
  } = React.useContext(Context);

  const [expanded, setExpanded] = React.useState<OptionValue[]>(() => {
    const r = determineExpandedOptions(filteredOptions, valueSet);
    return r.length > 0 ? r : [filteredOptions[0]?.value].filter(Boolean);
  });

  const handleClick = React.useCallback(
    (_ev: React.MouseEvent, option: SelectedOption) => {
      if (!isMulti) setOpen(false);

      const [next, added] = toggleValue(option);
      onChange(next, { type: added ? "add" : "remove", option });
    },
    [value, isMulti, setOpen, onChange],
  );

  const handleSetActive = React.useCallback(
    (depth: number, opt: Option) => {
      setExpanded((av) => {
        av = av.slice(0, depth);
        av[depth] = opt.value;
        return av;
      });
    },
    [setExpanded],
  );

  const body: React.ReactNode[] = [];
  let topt = filteredOptions;
  for (let i = 0; i < maxDepth; ++i) {
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
        i,
      ),
    );

    topt = getOptionLeaf(topt, expanded[i]);
  }

  return renderOptionContainer({ className: "selectoroid", children: body });
}
