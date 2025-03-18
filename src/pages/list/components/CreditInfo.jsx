import creditIc from "../../../assets/icon/ic_credit.png";
import useCredit from "../../../hooks/useCredit";

import {
  WrapCredit,
  CreditInfoDiv,
  InnerDiv,
  Text,
  Credit,
  ChargeLink,
} from "../styles/CreditInfoStyles";

export default function CreditInfo({ openChargeModal }) {
  const [credit] = useCredit();

  return (
    <WrapCredit>
      <CreditInfoDiv>
        <InnerDiv>
          <Text>내 크레딧</Text>
          <Credit>
            <img src={creditIc} alt="credit" />
            {credit}
          </Credit>
        </InnerDiv>
        <ChargeLink onClick={openChargeModal}>충전하기</ChargeLink>
      </CreditInfoDiv>
    </WrapCredit>
  );
}
