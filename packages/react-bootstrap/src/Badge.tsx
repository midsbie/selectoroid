import * as React from "react";
import { Badge as BsBadge } from "react-bootstrap";

interface Props {
  selections: number;
}

export function Badge({ selections }: Props) {
  if (selections < 1) return null;

  return (
    <BsBadge pill bg="info">
      {selections}
    </BsBadge>
  );
}
