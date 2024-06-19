import React from 'react';
import styled from 'styled-components';

// 컴포넌트
// import Button from '@/components/common/Button';
import Banner from '@/components/Home&Community/Banner';
import FeedBox from '@/components/Home&Community/FeedBox';
import SidePanel from '@/components/Home&Community/SidePanel';
import WriteButton from '@/components/Home&Community/WirteButton';
import GroupElement from '@/components/Home&Community/GroupElement';

// 임시 데이터
import {
  tempTitle,
  tempContent,
  tempDate,
  tempNickname,
  tempProfileSrc,
  tempPostId,
  tempGroupArray1,
} from '../../../tempData';

const Home: React.FC = () => {
  const tempGroup = (
    <GroupElement
      key={tempGroupArray1.groupId}
      groupId={tempGroupArray1.groupId}
      groupName={tempGroupArray1.groupName}
      introduction={tempGroupArray1.introduction}
      memberCount={tempGroupArray1.memberCount}
    />
  );

  return (
    <Body>
      <Main>
        <Banner />
        <ContentContainer>
          <FeedBoxContainer>
            <FeedOptionContainer>
              <SelectContainer>
                <p>분류: </p>
                <select>홈</select>
                <select>그룹</select>
              </SelectContainer>
              <WriteButton />
            </FeedOptionContainer>
            <FeedBox
              postId={tempPostId}
              title={tempTitle}
              content={tempContent}
              uploadedDate={tempDate}
              nickname={tempNickname}
              profileSrc={tempProfileSrc}
            />
            <FeedBox
              postId={tempPostId}
              title={tempTitle}
              content={tempContent}
              uploadedDate={tempDate}
              nickname={tempNickname}
              profileSrc={tempProfileSrc}
            />
            <FeedBox
              postId={tempPostId}
              title={tempTitle}
              content={tempContent}
              uploadedDate={tempDate}
              nickname={tempNickname}
              profileSrc={tempProfileSrc}
            />
          </FeedBoxContainer>
          <SidePanelContainer>
            <SidePanel
              name="추천 그룹 or 추천 커뮤니티"
              elementArray={tempGroup}
            />
          </SidePanelContainer>
        </ContentContainer>
      </Main>
    </Body>
  );
};

export default Home;

/* 임시 레이아웃 */

const Body = styled.div`
  flex: 1;
  padding-top: 80px;
`;

const Main = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
  width: 1024px;
`;

/* 임시 레이아웃 끝 */

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 80px;

  & > * {
    margin-bottom: 30px;
  }
`;

const FeedBoxContainer = styled.div`
  width: 70%;
  // background-color: yellow; // 임시
  color: var(--color-grey-1);
`;

const FeedOptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // background-color: aqua; // 임시
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-size-sm-1);

  & > * {
    margin-right: 10px;
  }
`;

const SidePanelContainer = styled.div`
  width: 20%;
  // border: solid 2px blue; // 임시
`;
