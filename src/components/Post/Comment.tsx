import React, { useState } from 'react';
import styled from 'styled-components';

import LinkButton from '@/components/common/LinkButton';
import ActionButton from '@/components/common/ActtionButton';

import useDebounce from '@hooks/useDebounce';

type CommentProps = {
  // 닉네임, userId 둘 다 받아오는게 맞는지 모르겠음. recoil 적용 후 수정 - 임시
  text: string;
  profileImg: string;
  nickname: string;
  date: string;
  // onEdit: () => void;
  // onDelete: () => void;
  // userId: string;
  // commentId: string | null | undefined;
};

const Comment: React.FC<CommentProps> = ({
  text,
  profileImg,
  nickname,
  date,
  // onEdit,
  // onDelete,
  // userId,
  // commentId,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingComment, setEditingComment] = useState<string | null>(null);

  // 디바운싱 사용하여 작성중인 코멘트 업데이트
  const handleUpdateComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // debouncedSetEditingComment(e.target.value);
  };

  const handleButtonClick = () => {
    // onClick(comment);
  };

  // 댓글 수정 버튼 클릭
  const handleCommentEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  // 댓글 삭제 버튼 클릭
  const handleCommentDelete = () => {
    console.log('삭제 버튼 클릭');
  };

  return (
    <StyledComment>
      <ProfileImg src={profileImg} alt="댓글 프로필 사진" />
      <Container>
        <Div>
          <Info>
            <p>{nickname}</p>
            <UploadedDate>{date}</UploadedDate>
          </Info>
          <ActionButton
            buttonBorder="border-none"
            buttonSize="sm"
            direction="horizonal"
            onEdit={handleCommentEdit}
            onDelete={handleCommentDelete}
          />
        </Div>
        {!isEditing && <Content>{text}</Content>}
        {isEditing && (
          <>
            <EditContent onChange={handleUpdateComment}>{text}</EditContent>
            <ButtonContainer>
              <LinkButton linkSize="sm" onClick={handleCommentEdit}>
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
  padding: 2px;
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

  p {
    margin-right: 5px;
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
`;
