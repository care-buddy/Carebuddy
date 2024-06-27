import React from 'react';
import styled from 'styled-components';
// 다이어리, 정보 페이지 참고하여 사용

// absolute 사용을 위한 공간
const Wrapper = styled.div`
  width: 100vw;
  height: 80px;
  font-size: var(--font-size-lg-2); //32
`;

const TobBarWrapper = styled.div`
  background-color: #eeede5;
  position: absolute;
  width: 100vw;
  left: 0;
  top: 80px;
`;

const Content = styled.div`
  padding: 24px 0 16px 0;
  width: 1024px;
  margin-left: auto;
  margin-right: auto;
`;

const Category = styled.div`
  font-size: 14px;
`;

const Title = styled.div`
  font-size: var(--font-size-hd-2); //22
  font-weight: bold;
  padding-top: 6px;
`;

interface TopBarProps {
  category: string;
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ category, title }) => (
  <Wrapper>
    <TobBarWrapper>
      <Content>
        <Category>{category}</Category>
        <Title>{title}</Title>
      </Content>
    </TobBarWrapper>
  </Wrapper>
);

export default TopBar;
