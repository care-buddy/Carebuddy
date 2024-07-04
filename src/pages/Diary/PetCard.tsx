import React from 'react';
import styled from 'styled-components';
import ActionButton from '@/components/common/ActtionButton';
import DefaultPetProfileImg from '@assets/defaultPetProfile.png';
import { CardsWrapper, Cards } from './card-components';

const Photo = styled.img`
  width: 130px;
  height: 130px;
  background: rgba(152, 185, 156, 0.3);
  border-radius: 50%;
  border: 0;
  overflow: hidden;
  text-align: center;
`;

const Name = styled.p`
  margin-top: 22px;
  height: 26px;
  font-size: var(--font-size-hd-1);
  font-weight: bold;
  line-height: 26px;
  text-align: center;
  margin-bottom: 6px;
  transition: color 0.3s ease;
  &.selectedPet {
    color: var(--color-green-main);
  }
`;

const Details = styled.p`
  width: 100%;
  height: 19px;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #7d7d7d;
  margin: 0;
`;

interface Buddy {
  name: string;
  species: string;
  age: number;
}

interface ProfileCardProps {
  buddy: Buddy;
  onEdit: () => void;
  onDelete: () => void;
}

const PetCard: React.FC<ProfileCardProps> = ({ buddy, onEdit, onDelete }) => (
  <CardsWrapper>
    <Cards>
      <ActionButton
        buttonBorder="border-none"
        direction="vertical"
        onDelete={onDelete}
        onEdit={onEdit}
      />
      <Photo src={DefaultPetProfileImg} />
      <Name>{buddy.name}</Name>
      <Details>
        {buddy.species} / {buddy.age}살
      </Details>
    </Cards>
  </CardsWrapper>
);

export default PetCard;