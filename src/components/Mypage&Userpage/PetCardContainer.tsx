import styled from 'styled-components';
import React from 'react';
import PetProfiles from '@/pages/Diary/PetProfiles';

import { IBuddyProfile } from '@/types';

const Container = styled.div`
  margin: 30px 0 30px 0;
`;

interface Props {
  buddyData?: IBuddyProfile[];
  isMe: boolean;
}

const PetCardContainer: React.FC<Props> = ({ buddyData, isMe }) => (
  <Container>
    {/* <div>반려동물 카드</div> */}
    <PetProfiles buddies={buddyData} isMe={isMe} />
  </Container>
);

export default PetCardContainer;
