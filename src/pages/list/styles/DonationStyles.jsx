import { styled } from "styled-components";
import media from "../../../utils/mediaHelper";

export const DonationCard = styled.div`
  max-width: 282px;
  max-height: 402px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${media.tablet`
    width:282px;
    height: 402px;`}
`;

export const DonationImgWrapper = styled.div`
  position: relative;
  width: 158px;
  height: 206px;
  border-radius: 8px;
  overflow: hidden;
  ${media.tablet`
    width:282px;
    height:293px;`}
`;

export const DonationImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CoverImg = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
`;

export const DonateBtn = styled.button`
  position: absolute;
  left: 50%;
  bottom: 8px;
  transform: translate(-50%);
  z-index: 2;
  width: 142px;
  padding: 2 48px;
  border-radius: 3px;
  font-size: 13px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 2%;
  background: linear-gradient(to right, #f86f65, #fe5493);
  color: #ffffff;
  ${media.tablet`
    width: 234px;
    height: 40px;`}
`;

export const DonationDescription = styled.div`
  width: 100%;
  height: auto;
  padding: 0 2px;
  & h3 {
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.17px;
    color: #67666e;
  }

  & h2 {
    margin-top: 6px;
    font-weight: 500;
    font-size: 14px;
    color: #f7f7f8;
  }
`;

export const ProgressBarWrap = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
`;

export const CreditCount = styled.div`
  display: flex;
  color: #f96d69;
  font-size: 12px;
  gap: 3px;
  & img {
    width: 12px;
  }
`;

export const TextSpan = styled.span`
  color: #f7f7f8;
`;

export const ProgressBar = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  margin-top: 7px;
  border-radius: 1px;
  background-color: #ffffff;
  & div {
    position: absolute;
    inset: 0;
    max-width: 100%;
    width: ${({ fundingProgressPercent }) => `${fundingProgressPercent}%`};
    height: 1px;
    border-radius: 1px;
    background-color: #F96D69;
`;
