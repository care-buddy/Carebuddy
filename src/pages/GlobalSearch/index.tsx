import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import TopBar from '@/components/common/TopBar';
import Search from '@/components/common/Search';
import Select from '@/components/common/Select';
import FeedBox from '@/components/Home&CommunityFeed/FeedBox';
import WriteButton from '@/components/Home&CommunityFeed/WirteButton';
import Modal from '@/components/common/Modal';
import PostCreate from '@/pages/PostCreate/index';

import formatDate from '@/utils/formatDate';

import type { PostData } from '@constants/tempInterface';

// 임시 데이터
import { dummyPosts } from '@constants/tempData';

const axiosInstance = axios.create({
  baseURL: '/api', // 기본 URL 설정
  timeout: 5000, // 타임아웃 설정 (ms)
});

const mock = new MockAdapter(axiosInstance);

// 전체 게시글, 전체 그룹 목 API,
mock.onGet('/api/posts').reply(200, dummyPosts);

const GlobalSearch: React.FC = () => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 글 작성 모달
  const [posts, setPosts] = useState<PostData[] | null>(null); // 게시글 목록
  const [selectedPosts, setSelectedPosts] = useState<PostData[] | null>(null); // select로 선택된 게시글 목록
  const [category, setCategory] = useState<number | string>('category');
  const [community, setCommunity] = useState<string>('community');

  const [filteredPosts, setFilteredPosts] = useState<PostData[] | null>(null); // 검색된 게시글 목록
  const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어
  const [isSearching, setIsSearching] = useState<boolean>(false); // 검색중인 상태

  // 글 작성 모달
  const handleCloseWriteModal = () => {
    setIsWriteModalOpen(false);
  };

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

  // 게시글 조회 API
  useEffect(() => {
    const fetchData = async () => {
      // 게시글 목록
      try {
        const response = await axiosInstance.get(`/posts`);
        // console.log('Component mounted, making API call...'); // 임시

        // 등록일 formatting
        const formattedPosts = response.data.map((post: PostData) => ({
          ...post,
          createdAt: formatDate(post.createdAt),
        }));
        setPosts(formattedPosts);
      } catch (error) {
        // console.error('게시글 목록 조회 실패', error); // 임시
      }
    };
    fetchData();
  }, []);

  // 검색 로직
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleSearchState = (value: boolean) => {
    setIsSearching(value);
  };

  useEffect(() => {
    const filteredPost: PostData[] | null = posts
      ? posts.filter((post) => post.title.includes(searchTerm))
      : null;
    setFilteredPosts(filteredPost);
  }, [searchTerm, posts]);

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
      <TopBar category="전체 검색" title="검색키워드" />
      <Container>
        <BorderContainer>
          <SearchContainer>
            <Search
              onSearchTerm={(value) => handleSearch(value)}
              onSearchState={handleSearchState}
              searchState={isSearching}
              placeholder={
                isSearching ? '' : '검색할 게시글의 제목을 입력하세요'
              }
            />
          </SearchContainer>
          <FeedOptionContainer>
            <SelectContainer>
              <P>분류:</P>
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
          <FeedBoxContainer>
            {/* {isSearching
              ? filteredPosts?.map((post) => (
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
                  />
                ))
              : posts?.map((post) => (
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
                  />
                ))} */}
            {isSearching
              ? selectedPosts?.map((post) => (
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
                  />
                ))
              : selectedPosts?.map((post) => (
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
                  />
                ))}
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
