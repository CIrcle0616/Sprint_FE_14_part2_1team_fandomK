import { styled } from "styled-components";
import { useState, useEffect } from "react";
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
    width: 36px;
    height: 26px;
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

function ChargeModal({ isOpenP, onClose }) {
  const [seletedCredit, setSeletedCredit] = useState(100);

  const creditOptions = [100, 500, 1000];

  const handleRadioChange = (credit) => {
    setSeletedCredit(credit);
  };

  console.log(isOpenP);

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
            selected={seletedCredit}
          >
            <img src={creditIcon} alt="크레딧 아이콘" />
            <div>{credit}</div>
            <img
              src={credit === seletedCredit ? checkedRadioIcon : radioIcon}
            />
          </ChargeContent>
        );
      })}
    </Modal>
  );
}

export default ChargeModal;
