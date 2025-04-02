import React from 'react';
import styled from 'styled-components';

// 아이콘
import { LuThumbsUp, LuMessageSquare } from 'react-icons/lu';
import media from '@/utils/media';

type LikeAndCommentCountProps = {
  likeCount?: number | undefined; // 임시 물음표
  commentCount: number | undefined;
  // postId: string | null | undefined; // 임시. 사용안할지도?
};

const LikeAndCommentCount: React.FC<LikeAndCommentCountProps> = ({
  likeCount,
  commentCount,
}) => (
  <StyledLikeAndCommentCount className="like">
    <LuThumbsUp />
    <p className="likeCount">{likeCount}</p>
    <LuMessageSquare />
    <p className="commentCount">{commentCount}</p>
  </StyledLikeAndCommentCount>
);

export default LikeAndCommentCount;

const StyledLikeAndCommentCount = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 1.625rem;
  background-color: var(--color-beige-main);
  border-radius: 4px;
  padding: 4px 8px;
  color: var(--color-black);

  position: absolute;
  right: 0;

  p {
    font-size: var(--font-size-ft-1);
    &.likeCount {
      margin-right: 6px;
    }
    &.commentCount {
      margin-right: 0;
    }
  }

  svg {
    height: var(--font-size-ft-1);
    width: var(--font-size-ft-1);
  }

  ${media.tablet} {
  }
`;
