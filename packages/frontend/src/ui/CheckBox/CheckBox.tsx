import type { CSSProperties, ReactElement } from "react";
import { useReducer } from "react";
import styled from "styled-components";
import { BLACK } from "styles/color";
import { FONTCOLOR_BLACK, FONTSIZE_CAPTION } from "styles/typography";

interface Props {
  label: string;
  initialState?: boolean;
  onChange?: (_: boolean) => void;
  className?: string;
  style?: CSSProperties;
}

const Label = styled.label`
  color: ${FONTCOLOR_BLACK};
  font-size: ${FONTSIZE_CAPTION};
  user-select: none;
  cursor: pointer;

  & svg {
    width: 16px;
    height: 16px;
    margin-right: 0.5em;
    vertical-align: sub;
    fill: none;
    stroke: ${BLACK};
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const noop = (_: boolean) => {};

export function CheckBox({ label, initialState = false, onChange = noop, ...props }: Props): ReactElement<Props> {
  const [state, toggle] = useReducer((state) => {
    // MEMO: Reducer 内部は純粋な処理の必要があるので、副作用の可能性を考慮して next tick に処理をずらす
    setTimeout(() => onChange(!state));

    return !state;
  }, initialState);

  return (
    <Label onClick={toggle} {...props}>
      {state ? (
        <svg xmlns="http://www.w3.org/2000/svg" role="switch" aria-checked="true">
          <rect width="12" height="12" x="2" y="2" rx="1" />
          <path d="M4 7L7.33333 10.33333l4.66666-4.66666" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" role="switch" aria-checked="false">
          <rect width="12" height="12" x="2" y="2" rx="1" />
        </svg>
      )}
      {label}
    </Label>
  );
}
