import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import TopBar from '@/components/common/TopBar';
import FeedBox from '@/components/Home&CommunityFeed/FeedBox';
import SidePanel from '@/components/Home&CommunityFeed/SidePanel';
import WriteButton from '@/components/Home&CommunityFeed/WirteButton';
import MemberElement from '@/components/Home&CommunityFeed/MemberElement';
import Search from '@/components/common/Search';
import Modal from '@/components/common/Modal';
import PostCreate from '@/pages/PostCreate/index';
import LinkButton from '@/components/common/LinkButton';
// import CommunityElement from '@/components/Home&CommunityFeed/CommunityElement';

import formatDate from '@/utils/formatDate';

import type { PostData } from '@constants/tempInterface';

// 임시 데이터
import {
  tempProfileSrc,
  tempMemberArray1,
  tempGroupArray1,
  dummyPosts,
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

// 작동 테스트용
const tempGroup = [
  <MemberElement
    key={tempMemberArray1.userId}
    userId={tempMemberArray1.userId}
    nickname={tempMemberArray1.nickname}
    introduction={tempMemberArray1.introduction}
    profileSrc={tempProfileSrc}
  />,
  <MemberElement
    key={tempMemberArray1.userId}
    userId={tempMemberArray1.userId}
    nickname={tempMemberArray1.nickname}
    introduction={tempMemberArray1.introduction}
    profileSrc={tempProfileSrc}
  />,
  <MemberElement
    key={tempMemberArray1.userId}
    userId={tempMemberArray1.userId}
    nickname={tempMemberArray1.nickname}
    introduction={tempMemberArray1.introduction}
    profileSrc={tempProfileSrc}
  />,
];

const CommunityFeed: React.FC = () => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 글 작성
  const [posts, setPosts] = useState<PostData[] | null>(null); // 게시글 목록
  const [filteredPosts, setFilteredPosts] = useState<PostData[] | null>(null); // 검색된 게시글 목록
  const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어
  const [isSearching, setIsSearching] = useState<boolean>(false); // 검색중인 상태

  // 글 작성 모달 닫기
  const handleCloseWriteModal = () => {
    setIsWriteModalOpen(false);
  };

  // 커뮤니티 탈퇴 핸들러
  const handleWithdrawalCommunity = async () => {
    if (confirm('커뮤니티를 탈퇴하시겠습니까?')) {
      try {
        const userId = 'abc'; // 임시
        const response = await axiosInstance.put(
          `/user/${userId}/withdrawGroup`,
          {
            communityId: '6617c6acb39abf604bbe8dc2',
          }
        );

        console.log('커뮤니티 탈퇴, 성공', response.data); // 임시
      } catch (error) {
        console.error('커뮤니티 탈퇴 실패', error); // 임시
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
        console.error('게시글 목록 조회 실패', error); // 임시
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
          {isSearching
            ? filteredPosts?.map((post) => (
                <FeedBox
                  key={post._id}
                  postId={post._id}
                  title={post.title}
                  content={post.content}
                  uploadedDate={formatDate(post.createdAt)}
                  nickname={post.userId.nickName}
                  profileSrc={post.userId.profileImage[0]}
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
                />
              ))}
        </FeedBoxContainer>
        <SidePanelContainer>
          <LinkButtonContainer>
            <LinkButton linkSize="sm" onClick={handleWithdrawalCommunity}>
              탈퇴하기
            </LinkButton>
            <LinkButton href="/community" linkSize="sm">
              다른 커뮤니티 둘러보기
            </LinkButton>
          </LinkButtonContainer>
          <SidePanel name="추천 멤버" elementArray={tempGroup} />
        </SidePanelContainer>
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

const SidePanelContainer = styled.div``;
