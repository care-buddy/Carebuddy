// 남은 작업: 커뮤니티별 게시글 불러오기 API, 그룹 멤버 조회 API(백엔드 완료 이후 작업)
// 리팩토링할 수도 있는 부분: filteredPosts를 제거하고 필터링된 데이터를 바로 렌더링하는 방식 고려 가능. useMemo 사용해서 메모이제이션, posts 부분과 filterefPosts 함수로 만들어서 동적렌더링

import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

import usePostCreate from '@/hooks/usePostCreate';

import formatDate from '@/utils/formatDate';
import axiosInstance from '@/utils/asioxInstance';

import type { PostData } from '@constants/tempInterface';

// 임시 데이터
import {
  tempGroupArray1,
  tempGroupMember,
} from '@constants/tempData';

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

  const { communityId } = useParams();
  const navigate = useNavigate();

  const user = {
    // 임시 유저. 나중에 전역 상태 관리로 바꾸어야함.
    _id: '66a6f8e1640d6ec46070509d',
    communityId: ['66b5ba8c19ffced581357307', '66c687429ac226b8a246a791'],
  };

  const { formData, handleFormDataChange, handlePostSubmit } = usePostCreate(
    () => {
      // console.log('이후 실행 로직 자리');
    }
  );

  // 글 작성 모달 닫기
  const handleCloseWriteModal = () => {
    setIsWriteModalOpen(false);
  };

  // 커뮤니티 탈퇴 핸들러
  const handleWithdrawalCommunity = async () => {
    if (confirm('커뮤니티를 탈퇴하시겠습니까?')) {
      try {
        await axiosInstance.put(`/user/${user._id}/withdrawalCommunity`, {
          communityId,
        });

        navigate('/');
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }
  };

  // 커뮤니티별 게시글 불러오기(백엔드 완료 이후 작업)
  useEffect(() => {
    const fetchData = async () => {
      // 게시글 목록
      // try {
      //   const response = await axiosInstance.get(`/posts`);
      //   setPosts(response.data);
      // } catch (error) {
      //   setError(error as Error);
      // } finally {
      //   setLoading(false);
      // }
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

  // 리팩토링하고싶은 부분
  // const renderPosts = (postArray: PostData[] | null) => {
  //   if (!postArray || postArray.length === 0) {
  //     return <NoPostsFound>검색어에 해당하는 게시글이 없습니다.</NoPostsFound>;
  //   }
  //   return postArray.map((post) => (
  //     <FeedBox
  //       key={post._id}
  //       postId={post._id}
  //       title={post.title}
  //       content={post.content}
  //       uploadedDate={formatDate(post.createdAt)}
  //       nickname={post.userId.nickName}
  //       profileSrc={post.userId.profileImage[0]}
  //       likeCount={post.likedUsers.length}
  //     />
  //   ));
  // };

  // {isSearching ? renderPosts(filteredPosts) : renderPosts(posts)}


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
                component={
                  <PostCreate
                    formData={formData}
                    onFormDataChange={handleFormDataChange}
                  />
                }
                onClose={handleCloseWriteModal}
                onHandleClick={handlePostSubmit}
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
