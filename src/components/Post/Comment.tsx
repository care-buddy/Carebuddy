import React from 'react';
import styled from 'styled-components';

import ActionButton from '../common/ActtionButton';

type CommentProps = {
  // 닉네임, userId 둘 다 받아오는게 맞는지 모르겠음. recoil 적용 후 수정 - 임시
  text: string;
  profileImg: string;
  nickname: string;
  date: string;
  // userId: string;
  // commentId: string | null | undefined;
};

const Comment: React.FC<CommentProps> = ({
  text,
  profileImg,
  nickname,
  date,
  // userId,
  // commentId,
}) => (
  <StyledComment>
    <ProfileImg src={profileImg} alt="댓글 프로필 사진" />
    <Container>
      <Div>
      <Info>
        <p>{nickname}</p>
        <UploadedDate>{date}</UploadedDate>
      </Info>
      <ActionButton buttonBorder='border-none' buttonSize='sm' direction='horizonal'/>
      </Div>
      <Content>{text}</Content>
    </Container>
  </StyledComment>
);

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

const ProfileImg = styled.img`
  margin-right: 10px;
`;

// const CommentOptionWrapper = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   flex-grow: 1;

//   & > * {
//     margin: 0 5px;
//     font-size: var(--font-size-sm-1);
//   }
// `;

const Info = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-right: 5px;
  }
`;

// const OnEditComment = styled.textarea`
//   width: 650px;
//   height: 60px;
//   border-color: var(--color-grey-2);
//   margin: 5px 10px 0 0;
//   padding: 5px 5px;
// `;

const Div = styled.div`
display: flex;
justify-content: space-between;
`;