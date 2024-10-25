import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import TopBar from '@/components/common/TopBar';
import Comment from '@/components/Post/Comment';
import Loading from '@/components/common/Loading';
import PostCreate from '@/pages/PostCreate/index';
import Modal from '@/components/common/Modal/index';
import ActionButton from '@/components/common/ActionButton';
import CommentWritingBox from '@/components/Post/CommentWritingBox';
import LikeAndCommentCount from '@/components/Post/LikesAndCommentCount';

import { LuThumbsUp, LuChevronLeft } from 'react-icons/lu';

import formatDateIncludeTime from '@/utils/formatDateIncludeTime';

import axiosInstance from '@/utils/axiosInstance';

import userState from '@/recoil/atoms/userState';

import type { CommentData, PostData } from '@/types';

import DEFAULT_PROFILE from '@/assets/person.png';
import usePostCreate from '@/hooks/usePostCreate';
import sortedByCreatedAt from '@/utils/sortedByCreatedAt';

interface FormData {
  title: string;
  content: string;
  communityId: {
    _id: string;
    category: string | number;
    community: string;
    deletedAt: string;
  };
  postImage: string | null;
}

const Post: React.FC = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState<PostData | null>(null); // 게시글
  const [comments, setComments] = useState<CommentData[] | null>(null); // 댓글
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 글 수정 모달

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [, setFormData] = useState<FormData>({
    title: '',
    content: '',
    communityId: { _id: '', category: '', community: '', deletedAt: '' },
    postImage: null,
  });

  const { postId } = useParams();

  const user = useRecoilValue(userState);

  const [likedUsers, setLikedUsers] = useState<string[]>([]);
  const [isLiked, setIsLiked] = useState(false); // 좋아요 여부 상태

  const fetchData = async () => {
    // 게시글
    try {
      setLoading(true);
      const response = await axiosInstance.get(`posts/${postId}`);
      const post = response.data.data[0];

      // 등록일 formatting
      post.createdAt = formatDateIncludeTime(post.createdAt);

      setPost(post);

      setLikedUsers(post.likedUsers);

      const commentData = post.commentId;
      // 댓글

      if (Array.isArray(commentData)) {
        const sortedPosts: CommentData[] = sortedByCreatedAt(commentData);
        const validComments = sortedPosts.filter(
          (comment: CommentData) => comment.deletedAt === null
        );

        setComments(validComments);
      } else {
        setComments([]);
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  // 게시글 & 댓글 조회 API
  useEffect(() => {
    fetchData();
  }, []);

  // 게시글 조회 완료 시 글 수정 모달용 formData 채우기
  useEffect(() => {
    // 글 수정용 formData
    setFormData({
      title: post?.title || '',
      content: post?.content || '',
      communityId: {
        _id: post?.communityId?._id || '',
        category: post?.communityId?.category || '',
        community: post?.communityId?.community || '',
        deletedAt: post?.communityId?.deletedAt || '',
      },
      postImage: post?.postImage || null,
    });
  }, [post]);

  const { handleFormDataChange, handleEditPostSubmit } = usePostCreate(() => {
    handleEditClick(false);
    fetchData();
  });

  // 댓글 등록 API
  const handleWrittenComment = async (comment: string) => {
    try {
      setLoading(true);
      if (comment !== '' && comment !== null) {
        const response = await axiosInstance.post(`comments`, {
          postId,
          userId: user?._id,
          text: comment,
        });
        const newComment = response.data;
        console.log('새 comment 데이터', newComment)

        setComments((prevComments) =>
          prevComments ? [...prevComments, newComment] : [newComment]
        );

        fetchData();
      } else {
        alert('댓글 내용을 입력해주세요.');
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  // 댓글 수정 API
  const handleCommentEdit = async (
    editingComment: string,
    commentId: string
  ) => {
    try {
      setLoading(true);
      // API 전송
      await axiosInstance.put(`comments/${commentId}`, {
        text: editingComment,
      });

      // 수정된 댓글 내용 setComments 배열에 넣기
      setComments((prevComments) => {
        if (prevComments === null) {
          // prevComments가 null이면 바로 반환(오류 방지용)
          return prevComments;
        }

        // prevComments가 null이 아닌 경우 map을 사용하여 수정된 댓글 반영
        return prevComments.map((comment) =>
          comment._id === commentId
            ? { ...comment, text: editingComment }
            : comment
        );
      });
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  // 댓글 삭제 API
  const handleCommentDelete = async (commentId: string) => {
    try {
      setLoading(true);
      // 댓글 삭제 API 전송
      await axiosInstance.put(`comments/${commentId}/d`);

      // comments 배열에서 댓글 삭제
      setComments((prevComments) => {
        if (prevComments === null) {
          // prevComments가 null이면 바로 반환(오류 방지용)
          return prevComments;
        }

        // prevComments에서 commentId와 일치하지 않는 댓글만 남김
        return prevComments.filter((comment) => comment._id !== commentId);
      });
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  // 글 삭제 버튼 클릭
  const handlePostDelete = async () => {
    if (confirm('정말로 글을 삭제하시겠습니까?')) {
      try {
        setLoading(true);
        await axiosInstance.put(`/posts/${postId}/d`);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
        navigate(`/community-feed/${post?.communityId._id}`);
      }
    }
  };

  // 글 수정 모달
  const handleEditClick = (value: boolean) => {
    setIsEditModalOpen(value);
  };

  // 추천해요 누르기
  const handleLikesClick = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.put(`/posts/${post?._id}/like`, {
        userId: user?._id,
      });

      setLikedUsers(response.data.data);
      setLikedUsers(response.data.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setComments(comments);
  }, [comments]);

  useEffect(() => {
    setIsLiked(
      user?._id && likedUsers.length > 0 ? likedUsers.includes(user._id) : false
    );
  }, [likedUsers, user?._id]);

  if (isLoading) return <Loading />;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleListButton = () => {
    navigate(`/community-feed/${post?.communityId._id}`); // 이동할 경로 설정 (예: '/posts')
  };

  const handleNicknameClick = () => {
    navigate(`/userpage/${post?.userId._id}`);
  };

  return (
    <>
      <TopBar
        category="커뮤니티"
        title={post?.communityId.community}
        communityCategory={
          post?.communityId.category === 0 ? '강아지' : '고양이'
        }
      />
      <Container>
        <PostListButtonContainer onClick={handleListButton}>
          <LuChevronLeft />
          <p>글 목록 보기</p>
        </PostListButtonContainer>
        <TitleContainer>
          <p>{post?.title}</p>
          <PostOption>
            <LikeAndCommentCount
              likeCount={likedUsers.length}
              commentCount={comments?.length}
            />
            {post?.userId._id === user?._id ? (
              <ActionButton
                buttonBorder="border-solid"
                direction="horizonal"
                onEdit={() => handleEditClick(true)}
                onDelete={handlePostDelete}
              />
            ) : (
              <div />
            )}
            {isEditModalOpen && (
              <Modal
                title="글 수정하기"
                value="수정"
                component={
                  <PostCreate
                    categoryForEdit={Number(post?.communityId?.category)}
                    communityLabelForEdit={post?.communityId?.community}
                    postData={post}
                    onFormDataChange={handleFormDataChange}
                  />
                }
                onClose={() => handleEditClick(false)}
                onHandleClick={() => handleEditPostSubmit(postId)}
              />
            )}
          </PostOption>
        </TitleContainer>
        <InformationContainer>
          <ProfileImg
            src={post?.userId?.profileImage || DEFAULT_PROFILE}
            alt="프로필 이미지"
          />
          <Nickname onClick={handleNicknameClick}>
            {post?.userId?.nickName || '알수없는 닉네임(임시)'}
          </Nickname>
          <p>|</p>
          {post && <p>{formatDateIncludeTime(String(post.createdAt))}</p>}
        </InformationContainer>
        {/* 이미지 */}
        <ContentContainer>
          <Pre>{post?.content}</Pre>
          {post?.postImage ? (
            <img src={post?.postImage} alt="이미지" />
          ) : (
            <div />
          )}
          <Likes isLiked={isLiked} onClick={() => handleLikesClick()}>
            <LuThumbsUp />
            <p>추천해요 {likedUsers.length}</p>
          </Likes>
        </ContentContainer>
        <CommentContainer>
          <CommentWritingBox
            nickname={user?.nickName || '알수없는 닉네임(임시)'}
            onClick={handleWrittenComment}
          />
          {comments?.map((comment) => (
            <Comment
              userId={comment.userId?._id}
              key={comment._id}
              commentId={comment._id}
              text={comment.text}
              nickName={comment.userId.nickName}
              date={formatDateIncludeTime(comment.createdAt)}
              profileImg={comment.userId?.profileImage}
              onEdit={handleCommentEdit}
              onDelete={handleCommentDelete}
              userId={comment.userId?._id}
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
  cursor: pointer;
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

const Likes = styled.div<{ isLiked: boolean }>`
  display: flex;
  color: ${({ isLiked }) =>
    isLiked ? 'var( --color-green-main)' : 'var(--color-grey-1)'};
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

const Nickname = styled.p`
  cursor: pointer;
`;
