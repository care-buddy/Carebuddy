import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import ActionButton from '@/components/common/ActtionButton';
import LikeAndCommentCount from '@/components/Post/LikesAndCommentCount';
import CommentWritingBox from '@/components/Post/CommentWritingBox';
import Comment from '@/components/Post/Comment';
import TopBar from '@/components/common/TopBar';

import { LuThumbsUp, LuChevronLeft } from 'react-icons/lu';

import formatDateIncludeTime from '@/utils/formatDateIncludeTime';

// 임시 데이터
import { tempNickname } from '@constants/tempData';

const mock = new MockAdapter(axios);

// 게시글 목 API
mock.onGet('/api/posts/postId').reply(200, {
  success: true,
  data: {
    userId: {
      _id: '661a0e5febec873b54de2ad1',
      nickName: '김지연',
      profileImage: ['https://picsum.photos/200'],
      deletedAt: null,
      createdAt: '2024-04-13T04:47:27.495Z',
    },
    communityId: {
      _id: '66214eb084ee7839e29e8ac6',
      category: 0,
      community: '뇌·신경',
    },
    title: '시험적의 예정되다 보내어',
    likedUsers: [],
    content: `계획할 인간과 땅이, 시간 된다 생각할까. 있어 그런 악몽이 그럼 나다. 분야를 회장단에 발표하는 차례다 버드나무는 정리하여도, 벌이의 누구에 못한다. 또 아이가, 엄마가 이왕이면 왕자를 사람과 대화나 지역으로 정열이, 간, 됩니다. 것 돈이 인선이 같이 모두 엄마는 데 거 대한다. 반드시 가속도에 가라앉히고 그, 같던, 선택할 가지는 당하다. 범부가 나에 벼농사를 혁명에 출세하고 본성을 사라지다.

엄마가 이왕이면 왕자를 사람과 대화나 지역으로 정열이, 간, 됩니다. 것 돈이 인선이 같이 모두 엄마는 데 거 대한다. 반드시 가속도에 가라앉히고 그, 같던, 선택할 가지는 당하다. 범부가 나에 벼농사를 혁명에 출세하고 본성을 사라지다.`,
    deletedAt: '2024-04-19T08:22:51.722Z',
    postImage: ['https://picsum.photos/200'],
    createdAt: '2024-04-19T04:35:58.458Z',
  },
});

// 댓글 목 API
mock.onGet('/api/comments/postId').reply(200, {
  success: true,
  data: [
    {
      userId: {
        _id: '661a0e5febec873b54de2ad1',
        nickName: '댓글다는사람',
        profileImage: ['https://picsum.photos/200'],
      },
      text: '왕자병에서 두 냉증의 살피어요 있다 버려지다. 시정하다 대칭의 공감대가 미약하다 차든지 잡는다 뽑히다. 지난해에 계몽한지 자리의 온 주목의 올라오고 지정에 들어온다. 그는 본 엄격하기 대중화되다 치다 2,280,000원 자신이 남다. 모면하여 걸맞게 자유가 어떤 있고 보아야 작정을 모색합니다. 지르어야 알려지는 부각시킨 한 유월을 환하라 말씀, 여전히 한다.',
      deletedAt: null,
      _id: '6622362d30d4656920c080dd',
      createdAt: '2024-04-19T09:15:25.992Z',
    },
    {
      userId: {
        _id: '661a0e5febec8b54de2ad1',
        nickName: '댓글다는사람',
        profileImage: ['https://picsum.photos/200'],
      },
      text: '2번댓글ㄹ아러망러 글 잘봤습니다 !!',
      deletedAt: null,
      _id: '6622362d30d4656920c080dd',
      createdAt: '2024-04-19T09:15:25.992Z',
    },
  ],
});

interface PostProps {
  // title?: string;
  // content?: string;
  // userId?: {
  //   nickName: string;
  // };
  // postId?: {
  //   updatedAt: string;
  //   likeCount: number;
  //   postImage?: string;
  //   categoryId?: string;
  // };
}

const Post: React.FC<PostProps> = () => {
  const [post, setPost] = useState({
    _id: '',
    userId: {
      _id: '',
      nickName: '',
      profileImage: [''],
      deletedAt: '',
    },
    communityId: {
      _id: '',
      category: 0,
      community: '',
    },
    title: '',
    likedUsers: [],
    content: '',
    deletedAt: '',
    postImage: [''],
    createdAt: '',
  });
  const [comments, setComments] = useState([
    {
      userId: {
        _id: '',
        nickName: '',
        profileImage: [''],
      },
      text: '',
      deletedAt: '',
      _id: '',
      createdAt: '',
    },
  ]);

  // axios 조회
  useEffect(() => {
    const fetchData = async () => {
      // 게시글
      try {
        const response = await axios.get(`/api/posts/postId`);
        const post = response.data.data;

        // 등록일 formatting
        post.createdAt = formatDateIncludeTime(post.createdAt);
        setPost(post);
      } catch (error) {
        console.error('게시글 조회 실패', error);
      }

      // 댓글
      try {
        const response = await axios.get(`/api/comments/postId`);
        const comments = response.data.data;

        // 등록일 formatting
        const formattedComments = comments.map((comment: object) => ({
          ...comment,
          createdAt: formatDateIncludeTime(comment.createdAt),
        }));

        setComments(formattedComments);
      } catch (error) {
        console.error('댓글 조회 실패', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <TopBar
        category="커뮤니티"
        title="눈 / 피부 / 귀"
        communityCategory="고양이"
      />

      <Container>
        <PostListButtonContainer>
          <LuChevronLeft />
          <p>글 목록 보기</p>
        </PostListButtonContainer>
        <TitleContainer>
          <p>{post.title}</p>
          <PostOption>
            <LikeAndCommentCount
              likeCount={post.likedUsers.length}
              commentCount={comments.length}
            />
            <ActionButton buttonBorder="border-solid" direction="horizonal" />
          </PostOption>
        </TitleContainer>
        <InformationContainer>
          <ProfileImg src={post.userId.profileImage[0]} alt="프로필 이미지" />
          <p>{post.userId.nickName}</p>
          <p>|</p>
          <p>{post.createdAt}</p>
        </InformationContainer>
        <ContentContainer>
          <Pre>{post.content}</Pre>
          <img src={post.postImage[0]} alt="이미지" />
          <Likes>
            <LuThumbsUp />
            <p>추천해요 {post.likedUsers.length}</p>
          </Likes>
        </ContentContainer>
        <CommentContainer>
          <CommentWritingBox nickname={tempNickname} />
          {comments?.map((comment) => (
            <Comment
              key={comment._id}
              text={comment.text}
              nickname={comment.userId.nickName}
              date={comment.createdAt}
              profileImg={comment.userId.profileImage[0]}
            />
          ))}
        </CommentContainer>
      </Container>
    </>
  );
};

export default Post;

const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 70%;
  grid-template-rows: 40px 24px minmax(10vh, auto) minmax(30vh, auto);
`;

const PostListButtonContainer = styled.div`
  display: flex;
  color: var(--color-grey-1);
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-lg-1);
  font-weight: var(--font-weight-semibold);

  & > p {
    color: var(--color-black);
  }
`;

const PostOption = styled.div`
  display: flex;
`;

const InformationContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: flex;
  align-items: center;

  color: var(--color-grey-1);

  p {
    font-size: var(--font-size-ft-1);
  }

  & > * {
    margin: 0 2px;
  }
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  width: 20px;
  height: 20px;
`;

const ContentContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  margin: 12px 0;
  font-size: var(--font-size-md-1);
  line-height: 1.4rem;
  color: var(--color-black);
  width: 100%;
  border-bottom: solid var(--color-grey-2) 1px;

  img {
    margin: 10px 0 20px 0;
    margin-top: 20px;
    width: 380px;
    height: auto;
  }
`;

const Likes = styled.div`
  display: flex;
  color: var(--color-grey-1);
  font-size: var(--font-size-ft-1);
  align-items: center;
  cursor: pointer;
  padding-bottom: 12px;

  & > * {
    margin: 0 3px;
  }
`;

const CommentContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 4 / 5;
`;

const Pre = styled.pre`
  white-space: pre-wrap;
`;
