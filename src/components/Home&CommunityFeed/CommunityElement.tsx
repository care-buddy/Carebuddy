import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type CommunityElementProps = {
  name: string;
  introduction: string;
  communityId: string;
  memberCount?: number;
};

const CommunityElement: React.FC<CommunityElementProps> = ({
  name,
  introduction,
  communityId,
  // memberCount,
}) => (
  <StyledCommunityListSidebar to={`community-feed/${communityId}`}>
    <Name>{name}</Name>
    <Introduction>{introduction}</Introduction>
    {/* <MemberCount>{memberCount}명의 멤버</MemberCount> */}
  </StyledCommunityListSidebar>
);

export default CommunityElement;

const StyledCommunityListSidebar = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: auto;
  padding: 20px 0;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  p {
    margin: 7px 0;
  }
`;

const Name = styled.p`
  font-size: var(--font-size-md-1);
  font-weight: var(--font-weight-bold);
`;

const Introduction = styled.p`
  color: var(--color-grey-1);
  font-size: var(--font-size-sm-1);
  font-weight: var(--font-weight-regular);
  line-height: 1.2rem;
  white-space: pre-wrap;
`;

const MemberCount = styled.p`
  color: var(--color-grey-1);
  font-size: var(--font-size-ft-1);
  font-weight: var(--font-weight-regular);
`;
