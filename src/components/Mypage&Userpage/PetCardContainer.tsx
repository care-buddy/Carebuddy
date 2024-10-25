import styled from 'styled-components';
import React from 'react';
import PetProfiles from '@/pages/Diary/PetProfiles';

import { IProfilesWrapperProps } from '@/types';

const Container = styled.div`
  margin: 30px 0 30px 0;
`;

const PetCardContainer: React.FC<IProfilesWrapperProps> = ({
  buddies,
  isMe,
}) => (
  <Container>
    {buddies &&
    buddies.filter((buddy) => buddy.deletedAt === null).length > 0 ? (
      <PetProfiles buddies={buddies} isMe={isMe} />
    ) : (
      <>등록된 반려동물 프로필이 없습니다.</>
    )}
  </Container>
);

export default PetCardContainer;
