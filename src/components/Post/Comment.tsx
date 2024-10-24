import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import the hook

import LinkButton from '@/components/common/LinkButton';
import ActionButton from '@/components/common/ActionButton';

import useDebounce from '@hooks/useDebounce';

import personProfile from '@/assets/person.png';

type CommentProps = {
  text: string;
  profileImg?: string;
  nickName?: string;
  date: string;
  onEdit: (comment: string, commentId: string) => void;
  onDelete: (commentId: string) => void;
  commentId: string;
  userId: string;
};

const Comment: React.FC<CommentProps> = ({
  text,
  profileImg,
  nickName,
  date,
  onEdit,
  onDelete,
  commentId,
  userId,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingComment, setEditingComment] = useState<string | null>(null);

  const debouncedSetEditingComment = useDebounce(300, setEditingComment);
  const navigate = useNavigate();

  const handleUpdateComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    debouncedSetEditingComment(e.target.value);
  };

  const handleButtonClick = () => {
    setIsEditing((prevState) => !prevState);
    if (editingComment) onEdit(editingComment, commentId);
  };

  const handleCommentDelete = () => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      onDelete(commentId);
    }
  };

  const handleNicknameClick = () => {
    navigate(`/userpage/${userId}`);
  };

  const imgSrc = profileImg && profileImg.length > 0 ? profileImg[0] : personProfile;

  return (
    <StyledComment>
      <ProfileImg src={imgSrc ?? personProfile} alt="댓글 프로필 사진" />
      <Container>
        <Div>
          <Info>
            <Nickname onClick={handleNicknameClick}>{nickName}</Nickname>
            <UploadedDate>{date}</UploadedDate>
          </Info>
          <ActionButton
            buttonBorder="border-none"
            buttonSize="sm"
            direction="horizonal"
            onEdit={handleButtonClick}
            onDelete={handleCommentDelete}
          />
        </Div>
        {!isEditing && <Content>{text}</Content>}
        {isEditing && (
          <>
            <EditContent onChange={handleUpdateComment}>{text}</EditContent>
            <ButtonContainer>
              <LinkButton linkSize="sm" onClick={handleButtonClick}>
                수정하기
              </LinkButton>
            </ButtonContainer>
          </>
        )}
      </Container>
    </StyledComment>
  );
};

export default Comment;

const StyledComment = styled.div`
  display: flex;
  margin-top: 12px;
  padding: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const UploadedDate = styled.pre`
  font-size: var(--font-size-ft-1);
  color: var(--color-grey-1);
  white-space: pre-wrap;
`;

const Content = styled.pre`
  line-height: 1.3;
  font-size: var(--font-size-ft-1);
  margin: 10px 0;
  white-space: pre-wrap;
`;

const EditContent = styled.textarea`
  line-height: 1.3;
  font-size: var(--font-size-ft-1);
  margin: 10px 0 4px 0;
  height: 70px;
  resize: none;
  outline: none;
  padding: 4px;
  border: 1px solid var(--color-grey-2);
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ProfileImg = styled.img`
  margin-right: 10px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const Nickname = styled.p`
  margin-right: 5px;
  cursor: pointer;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
`;
