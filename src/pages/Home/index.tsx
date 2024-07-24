import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { dummyPosts, dummyGroups, tempGroup } from '@constants/tempData';
import type { PostData } from '@constants/tempInterface';
import formatDate from '@/utils/formatDate';

import Modal from '@/components/common/Modal';
import Select from '@/components/common/Select';
import PostCreate from '@/pages/PostCreate/index';
import Banner from '@/components/Home&CommunityFeed/Banner';
import FeedBox from '@/components/Home&CommunityFeed/FeedBox';
import SidePanel from '@/components/Home&CommunityFeed/SidePanel';
import WriteButton from '@/components/Home&CommunityFeed/WirteButton';

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

const mock = new MockAdapter(axiosInstance);

// 무한 스크롤 개수
const PAGE_SIZE = 5;

mock.onGet('/posts').reply((config) => {
  const { page = 1, pageSize = PAGE_SIZE } = config.params;
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  const paginatedPosts = dummyPosts.slice(startIndex, endIndex);
  const hasMore = endIndex < dummyPosts.length;

  return [200, { data: paginatedPosts, hasMore }];
});

mock.onGet('/api/groups').reply(200, dummyGroups);

const Home: React.FC = () => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 글 작성 모달 상태
  const [posts, setPosts] = useState<PostData[]>([]); // 모든 게시물 상태
  const [selectedPosts, setSelectedPosts] = useState<PostData[]>([]); // 필터링된 게시물 상태
  const [category, setCategory] = useState<number | string>('category'); // 카테고리 필터 상태
  const [community, setCommunity] = useState<string>('community'); // 커뮤니티 필터 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [hasMore, setHasMore] = useState(true); // 추가 로드 가능한지 여부

  // 분류 카테고리 옵션
  const SelectCategoryOptions = [
    { value: 'category', label: '종' },
    { value: 'dog', label: '강아지' },
    { value: 'cat', label: '고양이' },
  ];

  // 분류 커뮤니티 옵션
  const SelectCommunityOptions = [
    { value: 'community', label: '커뮤니티' },
    { value: '눈 / 피부 / 귀', label: '눈 / 피부 / 귀' },
    { value: '코', label: '코' },
    { value: '뇌·신경', label: '뇌·신경' },
  ];

  // 작성 모달 닫기 함수
  const handleCloseWriteModal = () => {
    setIsWriteModalOpen(false);
  };

  // 초기 데이터 Fetch 함수
  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/posts`, {
        params: { page, pageSize: PAGE_SIZE },
      });

      setPosts(response.data.data);
      setHasMore(response.data.hasMore);
      setPage(2);
    } catch (error) {
      console.error('게시글 목록 조회 실패', error);
    }
  }, []);

  // 컴포넌트 마운트 시 초기 데이터 Fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]); 

  // 추가 게시물 로드 함수
  const loadMorePosts = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await axiosInstance.get('/posts', {
        params: { page, pageSize: PAGE_SIZE },
      });

      setPosts((prevPosts) => [...prevPosts, ...response.data.data]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error('추가 게시글 로드 실패', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  // 무한스크롤 관찰 대상 ref
  const observerTarget = useRef<HTMLDivElement | null>(null);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts();
        }
      },
      { root: null, rootMargin: '100px', threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loadMorePosts]);

  // 카테고리 및 커뮤니티에 따른 게시물 필터링 로직
  useEffect(() => {
    if (category !== 'category' || community !== 'community') {
      const filteredPosts = posts.filter(
        (post) =>
          (category === 'category' || post.communityId.category === category) &&
          (community === 'community' ||
            post.communityId.community === community)
      );
      setSelectedPosts(filteredPosts);
    } else {
      setSelectedPosts(posts);
    }
  }, [posts, category, community]);

  // 카테고리 옵션 변경 핸들러
  const handleCategoryOptions = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };

  // 커뮤니티 옵션 변경 핸들러
  const handleCommunityOptions = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCommunity(event.target.value);
  };

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
          {selectedPosts.map((post, index) => (
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
