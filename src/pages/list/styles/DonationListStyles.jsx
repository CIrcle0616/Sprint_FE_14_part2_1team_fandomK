import { styled } from "styled-components";
import media from "../../../utils/mediaHelper";

export const DonationFlexListWrap = styled.div`
  position: relative;
  overflow: visible;
  margin-top: 40px;
  padding: 0 24px;
  & h1 {
    font-size: 16px;
    font-weight: 700;
    margin-left: 24px;
    color: #f7f7f8;
  }
`;

export const DonationFlexList = styled.ul`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  overflow-x: auto;
  -ms-overflow-style: none; //여기부터
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; // 여기까지 스크롤바 없애는 속성
  }
  ${media.tablet`
      gap:16px;`}
  ${media.desktop`
        gap:24px;`}
`;

export const DonationLi = styled.li`
  display: block;
`;

export const RightDiv = styled.div`
  min-width: 16px;
  margin-left: -16px;
`;

export const PaginationButton = styled.button`
  position: absolute;
  top: 170px;
  cursor: pointer;
  ${({ direction }) =>
    direction === "left" ? "left: -40px;" : "right: -40px;"}
`;