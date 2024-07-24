import React from 'react';
import styled from 'styled-components';
import logo from '@assets/carebuddyLogo.png';

const FooterContainer = styled.footer`
  background-color: #eeede5;
  color: #343434;
  /* width: 100vw; */
  /* height: 120px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0 20px 0;
  margin-top: 30px;
`;

const Container = styled.div`
  width: 1024px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Logo = styled.img`
  cursor: pointer;
  width: 120px;
  height: 60px;
`;

const Font = styled.p`
  margin: 0;
  font-size: var(--font-size-ft-1);
  line-height: 24px;
`;

const Footer: React.FC = () => (
  <FooterContainer>
    <Container>
      <Logo src={logo} />
      <Font>
        © 2024. carebuddy reserved. <br />
        주식회사 엘리스트랙ㅣ대표자 엘리스ㅣ123-45-67891
        [사업자정보확인]ㅣ2024-서울-00123ㅣ서울특별시 성동구 아차산로17길 48,
        성수낙낙 2층 <br />
        02-123-1234 ㅣ contact@carebuddy.kr ㅣ카카오톡 채널 ㅣ인스타그램 |
        MON-FRI 10:00-17:00 | 이용약관 ㅣ 개인정보처리방침
      </Font>
    </Container>
  </FooterContainer>
);

export default Footer;
