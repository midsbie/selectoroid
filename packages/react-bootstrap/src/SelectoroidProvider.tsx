import classNames from "classnames";
import * as React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

import {
  ContextProps,
  OptionProps,
  RenderComponents,
  RenderProps,
  Selectoroid,
  SelectoroidContext,
} from "@selectoroid/react-core";

import { Badge } from "./Badge";
import { ExpandedIcon } from "./ExpandedIcon";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.PropsWithChildren<ContextProps> {}

export function SelectoroidProvider({
  multiple,
  options,
  value,
  filterFunction,
  onChange,
  children,
}: Props) {
  return (
    <SelectoroidContext
      multiple={multiple}
      options={options}
      value={value}
      onChange={onChange}
      components={renderComponents}
      filterFunction={filterFunction}
    >
      <Selectoroid>{children}</Selectoroid>
    </SelectoroidContext>
  );
}

const renderComponents: RenderComponents = {
  Menu,
  OptionsList,
  Option,
  EmptyOptions,
};

function Menu({ children, ...props }: RenderProps) {
  return (
    <div {...props}>
      <div className="d-flex h-100 justify-content-evenly">{children}</div>
    </div>
  );
}

function OptionsList({ className, children, ...props }: RenderProps) {
  return (
    <div className={classNames(className, "flex-fill")} {...(props as any)}>
      <div className="selectoroid-listgroup-wrapper">
        <ListGroup variant="flush"> {children}</ListGroup>
      </div>
    </div>
  );
}

function Option({ isSelected, isExpanded, option, childSelectionCount, ...props }: OptionProps) {
  return (
    <ListGroupItem
      className={classNames({ expanded: isExpanded })}
      {...(props as any)}
      action
      active={isSelected}
    >
      <span className="selectoroid-option-label">
        {option.label}
        <Badge selections={childSelectionCount} />
      </span>

      <ExpandedIcon expanded={isExpanded} option={option} />
    </ListGroupItem>
  );
}

function EmptyOptions({ className, ...props }: RenderProps) {
  return (
    <div
      className={classNames(
        className,
        "d-flex flex-fill justify-content-center align-items-center text-wrap",
      )}
      {...props}
    >
      <div className="text-center text-muted">No options available</div>
    </div>
  );
}
