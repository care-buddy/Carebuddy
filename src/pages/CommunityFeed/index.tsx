import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import TopBar from '@/components/common/TopBar';
import Loading from '@/components/common/Loading';
import FeedBox from '@/components/Home&CommunityFeed/FeedBox';
import SidePanel from '@/components/Home&CommunityFeed/SidePanel';
import WriteButton from '@/components/Home&CommunityFeed/WirteButton';
import Search from '@/components/common/Search';
import Modal from '@/components/common/Modal';
import PostCreate from '@/pages/PostCreate/index';
import LinkButton from '@/components/common/LinkButton';
import NoPostsFound from '@/components/common/NoPostsFound';

import formatDate from '@/utils/formatDate';

import type { PostData } from '@constants/tempInterface';

// 임시 데이터
import {
  tempGroupArray1,
  dummyPosts,
  tempGroupMember,
} from '@constants/tempData';

const axiosInstance = axios.create({
  baseURL: '/api', // 기본 URL 설정
  timeout: 5000, // 타임아웃 설정 (ms)
});

const mock = new MockAdapter(axiosInstance);

mock.onGet('/api/posts').reply(200, dummyPosts); // 글 목록 받아오기, get 메서드
mock
  .onPut(/\/api\/user\/\w+\/withdrawGroup/)
  .reply(200, '커뮤니티 탈퇴가 완료되었습니다.'); // 커뮤니티 탈퇴하기, put 메서드

const CommunityFeed: React.FC = () => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 글 작성
  const [posts, setPosts] = useState<PostData[] | null>(null); // 게시글 목록
  const [filteredPosts, setFilteredPosts] = useState<PostData[] | null>(null); // 검색된 게시글 목록
  const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어
  const [isSearching, setIsSearching] = useState<boolean>(false); // 검색중인 상태
  const [searchParams, setSearchParams] = useSearchParams(''); // 쿼리스트링 값(검색 값)
  const params = new URLSearchParams(searchParams); // 현재 쿼리 파라미터
  const [error, setError] = useState<Error | null>(null); // 에러
  const [loading, setLoading] = useState<boolean>(false); // 로딩중

  // 글 작성 모달 닫기
  const handleCloseWriteModal = () => {
    setIsWriteModalOpen(false);
  };

  // 커뮤니티 탈퇴 핸들러
  const handleWithdrawalCommunity = async () => {
    if (confirm('커뮤니티를 탈퇴하시겠습니까?')) {
      try {
        const userId = 'abc'; // 임시
        await axiosInstance.put(
          `/user/${userId}/withdrawGroup`,
          {
            communityId: '6617c6acb39abf604bbe8dc2',
          }
        );
        // const response = await axiosInstance.put(
        //   `/user/${userId}/withdrawGroup`,
        //   {
        //     communityId: '6617c6acb39abf604bbe8dc2',
        //   }
        // );

        // 임시 - response 받아서 홈으로 리다이렉트 ? 어떻게 할지 안 정함
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }
  };

  // 데이터 받기
  useEffect(() => {
    const fetchData = async () => {
      // 게시글 목록
      try {
        const response = await axiosInstance.get(`/posts`);
        setPosts(response.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
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
    setSearchParams(params); // 쿼리 파라미터를 URL에 반
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

  useEffect(() => {
    const filteredPost: PostData[] | null = posts
      ? posts.filter((post) => post.title.includes(searchTerm))
      : null;
    setFilteredPosts(filteredPost);
  }, [searchTerm, posts]);

  // 에러 처리
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // 로딩 처리
  if (loading) {
    return <Loading />;
  }

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
        likeCount={post.likedUsers.length}
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
          likeCount={post.likedUsers.length}
        />
      ));
    }
    return <NoPostsFound>검색어에 해당하는 게시글이 없습니다.</NoPostsFound>;
  };

  return (
    <>
      <TopBar
        category="커뮤니티"
        title={tempGroupArray1.groupName}
        communityCategory={tempGroupArray1.category}
      />
      <SearchContainer>
        <Search
          onSearchTerm={(value) => handleSearch(value)}
          onSearchState={handleSearchState}
          searchState={isSearching}
          placeholder={isSearching ? '' : '검색할 게시글의 제목을 입력하세요'}
        />
      </SearchContainer>
      <Container>
        <FeedBoxContainer>
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
          {isSearching ? renderFilteredPosts() : renderAllPosts()}
        </FeedBoxContainer>
        <div>
          <LinkButtonContainer>
            <LinkButton linkSize="sm" onClick={handleWithdrawalCommunity}>
              탈퇴하기
            </LinkButton>
            <LinkButton href="/community" linkSize="sm">
              다른 커뮤니티 둘러보기
            </LinkButton>
          </LinkButtonContainer>
          <SidePanel name="추천 멤버" elementArray={tempGroupMember} />
        </div>
      </Container>
    </>
  );
};

export default CommunityFeed;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.3fr;
  gap: 10%;
  width: 100%;
  height: auto;
  margin: 0 auto;

  & > * {
    margin-bottom: 30px;
  }
`;

const FeedOptionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const FeedBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--color-grey-1);
`;

const LinkButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;
