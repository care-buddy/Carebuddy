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
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import PostCreate from '@/pages/PostCreate/index';
import CommunityElement from '@/components/Home&CommunityFeed/CommunityElement';

import formatDate from '@/utils/formatDate';


// 임시 데이터
import {
  tempProfileSrc,
  tempMemberArray1,
  tempGroupArray1,
  // dummyPosts, 
  // dummyGroups
} from '@constants/tempData';

// 임시
const tempGroup = [
  <CommunityElement
    key={tempGroupArray1.groupId}
    groupId={tempGroupArray1.groupId}
    name={tempGroupArray1.groupName}
    introduction={tempGroupArray1.introduction}
    memberCount={tempGroupArray1.memberCount}
  />,
  <CommunityElement
    key={tempGroupArray1.groupId}
    groupId={tempGroupArray1.groupId}
    name={tempGroupArray1.groupName}
    introduction={tempGroupArray1.introduction}
    memberCount={tempGroupArray1.memberCount}
  />,
  <CommunityElement
    key={tempGroupArray1.groupId}
    groupId={tempGroupArray1.groupId}
    name={tempGroupArray1.groupName}
    introduction={tempGroupArray1.introduction}
    memberCount={tempGroupArray1.memberCount}
  />,
];

const mock = new MockAdapter(axios);

// 전체 게시글 목 API
mock.onGet('/api/posts').reply(200, {
  success: true,
  data: [
    {
      _id: '6621f4ae536c1c27679a9df4',
      userId: {
        nickName: '김지연',
        profileImage: ['https://picsum.photos/200'],
        deletedAt: null,
      },
      communityId: {
        _id: '66214eb084ee7839e29e8ac6',
        category: 0,
        community: '뇌·신경',
        deletedAt: null,
      },
      title: '콘텐츠제목2',
      likedUsers: [],
      content:
        '콘텐츠내용 2콘텐츠내용 2콘텐츠내용 2콘텐츠내용 2콘텐츠내용 2콘텐츠내용 2콘텐츠내용 2콘텐츠내용 2콘텐츠내용 2콘텐츠내용 2콘텐츠내용 2콘텐츠내용 2',
      deletedAt: '2024-04-19T08:22:51.722Z',
      postImage: ['https://picsum.photos/200'],
      createdAt: '2024-04-19T04:35:58.458Z',
    },
    {
      _id: '6621f4ae536c1c27679a9df4',
      userId: {
        nickName: '박유신',
        profileImage: ['https://picsum.photos/200'],
        deletedAt: null,
      },
      communityId: {
        _id: '66214eb084ee7839e29e8ac6',
        category: 0,
        community: '눈/피부/귀',
        deletedAt: null,
      },
      title: '콘텐츠내용',
      likedUsers: ['1', '2'],
      content:
        '콘텐츠내용 11콘텐츠내용 11콘텐츠내용 11콘텐츠내용 11콘텐츠내용 11콘텐츠내용 11콘텐츠내용 11콘텐츠내용 11콘텐츠내용 11콘텐츠내용 11콘텐츠내용 11콘텐츠내용 11콘텐츠내용 11콘텐츠내용 11콘텐츠내용 11콘텐츠내용 11',
      deletedAt: '2024-04-19T08:22:51.722Z',
      postImage: ['https://picsum.photos/200'],
      createdAt: '2024-04-19T04:35:58.458Z',
    },
  ],
});

const CommunityFeed: React.FC = () => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 글 작성
  const [posts, setPosts] = useState([
    {
      _id: '',
      userId: {
        nickName: '',
        profileImage: [''],
        deletedAt: '',
      },
      communityId: {
        _id: '',
        category: 0,
        community: '',
        deletedAt: '',
      },
      title: '',
      likedUsers: ['', ''],
      content: '',
      deletedAt: '',
      postImage: [''],
      createdAt: '',
    },
  ]);

  // 글 작성 모달 닫기
  const handleCloseWriteModal = () => {
    setIsWriteModalOpen(false);
  };

  // 작동 테스트용
  const tempGroup = (
    <MemberElement
      key={tempMemberArray1.userId}
      userId={tempMemberArray1.userId}
      nickname={tempMemberArray1.nickname}
      introduction={tempMemberArray1.introduction}
      profileSrc={tempProfileSrc}
    />
  );

  // 데이터 받기
  useEffect(() => {
    const fetchData = async () => {
      // 게시글 목록
      try {
        const response = await axios.get(`api/posts`);
        const posts = response.data.data;

        // 등록일 formatting
        const formattedPosts = posts.map((post: object) => ({
          ...post,
          createdAt: formatDate(post.createdAt),
        }));

        setPosts(formattedPosts);
      } catch (error) {
        console.error('게시글 목록 조회 실패', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <TopBar
        category="커뮤니티"
        title={tempGroupArray1.groupName}
        communityCategory={tempGroupArray1.category}
      />
      <SearchContainer>
        <Search
          // onSearch={(value) => handleSearch(value)}
          placeholder="검색할 게시글의 제목을 입력하세요"
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
          {posts.map((post) => (
            <FeedBox
              postId={post._id}
              title={post.title}
              content={post.content}
              uploadedDate={post.createdAt}
              nickname={post.userId.nickName}
              profileSrc={post.userId.profileImage[0]}
            />
          ))}
        </FeedBoxContainer>
        <SidePanelContainer>
          <LinkButtonContainer>
            <Button buttonStyle="link" buttonSize="sm">
              그룹 탈퇴
            </Button>
            <Button buttonStyle="link" buttonSize="sm">
              다른 그룹 둘러보기
            </Button>
          </LinkButtonContainer>
          <SidePanel name="그룹 멤버" elementArray={tempGroup} />
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