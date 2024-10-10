/* eslint-disable no-nested-ternary */

import React, { useState, useEffect, useCallback } from 'react';
// import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

import type { PostData, CommunityData } from '@/types/index';
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

import CATEGORY from '@/constants/communityConstants';
import { Community } from '@/constants/tempInterface';

const Home: React.FC = () => {
  // 상태 정의
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 글 작성 모달 상태
  const [posts, setPosts] = useState<PostData[]>([]); // 게시글 배열
  const [selectedPosts, setSelectedPosts] = useState<PostData[]>([]); // 필터링된 게시글 배열
  const [category, setCategory] = useState<number | string>('category'); // 선택된 카테고리
  const [community, setCommunity] = useState<string>('community'); // 선택된 커뮤니티
  const [isLoading, setIsLoading] = useState(false); // 데이터 로딩 상태
  const [error, setError] = useState<Error | null>(null);
  const [recommendedCommunities, setRecommendedCommunities] = useState<
    CommunityData[] | null
  >(null);

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

  const { formData, handleFormDataChange, handlePostSubmit } = usePostCreate(
    () => {
      console.log('이후 실행 로직 자리');
      handleCloseWriteModal();
    }
  );

  // 글 작성 모달 닫기 핸들러
  const handleCloseWriteModal = () => {
    setIsWriteModalOpen(false);
  };

  // 초기 게시글 데이터 가져오기 함수
  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/posts`);
      setPosts(response.data.data);
      // setHasMore(response.data.hasMore);
      // setPage(2);
    } catch (error) {
      setError(error as Error);
    }
  }, []);

  // 컴포넌트가 마운트 된 후 초기 데이터 가져오기
  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
                    postData={null}
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
            selectedPosts.map((post) => (
              <FeedBox
                key={post._id}
                postId={post._id}
                title={post.title}
                content={post.content}
                uploadedDate={formatDate(post.createdAt)}
                nickname={post.userId ? post.userId.nickName : '알 수 없음'} // null 체크 추가
                // nickname={post.userId.nickName}
                profileSrc={
                  post.userId &&
                  post.userId.profileImage &&
                  post.userId.profileImage.length > 0
                    ? post.userId.profileImage[0]
                    : 'defaultProfileImg.jpg' // 기본 이미지 경로
                }
                // profileSrc={post.userId.profileImage[0]}
                communityName={
                  post.communityId ? post.communityId.community : '알 수 없음' // 커뮤니티 이름 체크
                }
                // communityName={post.communityId.community}
                communityCategory={
                  post.communityId && post.communityId.category !== undefined
                    ? post.communityId.category === 0
                      ? '강아지'
                      : '고양이'
                    : '알 수 없음' // 카테고리 체크
                }
                // communityCategory={
                //   post.communityId.category === 0 ? '강아지' : '고양이'
                // }
                likeCount={post.likedUsers ? post.likedUsers.length : 0} // 좋아요 수 체크
                // likeCount={post.likedUsers.length}
                // ref={index === selectedPosts.length - 1 ? observerTarget : null}
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
