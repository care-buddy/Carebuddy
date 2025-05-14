import React from 'react';
import styled from 'styled-components';
import 'react-loading-skeleton/dist/skeleton.css';
import media from '@/utils/media';
import Skeleton from 'react-loading-skeleton';
import { Hr, P } from './SidePanel';

const SkeletonSidePanel: React.FC = () => (
  <StyledSkeleton>
    <P>추천 커뮤니티</P>
    {[0, 1, 2].map((_, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <React.Fragment key={idx}>
        <BodySkeleton>
          <TitleSkeleton width="40%" />
          <LineSkeleton />
          <LineSkeleton width="85%" />
        </BodySkeleton>
        {idx < 2 && <Hr />}
      </React.Fragment>
    ))}
  </StyledSkeleton>
);

export default SkeletonSidePanel;

const StyledSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  border: solid 1px var(--color-grey-2);
  padding: 24px 20px;
  text-decoration: none; // 임시, link 들어갈 가능성 있어서 미리 추가

  ${media.tablet} {
    margin-top: 44px;
  }

  ${media.mobile} {
    display: none;
  }
`;

const BodySkeleton = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 34px;
`;

const TitleSkeleton = styled(Skeleton)<{ $width?: string }>`
  && {
    width: ${(props) => props.$width || '100%'};
    height: 1rem;

    margin: 7px 0 14px 0;
    ${media.mobile} {
      width: 90%;
    }
  }
`;
const LineSkeleton = styled(Skeleton)<{ $width?: string }>`
  && {
    width: ${(props) => props.$width || '100%'};
    height: 12px;
    padding: 6px 0;
    ${media.mobile} {
      width: 90%;
    }
  }
`;
