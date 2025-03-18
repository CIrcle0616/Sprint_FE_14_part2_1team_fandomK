import styled from "styled-components";
import media from "../../../utils/mediaHelper";

export const WrapCredit = styled.div`
  padding: 0 24px;
`;

export const CreditInfoDiv = styled.div`
  max-width: 1200px;
  width: 100%
  height: 100%;
  margin: 0 auto;
  margin-top: 16px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items:center;
  border: 1px solid #F1EEF9CC;
  border-radius: 8px;
  ${media.tablet`
    margin-top:0;
    padding: 35px 64px;
    `}
  ${media.desktop`
    margin-top: 50px;
    padding: 45px 78px;`}
`;

export const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${media.desktop`
    gap: 16px;`}
`;

export const Text = styled.p`
  color: #ffffff99;
  ${media.tablet`
    font-size:14px`}
  ${media.desktop`
      font-size: 16px;`}
`;

export const Credit = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #ffffffde;
  font-size: 20px;
  font-weight: 700;
  & img {
    height: 16px;
  }
  ${media.desktop`
      font-size: 32px;
  `}
`;

export const ChargeLink = styled.a`
  color: #f96d69;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 5%;
  &:hover {
    cursor: pointer;
    text-decoration: none;
  }
  ${media.desktop`
      font-size: 24px;`}
`;
