import styled from "styled-components";
import React from 'react';

const Container = styled.div`
  margin: 30px 0 30px 0;
`;

const PetCardContainer:React.FC = () => (
  <Container>
    <div>반려동물 카드</div>
  </Container>
);

export default PetCardContainer;