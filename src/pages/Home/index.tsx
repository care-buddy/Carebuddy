/* eslint-disable no-nested-ternary */

import React, { useState, useEffect, useCallback } from 'react';
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

import useGenerateOptions from '@/hooks/useGenerateOptions';
import usePostCreate from '@/hooks/usePostCreate';

import axiosInstance from '@/utils/axiosInstance';
import pickRandomItemFromArray from '@/utils/pickRandomItemFromArray';

const Home: React.FC = () => {
  // 상태 정의
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 글 작성 모달 상태
  const [posts, setPosts] = useState<PostData[]>([]); // 게시글 배열
  const [selectedPosts, setSelectedPosts] = useState<PostData[]>([]); // 필터링된 게시글 배열
  const [category, setCategory] = useState<number | string>(-1); // 선택된 카테고리
  const [community, setCommunity] = useState<string>('community'); // 선택된 커뮤니티
  const [isLoading, setIsLoading] = useState(false); // 데이터 로딩 상태
  const [error, setError] = useState<Error | null>(null);
  const [recommendedCommunities, setRecommendedCommunities] = useState<
    CommunityData[] | null
  >(null);

  const { categoryOptions, communityOptions } = useGenerateOptions();

  useEffect(() => {
    console.log(selectedPosts);
  }, [selectedPosts]);

  // 초기 게시글 데이터 가져오기 함수
  // const fetchData = useCallback(async () => {
  //   try {
  //     const response = await axiosInstance.get(`/posts`);
  //     // setPosts(response.data.data);
  //     setSelectedPosts(response.data.data);
  //   } catch (error) {
  //     setError(error as Error);
  //   }
  // }, []);

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/posts`);
      const posts = response.data.data;

      if (Array.isArray(posts)) {
        setPosts(posts);
        setSelectedPosts(posts);
      } else {
        console.error('Expected posts to be an array, but got:', posts);
        setSelectedPosts([]); // 기본값 설정
      }
    } catch (error) {
      setError(error as Error);
    }
  }, []);

  // 컴포넌트가 마운트 된 후 초기 데이터 가져오기
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // select 로직 - category 선택에 따른 community 옵션 필터링 로직 추가
  const [filteredCommunityOptions, setFilteredCommunityOptions] =
    useState(communityOptions);

  useEffect(() => {
    if (category !== 'category') {
      const filteredCommunityOptions = communityOptions.filter(
        (community) => community.category === category
      );
      setFilteredCommunityOptions(filteredCommunityOptions);
    } else {
      setFilteredCommunityOptions(communityOptions);
    }
  }, [category]);

  // select 변경 시 커뮤니티별 게시글 조회 API
  useEffect(() => {
    const fetchCommunityPosts = async () => {
      console.log('조회까지 못감!');

      setIsLoading(true);

      // category가 -1일 경우 전체 게시글 조회
      if (category === -1) {
        await fetchData(); // 전체 게시글을 조회하는 함수 호출
        console.log('전체 게시글 조회');
        setIsLoading(false); // 로딩 상태 종료
      } else if (community !== 'community') {
        try {
          const response = await axiosInstance.get(
            `/posts/${community}/community` // 선택된 커뮤니티의 _id 사용
          );
          console.log(community, '조회!');
          setSelectedPosts(response.data.data);
        } catch (error) {
          setError(error as Error);
        } finally {
          setIsLoading(false); // 데이터 호출이 끝난 후 로딩 상태를 false로 설정
        }
      } else {
        setIsLoading(false); // 'community'인 경우에도 로딩 상태를 false로 설정
      }
    };

    fetchCommunityPosts();
  }, [community, category]); // community와 category 상태에 의존

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

  // 카테고리 옵션 핸들러
  const handleCategoryOptions = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(Number(event.target.value));
  };

  // 커뮤니티 옵션 핸들러
  const handleCommunityOptions = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCommunity = event.target.value;
    setCommunity(selectedCommunity);

    // 커뮤니티를 선택할 때마다 게시글을 다시 가져오도록 상태를 업데이트
    if (selectedCommunity !== 'community') {
      setSelectedPosts([]); // 이전 선택된 게시글 초기화
      setIsLoading(true); // 로딩 상태 시작

      try {
        const response = await axiosInstance.get(
          `/posts/${selectedCommunity}/community`
        );
        setPosts(response.data.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false); // 데이터 호출이 끝난 후 로딩 상태 종료
      }
    }
  };

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
                options={categoryOptions}
                onChange={handleCategoryOptions}
              />
              <Select
                selectStyle="round"
                options={filteredCommunityOptions} // 필터링된 옵션 사용
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
          {Array.isArray(selectedPosts) && selectedPosts.length === 0 ? (
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
                commentCount={post.commentId ? post.commentId.length : 0}
              />
            ))
          )}
          {/* {selectedPosts.length === 0 ? (
            <NoPostsFound>해당하는 게시글이 없습니다.</NoPostsFound>
          ) : (

          )} */}
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
  position: absolute;
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
