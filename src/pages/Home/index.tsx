import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Modal from '@/components/common/Modal';
import Select from '@/components/common/Select';
import PostCreate from '@/pages/PostCreate/index';
import Banner from '@/components/Home&CommunityFeed/Banner';
import FeedBox from '@/components/Home&CommunityFeed/FeedBox';
import SidePanel from '@/components/Home&CommunityFeed/SidePanel';
import WriteButton from '@/components/Home&CommunityFeed/WirteButton';
import CommunityElement from '@/components/Home&CommunityFeed/CommunityElement';

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

const axiosInstance = axios.create({
  baseURL: '/api', // 기본 URL 설정
  timeout: 5000, // 타임아웃 설정 (ms)
});

const mock = new MockAdapter(axiosInstance);

const Home: React.FC = () => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 글 작성 모달
  const [posts, setPosts] = useState<PostData[] | null>(null);
  const [selectedPosts, setSelectedPosts] = useState<PostData[] | null>(null); // select로 선택된 게시글 목록
  const [category, setCategory] = useState<number | string>('category');
  const [community, setCommunity] = useState<string>('community');

  // select option
  const SelectCategoryOptions = [
    { value: 'category', label: '종' },
    { value: 'dog', label: '강아지' },
    { value: 'cat', label: '고양이' },
  ];

  // posts에서 options 추출하는 로직 설정해야함
  const SelectCommunityOptions = [
    { value: 'community', label: '커뮤니티' },
    { value: '눈 / 피부 / 귀', label: '눈 / 피부 / 귀' },
    { value: '코', label: '코' },
    { value: '뇌·신경', label: '뇌·신경' },
  ];

  // 글 작성 모달 닫기
  const handleCloseWriteModal = () => {
    setIsWriteModalOpen(false);
  };

  // 전체 게시글, 전체 그룹 목 API,
  mock.onGet('/api/posts').reply(200, dummyPosts);
  mock.onGet('/api/groups').reply(200, dummyGroups);

  // 게시글 목록 조회
  useEffect(() => {
    const fetchData = async () => {
      // 게시글 목록
      try {
        const response = await axiosInstance.get(`/posts`);

        setPosts(response.data);
      } catch (error) {
        console.error('게시글 목록 조회 실패', error); // 임시
      }
    };
    fetchData();
  }, []);

  // posts가 업데이트 될 때 selectedPosts 업데이트
  useEffect(() => {
    setSelectedPosts(posts);
  }, [posts]);

  // 카테고리 분류 선택
  const handleCategoryOptions = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (event.target.value === 'dog') {
      setCategory(0);
    } else if (event.target.value === 'cat') {
      setCategory(1);
    } else {
      setCategory('category');
    }
  };

  // 커뮤니티 분류 선택
  const handleCommunityOptions = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCommunity(event.target.value);
  };

  // select 로직
  useEffect(() => {
    if (posts !== null) {
      // 둘 다 선택한 경우
      if (category !== 'category' && community !== 'community') {
        const filteredPost = posts.filter(
          (post) =>
            post.communityId.category === category &&
            post.communityId.community === community
        );
        setSelectedPosts(filteredPost);
      } else if (category !== 'category' && community === 'community') {
        // 카테고리만 선택
        const filteredPost = posts.filter(
          (post) => post.communityId.category === category
        );
        setSelectedPosts(filteredPost);
      } else if (category === 'category' && community !== 'community') {
        // 커뮤니티만 선택
        const filteredPost = posts.filter(
          (post) => post.communityId.community === community
        );
        setSelectedPosts(filteredPost);
      } else {
        // 둘 다 선택하지 않은 경우
        setSelectedPosts(posts);
      }
    } else {
      setSelectedPosts(null);
    }
  }, [posts, category, community]);

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
                options={SelectCategoryOptions}
                onChange={handleCategoryOptions}
              />
              <Select
                selectStyle="round"
                options={SelectCommunityOptions}
                onChange={handleCommunityOptions}
              />
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
          {selectedPosts?.map((post) => (
            <FeedBox
              key={post._id}
              postId={post._id}
              title={post.title}
              content={post.content}
              uploadedDate={formatDate(post.createdAt)}
              nickname={post.userId.nickName}
              profileSrc={post.userId.profileImage[0]}
              communityName={post.communityId.community}
              communityCategory={
                post.communityId.category === 0 ? '강아지' : '고양이'
              }
              likeCount={post.likedUsers.length}
              // commentCount={}
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

