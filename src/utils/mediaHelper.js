import { css } from 'styled-components';

// Breakpoints 정의 (px 단위)
const breakpoints = {
  mobile: 576,
  tablet: 768,
  desktop: 1024,
};

// 미디어 쿼리 헬퍼 함수
const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${breakpoints[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export default media;