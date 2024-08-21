import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
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
  width: 1024px;
  margin: 0 auto;
  /* display: flex;
  flex-direction: column;
  align-items: center; */
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
