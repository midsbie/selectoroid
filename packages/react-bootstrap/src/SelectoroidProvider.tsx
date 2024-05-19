import classNames from "classnames";
import * as React from "react";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";

import {
  ContextProps,
  RenderOptionAttrs,
  RenderOptionProps,
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
      renderMenuContainer={renderOptionContainer}
      renderListContainer={renderOptionList}
      renderOption={renderOption}
      filterFunction={filterFunction}
    >
      <Selectoroid>{children}</Selectoroid>
    </SelectoroidContext>
  );
}

function renderOptionContainer({ children, ...props }: React.PropsWithChildren) {
  return (
    <div {...props}>
      <Row>{children}</Row>
    </div>
  );
}

function renderOptionList<T = Element>(
  { children, ...props }: React.PropsWithChildren<T>,
  index: number,
) {
  return (
    <Col key={index} {...props}>
      <div className="selectoroid-listgroup-wrapper">
        <ListGroup variant="flush"> {children}</ListGroup>
      </div>
    </Col>
  );
}

function renderOption(
  { isSelected, isExpanded, option, childSelectionCount }: RenderOptionAttrs,
  props: RenderOptionProps,
) {
  return (
    <ListGroupItem
      key={`sel-${option.value}`}
      className={classNames({ expanded: isExpanded })}
      {...props}
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
