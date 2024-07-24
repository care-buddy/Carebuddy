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
import Modal from '@/components/common/Modal/index';
import PostCreate from '@/pages/PostCreate/index';
import Button from '@/components/common/Button';

import { LuThumbsUp, LuChevronLeft } from 'react-icons/lu';

import formatDateIncludeTime from '@/utils/formatDateIncludeTime';

import type { PostData, CommentData } from '@constants/tempInterface';

// 임시 데이터
import {
  dummyPost,
  dummyComments,
  // dummyNewComment
} from '@constants/tempData';

const axiosInstance = axios.create({
  baseURL: '/api', // 기본 URL 설정
  timeout: 5000, // 타임아웃 설정 (ms)
});

const mock = new MockAdapter(axiosInstance);

mock.onGet('/posts/postId').reply(200, dummyPost); // 게시글 조회 목 API
mock.onGet('/comments/postId').reply(200, dummyComments); // 댓글 조회 목 API
mock.onPost(`/comments`).reply((config) => {
  // 댓글 등록 목 API

  const requestData = JSON.parse(config.data);
  console.log('콘솔', { config, requestData });

  const responseData = {
    userId: {
      _id: '661a0e5febec873b54de2ad1',
      nickName: '새코멘트!',
      profileImage: ['https://picsum.photos/200'],
    },
    text: requestData.text,
    deletedAt: null,
    _id: '6622362d30d4656920c08dd',
    createdAt: '2024-04-19T09:15:25.992Z',
  };

  return [200, responseData];
});
mock.onPut(`/api/posts/:_id/d`).reply((config) => {
  // 글 삭제 목 API -> 완전하게 붙일 수 없음.

  const requestData = JSON.parse(config.data);
  console.log('콘솔', { config, requestData });

  const responseData = {
    userId: {
      _id: '661a0e5febec873b54de2ad1',
      nickName: '새코멘트!',
      profileImage: ['https://picsum.photos/200'],
    },
    text: requestData.text,
    deletedAt: null,
    _id: '6622362d30d4656920c08dd',
    createdAt: '2024-04-19T09:15:25.992Z',
  };

  return [200, responseData];
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
  const [post, setPost] = useState<PostData | null>(null);
  const [comments, setComments] = useState<CommentData[] | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 글 수정 모달

  // 댓글 등록 API
  const handleWrittenComment = async (comment: string) => {
    try {
      const response = await axiosInstance.post(`/comments`, {
        postId: '1',
        userId: '2',
        text: comment,
      });

      const newComment = response.data;

      if (comments) {
        setComments([...comments, newComment]);
      } else {
        setComments([newComment]);
      }

      console.log(newComment, '댓글 등록에 성공했습니다');
    } catch (error) {
      console.error(error, '댓글 등록에 실패했습니다');
    }
  };

  // 게시글 & 댓글 조회 API
  useEffect(() => {
    const fetchData = async () => {
      // 게시글
      try {
        const response = await axiosInstance.get(`/posts/postId`);
        const post = response.data;

        // 등록일 formatting
        post.createdAt = formatDateIncludeTime(post.createdAt);
        // console.log('게시글 조회 성공');

        setPost(post);
      } catch (error) {
        // console.error('게시글 조회 실패', error);
      }

      // 댓글
      try {
        const response = await axiosInstance.get(`/comments/postId`);
        const comments = response.data;

        // console.log('댓글 조회 성공');
        setComments(comments);
      } catch (error) {
        // console.error('댓글 조회 실패', error);
      }
    };
    fetchData();
  }, []);

  // 글 수정 버튼 클릭
  const handlePostEdit = () => {
    // // 글 수정 모달 열기 -> 글 수정 모달 만들어진지 확인 후 작업
    // setIsPostModalOpen((prevState) => !prevState);
  };

  // 글 삭제 버튼 클릭
  const handlePostDelete = async () => {
    if (confirm('정말로 글을 삭제하시겠습니까?')) {
      try {
        const response = await axiosInstance.put(`/posts/:_id/d`, {
          postId: '포스트아이디',
          userId: '유저아이디',
        });

        console.log(response);
      } catch (error) {
        console.error(error, '글 삭제에 실패했습니다');
      }
    }
  };

  // 글 수정 모달
  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  // 댓글 수정 버튼 클릭
  // const handleCommentEdit = () => {};

  // 댓글 삭제 버튼 클릭
  // const handleCommentDelete = () => {};

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
          <p>{post?.title}</p>
          <PostOption>
            <LikeAndCommentCount
              likeCount={post?.likedUsers.length}
              commentCount={comments?.length}
            />
            <ActionButton
              buttonBorder="border-solid"
              direction="horizonal"
              onEdit={handleEditClick}
              onDelete={handlePostDelete}
            />
            {isEditModalOpen && (
              <Modal
                title="글 수정하기"
                value="수정"
                component={<PostCreate />}
                onClose={handleCloseEditModal}
              />
            )}
          </PostOption>
        </TitleContainer>
        <InformationContainer>
          <ProfileImg src={post?.userId.profileImage[0]} alt="프로필 이미지" />
          <p>{post?.userId.nickName}</p>
          <p>|</p>
          {post && <p>{formatDateIncludeTime(post.createdAt)}</p>}
        </InformationContainer>
        <ContentContainer>
          <Pre>{post?.content}</Pre>
          <img src={post?.postImage[0]} alt="이미지" />
          <Likes>
            <LuThumbsUp />
            <p>추천해요 {post?.likedUsers.length}</p>
          </Likes>
        </ContentContainer>
        <CommentContainer>
          <CommentWritingBox
            nickname="임시닉네임"
            onClick={handleWrittenComment}
          />
          {comments?.map((comment) => (
            <Comment
              key={comment._id}
              text={comment.text}
              nickname={comment.userId.nickName}
              date={formatDateIncludeTime(comment.createdAt)}
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
