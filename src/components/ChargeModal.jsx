import { styled } from "styled-components";
import { useEffect, useState } from "react";

import Modal from "./GlobalModal";

import creditIcon from "../assets/icon/ic_credit.png";
import checkedRadioIcon from "../assets/icon/ic_radio_checked.png";
import radioIcon from "../assets/icon/ic_radio.png";
import useCredit from "../utils/useCredit";

const ChargeContent = styled.div`
  width: 295px;
  height: 62px;
  background-color: #02000e;
  border: ${({ $credit, $selectedCredit }) =>
    $credit === $selectedCredit ? "solid 1px #f96d69" : "solid 1px #f7f7f8"};
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 15px;

  img {
    width: 18px;
    height: 20px;
  }
  div {
    // width: 36px;
    // height: 26px;
    color: ${({ $credit, $selectedCredit }) =>
      $credit === $selectedCredit ? "#ffffff" : "#828282"};
    font-weight: 600;
    font-size: 20px;
  }

  img:last-child {
    width: 16px;
    height: 16px;
    margin-left: auto;
  }
`;

// 메인페이지의 내 크레딧 영역의 충전하기를 누르면 나오는 모달
function ChargeModal({ isOpenP, onClose }) {
  const [selectCredit, setSelectCredit] = useState(100); // 사용자가 선택한 크레딧
  const [chargeCredit, setChargeCredit] = useCredit(); // 충전한 크레딧을 localStorage에서 불러오기

  const creditOptions = [100, 500, 1000]; // 충전할 수 있는 크레딧을 배열에 저장 -> map으로 펼치기위해

  // radio 버튼을 선택했을때 해당 credit을 파라미터로 받아 선택한크레딧을 저장
  const handleRadioChange = (credit) => {
    setSelectCredit(credit);
  };

  // 충전하기 버튼을 클릭했을 때
  // 선택한 크레딧을 localStorage에 저장
  const handleChargeButtonClick = () => {
    setChargeCredit(chargeCredit + selectCredit);
    onClose();
  };

  return (
    <Modal title="크레딧 충전하기" isOpen={isOpenP} onClose={onClose}>
      {creditOptions.map((credit) => {
        return (
          <ChargeContent
            onClick={() => handleRadioChange(credit)}
            key={credit}
            $credit={credit}
            $selectedCredit={selectCredit}
          >
            <img src={creditIcon} alt="크레딧 아이콘" />
            <div>{credit}</div>
            <img src={credit === selectCredit ? checkedRadioIcon : radioIcon} />
          </ChargeContent>
        );
      })}
      <button onClick={handleChargeButtonClick}>확인</button>
    </Modal>
  );
}

export default ChargeModal;
