import React, { useState, useEffect, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import LikeAndCommentCount from '@components/Post/LikesAndCommentCount';
import CommunityCategory from '@components/GlobalSearch/CommunityCategory';

import formatDate from '@/utils/formatDate';
import processedContentForFeedBox from '@/utils/processedContentForFeedBox';

type FeedBoxProps = {
  postId: string;
  title: string;
  content: string;
  profileSrc: string;
  nickname: string;
  uploadedDate: string;
  communityName?: string;
  communityCategory?: string;
  likeCount?: number;
  commentCount?: number;
};

// React.FC대신 React.forwardRef 사용(ref 사용을 위해 두 개의 인자를 넘기기 위함)
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
    const [isSearchResult, setIsSearchResult] = useState(false); // global-search 결과
    const boxRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => boxRef.current!); // !을 통해 명시적으로 null이 아닐 것이라고 알림

    useEffect(() => {
      if (communityName) {
        setIsSearchResult(true);
      } else {
        setIsSearchResult(false);
      }
    }, [communityName]);

    const processedContent = processedContentForFeedBox(content);
    const formattedDate = formatDate(uploadedDate);

    return (
      <StyledFeedBox ref={boxRef}>
        <Container to={`/post/${postId}`}>
          <TitleContainer>
            <LeftContainer>
              <Title>{title}</Title>
              {isSearchResult && (
                <>
                  <CommunityCategory>{communityName}</CommunityCategory>
                  <CommunityCategory>{communityCategory}</CommunityCategory>
                </>
              )}
            </LeftContainer>
            <LikeAndCommentCount
              likeCount={likeCount}
              commentCount={commentCount}
            />
          </TitleContainer>
          <Content>
            {processedContent}
            <MoreSpan>... 더보기</MoreSpan>
          </Content>
          <ProfileContainer>
            <ProfileImg src={profileSrc} alt="프로필 이미지" />
            <p>{nickname}</p>
            <p>|</p>
            <p>{formattedDate}</p>
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
`;

const Container = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  cursor: pointer;
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

  & > * {
    margin-right: 4px;
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
`;
