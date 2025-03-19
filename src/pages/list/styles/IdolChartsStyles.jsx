import styled from "styled-components";
import media from "../../../utils/mediaHelper";

export const ChartWrapper = styled.div`
  position: relative;
  margin-top: 40px;
  padding: 0 24px;
  color: #ffffff;
  & .header {
    width: 100%;
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & .header h1 {
    font-size: 16px;
    font-weight: 700;
  }
  & .header button {
    width: 128px;
    height: 32px;
    display: flex;
    gap: 4px;
    align-items: center;
    border-radius: 3px;
    padding: 2px 16px 3px;
    background: linear-gradient(to right, #f86f65, #fe5493);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2%;
    color: #ffffff;
    white-space: nowrap;
  }
  & .header img {
    width: 24px;
    height: 24px;
  }
  & .link {
    position: absolute;
    left: 25%;
    ${media.tablet`
      left:auto;
      right: 25%;
      `};
  }
`;
