import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import 'react-loading-skeleton/dist/skeleton.css';
import media from '@/utils/media';

const SkeletonFeedBox: React.FC = () => (
  <StyledSkeleton>
    <TopRow>
      <TitleSkeleton />
      <CategoryGroup>
        <CategorySkeleton />
        <CategorySkeleton />
      </CategoryGroup>
    </TopRow>

    <BodySkeleton>
      <LineSkeleton />
      <LineSkeleton width="95%" />
      <LineSkeleton width="85%" />
    </BodySkeleton>

    <BottomRow>
      <ProfileSkeleton circle />
      <TextSkeleton width="8ch" />
    </BottomRow>
  </StyledSkeleton>
);

export default SkeletonFeedBox;

const StyledSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  border: 1px solid var(--color-grey-2);
  padding: 20px;
  margin: 10px 0 20px 0;
  width: 100%;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TitleSkeleton = styled(Skeleton)`
  && {
    min-width: 20ch;
    height: 20px;

    ${media.tablet} {
      max-width: 50ch;
    }

    ${media.mobile} {
      max-width: 34ch;
      font-size: var(--font-size-md-1);
    }
  }
`;

const CategoryGroup = styled.div`
  display: flex;
  gap: 4px;
  margin-left: 8px;

  ${media.mobile} {
    margin-top: 8px;
    margin-left: 0;
  }
`;

const CategorySkeleton = styled(Skeleton)`
  && {
    width: 60px;
    height: 16px;
  }
`;

const BodySkeleton = styled.div`
  margin: 20px 0 12px 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const LineSkeleton = styled(Skeleton)<{ $width?: string }>`
  && {
    width: ${(props) => props.$width || '100%'};
    height: 14px;

    ${media.mobile} {
      width: 90%;
    }
  }
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
`;

const ProfileSkeleton = styled(Skeleton)`
  && {
    width: 24px;
    height: 24px;
  }
`;

const TextSkeleton = styled(Skeleton)<{ width: string }>`
  && {
    height: 14px;
    width: ${(props) => props.width};
  }
`;
