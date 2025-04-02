import React from 'react';
import styled from 'styled-components';
import logo from '@assets/carebuddyLogo.png';
import media from '@/utils/media';

const FooterContainer = styled.footer`
  background-color: #eeede5;
  color: #343434;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0 20px 0;
  margin: 0 auto;
  margin-top: 30px;
`;

const Container = styled.div`
  width: 1024px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  padding-left: 1rem;
  ${media.tablet} {
    width: 90%;
  }
  ${media.mobile} {
    width: 100%;
  }
`;

const Logo = styled.img`
  cursor: pointer;
  width: 120px;
  height: 60px;
  ${media.tablet} {
    max-height: 50px;
    max-width: 100px;
  }
`;

const Font = styled.p`
  margin: 0 auto;
  font-size: var(--font-size-ft-1);
  line-height: 24px;
  width: 100%;
  white-space: normal;
`;

const Footer: React.FC = () => (
  <FooterContainer>
    <Container>
      <Logo src={logo} />
      <Font>
        © 2024. carebuddy reserved. <br />
        주식회사 엘리스트랙ㅣ대표자 엘리스ㅣ123-45-67891
        [사업자정보확인]ㅣ2024-서울-00123ㅣ서울특별시 성동구 아차산로17길 48,
        성수낙낙 2층
        <br />
        02-123-1234 ㅣ contact@carebuddy.kr ㅣ카카오톡 채널 ㅣ인스타그램 |
        MON-FRI 10:00-17:00 | 이용약관 ㅣ 개인정보처리방침
      </Font>
    </Container>
  </FooterContainer>
);

export default Footer;
