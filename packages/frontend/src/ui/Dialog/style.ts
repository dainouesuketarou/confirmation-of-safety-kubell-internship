import styled from 'styled-components';
import { LAYER_0, LAYER_RESET } from 'styles/color';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${LAYER_RESET};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: calc(infinity);
`;

export const Dialog = styled.div`
  position: relative;
  background-color: ${LAYER_0};
  z-index: calc(infinity);
`;
