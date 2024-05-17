import { Props as BaseProps, Taglicious } from "@taglicious/react-bootstrap";
import * as React from "react";

import { Option, collectSelectedOptions } from "@selectoroid/model";
import { Context } from "@selectoroid/react";

type OmitProps = "value" | "onInputChange" | "onRemove" | "onClear";

interface Props extends Omit<BaseProps, OmitProps> {
  ariaLabel?: string;
}

export function SelectoroidControl({ placeholder = "Please select", ...props }: Props) {
  const { isMultiple, options, value, valueSet, removeValue, setFilter, onChange } =
    React.useContext(Context);
  const tags = React.useMemo(() => collectSelectedOptions(options, valueSet), [options, valueSet]);

  const handleInputChange = React.useCallback((nextFilter: string) => {
    setFilter(nextFilter);
    return false;
  }, []);

  const handleRemove = React.useCallback(
    (option: Option) => {
      const [next, ok] = removeValue(option);
      if (ok) onChange(next, { type: "remove", option });
    },
    [value],
  );

  const handleClear = React.useCallback(() => {
    onChange([], { type: "clear" });
  }, [onChange]);

  let widget;
  if (isMultiple) {
    widget = (
      <Taglicious
        {...props}
        variant="select"
        placeholder={placeholder}
        value={tags}
        onInputChange={handleInputChange}
        onRemove={handleRemove}
        onClear={handleClear}
      />
    );
  } else {
    widget = (
      <div {...props} className="form-select">
        {tags[0].label ?? placeholder}
      </div>
    );
  }

  return <div className="selectoroid-control">{widget}</div>;
}
