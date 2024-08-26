// 임시 - 남은 작업: 게시글 전체 조회 API(백엔드 완료 이후 작업), 게시글 작성, 유저가 가입된 그룹으로 select 옵션(recoil 적용 이후 작업),

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

import type { PostData } from '@constants/tempInterface';
import formatDate from '@/utils/formatDate';

import Modal from '@/components/common/Modal';
import Select from '@/components/common/Select';
import PostCreate from '@/pages/PostCreate/index';
import Banner from '@/components/Home&CommunityFeed/Banner';
import NoPostsFound from '@/components/common/NoPostsFound';
import FeedBox from '@/components/Home&CommunityFeed/FeedBox';
import SidePanel from '@/components/Home&CommunityFeed/SidePanel';
import WriteButton from '@/components/Home&CommunityFeed/WirteButton';
import CommunityElement from '@/components/Home&CommunityFeed/CommunityElement';

import usePostCreate from '@/hooks/usePostCreate';

import axiosInstance from '@/utils/axiosInstance';
import pickRandomItemFromArray from '@/utils/pickRandomItemFromArray';

import { Community } from '@/constants/tempInterface';
import CATEGORY from '@/constants/communityConstants';

// 무한스크롤로 보내줄 콘텐츠 개수
const PAGE_SIZE = 5;

// mock.onGet('/posts').reply((config) => {
//   const { page = 1, pageSize = PAGE_SIZE } = config.params;
//   const startIndex = (page - 1) * pageSize;
//   const endIndex = page * pageSize;
//   const paginatedPosts = dummyPosts.slice(startIndex, endIndex);
//   const hasMore = endIndex < dummyPosts.length;

//   return [200, { data: paginatedPosts, hasMore }];
// });

// mock.onGet('/api/groups').reply(200, dummyGroups);

const Home: React.FC = () => {
  // 상태 정의
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 글 작성 모달 상태
  const [posts, setPosts] = useState<PostData[]>([]); // 게시글 배열
  const [selectedPosts, setSelectedPosts] = useState<PostData[]>([]); // 필터링된 게시글 배열
  const [category, setCategory] = useState<number | string>('category'); // 선택된 카테고리
  const [community, setCommunity] = useState<string>('community'); // 선택된 커뮤니티
  const [isLoading, setIsLoading] = useState(false); // 데이터 로딩 상태
  const [page, setPage] = useState(1); // 현재 페이지 상태(무한스크롤)
  const [hasMore, setHasMore] = useState(true); // 남은 데이터 여부(무한스크롤)
  const [error, setError] = useState<Error | null>(null);
  const [recommendedCommunities, setRecommendedCommunities] = useState<
    Community[] | null
  >(null);

  // 추천 그룹 사이드바용 API(전체 그룹 조회)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<{ data: Community[] }>(
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

  const { formData, handleFormDataChange, handlePostSubmit } = usePostCreate(
    () => {
      console.log('이후 실행 로직 자리');
    }
  );

  // 글 작성 모달 닫기 핸들러
  const handleCloseWriteModal = () => {
    setIsWriteModalOpen(false);
  };

  // 초기 게시글 데이터 가져오기 함수
  const fetchData = useCallback(async () => {
    // try {
    //   const response = await axiosInstance.get(`/post`, { // 임시. 추후 백엔드 코드 변경시 엔드포인트 변경
    //     params: { page: 1, pageSize: PAGE_SIZE },
    //   });
    //   setPosts(response.data.data);
    //   setHasMore(response.data.hasMore);
    //   setPage(2);
    // } catch (error) {
    //   setError(error as Error);
    // }
  }, []);

  // 컴포넌트가 마운트 된 후 초기 데이터 가져오기
  useEffect(() => {
    // fetchData();
  }, [fetchData]);

  // 초기 렌더링 이후 게시글 로드 함수
  const loadMorePosts = useCallback(async () => {
    // if (isLoading || !hasMore) return; // 로딩 중이거나 데이터 더 없으면 종료
    // setIsLoading(true); // 로딩 상태 설정
    // try {
    //   const response = await axiosInstance.get('/post', { // 임시. 추후 백엔드 코드 변경시 엔드포인트 변경
    //     params: { page, pageSize: PAGE_SIZE },
    //   });
    //   setPosts((prevPosts) => [...prevPosts, ...response.data.data]);
    //   setPage((prevPage) => prevPage + 1);
    //   setHasMore(response.data.hasMore);
    // } catch (error) {
    //   setError(error as Error);
    // } finally {
    //   setIsLoading(false);
    // }
  }, [page, isLoading, hasMore]);

  // 옵저버 설정
  // const observerTarget = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting && hasMore) {
  //         loadMorePosts();
  //       }
  //     },
  //     { root: null, rootMargin: '100px', threshold: 0.1 }
  //   );

  //   const target = observerTarget.current;
  //   if (target) {
  //     observer.observe(target);
  //   }

  //   return () => {
  //     if (target) {
  //       observer.unobserve(target);
  //     }
  //   };
  // }, [selectedPosts, hasMore, loadMorePosts, observerTarget]);

  // 카테고리(종) 옵션
  const SelectCategoryOptions = [
    { value: 'category', label: '종' },
    { value: CATEGORY.dog, label: '강아지' },
    { value: CATEGORY.cat, label: '고양이' },
  ];

  // 커뮤니티 옵션 ->
  const SelectCommunityOptions = [
    { value: 'community', label: '커뮤니티' },
    { value: '눈 / 피부 / 귀', label: '눈 / 피부 / 귀' },
    { value: '코', label: '코' },
    { value: '뇌·신경', label: '뇌·신경' },
  ];

  // 카테고리 옵션 핸들러
  const handleCategoryOptions = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(Number(event.target.value)); // number 타입으로 변환
  };

  // 커뮤니티 옵션 핸들러
  const handleCommunityOptions = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCommunity(event.target.value);
  };

  // select 로직
  useEffect(() => {
    if (posts !== null) {
      let filteredPosts = posts;

      // 둘 다 선택한 경우
      if (category !== 'category' && community !== 'community') {
        filteredPosts = filteredPosts.filter(
          (post) =>
            post.communityId.category === category &&
            post.communityId.community === community
        );
        setSelectedPosts(filteredPosts);
      } else if (category !== 'category' && community === 'community') {
        // 카테고리만 선택
        filteredPosts = filteredPosts.filter(
          (post) => post.communityId.category === category
        );
        setSelectedPosts(filteredPosts);
      } else if (category === 'category' && community !== 'community') {
        // 커뮤니티만 선택
        filteredPosts = filteredPosts.filter(
          (post) => post.communityId.community === community
        );
        setSelectedPosts(filteredPosts);
      } else {
        // 둘 다 선택하지 않은 경우
        setSelectedPosts(filteredPosts);
      }
    } else {
      setSelectedPosts([]);
    }
  }, [posts, category, community]);

  useEffect(() => {
    setPage(1); // select 옵션 변경 시 페이지 초기화
    fetchData(); // 옵션 변경 시 페이지를 초기화하고 게시글을 다시 로드
  }, [category, community]);

  // 에러 처리
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Div>
        <Banner />
      </Div>
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
          {selectedPosts.length === 0 ? (
            <NoPostsFound>해당하는 게시글이 없습니다.</NoPostsFound>
          ) : (
            selectedPosts.map((post, index) => (
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
                ref={index === selectedPosts.length - 1 ? observerTarget : null}
              />
            ))
          )}
        </FeedBoxContainer>
        <div>
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
      </ContentContainer>
    </>
  );
};

export default Home;

const Div = styled.div`
  position: absolute; /* 레이아웃에 포함된 배너 밑 마진(상단바 자리)를 채우기 위함 - 임시*/
  top: 0;
  left: 0;
  width: 100%;
  height: 55vh;
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 70% 20%;
  justify-content: space-between;
  width: 100%;
  margin-top: 37vh; /* Div의 높이와 일치시켜 Div 바로 아래에 위치하도록 설정 - 임시*/
`;

const FeedBoxContainer = styled.div`
  color: var(--color-grey-1);
  min-height: 30vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const FeedOptionContainer = styled.div`
  display: flex;
  width: 100%;
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
