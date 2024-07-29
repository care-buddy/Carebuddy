import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import TopBar from '@/components/common/TopBar';
import Search from '@/components/common/Search';
import FeedBox from '@/components/Home&CommunityFeed/FeedBox';
import NoPostsFound from '@/components/common/NoPostsFound';
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
  const [filteredPosts, setFilteredPosts] = useState<PostData[] | null>(null); // 검색된 게시글 목록
  const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어
  const [isSearching, setIsSearching] = useState<boolean>(false); // 검색중인 상태
  const [searchParams, setSearchParams] = useSearchParams(''); // 쿼리스트링 값(검색 값)
  const params = new URLSearchParams(searchParams); // 현재 쿼리 파라미터

  // 글 작성 모달 닫기
  const handleCloseWriteModal = () => {
    setIsWriteModalOpen(false);
  };

  // 게시글 조회 API
  useEffect(() => {
    const fetchData = async () => {
      // 게시글 목록
      try {
        const response = await axiosInstance.get(`/posts`);

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
  // 검색 상태 핸들러
  const handleSearchState = (value: boolean) => {
    setIsSearching(value);
  };

  // 검색 시 URL 변경
  const handleSearch = (newTerm: string) => {
    params.set('searchTerm', newTerm); // 'searchTerm' 파라미터의 값을 newTerm으로 설정
    setSearchParams(params); // 쿼리 파라미터를 URL에 반영
    setFilteredPosts(null); // 검색된 포스트 초기화
  };

  // URL 파라미터로부터 검색어를 가져옴
  useEffect(() => {
    const searchTermFromParams = searchParams.get('searchTerm') || '';
    setSearchTerm(searchTermFromParams);
  }, [searchParams]);

  // 검색어에 따라 검색 상태를 업데이트
  useEffect(() => {
    setIsSearching(searchTerm !== '');
  }, [searchTerm]);

  // 검색어에 따라 필터링해서 게시글을 보여줌
  useEffect(() => {
    const filteredPost: PostData[] | null = posts
      ? posts.filter((post) => post.title.includes(searchTerm))
      : null;
    setFilteredPosts(filteredPost);
  }, [searchTerm, posts]);

  // 복잡한 JSX코드 변수에 넣어 정리
  const renderAllPosts = () =>
    posts?.map((post) => (
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
    ));

  const renderFilteredPosts = () => {
    if (filteredPosts && filteredPosts.length > 0) {
      return filteredPosts.map((post) => (
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
      ));
    }
    return <NoPostsFound>검색어에 해당하는 게시글이 없습니다.</NoPostsFound>;
  };

  return (
    <>
      <TopBar category="전체 검색" title="검색 결과" />
      <Container>
        <BorderContainer>
          <SearchContainer>
            <Search
              initialValue={searchTerm}
              onSearchTerm={(value) => handleSearch(value)}
              onSearchState={handleSearchState}
              searchState={isSearching}
              placeholder={
                isSearching ? '' : '검색할 게시글의 제목을 입력하세요'
              }
            />
          </SearchContainer>
          <FeedOptionContainer>
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
            {isSearching ? renderFilteredPosts() : renderAllPosts()}
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

const FeedOptionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
`;

const FeedBoxContainer = styled.div`
  color: var(--color-grey-1);

  & > * {
    margin-bottom: 20px;
  }
`;
