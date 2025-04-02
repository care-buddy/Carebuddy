import media from '@/utils/media';
import React from 'react';
import styled from 'styled-components';

type SidePanelProps = {
  elementArray?: Array<React.ReactNode>;
  name?: string;
  className?: string;
};

const SidePanel: React.FC<SidePanelProps> = ({
  name,
  elementArray,
  className,
}) => (
  <StyledContainer className={className}>
    <P>{name}</P>
    {elementArray?.map((element, index) => (
      <>
        <PanelElement>{element}</PanelElement>
        {index === elementArray.length - 1 ? '' : <Hr />}
      </>
    ))}
  </StyledContainer>
);

export default SidePanel;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  border: solid 1px var(--color-grey-2);
  padding: 24px 20px;
  text-decoration: none; // 임시, link 들어갈 가능성 있어서 미리 추가

  ${media.tablet} {
    &.homePanel {
      margin-top: 44px;
    }
  }

  ${media.mobile} {
    &.homePanel {
      display: none;
    }
  }
`;

const P = styled.p`
  font-weight: var(--font-weight-bold);
`;

const PanelElement = styled.div`
  cursor: pointer;
`;

const Hr = styled.hr`
  border: 0;
  border-top: 1px solid var(--color-grey-2);
  margin: 8px 0;
`;
