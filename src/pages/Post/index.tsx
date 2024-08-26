// 임시 - 남은 작업: 추천 API, 댓글 등록 API(백엔드 작업 완료 이후) / 글과 댓글 작성자가 본인일때만 수정, 삭제버튼 보이도록(recoil 적용 이후) / postCreate모달 수정(글 작성이 아니라 수정일 때는 카테고리 변경 불가능하도록)
// 리팩토링 가능: 글 관련 API, 댓글 관련 API 커스텀 훅으로 분리

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import TopBar from '@/components/common/TopBar';
import Comment from '@/components/Post/Comment';
import Loading from '@/components/common/Loading';
import PostCreate from '@/pages/PostCreate/index';
import Modal from '@/components/common/Modal/index';
import ActionButton from '@/components/common/ActtionButton';
import CommentWritingBox from '@/components/Post/CommentWritingBox';
import LikeAndCommentCount from '@/components/Post/LikesAndCommentCount';

import { LuThumbsUp, LuChevronLeft } from 'react-icons/lu';

import formatDateIncludeTime from '@/utils/formatDateIncludeTime';

import axiosInstance from '@/utils/axiosInstance';

import type { PostData, CommentData } from '@constants/tempInterface';

interface FormData {
  title: string;
  content: string;
  communityId: string;
  postImage: string[];
}

const Post: React.FC = () => {
  const [post, setPost] = useState<PostData | null>(null); // 게시글
  const [comments, setComments] = useState<CommentData[] | null>(null); // 댓글
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 글 수정 모달

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    communityId: '',
    postImage: [],
  });

  const { postId } = useParams();

  // 게시글 & 댓글 조회 API
  useEffect(() => {
    const fetchData = async () => {
      // 게시글
      try {
        setLoading(true);
        const response = await axiosInstance.get(`post/${postId}`);
        const post = response.data.message;

        // 등록일 formatting
        post.createdAt = formatDateIncludeTime(post.createdAt);

        setPost(post[0]);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 게시글 조회 완료 시 글 수정 모달용 formData 채우고 댓글 상태 업데이트
  useEffect(() => {
    // 댓글
    if (post !== null) {
      const comment = post.commentId.filter(
        (commentId) => commentId.deletedAt === null
      );
      setComments(comment);
    }

    // 글 수정용 formData
    setFormData({
      title: post?.title || '',
      content: post?.content || '',
      communityId: post?.communityId._id || '',
      postImage: post?.postImage || [],
    });
  }, [post]);

  // 글 수정 모달 내용 수정 핸들러
  const handleFormDataChange = (data: {
    title?: string;
    content?: string;
    postImage?: string[];
  }) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  // 글 수정 API
  const handleEditPostSubmit = async () => {
    try {
      setLoading(true);
      await axiosInstance.put(`post/${postId}`, formData);
      alert('게시글 수정 완료');
      setIsEditModalOpen((prevState) => !prevState);
      if (post) {
        setPost({
          ...post,
          title: formData.title,
          content: formData.content,
          postImage: formData.postImage,
        });
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  // 댓글 등록 API 미완성, 임시 - 백엔드 코드 수정 필요
  const handleWrittenComment = async (comment: string) => {
    try {
      setLoading(true);
      if (comment !== '' && comment !== null) {
        const response = await axiosInstance.post(`comments`, {
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
      } else {
        alert('댓글 내용을 입력해주세요.');
      }
    } catch (error) {
      // setError(error as Error);
      console.error(error);
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
      }
    }
  };

  // 글 수정 모달
  const handleEditClick = (value: boolean) => {
    setIsEditModalOpen(value);
  };

  if (isLoading) return <Loading />;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
              onEdit={() => handleEditClick(true)}
              onDelete={handlePostDelete}
            />
            {isEditModalOpen && (
              <Modal
                title="글 수정하기"
                value="수정"
                component={
                  <PostCreate
                    formData={formData}
                    onFormDataChange={handleFormDataChange}
                  />
                }
                onClose={() => handleEditClick(false)}
                onHandleClick={handleEditPostSubmit}
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
          {post?.postImage && post.postImage.length > 0 && (
            <img src={post.postImage[0]} alt="이미지" />
          )}
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
              commentId={comment._id}
              text={comment.text}
              nickname={comment.userId.nickName}
              date={formatDateIncludeTime(comment.createdAt)}
              profileImg={comment.userId.profileImage}
              onEdit={handleCommentEdit}
              onDelete={handleCommentDelete}
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
