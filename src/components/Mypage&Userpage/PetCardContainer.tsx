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
    {/* <div>반려동물 카드</div> */}
    <PetProfiles buddies={buddies} isMe={isMe} />
  </Container>
);

export default PetCardContainer;
