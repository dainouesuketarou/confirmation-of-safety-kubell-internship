// import { AnswerProvider } from "local-service/answer/AnswerProvider";
import { useContext, useState } from "react";
import styled from "styled-components";

import { AuthenticateContainer } from "features/Authenticate";
import { CreateGroupChatDialogContainer } from "features/CreateGroupChatDialog";
import { GroupChatContainer } from "features/GroupChat";
import SafetyConfirmationService from "features/GroupChat/components/ManegementSafety";
import { GroupChatsContainer } from "features/GroupChats";
import { AuthContext } from 'local-service/auth/AuthProvider';
import { LAYER_1 } from "styles/color";
import { gutterBy } from "styles/spaces";

const RootContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100vh;
`;

const GroupChatControls = styled.div`
  width: 300px;
  padding: ${gutterBy(2)};
  box-sizing: border-box;
  background-color: ${LAYER_1};
  padding-top: 40px;
`;

const GroupChatWrapper = styled.div`
  width: calc(100% - 300px);
  padding: 10px;
  width: 100%;
  padding-top: 40px;
`;


export const Router = () => {
  const { signedInUser } = useContext(AuthContext);
  const [selectedGroupChatId, setSelectedGroupChatId] = useState("");
  const [isButtonClick, setIsButtonClick] = useState(false);
  const [toggleButtonState, setToggleButtonState] = useState(false)

  const isSignedIn = signedInUser !== null;

  const checkIsButtonClick = () => {
    setIsButtonClick(!isButtonClick);
  }

  const ToggleButton = styled.button`
  background-color: #13202f;
  border: none; 
  color: white; 
  text-align: center;
  text-decoration: none;
  display: inline-block; 
  font-size: 16px; 
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  height: 32px;
  width: 80px;
  position: absolute;
  
  &:hover {
    opacity: 0.8;
  }
`;

  // isButtonClickが変更されているかcheck!
  console.log(isButtonClick);

  // MEMO: ページ遷移を工夫したい場合は、react-router-dom などの利用を検討まで
  if (!isSignedIn) {
    return <AuthenticateContainer />
  }
  

  if (isButtonClick) {
    return <SafetyConfirmationService setIsButtonClick={setIsButtonClick} />
            
  }

  return (
  // <Container>  
    <RootContainer>
    {toggleButtonState &&
    <>
      <GroupChatControls>
        <CreateGroupChatDialogContainer />
        <GroupChatsContainer handleChangeGroupChat={setSelectedGroupChatId}/>
        <button onClick={checkIsButtonClick}>安否結果の集計画面へ</button>
      </GroupChatControls>
    </>
    }
    <ToggleButton onClick={() => {setToggleButtonState(!toggleButtonState)} }>
      切り替え
    </ToggleButton>
      <GroupChatWrapper><GroupChatContainer groupChatId={selectedGroupChatId}/></GroupChatWrapper>
    </RootContainer>
  // </Container>  
  );
};
