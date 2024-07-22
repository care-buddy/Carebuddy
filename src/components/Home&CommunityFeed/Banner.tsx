import React from 'react';
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';

// 배너 요소 이미지
import BannerElementImage from '@assets/bannerElementImage.png';

type TextProps = {
  fontSize?: string;
  color?: string;
  fontWeight?: string;
};

const Banner: React.FC = () => (
  <StyledBanner>
    <Image src={BannerElementImage} alt="배너 이미지" />
    <TextContainer>
      <Row>
        <StyledText color="var(--color-green-main)">케어버디</StyledText>
        <StyledText>와 함께</StyledText>
      </Row>
      <Row>
        <StyledText>
          사랑하는 나의
          <TypeWriterWrapper>
            <Typewriter
              options={{
                strings: ['강아지와', '고양이와', '가족과'],
                autoStart: true,
                loop: true,
                delay: 150,
                deleteSpeed: 200,
              }}
            />
          </TypeWriterWrapper>
        </StyledText>
      </Row>
      <StyledText>건강하고 행복한 시간을 보내세요</StyledText>
      <StyledText
        color="var(--color-grey-1)"
        fontWeight="var(--font-weight-regular)"
        fontSize="var(--font-size-md-1)"
      >
        꾸준한 질병 기록으로 아이의 건강을 지키고, 아이의 행복을 위한 정보를
        나눠보아요.
      </StyledText>
    </TextContainer>
  </StyledBanner>
);

export default Banner;

const StyledBanner = styled.div`
  // position: absolute;
  background-color: var(--color-green-sub-2); // 임시. 추후 변경
  width: 100%;
  height: 60vh;
`;

const Image = styled.img`
  position: relative;
  top: 22%;
  left: 58%;
  bottom: 0px;
  width: 400px;
  height: auto;
  pointer-events: none;
`;

const Row = styled.div`
  display: flex;
`;

const TypeWriterWrapper = styled.div`
  padding-left: 10px;
`;

const TextContainer = styled.div`
  position: absolute;
  top: 36%;
  left: 14%;
`;

const StyledText = styled.div<TextProps>`
  display: flex;
  font-size: ${(props) => props.fontSize || 'var(--font-size-lg-3)'};
  font-weight: ${(props) => props.fontWeight || 'var(--font-weight-extrabold)'};
  padding: 8px 0;
  color: ${(props) => props && props.color};
`;
