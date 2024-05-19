import classNames from "classnames";
import * as React from "react";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";

import {
  ContextProps,
  OptionProps,
  RenderComponents,
  RenderProps,
  Selectoroid,
  SelectoroidContext,
} from "@selectoroid/react";

import { Badge } from "./Badge";
import { ExpandedIcon } from "./ExpandedIcon";

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
      <Row>{children}</Row>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function OptionsList({ children, ...props }: RenderProps) {
  return (
    <Col {...(props as any)}>
      <div className="selectoroid-listgroup-wrapper">
        <ListGroup variant="flush"> {children}</ListGroup>
      </div>
    </Col>
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */
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
/* eslint-enable @typescript-eslint/no-explicit-any */

function EmptyOptions() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="text-center text-muted">No options available</div>
    </div>
  );
}
