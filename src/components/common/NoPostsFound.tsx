import React from 'react';
import styled from 'styled-components';

interface NoPostsFound {
  children: string;
}

const NoPostsFound: React.FC<NoPostsFound> = ({ children }) => (
  <Container>
    <p>{children}</p>
  </Container>
);

export default NoPostsFound;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
  font-size: var(--font-size-hd-2);
`;
