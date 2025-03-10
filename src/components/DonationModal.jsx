import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Modal from "./GlobalModal";
import creditIcon from "../assets/icon/ic_credit.png";

const DonationContainer = styled.div`
  position: relative;
`;

const DonationInput = styled.input`
  width: 295px;
  height: 58px;
  border-radius: 8px;
  background-color: #272f3d;
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  padding: 16px;

  border: ${(props) =>
    props.totalCredit < props.inputCredit
      ? "solid 1px #ff3b3b"
      : "solid 1px #ffffff"};

  placeholder {
    color: #67666e;
  }

  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const DonationImg = styled.img`
  position: absolute;
  right: 5px;
`;

const DonatioVisibleDiv = styled.div`
  display: ${(props) => (props.showWarning ? "block" : "none")};
  height: 14px;
  font-size: 12px;
  color: #ff2626;
  margin-top: 7px;
`;

function DonationModal({ isOpenP, onClose }) {
  const [inputCredit, setInputCredit] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [totalCredit, setTotalCredit] = useState(
    localStorage.getItem("credit")
  );

  const handleInputChange = (e) => {
    setInputCredit(Number(e.target.value));
  };

  const handleInputBlur = () => {
    setShowWarning(parseInt(totalCredit) < inputCredit);
  };

  const handleButtonClick2 = () => {
    if (parseInt(totalCredit) > inputCredit) {
      const result = parseInt(totalCredit) - inputCredit;
      localStorage.setItem("credit", result.toString());
      setTotalCredit(result);
    }
  };

  return (
    <Modal title="후원하기" isOpen={isOpenP} onClose={onClose}>
      <div>
        이 곳은 후원을 기다리는 조공 <br />
        카드를 선택하면 나오는 컴포넌트입니다.
      </div>
      <DonationContainer>
        <DonationInput
          placeholder="크레딧 입력"
          type="number"
          totalCredit={parseInt(totalCredit)}
          inputCredit={inputCredit}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
        <DonationImg src={creditIcon} />
        <DonatioVisibleDiv showWarning={showWarning}>
          갖고 있는 크레딧보다 더 많이 후원할 수 없어요
        </DonatioVisibleDiv>
      </DonationContainer>
      <button onClick={handleButtonClick2}>ghkrdls</button>
    </Modal>
  );
}

export default DonationModal;
