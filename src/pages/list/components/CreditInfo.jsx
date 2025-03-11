import styled from "styled-components";
import creditIc from "../../../assets/icon/ic_credit.png";
import { useState } from "react";

const CreditInfoWrap = styled.div`
  max-width: 1248px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
`;

const CreditInfoDiv = styled.div`
  max-width: 1200px;
  width: 100%
  margin: 0 auto;
  margin-top: 16px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items:center;
  border: 1px solid #F1EEF9CC;
  border-radius: 8px;
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Text = styled.p`
  color: #ffffff99;
`;

const Credit = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #ffffffde;
  font-size: 20px;
  font-weight: 700;
  & img {
    height: 16px;
  }
`;

const ChargeLink = styled.a`
  color: #f96d69;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 5%;
  &:hover {
    cursor: pointer;
    text-decoration: none;
  }
`;

export default function CreditInfo() {
  const [credit, setCredit] = useState("36,000");

  return (
    <CreditInfoWrap>
      <CreditInfoDiv>
        <InnerDiv>
          <Text>내 크레딧</Text>
          <Credit>
            <img src={creditIc} alt="credit" />
            {credit}
          </Credit>
        </InnerDiv>
        <ChargeLink>충전하기</ChargeLink>
      </CreditInfoDiv>
    </CreditInfoWrap>
  );
}
