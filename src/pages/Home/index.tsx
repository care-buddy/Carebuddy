import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@components/common/Button';
import Banner from '@/components/Home&CommunityFeed/Banner';
import FeedBox from '@/components/Home&CommunityFeed/FeedBox';
import SidePanel from '@/components/Home&CommunityFeed/SidePanel';
import WriteButton from '@/components/Home&CommunityFeed/WirteButton';
import CommunityElement from '@/components/Home&CommunityFeed/CommunityElement';
import Select from '@/components/common/Select';

// 임시 데이터
import {
  tempTitle,
  tempContent,
  tempDate,
  tempNickname,
  tempProfileSrc,
  tempPostId,
  tempGroupArray1,
} from '@constants/tempData';

const Home: React.FC = () => {
  const tempGroup = (
    <CommunityElement
      key={tempGroupArray1.groupId}
      groupId={tempGroupArray1.groupId}
      name={tempGroupArray1.groupName}
      introduction={tempGroupArray1.introduction}
      memberCount={tempGroupArray1.memberCount}
    />
  );

  const SelectOptions = [
    { value: 'dog', label: '강아지' },
    { value: 'cat', label: '고양이' },
  ];

  const SelectGroupOptions = [
    { value: 'group', label: '그룹' },
    { value: 'eyes', label: '눈 / 피부 / 귀' },
  ];

  return (
    <>
      <BannerContainer>
        <Banner />
      </BannerContainer>
      <ContentContainer>
        <FeedBoxContainer>
          <FeedOptionContainer>
            <SelectContainer>
              <P>분류: </P>
              <Select
                selectStyle="round"
                selectSize="sm"
                options={SelectOptions}
              />
              <Select selectStyle="round" options={SelectGroupOptions} />
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
        </FeedBoxContainer>
        <SidePanel name="추천 그룹 or 추천 커뮤니티" elementArray={tempGroup} />
      </ContentContainer>
    </>
  );
};

export default Home;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 70% 20%;
  justify-content: space-between;
  width: 100%;
  margin-top: 80px;

  & > * {
    margin-bottom: 30px;
  }
`;

const FeedBoxContainer = styled.div`
  color: var(--color-grey-1);
`;

const FeedOptionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-size-sm-1);

  & > * {
    margin-right: 10px;
  }
`;

const P = styled.p`
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-ft-1);
`;

const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--color-green-sub-2);
  width: 100%;
`;
