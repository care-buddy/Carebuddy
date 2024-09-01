import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

// 버튼 스타일, 사이즈 props
interface StyledLinkProps {
  linkStyle?: 'link' | 'grey' | 'black';
  linkSize?: 'sm' | 'md' | 'lg';
}

const linkStyles = {
  link: css`
    padding: 0 0 1px 0;
    border-bottom: solid 1px;
    background-color: transparent;
    font-size: var(--font-size-ft-1);
    font-weight: var(--font-weight-regular);
    color: var(--color-black);
  `,

  grey: css`
    color: var(--color-grey-1);
    font-weight: var(--font-weight-regular);
    background-color: transparent;
    padding: 0;
  `,

  black: css`
    color: var(--color-black);
    font-weight: var(--font-weight-regular);
    background-color: transparent;
    padding: 0;
  `,
};

const linkSizes = {
  sm: css`
    font-size: var(--font-size-ft-1);
  `,
  md: css`
    font-size: var(--font-size-md-1);
  `,
  lg: css`
    font-size: var(--font-size-hd-1);
  `,
};

// 정의된 스타일들을 props로 받아서 스타일링될 버튼 컴포넌트
const StyledLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => !['linkStyle', 'linkSize'].includes(prop),
})<StyledLinkProps>`
  padding: 8px 16px;
  cursor: pointer;
  border: none;
  transition: all 0.5s;
  text-decoration: none;
  display: flex;
  align-items: center;
  ${(props) => props.linkStyle && linkStyles[props.linkStyle]}
  ${(props) => props.linkSize && linkSizes[props.linkSize]}
`;

// 정의된 스타일들을 props로 받아서 스타일링될 버튼 컴포넌트
const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['linkStyle', 'linkSize'].includes(prop),
})<StyledLinkProps>`
  padding: 8px 16px;
  cursor: pointer;
  border: none;
  transition: all 0.5s;
  text-decoration: none;
  display: flex;
  align-items: center;
  ${(props) => props.linkStyle && linkStyles[props.linkStyle]}
  ${(props) => props.linkSize && linkSizes[props.linkSize]}
`;

// 스타일을 확장한 최종 버튼 컴포넌트의 props
interface LinkProps extends StyledLinkProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

const LinkButton: React.FC<LinkProps> = ({
  children,
  linkStyle = 'link',
  linkSize = 'md',
  href,
  onClick,
  ...props
}) => {
  if (href) {
    return (
      <StyledLink
        linkStyle={linkStyle}
        linkSize={linkSize}
        to={href}
        {...props}
      >
        {children}
      </StyledLink>
    );
  }
  return (
    <StyledButton
      linkStyle={linkStyle}
      linkSize={linkSize}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default LinkButton;
