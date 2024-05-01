import { Option, Options, SelectedOption } from "@selectoroid/model";
import { SelectoroidContext } from "@selectoroid/react";
import * as React from "react";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";

import { Badge } from "./Badge";
import { ContextualizedSelectoroid } from "./ContextualizedSelectoroid";
import { ExpandedIcon } from "./ExpandedIcon";

interface Props extends React.PropsWithChildren {
  options: Options;
  onSelect: (opt: SelectedOption) => void;
}

export function Selectoroid({ options, onSelect, children }: Props) {
  return (
    <SelectoroidContext
      renderOptionContainer={renderOptionContainer}
      renderOptionList={renderOptionList}
      renderOption={renderOption}
    >
      <ContextualizedSelectoroid options={options} onSelect={onSelect}>
        {children}
      </ContextualizedSelectoroid>
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
