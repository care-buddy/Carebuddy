import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* margin-top: 50px; */
  align-items: center;
`;

export const BorderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 60px 10px 80px 10px;
  border: 1px solid #cecece;
  border-radius: 7px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.p`
  margin-bottom: 20px;
  font-size: var(--font-size-md-2);
  font-weight: var(--font-weight-semibold);
`;

export const SearchWrapper = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  > button {
    margin-left: 20px;
  }
`;

export const Text = styled.p`
  margin-right: 15px;
  + select {
    margin-right: 15px;
  }
`;
