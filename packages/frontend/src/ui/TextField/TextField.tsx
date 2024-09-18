import type { FormEvent, KeyboardEvent } from "react";
import styled, { css } from "styled-components";
import { BLACK } from "styles/color";
import { FONTCOLOR_BLACK, FONTSIZE_PARAGRAPH } from "styles/typography";

interface Props {
  texttype: "plain" | "secret";
  line: "single" | "multi";
  placeholder?: string;
  onInput?: (_: string) => void;
  defaultValue?: string;
}

const plainStyle = css``;

const secretStyle = css`
  -webkit-text-security: square;
`;

const getStyleByType = {
  plain: plainStyle,
  secret: secretStyle,
};

const Textarea = styled.textarea<{ texttype: Props["texttype"] }>`
  display: block;
  resize: none;
  font-size: ${FONTSIZE_PARAGRAPH};
  color: ${FONTCOLOR_BLACK};
  border-radius: unset;
  border-color: ${BLACK};

  &:focus {
    outline: 1px solid ${BLACK};
  }

  ${(props) => getStyleByType[props.texttype]}
`;

const getRowsByLine: Record<Props["line"], number> = {
  single: 1,
  multi: 5,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const noop = (_: string) => {};

export function TextField({ texttype, line, onInput = noop, defaultValue = "", ...props }: Props) {
  const handleInput = (event: FormEvent<HTMLTextAreaElement>) => {
    onInput(event.currentTarget.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (line === "single" && event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <Textarea
      texttype={texttype}
      defaultValue={defaultValue}
      rows={getRowsByLine[line]}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}
