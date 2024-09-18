import { css } from 'styled-components';

import { BLACK, GRAY, WHITE } from 'styles/color';

export const primaryStyle = css`
  background-color: ${BLACK};

  & svg {
    stroke: ${WHITE};
  }
`;

export const defaultStyle = css`
  background-color: ${GRAY};
`;

export const dangerStyle = css`
  border-width: 2px;
  border-style: dashed;
  background-color: transparent;

  & svg {
    padding: 0;
  }
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
