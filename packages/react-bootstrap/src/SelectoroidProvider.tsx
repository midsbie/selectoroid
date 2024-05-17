import classNames from "classnames";
import * as React from "react";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";

import {
  ContextProps,
  RenderOptionAttrs,
  RenderOptionProps,
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
      renderOptionContainer={renderOptionContainer}
      renderOptionList={renderOptionList}
      renderOption={renderOption}
      filterFunction={filterFunction}
    >
      {children}
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

function renderOptionList({ children, ...props }: React.PropsWithChildren<any>, index: number) {
  return (
    <Col key={index} {...props}>
      <div className="rcs-listgroup-wrapper">
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
      key={`rcs-${option.value}`}
      className={classNames({ expanded: isExpanded })}
      {...props}
      action
      active={isSelected}
    >
      <span className="rcs-label">
        {option.label}
        <Badge selections={childSelectionCount} />
      </span>

      <ExpandedIcon expanded={isExpanded} option={option} />
    </ListGroupItem>
  );
}
