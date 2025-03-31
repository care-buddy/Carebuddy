import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import media from '@/utils/media';
import Header from './Header';
import Footer from './Footer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const OutletWrapper = styled.div`
  flex: 1;
  padding-top: 180px;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1024px;
  margin: 0 auto;

  ${media.tablet} {
    width: 90%;
  }
  ${media.mobile} {
    width: 100%;
  }
`;

const Layout: React.FC = () => (
  <Wrapper>
    <Header />
    <OutletWrapper>
      <Outlet />
    </OutletWrapper>
    <Footer />
  </Wrapper>
);

export default Layout;
