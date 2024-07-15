import React, { useState } from 'react';
import styled from 'styled-components';

import TopBar from '@/components/common/TopBar';
import Search from '@/components/common/Search';
import Select from '@/components/common/Select';
import FeedBox from '@/components/Home&CommunityFeed/FeedBox';
import WriteButton from '@/components/Home&CommunityFeed/WirteButton';
import Modal from '@/components/common/Modal';
import PostCreate from '@/pages/PostCreate/index';

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

const GlobalSearch: React.FC = () => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 글 작성

  // 글 작성 모달
  const handleCloseWriteModal = () => {
    setIsWriteModalOpen(false);
  };

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
      <TopBar category="전체 검색" title="검색키워드" />
      <Container>
        <BorderContainer>
          <SearchContainer>
            <Search />
          </SearchContainer>
          <FeedOptionContainer>
            <SelectContainer>
              <P>분류:</P>
              <Select
                selectStyle="round"
                selectSize="sm"
                options={SelectOptions}
              />
              <Select selectStyle="round" options={SelectGroupOptions} />
            </SelectContainer>
            <WriteButton setIsWriteModalOpen={setIsWriteModalOpen} />
            {isWriteModalOpen && (
              <Modal
                title="글 작성하기"
                value="등록"
                component={<PostCreate />}
                onClose={handleCloseWriteModal}
              />
            )}
          </FeedOptionContainer>
          <FeedBoxContainer>
            <FeedBox
              postId={tempPostId}
              title={tempTitle}
              content={tempContent}
              uploadedDate={tempDate}
              nickname={tempNickname}
              profileSrc={tempProfileSrc}
              communityName={tempGroupArray1.groupName}
              communityCategory={tempGroupArray1.category}
            />
            <FeedBox
              postId={tempPostId}
              title={tempTitle}
              content={tempContent}
              uploadedDate={tempDate}
              nickname={tempNickname}
              profileSrc={tempProfileSrc}
              communityName={tempGroupArray1.groupName}
              communityCategory={tempGroupArray1.category}
            />
            <FeedBox
              postId={tempPostId}
              title={tempTitle}
              content={tempContent}
              uploadedDate={tempDate}
              nickname={tempNickname}
              profileSrc={tempProfileSrc}
              communityName={tempGroupArray1.groupName}
              communityCategory={tempGroupArray1.category}
            />
          </FeedBoxContainer>
        </BorderContainer>
      </Container>
    </>
  );
};

export default GlobalSearch;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const BorderContainer = styled.div`
  width: 70%;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100px;
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-size-sm-1);

  & > * {
    margin-right: 10px;
  }
`;

const FeedOptionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  padding-top: 8px;
`;

const P = styled.p`
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-ft-1);
`;

const FeedBoxContainer = styled.div`
  color: var(--color-grey-1);

  & > * {
    margin-bottom: 20px;
  }
`;
