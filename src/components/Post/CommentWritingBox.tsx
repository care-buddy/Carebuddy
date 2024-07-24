import React, { useState } from 'react';
import styled from 'styled-components';

import LinkButton from '@components/common/LinkButton';

import useDebounce from '@hooks/useDebounce';

type CommentWritingBoxProps = {
  nickname: string;
  onClick: (value: string) => void;
};

const CommentWritingBox: React.FC<CommentWritingBoxProps> = ({
  nickname,
  onClick,
}) => {
  const [comment, setComment] = useState<string>('');

  const debouncedSetComment = useDebounce(300, setComment);

  // 디바운싱 사용하여 작성중인 코멘트 업데이트
  const handleUpdateComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    debouncedSetComment(e.target.value);
  };

  const handleButtonClick = () => {
    onClick(comment);
  };

  return (
    <StyledCommentWritingBox>
      <Nickname>{nickname}</Nickname>
      <CommentBox
        placeholder="댓글 내용을 입력하세요..."
        onChange={handleUpdateComment}
      />
      <ButtonContainer>
        <LinkButton linkSize="sm" onClick={handleButtonClick}>
          등록하기
        </LinkButton>
      </ButtonContainer>
    </StyledCommentWritingBox>
  );
};
export default CommentWritingBox;

const StyledCommentWritingBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-grey-2);
  border-radius: 10px;
  padding: 16px 16px;
  position: relative;
  min-height: 120px;
  height: auto;
  margin: 20px 0;
  box-sizing: border-box;
`;

const Nickname = styled.p`
  margin-bottom: 10px;
`;

const CommentBox = styled.textarea`
  height: 70px;
  border: none;
  resize: none;
  outline: none;
`;

const ButtonContainer = styled.div`
  font-size: var(--font-size-ft-1);
  margin-top: 10px;
  position: absolute;
  top: 80px;
  left: 650px;
`;
