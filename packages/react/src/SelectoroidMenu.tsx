import * as React from "react";

import { Option, OptionValue, SelectedOption } from "@selectoroid/model";

import { SelectoroidOptionList } from "./SelectoroidOptionList";
import { Context } from "./context";

export function SelectoroidMenu() {
  const { model, isMultiple, setOpen, onChange, renderMenuContainer, renderListContainer } =
    React.useContext(Context);

  const [expanded, setExpanded] = React.useState<OptionValue[]>(() => {
    const r = model.getExpandedOptions();
    return r.length > 0 ? r : [model.getFilteredOptions()[0]?.value].filter(Boolean);
  });

  const handleClick = React.useCallback(
    (_ev: React.MouseEvent, option: SelectedOption) => {
      if (!isMultiple) setOpen(false);

      const [next, added] = model.toggle(option);
      onChange(next, { type: added ? "add" : "remove", option });
    },
    [model, isMultiple, setOpen, onChange],
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
  let topt = model.getFilteredOptions();
  for (let i = 0; i < model.getMaxDepth(); ++i) {
    body.push(
      renderListContainer(
        {
          className: "rcs-options",
          children: (
            <SelectoroidOptionList
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

    topt = model.getOptionLeaf(topt, expanded[i]);
  }

  return renderMenuContainer({ className: "selectoroid-menu", children: body });
}
