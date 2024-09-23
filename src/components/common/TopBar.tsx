import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// 다이어리, 정보 페이지 참고하여 사용

// absolute 사용을 위한 공간
const Wrapper = styled.div`
  // display: flex; // 임시로 추가
  width: 1024px;
  /* height: 80px; */
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

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const CommunityCategory = styled.div`
  font-size: var(--font-size-ft-1);
  margin-left: 6px;
  padding-bottom: 1px;
  border-bottom: 1px solid;
`;

interface TopBarProps {
  category?: string;
  title?: string;
  communityCategory?: string;
}

const TopBar: React.FC<TopBarProps> = ({
  category,
  title,
  communityCategory,
}) => {
  // 커뮤니티일 때만 설정
  const [isCommunity, setIsCommunity] = useState(false);

  useEffect(() => {
    if (communityCategory) {
      setIsCommunity(true);
    } else {
      setIsCommunity(false);
    }
  }, [communityCategory]);

  return (
    <Wrapper>
      <TobBarWrapper>
        <Content>
          <Category>{category}</Category>
          <TitleWrapper>
            <Title>{title}</Title>
            {isCommunity && (
              <CommunityCategory>{communityCategory}</CommunityCategory>
            )}
          </TitleWrapper>
        </Content>
      </TobBarWrapper>
    </Wrapper>
  );
};

export default TopBar;
