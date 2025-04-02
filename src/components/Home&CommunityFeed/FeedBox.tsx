import React, { useState, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import LikeAndCommentCount from '@components/Post/LikesAndCommentCount';
import CommunityCategory from '@components/GlobalSearch/CommunityCategory';
import formatDate from '@/utils/formatDate';
import processedContentForFeedBox from '@/utils/processedContentForFeedBox';
import media from '@/utils/media';

type FeedBoxProps = {
  postId: string;
  title: string;
  content: string;
  profileSrc: string;
  nickname: string;
  uploadedDate: Date;
  communityName?: string;
  communityCategory?: string;
  likeCount?: number;
  commentCount?: number;
};

const FeedBox = React.forwardRef<HTMLDivElement, FeedBoxProps>(
  (
    {
      title,
      content,
      profileSrc,
      nickname,
      uploadedDate,
      postId,
      communityName,
      communityCategory,
      likeCount,
      commentCount,
    },
    ref
  ) => {
    const [isContentVisible, setContentVisible] = useState(false); // 내용 표시 여부
    const boxRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => boxRef.current!);

    const processedContent = processedContentForFeedBox(content);
    const formattedDate = formatDate(uploadedDate);

    return (
      <StyledFeedBox ref={boxRef}>
        <Container to={`/post/${postId}`}>
          <TitleContainer>
            <LeftContainer>
              <Title>{title}</Title>
              {communityName && (
                <div>
                  <CommunityCategory>{communityName}</CommunityCategory>
                  <CommunityCategory>{communityCategory}</CommunityCategory>
                </div>
              )}
            </LeftContainer>
          </TitleContainer>
          <Content>
            {isContentVisible
              ? processedContent
              : `${processedContent.slice(0, 100)}...`}
            <MoreSpan onClick={() => setContentVisible(!isContentVisible)}>
              {isContentVisible ? '접기' : '더보기'}
            </MoreSpan>
          </Content>
          <ProfileContainer>
            <ProfileImg src={profileSrc} alt="프로필 이미지" />
            <p>{nickname}</p>
            <p>|</p>
            <p>{formattedDate}</p>
            <LikeAndCommentCount
              likeCount={likeCount}
              commentCount={commentCount}
            />
          </ProfileContainer>
        </Container>
      </StyledFeedBox>
    );
  }
);

export default FeedBox;

const StyledFeedBox = styled.div`
  display: flex;
  border-radius: 12px;
  border: solid 1px var(--color-grey-2);
  height: auto;
  padding: 20px;
  margin: 10px 0 20px 0;
  width: 100%;
`;

const Container = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  cursor: pointer;
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;

  > div {
    display: flex;
    align-items: center;

    & > * {
      margin-right: 4px;
    }
  }

  ${media.onlyTablet} {
    flex-direction: column;
    align-items: flex-start;

    > div {
      display: flex;
      align-items: center;
      margin-top: 8px;
    }
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-grey-1);
  font-size: var(--font-size-sm-1);
  border-top: 1px solid var(--color-grey-2);
  padding-top: 12px;

  p {
    margin: 0 4px;
  }

  position: relative;
`;

const ProfileImg = styled.img`
  height: 24px;
  width: 24px;
  border-radius: 50%;
`;

const Title = styled.p`
  color: var(--color-green-main);
  font-size: var(--font-size-md-2);
  font-weight: var(--font-weight-bold);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 8px;
  transition: all 0.3s;

  &:hover {
    color: #567760;
  }

  ${media.tablet} {
    max-width: 50ch;
  }

  ${media.mobile} {
    font-size: var(--font-size-md-1);
  }
`;

const Content = styled.pre`
  margin: 20px 0 12px 0;
  color: var(--color-grey-1);
  white-space: pre-wrap;
  line-height: 1.4;
  font-size: var(--font-size-ft-1);
`;

const MoreSpan = styled.span`
  color: var(--color-blue);
  font-size: var(--font-size-sm-1);
  cursor: pointer;
`;
