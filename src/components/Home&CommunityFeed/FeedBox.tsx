// import React, { useState, useEffect, forwardRef } from 'react';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';

// import LikeAndCommentCount from '@components/Post/LikesAndCommentCount';
// import CommunityCategory from '@components/GlobalSearch/CommunityCategory';

// import formatDate from '@/utils/formatDate';
// import processedContentForFeedBox from '@/utils/processedContentForFeedBox';

// type FeedBoxProps = {
//   postId: string;
//   title: string;
//   content: string;
//   profileSrc: string;
//   nickname: string;
//   uploadedDate: string;
//   communityName?: string;
//   communityCategory?: string;
//   likeCount?: number;
//   commentCount?: number;
//   // ref?: React.Ref<HTMLDivElement> | null; // Div요소 or null
// };

// const FeedBox: React.FC<FeedBoxProps> = forwardRef<HTMLDivElement, FeedBoxProps>(({
//   title,
//   content,
//   profileSrc,
//   nickname,
//   uploadedDate,
//   postId,
//   communityName,
//   communityCategory,
//   likeCount,
//   commentCount
// }, ref) => {
//   // 커뮤니티일 때만 설정
//   const [isSearchResult, setIsSearchResult] = useState(false);

//   useEffect(() => {
//     if (communityName) {
//       setIsSearchResult(true);
//     } else {
//       setIsSearchResult(false);
//     }
//   }, [communityName]);

//   const processedContent = processedContentForFeedBox(content); // content 글자 잘라서 보여주기
//   const formattedDate = formatDate(uploadedDate); // 시간 제외하고 날짜만 보여주기

//   return (
//     <StyledFeedBox ref={ref}>
//       <Container to={`/post/${postId}`}>
//         <TitleContainer>
//           <LeftContainer>
//             <Title>{title}</Title>
//             {isSearchResult && (
//               <>
//                 <CommunityCategory>{communityName}</CommunityCategory>
//                 <CommunityCategory>{communityCategory}</CommunityCategory>
//               </>
//             )}
//           </LeftContainer>
//           <LikeAndCommentCount
//             likeCount={likeCount}
//             commentCount={commentCount}
//           />
//         </TitleContainer>
//         <Content>
//           {processedContent}
//           <MoreSpan>... 더보기</MoreSpan>
//         </Content>
//         <ProfileContainer>
//           <ProfileImg src={profileSrc} alt="프로필 이미지" />
//           <p>{nickname}</p>
//           <p>|</p>
//           <p>{formattedDate}</p>
//         </ProfileContainer>
//       </Container>
//     </StyledFeedBox>
//   );
// });

// export default FeedBox;

// const StyledFeedBox = styled.div`
//   display: flex;
//   border-radius: 12px;
//   border: solid 1px var(--color-grey-2);
//   height: auto;
//   padding: 20px;
//   margin: 10px 0 20px 0;
// `;

// const Container = styled(Link)`
//   display: flex;
//   flex-direction: column;
//   text-decoration: none;
//   cursor: pointer;
// `;

// const TitleContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   width: 100%;
//   align-items: center;
// `;

// const LeftContainer = styled.div`
//   display: flex;
//   align-items: center;

//   & > * {
//     margin-right: 4px;
//   }
// `;

// const ProfileContainer = styled.div`
//   display: flex;
//   align-items: center;
//   color: var(--color-grey-1);
//   font-size: var(--font-size-sm-1);
//   border-top: 1px solid var(--color-grey-2);
//   padding-top: 12px;

//   p {
//     margin: 0 4px;
//   }
// `;

// const ProfileImg = styled.img`
//   height: 24px;
//   width: 24px;
//   border-radius: 50%;
// `;

// const Title = styled.p`
//   color: var(--color-green-main);
//   font-size: var(--font-size-md-2);
//   font-weight: var(--font-weight-bold);
// `;

// const Content = styled.pre`
//   margin: 20px 0 12px 0;
//   color: var(--color-grey-1);
//   white-space: pre-wrap;
//   line-height: 1.4;
//   font-size: var(--font-size-ft-1);
// `;

// const MoreSpan = styled.span`
//   color: var(--color-blue);
//   font-size: var(--font-size-sm-1);
// `;

import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
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

const FeedBox: React.FC<FeedBoxProps> = forwardRef<HTMLDivElement, FeedBoxProps>(({
  title,
  content,
  profileSrc,
  nickname,
  uploadedDate,
  postId,
  communityName,
  communityCategory,
  likeCount,
  commentCount
}, ref) => {
  const [isSearchResult, setIsSearchResult] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (communityName) {
      setIsSearchResult(true);
    } else {
      setIsSearchResult(false);
    }
  }, [communityName]);

  useImperativeHandle(ref, () => boxRef.current!);

  const processedContent = processedContentForFeedBox(content);
  const formattedDate = formatDate(uploadedDate, '-');

  return (
    <StyledFeedBox ref={boxRef} hasRef={!!ref}>
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
});

export default FeedBox;

const StyledFeedBox = styled.div<{ hasRef: boolean }>`
  display: flex;
  border-radius: 12px;
  border: solid 1px var(--color-grey-2);
  height: auto;
  padding: 20px;
  margin: 10px 0 20px 0;
  background-color: ${({ hasRef }) => hasRef ? 'yellow' : 'transparent'};
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