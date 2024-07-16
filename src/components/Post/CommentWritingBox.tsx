import React from 'react';
import styled from 'styled-components';

// 컴포넌트
import Button from '../common/Button';
import LinkButton from '../common/LinkButton';

type CommentWritingBoxProps = {
  nickname: string;
  // onClick?: () => void; // 임시. 나중에 필수값으로 변경
};

const CommentWritingBox: React.FC<CommentWritingBoxProps> = ({
  nickname,
  // onClick,
}) => (
  <StyledCommentWritingBox>
    <Nickname>{nickname}</Nickname>
    <CommentBox
      // value={}
      placeholder="댓글 내용을 입력하세요..."
    />
    <ButtonContainer>
      <LinkButton linkSize="sm" href="temp">
        등록하기
      </LinkButton>
    </ButtonContainer>
  </StyledCommentWritingBox>
);

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
  margin-bottom: 5px;
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
