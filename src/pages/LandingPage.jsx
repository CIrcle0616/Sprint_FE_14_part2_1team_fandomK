import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import media from "../utils/mediaHelper";

import imgMaskSrc1 from '../assets/images/img_mask1.png';
import imgMaskSrc2 from '../assets/images/img_mask2.png';
import imgMaskSrc3 from '../assets/images/img_mask3.png';
import imgMaskSrc4 from '../assets/images/img_mask4.png';
import LandingLogoSrc from '../assets/images/img_main_logo.png';
import ContainerTextSrc1 from '../assets/images/img_main_text.png';
import ContainerTextSrc2 from '../assets/images/img_landing_text1.png';
import ContainerTextSrc3 from '../assets/images/img_landing_text2.png';
import ContainerTextSrc4 from '../assets/images/img_landing_text3.png';
import PhoneImg1 from '../assets/images/img_phone1.png';
import PhoneImg2 from '../assets/images/img_phone2.png';
import PhoneImg3 from '../assets/images/img_phone3.png';

// easing 함수 정의
const ease = 'cubic-bezier(0.25, 0.1, 0.25, 1.0)';

const PageWrapper = styled.div`
  background-color: #02000E;
  height: 400vh;
`;

const SectionWrapper = styled.section`

`;

const Section = styled.article`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin:0 auto;
  width:1200px;
  height:100%;
  background-position:center;
  background-repeat:no-repeat;

  &.sub1 {
    background-image: url(${imgMaskSrc2});
  }
  &.sub2 {
    background-image: url(${imgMaskSrc3});
  }
  &.sub3 {
    background-image: url(${imgMaskSrc4});
  }
`;

const ImageContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 1s ${ease}, transform 1s ${ease};
  text-align:center;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;

  img.phone {
    width:65vw;

    ${media.tablet`
      width:20rem
    `}

    ${media.desktop`
      width:32rem
    `}
  }
`;

const ContainerTextMain = styled.img`
  width:19.3rem;
`
const ContainerTextSub = styled.img`
  margin-bottom:4.4rem;
  width:31.3rem;
`
const LandingLogo = styled.img`
  margin:2.7rem 0;
  width:23.6rem;
`
const GradientImage = styled.div`
  width:39.3rem;
  img {
    max-width:100%;
  }
`
const StartButton = styled.button`
  display: block;
  margin: 6vw auto 0;
  width:230px;
  height: 4.8rem;
  border-radius:0.3rem;
  background: linear-gradient(91.18deg, #F77063 3.33%, #FE5790 99.37%);
  line-height: 2.6rem;
  text-align: center;
  font-size: 1.4rem;
  color: #fff;

  ${media.desktop`
    margin-top:50px;
  `}

`;
const LandingPage = () => {
  const [scrollPos, setScrollPos] = useState(0);
  const imgMaskRef1 = useRef(null);
  const imgRef1 = useRef(null);
  const imgRef2 = useRef(null);
  const imgRef3 = useRef(null);


  const handleScroller = () => {
    const scrollTop = window.scrollY || window.pageYOffset;
    setScrollPos(scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroller);
    setScrollPos(0)
    return () => {
      window.removeEventListener('scroll', handleScroller);
    };
  }, []);

  const imageTransitionEffect = () => {
    const imageMask1 = imgMaskRef1.current;
    const image1 = imgRef1.current;
    const image2 = imgRef2.current;
    const image3 = imgRef3.current;

    const progress = scrollPos / window.innerHeight;

    if (imageMask1 && image1 && image2 && image3) {
      if (progress < 0.8) {//80% 지점에서 트랜지션
        imageMask1.style.opacity = 1;
        image1.style.opacity = 0;
        image2.style.opacity = 0;
        image3.style.opacity = 0;
      } else if (progress < 1.6) {
        imageMask1.style.opacity = 0;
        image1.style.opacity = 1;
        image2.style.opacity = 0;
        image3.style.opacity = 0;
      } else if (progress < 2.4 ) {
        imageMask1.style.opacity = 0;
        image1.style.opacity = 0;
        image2.style.opacity = 1;
        image3.style.opacity = 0;
      } else {
        imageMask1.style.opacity = 0;
        image1.style.opacity = 0;
        image2.style.opacity = 0;
        image3.style.opacity = 1;
      }
    }
  };

  useEffect(() => {
    imageTransitionEffect();
  }, [scrollPos]);

  return (
    <PageWrapper>
      <SectionWrapper>
        <Section>
          <ImageContainer ref={imgMaskRef1}>
              <ContainerTextMain src={ContainerTextSrc1} alt="내가 좋아하는 아이돌을 가장 쉽게 덕질하는 방법" />
              <LandingLogo src={LandingLogoSrc} alt="FANDOM-K" />
              <img src={imgMaskSrc1}  style={{opacity:0.7}} alt="" />
            <StartButton>
              <span>지금 시작하기</span>
            </StartButton>
          </ImageContainer>
          </Section>
        <Section className="sub1">
          <ImageContainer ref={imgRef1}>
            <ContainerTextSub src={ContainerTextSrc2} alt="후원하기 : 좋아하는 아이돌에게 쉽게 조공해보세요." />
            <img className="phone" src={PhoneImg1} alt="Phone 1" />
          </ImageContainer>
        </Section>
        <Section className="sub2">
          <ImageContainer ref={imgRef2}>
            <ContainerTextSub src={ContainerTextSrc3} alt="이달의 아티스트 : 내 아티스트에게 1등의 영예를 선물하세요" />
            <img className="phone" src={PhoneImg2} alt="Phone 2" />
          </ImageContainer>
        </Section>
        <Section className="sub3">
          <ImageContainer ref={imgRef3}>
            <ContainerTextSub src={ContainerTextSrc4} alt="나만의 아티스트 : 좋아하는 아티스트들의 소식을 모아보세요" />
            <img className="phone" src={PhoneImg3} alt="Phone 3" />
          </ImageContainer>
        </Section>
      </SectionWrapper>
    </PageWrapper>
  );
};

export default LandingPage;
