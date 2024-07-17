/* eslint-disable no-console */
// 임시
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Banner from '@/components/Home&CommunityFeed/Banner';
import FeedBox from '@/components/Home&CommunityFeed/FeedBox';
import SidePanel from '@/components/Home&CommunityFeed/SidePanel';
import WriteButton from '@/components/Home&CommunityFeed/WirteButton';
import CommunityElement from '@/components/Home&CommunityFeed/CommunityElement';
import Select from '@/components/common/Select';
import Modal from '@/components/common/Modal';
import PostCreate from '@/pages/PostCreate/index';

import formatDate from '@/utils/formatDate';

import type { PostData } from '@constants/tempInterface';

// 임시 데이터
import { tempGroupArray1, dummyPosts, dummyGroups } from '@constants/tempData';

const tempGroup = [
  <CommunityElement
    key={tempGroupArray1.groupId}
    groupId={tempGroupArray1.groupId}
    name={tempGroupArray1.groupName}
    introduction={tempGroupArray1.introduction}
    memberCount={tempGroupArray1.memberCount}
  />,
  <CommunityElement
    key={tempGroupArray1.groupId}
    groupId={tempGroupArray1.groupId}
    name={tempGroupArray1.groupName}
    introduction={tempGroupArray1.introduction}
    memberCount={tempGroupArray1.memberCount}
  />,
  <CommunityElement
    key={tempGroupArray1.groupId}
    groupId={tempGroupArray1.groupId}
    name={tempGroupArray1.groupName}
    introduction={tempGroupArray1.introduction}
    memberCount={tempGroupArray1.memberCount}
  />,
];

const Home: React.FC = () => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 글 작성 모달
  const [posts, setPosts] = useState<PostData[] | null>(null);

  // select(추후에 컴포넌트화)
  const SelectOptions = [
    { value: 'dog', label: '강아지' },
    { value: 'cat', label: '고양이' },
  ];

  const SelectGroupOptions = [
    { value: 'group', label: '그룹' },
    { value: 'eyes', label: '눈 / 피부 / 귀' },
  ];

  // 글 작성 모달 닫기
  const handleCloseWriteModal = () => {
    setIsWriteModalOpen(false);
  };

  const axiosInstance = axios.create({
    baseURL: '/api', // 기본 URL 설정
    timeout: 5000, // 타임아웃 설정 (ms)
  });

  const mock = new MockAdapter(axiosInstance);

  // 전체 게시글, 전체 그룹 목 API,
  mock.onGet('/api/posts').reply(200, dummyPosts);
  mock.onGet('/api/groups').reply(200, dummyGroups);

  // 데이터 받기
  useEffect(() => {
    const fetchData = async () => {
      // 게시글 목록
      try {
        const response = await axiosInstance.get(`/posts`);
        console.log('Component mounted, making API call...'); // 임시

        // 등록일 formatting
        const formattedPosts = response.data.map((post: PostData) => ({
          ...post,
          createdAt: formatDate(post.createdAt),
        }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error('게시글 목록 조회 실패', error); // 임시
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Banner />
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
          {posts?.map((post) => (
            <FeedBox
              key={post._id}
              postId={post._id}
              title={post.title}
              content={post.content}
              uploadedDate={post.createdAt}
              nickname={post.userId.nickName}
              profileSrc={post.userId.profileImage[0]}
            />
          ))}
        </FeedBoxContainer>
        <SidePanel name="추천 커뮤니티" elementArray={tempGroup} />
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
  margin-top: 40px;

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
