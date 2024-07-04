import styled from 'styled-components';

export const CardsWrapper = styled.div`
  position: relative;
  height: 300px;
  display: flex;
  width: 100%;
  position: relative;
`;

export const Cards = styled.div`
  width: 224px;
  height: 90%;
  /* box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.1); */
  box-shadow: 0px 0px 14px rgba(0, 10, 0, 0.1);

  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  > button {
    position: absolute;
    top: 15px;
    right: 10px;
    > div {
      position: absolute;
    }
  }
  :hover {
    cursor: pointer;
  }
  &.add-card {
    cursor: pointer;
  }
`;
