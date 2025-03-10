import { styled } from "styled-components";
import { useState } from "react";
import Modal from "./GlobalModal";
import creditIcon from "../assets/icon/ic_credit.png";
import checkedRadioIcon from "../assets/icon/ic_radio_checked.png";
import radioIcon from "../assets/icon/ic_radio.png";

const ChargeContent = styled.div`
  width: 295px;
  height: 62px;
  background-color: #02000e;
  border: ${(props) =>
    props.credit === props.selected
      ? "solid 1px #f96d69"
      : "solid 1px #f7f7f8"};
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
    color: ${(props) =>
      props.credit === props.selected ? "#ffffff" : "#828282"};
    font-weight: 600;
  }

  img:last-child {
    width: 16px;
    height: 16px;
    margin-left: auto;
  }
`;

// 메인페이지의 내 크레딧 영역의 충전하기를 누르면 나오는 모달
function ChargeModal({ isOpenP, onClose }) {
  const [selectCredit, setSelectCredit] = useState(100);
  const [chargeCredit, setChargeCredit] = useState(
    localStorage.getItem("credit")
  );

  const creditOptions = [100, 500, 1000];

  const handleRadioChange = (credit) => {
    setSelectCredit(credit);
  };
  const handleButtonClick = () => {
    const result = (parseInt(chargeCredit) || 0) + selectCredit;
    localStorage.setItem("credit", result.toString());
    setChargeCredit(result);
  };

  return (
    <Modal title="크레딧 충전하기" isOpen={isOpenP} onClose={onClose}>
      {creditOptions.map((credit) => {
        return (
          <ChargeContent
            onClick={() => handleRadioChange(credit)}
            key={credit}
            // div의 color와 chargeContent의 border를 바꾸기 위해 내려주는 props
            //   => props이름을 좀 더 고민해보자...
            credit={credit}
            selected={selectCredit}
          >
            <img src={creditIcon} alt="크레딧 아이콘" />
            <div>{credit}</div>
            <img src={credit === selectCredit ? checkedRadioIcon : radioIcon} />
          </ChargeContent>
        );
      })}
      <button onClick={handleButtonClick}>ghkrdls</button>
    </Modal>
  );
}

export default ChargeModal;
