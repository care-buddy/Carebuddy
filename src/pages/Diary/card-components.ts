import styled from 'styled-components';

export const CardsWrapper = styled.div`
  position: relative;
  height: 300px;
  display: flex;
  width: 100%;
  position: relative;
  transition: all 0.5s ease;
  &.selected-card {
    > div {
      transform: scale(1.02);
      transition: all 0.4s ease;
      background-color: rgb(234, 244, 235, 0.3);
      box-shadow: 
      /* 0 0 10px rgba(166, 185, 170); */
        -3px -3px 7px rgba(109, 152, 122, 0.1),
        5px 5px 7px rgb(200, 210, 200);
      /* border: 3px solid rgba(152, 185, 156); */
    }
  }
  &.not-selected-card {
    > div {
      transition: all 0.5s ease;
      box-shadow:
        -3px -3px 7px rgba(109, 152, 122, 0.1),
        3px 3px 5px #ceced1;
    }
  }
`;

export const Cards = styled.div`
  width: 224px;
  height: 90%;
  /* box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.1); */
  /* box-shadow: 0px 0px 14px rgba(0, 10, 0, 0.1); */
  /* box-shadow:
    -3px -3px 7px rgba(0, 0, 0, 0.05),
    3px 3px 5px #ceced1; */

  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: color 0.3s ease;
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
    box-shadow:
      -3px -3px 7px rgba(109, 152, 122, 0.1),
      3px 3px 5px #ceced1;
  }
`;
