import * as React from "react";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";

import { Option, Options, SelectedOption } from "@power-select/model";
import { PowerSelectContext } from "@power-select/react";

import { Badge } from "./Badge";
import { ContextualizedPowerSelect } from "./ContextualizedPowerSelect";
import { ExpandedIcon } from "./ExpandedIcon";

interface Props extends React.PropsWithChildren {
  options: Options;
  onSelect: (opt: SelectedOption) => void;
}

export function PowerSelect({ options, onSelect, children }: Props) {
  return (
    <PowerSelectContext
      renderOptionContainer={renderOptionContainer}
      renderOptionList={renderOptionList}
      renderOption={renderOption}
    >
      <ContextualizedPowerSelect options={options} onSelect={onSelect}>
        {children}
      </ContextualizedPowerSelect>
    </PowerSelectContext>
  );
}

function renderOptionContainer({ children, ...props }: React.PropsWithChildren) {
  return (
    <div {...props}>
      <Row>{children}</Row>
    </div>
  );
}

function renderOptionList({ children, ...props }: React.PropsWithChildren, index: number) {
  return (
    <Col key={index} {...props}>
      <div className="rcs-listgroup-wrapper">
        <ListGroup variant="flush"> {children}</ListGroup>
      </div>
    </Col>
  );
}

function renderOption(props: Dict, expanded: boolean, selections: number, option: Option) {
  return (
    <ListGroupItem key={`rcs-${option.value}`} {...props} action active={option.isSelected}>
      <span className="rcs-label">
        {option.label}
        <Badge selections={selections} />
      </span>

      <ExpandedIcon expanded={expanded} option={option} />
    </ListGroupItem>
  );
}
