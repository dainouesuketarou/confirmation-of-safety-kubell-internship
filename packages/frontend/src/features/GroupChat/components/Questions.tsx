import { useMemo } from "react";
import styled from "styled-components";

import { BLACK } from "styles/color";
import {
  FONTSIZE_CAPTION,
  FONTSIZE_PARAGRAPH,
  FONTWEIGHT_IMPORTANT,
} from "styles/typography";

const RedButton = styled.button`
  background-color: red;
  color: white;
  padding: 12px 24px; /* ボタンを大きく */
  font-size: ${FONTSIZE_CAPTION};
  cursor: pointer;
  border: none;
  border-radius: 8px; /* 角を丸く */
  margin-right: 16px; /* ボタン間のスペースを確保 */
  &:hover {
    background-color: darkred;
  }
`;

const GreenButton = styled.button`
  background-color: green;
  color: white;
  padding: 12px 24px; /* ボタンを大きく */
  font-size: ${FONTSIZE_CAPTION};
  cursor: pointer;
  border: none;
  border-radius: 8px; /* 角を丸く */
  margin-right: 16px; /* ボタン間のスペースを確保 */
  &:hover {
    background-color: darkgreen;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* ボタンを左揃え */
  margin-top: 16px; /* メッセージとボタンの間に余白を追加 */
`;

interface MessageType {
  id: string;
  userAccountId: string;
  createdAt: string;
  text: string;
}

interface Props {
  message: MessageType;
  onPostMessage: (message: string) => Promise<void>;
}

const MessageLayout = styled.div`
  border-bottom: 1px dashed ${BLACK};
  padding: 8px;
`;
const MetaText = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const UserName = styled.span`
  font-size: ${FONTSIZE_CAPTION};
  font-weight: ${FONTWEIGHT_IMPORTANT};
  padding-right: 8px;
`;

const DateTime = styled.time`
  width: 150px;
  font-size: ${FONTSIZE_CAPTION};
`;
const MessageText = styled.p`
  font-size: ${FONTSIZE_PARAGRAPH};
`;
let Questions_Index = 0;

export const Message = ({ message, onPostMessage }: Props) => {
  const date = useMemo(() => new Date(message.createdAt), [message]);
  const dateString = date.toLocaleString();
  const dateTimeString = date.toISOString();

  const questions = [
    "あなたは無事ですか？",
    "家族は無事ですか",
    "怪我はしていますか？",
    "担当患者は無事ですか？",
    "助けが必要ですか？",
  ];

  const answers = [
    ["無事", "無事ではない"],
    ["無事", "無事ではない"],
    ["怪我していない", "怪我している"],
    ["無事", "無事ではない"],
    ["必要", "不必要"]
  ];

  // 回答ボタンを押した時の処理
  const handleClickPost = async (label: string) => {
    await onPostMessage(label);

    if (Questions_Index != 5) {
      Questions_Index++;
      console.log("インクリメントしました:", Questions_Index)
      await onPostMessage(questions[Questions_Index]);

    }
  };

  return (
    <MessageLayout>
      <MetaText>
        <UserName>user account_id: {message.userAccountId}</UserName>
        <DateTime dateTime={dateTimeString}>{dateString}</DateTime>
      </MetaText>
      <MessageText>{message.text}</MessageText>
      {Questions_Index < questions.length && (
        <ButtonContainer>
          <GreenButton onClick={() => handleClickPost(answers[Questions_Index][0])}>
            {answers[Questions_Index][0]}
          </GreenButton>
          <RedButton onClick={() => handleClickPost(answers[Questions_Index][1])}>
            {answers[Questions_Index][1]}
          </RedButton>
        </ButtonContainer>
      )}
    </MessageLayout>
  );
};
