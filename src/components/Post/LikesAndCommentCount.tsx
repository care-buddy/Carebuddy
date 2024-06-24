import React from "react";
import styled from "styled-components";

// 아이콘
import { LuThumbsUp, LuMessageSquare } from 'react-icons/lu';

type LikeAndCommentCountProps = {
  likeCount: number;
  commentCount: number;
  // postId: string | null | undefined; // 임시. 사용안할지도?
};

const LikeAndCommentCount: React.FC<LikeAndCommentCountProps> = ({
  likeCount,
  commentCount,
}) => (
  <StyledLikeAndCommentCount>
    <LuThumbsUp />
    <p>{likeCount}</p>
    <LuMessageSquare />
    <p>{commentCount}</p>
  </StyledLikeAndCommentCount>
);

export default LikeAndCommentCount;

const StyledLikeAndCommentCount = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  height: 32px;
  background-color: var(--color-beige-main);
  border-radius: 4px;
  padding: 5px 16px;

  p {
    font-size: var(--font-size-ft-1);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;