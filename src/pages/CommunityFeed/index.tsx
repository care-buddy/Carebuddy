// 임시 - 남은 작업: , 그룹 멤버 조회 API(백엔드 완료 이후 작업) / 첫 화면 페이지네이션(커뮤니티별 게시글 조회 API 붙이고 작업)
// 리팩토링할 수도 있는 부분: filteredPosts를 제거하고 필터링된 데이터를 바로 렌더링하는 방식 고려 가능. useMemo 사용해서 메모이제이션, posts 부분과 filterefPosts 함수로 만들어서 동적렌더링, 검색로직 커스텀 훅으로 분리

import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled from 'styled-components';

import type { CommunityData } from '@/types/index';

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
import CommunityElement from '@/components/Home&CommunityFeed/CommunityElement';

import pickRandomItemFromArray from '@/utils/pickRandomItemFromArray';

import DefaultProfile from '@/assets/person.png';

import usePostCreate from '@/hooks/usePostCreate';

import formatDate from '@/utils/formatDate';
import axiosInstance from '@/utils/axiosInstance';

import loginModalState from '@/recoil/atoms/loginModalState';

import { PostData, User } from '@/types';

import userState from '@/recoil/atoms/userState';

const CommunityFeed: React.FC = () => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 글 작성
  const [posts, setPosts] = useState<PostData[] | null>(null); // 게시글 목록
  const [filteredPosts, setFilteredPosts] = useState<PostData[] | null>(null); // 검색된 게시글 목록
  const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어
  const [isSearching, setIsSearching] = useState<boolean>(false); // 검색중인 상태
  const [searchParams, setSearchParams] = useSearchParams(''); // 쿼리스트링 값(검색 값)
  const params = new URLSearchParams(searchParams); // 현재 쿼리 파라미터
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [recommendedCommunities, setRecommendedCommunities] = useState<
    CommunityData[] | null
  >(null);

  const [, setLoginModalOpen] = useRecoilState(loginModalState);

  const user: User | null = useRecoilValue(userState);

  const { communityId } = useParams();
  const navigate = useNavigate();

  const { formData, handleFormDataChange, handlePostSubmit } = usePostCreate(
    () => {
      // console.log('이후 실행 로직 자리');
    }
  );

  // 추천 그룹 사이드바용 API(전체 그룹 조회)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<{ data: CommunityData[] }>(
          'communities'
        );
        const communityArray = pickRandomItemFromArray(response.data.data, 3);
        setRecommendedCommunities(communityArray);
      } catch (error) {
        // 에러 처리 로직
      } finally {
        // 마지막에 실행할 로직
      }
    };

    fetchData();
  }, []);

  // 글 작성 모달 닫기
  const handleCloseWriteModal = () => {
    setIsWriteModalOpen(false);
  };

  // 커뮤니티 탈퇴 핸들러
  const handleWithdrawalCommunity = async () => {
    if (confirm('커뮤니티를 탈퇴하시겠습니까?')) {
      try {
        await axiosInstance.put(`users/${user?._id}/withdrawalCommunity`, {
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

  // 로그인 모달 열기
  const handleOpenLoginModal = async () => {
    alert('로그인한 사용자만 이용할 수 있는 메뉴입니다.'); // 임시. 멘트 변경
    setLoginModalOpen(true);
  };

  // 커뮤니티별 게시글 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/posts/${communityId}/community`
        );

        const filteredPosts = response.data.data.filter(
          (post: PostData) => !post.deletedAt
        );
        setPosts(filteredPosts);
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
    const filteredPost: PostData[] | null = Array.isArray(posts)
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

  const renderAllPosts = () => {
    if (!posts || posts.length === 0) {
      return <NoPostsFound>게시글이 없습니다.</NoPostsFound>;
    }

    return posts.map((post) => (
      <FeedBox
        key={post._id}
        postId={post._id}
        title={post.title}
        content={post.content}
        uploadedDate={formatDate(post.createdAt)}
        nickname={post.userId?.nickName || 'Unknown User'}
        profileSrc={post.userId?.profileImage?.[0] || DefaultProfile}
        likeCount={post.likedUsers?.length || 0}
        commentCount={post.commentId?.length || 0}
      />
    ));
  };

  const renderFilteredPosts = () => {
    if (filteredPosts && filteredPosts.length > 0) {
      return filteredPosts.map((post) => (
        <FeedBox
          key={post._id}
          postId={post._id}
          title={post.title}
          content={post.content}
          uploadedDate={formatDate(post.createdAt)}
          // userId가 null이 아닌지 확인하고, nickName이 없을 경우 'Unknown User'를 표시 - 임시(개발용)
          nickname={post.userId?.nickName || 'Unknown User'}
          // profileImage가 배열일 경우 첫 번째 이미지 사용, 없으면 기본 이미지 사용
          profileSrc={post.userId?.profileImage?.[0] || DefaultProfile}
          // likedUsers 배열의 길이를 안전하게 체크
          likeCount={post.likedUsers?.length || 0}
        />
      ));
    }
    return <NoPostsFound>검색어에 해당하는 게시글이 없습니다.</NoPostsFound>;
  };

  return (
    <>
      <TopBar
        category="커뮤니티"
        title={
          posts && posts.length > 0
            ? posts[0].communityId.community 
            : '커뮤니티 제목을 불러오는 중...'
        }
        communityCategory={
          posts && posts.length > 0
            ? posts[0].communityId.category
            : '카테고리를 불러오는 중...'
        }
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
            {user &&
            Array.isArray(user.communityId) &&
            user.communityId.some((c) => c._id === communityId) ? (
              <LinkButton linkSize="sm" onClick={handleWithdrawalCommunity}>
                탈퇴하기
              </LinkButton>
            ) : (
              <LinkButton linkSize="sm" onClick={handleOpenLoginModal}>
                가입하기
              </LinkButton>
            )}

            <LinkButton href="/community" linkSize="sm">
              다른 커뮤니티 둘러보기
            </LinkButton>
          </LinkButtonContainer>
          <SidePanel
            name="추천 커뮤니티"
            elementArray={recommendedCommunities?.map((community) => (
              <CommunityElement
                key={community._id}
                communityId={community._id}
                name={community.community}
                introduction={community.introduction}
              />
            ))}
          />
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
