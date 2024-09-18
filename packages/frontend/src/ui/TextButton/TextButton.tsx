import type { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { BLACK } from "styles/color";
import { FONTCOLOR_BLACK, FONTSIZE_PARAGRAPH } from "styles/typography";

import { getStyleByType } from "./style";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: "primary" | "default" | "danger" | "none";
  text: string;
}

const Button = styled.button<{ buttonType: Props["buttonType"] }>`
  border-style: solid;
  border-width: 1px;
  border-color: ${BLACK};
  color: ${FONTCOLOR_BLACK};
  box-sizing: border-box;
  cursor: pointer;
  font-size: ${FONTSIZE_PARAGRAPH};
  user-select: none;

  &:active {
    opacity: 0.9;
  }

  ${props => getStyleByType[props.buttonType]}
`;

export function TextButton({ buttonType, text, ...props }: Props) {
  return (
    <Button buttonType={buttonType} type="button" {...props}>
      {text}
    </Button>
  );
}
