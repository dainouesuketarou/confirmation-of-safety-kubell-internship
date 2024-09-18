import { useMutation } from "@apollo/client";
import { useSignedInUser } from "local-service/auth/hooks";
import { useCallback, useContext, useMemo } from "react";
import styled from "styled-components";
// import { AddMemberMutation } from "../apis/addMember.command";
import { AnswerContext } from "local-service/answer/AnswerProvider";
import { AddMemberMutation } from "../../CreateGroupChatDialog/apis/addMember.command";
import { CreateGroupChatMutation } from "../../CreateGroupChatDialog/apis/createGroupChat.command";

import { BLACK } from "styles/color";
import {
  FONTSIZE_CAPTION,
  FONTSIZE_PARAGRAPH,
  FONTWEIGHT_IMPORTANT,
} from "styles/typography";
import { PostMessageMutation } from "../apis/postMessage.command";
// import { handleCreateGroupChat } from "../../CreateGroupChatDialog/CreateGroupChatDialogContainer";

const RedButton = styled.button`
  background-color: #cb4327;
  color: white;
  padding: 12px 12px; /* ボタンを大きく */
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 8px; /* 角を丸く */
  margin-right: 16px; /* ボタン間のスペースを確保 */
  &:hover {
    background-color: darkred;
  }
  flex-grow: 1;
`;

const GreenButton = styled.button`
  color: #139360;
  padding: 12px 12px; /* ボタンを大きく */
  font-size: 24px;
  cursor: pointer;
  border: 1px solid #139360;
  border-radius: 8px; /* 角を丸く */
  margin-right: 16px; /* ボタン間のスペースを確保 */
  &:hover {
    background-color: #139360;
    color: white;
  }
  flex-grow: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; /* ボタンを左揃え */
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
  hiddenButton: boolean;
  botOn: boolean;
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

// 何問目の問題か
let Questions_Index = 0;

export const Message = ({ message, onPostMessage, hiddenButton, botOn }: Props) => {
  const date = useMemo(() => new Date(message.createdAt), [message]);
  const dateString = date.toLocaleString();
  const dateTimeString = date.toISOString();

  // ユーザー回答結果を格納
  const { safeOrDangerAnswer, setSafeOrDangerAnswer }
    = useContext(AnswerContext);

  

  const [createGroupChat] = useMutation(CreateGroupChatMutation, {
    context: { clientName: "command" },
  });
  const [addMember] = useMutation(AddMemberMutation, {
    context: { clientName: "command" },
  });
  const { id: myID } = useSignedInUser();

  const handleCreateGroupChat = useCallback(
    async (title: string, userId: string) => {
      try {
        const createGroupChatResponse = await createGroupChat({
          variables: {
            input: {
              name: title,
              executorId: userId,
            },
          },
        });
  
        const newGroupChatId = createGroupChatResponse.data?.createGroupChat.groupChatId;
        if (!newGroupChatId) {
          return null;  // IDが取得できなかった場合は null を返す
        }
  
        return newGroupChatId;  // 作成したgroupChatIdを返す
      } catch (error) {
        console.error("Error creating group chat:", error);
        return null;  // エラーが発生した場合も null を返す
      }
    },
    [addMember, createGroupChat, myID]
  );

  const [postMessage] = useMutation(PostMessageMutation, {
    context: { clientName: "command" },
  });
  



  // 安否確認用ボットグループチャットに自動送信するための関数
  const handlePostMessage = useCallback(async (message: string, userId: string, groupChatId: string) => {
    console.log("message", message);
    console.log("userId", userId);
    console.log("groupChatId", groupChatId);
    await postMessage({
      variables: {
        input: {
          groupChatId: groupChatId,
          executorId: userId,
          content: message,
        },
      },
    });

    console.log("postMessage後");
  }, [postMessage]); 

  const questions = [
    "現在働ける状態ですか？（2/3）",
    "人手は足りていますか？（3/3）",
  ];

  const answers = [
    ["無事", "無事ではない"],
    ["働ける", "働けない"],
    ["足りている", "足りていない"],
  ];



  // 回答ボタンを押した時の処理
  const handleClickPost = async (label: string) => {
    //メンバー側の処理
    const users = [
      // "UserAccount-01H42K4ABWQ5V2XQEP3A48VE0Z",
      "UserAccount-01H7Y7GDFJDTDRSY1DPRWMQ46P",
       "UserAccount-01H7Y7GYN3XHNDJ4M9M2F94TM6",
       "UserAccount-01H830ND9RHS205X925SQ8RF8V",
       "UserAccount-01H830NQA1RYYHVEBXX8T6WY7N",
       "UserAccount-01H830PAM7ZRABTATAA1R7KA4X",
    ]
    if (message.userAccountId != "UserAccount-01H42K4ABWQ5V2XQEP3A48VE0Z") {
      await onPostMessage(label);
      //  ManagementSafety.tsxに渡すデータを変換
      let userAnswerTrueOrFalse = true;
      if (label=="無事" || label=="働ける" || label=="足りていない") {
        userAnswerTrueOrFalse = true;
      }else {
        userAnswerTrueOrFalse = false;
      }
      
      // 各の質問の結果に変更
      if (Questions_Index == 0) {
        setSafeOrDangerAnswer({ ...safeOrDangerAnswer , safe: userAnswerTrueOrFalse });
      } else if (Questions_Index == 1) {
        setSafeOrDangerAnswer({ ...safeOrDangerAnswer , canWork: userAnswerTrueOrFalse });
      } else if (Questions_Index == 2) {
        setSafeOrDangerAnswer({ ...safeOrDangerAnswer , needHelp: userAnswerTrueOrFalse });
      }


      
      
      if (Questions_Index != 5) {
        console.log("インクリメントしました:", Questions_Index)
        await onPostMessage(questions[Questions_Index]);
        Questions_Index++;
      }

      // if (label !=="無事" || label !== "働ける") {
      //   //  ユーザー回答データをManagementSafety.tsxに送信

      // }
    }
    //管理者側の処理
    else {
      console.log("kokodesu")
      if (label == answers[Questions_Index][0]) {
        const userConfirmed = confirm("本当に発行しますか？");
        if (userConfirmed) {
          alert("安否確認が発行されました");
        } else {
          alert("発行がキャンセルされました");
        }
      }
      if (label == answers[Questions_Index][1]) {
        alert("発行しませんでした");
      }

      //ユーザー五人分のグループチャットを作成する
      for (let i = 0; i < users.length; i++) {
        const groupChatId = await handleCreateGroupChat("安否確認ボット", users[i]);
        console.log("groupChatId:", groupChatId);
        console.log("安否確認タスクが送られるユーザーのID:", users[i]);
        await handlePostMessage("緊急地震速報が発令されました。画面下部ボタンより安否確認への回答をお願いします。災害情報詳細:〇〇県〇〇市で緊急地震速報が発令されました。マグニチュードは推定6.5とされています(1/3)", users[i], groupChatId!);
        console.log("メッセージ自動送信完了しました");  
      }

      //作成したグループチャットに、ユーザー名義のチャットを送信



      //送るメッセージ内容（例）
      //緊急地震速報が発令されました。
      //画面下部ボタンより安否確認への回答をお願いします。
      //災害情報詳細:
      //〇〇県〇〇市で緊急地震速報が発令されました。マグニチュードは推定6.5とされています
    }
  };

  //管理者の場合タスク発行ボタンを表示
  return (
    <MessageLayout>
      {message.userAccountId != "UserAccount-01H42K4ABWQ5V2XQEP3A48VE0Z" && (
        <>
          <MetaText>
            {!botOn && (
              <UserName>あなた</UserName>
            )}
            {botOn && (
              <UserName>安否確認ボット</UserName>
            )}
            <DateTime dateTime={dateTimeString}>{dateString}</DateTime>
          </MetaText>
          <MessageText>{message.text}</MessageText>
          {!hiddenButton && (
            <ButtonContainer>
              <GreenButton onClick={() => handleClickPost(answers[Questions_Index][0])}>
                {answers[Questions_Index][0]}
              </GreenButton>
              <RedButton onClick={() => handleClickPost(answers[Questions_Index][1])}>
                {answers[Questions_Index][1]}
              </RedButton>
            </ButtonContainer>
          )}
        </>
      )}
      {message.userAccountId == "UserAccount-01H42K4ABWQ5V2XQEP3A48VE0Z" && (
        <>
          <MetaText>
            <UserName>user account_id: {message.userAccountId}</UserName>
            <DateTime dateTime={dateTimeString}>{dateString}</DateTime>
          </MetaText>
          <MessageText>緊急地震速報が発令されました。安否確認タスクを発行しますか？。災害情報詳細:〇〇県〇〇市で緊急地震速報が発令されました。マグニチュードは推定6.5とされています</MessageText>
          <ButtonContainer>
            <GreenButton onClick={() => handleClickPost(answers[Questions_Index][0])}>
              安否確認タスクを発行する
            </GreenButton>
            <RedButton onClick={() => handleClickPost(answers[Questions_Index][1])}>
              安否確認タスクを発行しない
            </RedButton>
          </ButtonContainer>
        </>
      )}
    </MessageLayout>
  );
}
