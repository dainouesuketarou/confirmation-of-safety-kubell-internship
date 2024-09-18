import { css } from "styled-components";

import { BLACK, GRAY, WHITE } from "styles/color";
import { FONTCOLOR_WHITE, FONTWEIGHT_IMPORTANT } from "styles/typography";

export const primaryStyle = css`
  background-color: ${BLACK};
  color: ${FONTCOLOR_WHITE};
`;

export const defaultStyle = css`
  background-color: ${GRAY};
`;

export const dangerStyle = css`
  border-width: 2px;
  border-style: dashed;
  background-image: linear-gradient(
    -45deg,
    ${WHITE} 25%,
    ${GRAY} 25%,
    ${GRAY} 50%,
    ${WHITE} 50%,
    ${WHITE} 75%,
    ${GRAY} 75%,
    ${GRAY}
  );
  background-size: 10px 10px;
  font-weight: ${FONTWEIGHT_IMPORTANT};
`;

export const noneStyle = css`
  border-style: none;
  background-color: transparent;

  &:hover {
    background-color: ${GRAY};
  }
`;

export const getStyleByType = {
  primary: primaryStyle,
  default: defaultStyle,
  danger: dangerStyle,
  none: noneStyle,
};
