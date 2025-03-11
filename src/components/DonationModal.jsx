import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Modal from "./GlobalModal";
import creditIcon from "../assets/icon/ic_credit.png";
import ChargeModal from "./ChargeModal";

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

const ChargeVisibleButton = styled.button`
  display: ${(props) => (props.showWarning ? "block" : "none")};
`;

function DonationModal({ isOpenP, onClose }) {
  const [inputCredit, setInputCredit] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [totalDonationCredit, setTotalDonationCredit] = useState(
    localStorage.getItem("credit")
  );
  const [openOtherModal, setOpenOtherModal] = useState(false);

  const handleInputChange = (e) => {
    setInputCredit(Number(e.target.value));
  };

  const handleInputBlur = () => {
    setShowWarning(parseInt(totalDonationCredit) < inputCredit);
  };

  const handleDonationButtonClick = () => {
    if (parseInt(totalDonationCredit) > inputCredit) {
      const result = parseInt(totalDonationCredit) - inputCredit;
      localStorage.setItem("credit", result.toString());
      setTotalDonationCredit(result);
    }
  };

  const handleShowChargeModal = () => {
    setOpenOtherModal(true);
  };

  return (
    <>
      {!openOtherModal && (
        <Modal title="후원하기" isOpen={isOpenP} onClose={onClose}>
          <div style={{ color: "#ffffff" }}>
            이 곳은 후원을 기다리는 조공 <br />
            카드를 선택하면 나오는 컴포넌트입니다.
          </div>
          <DonationContainer>
            <DonationInput
              placeholder="크레딧 입력"
              type="number"
              totalCredit={parseInt(totalDonationCredit)}
              inputCredit={inputCredit}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
            <DonationImg src={creditIcon} />
            {/* 가지고 있는 크레딧 보다 많은 크레딧을 입력한 경우*/}
            <DonatioVisibleDiv showWarning={showWarning}>
              갖고 있는 크레딧보다 더 많이 후원할 수 없어요
            </DonatioVisibleDiv>
          </DonationContainer>
          <button onClick={handleDonationButtonClick}>ghkrdls</button>
          {/* 가지고 있는 크레딧 보다 많은 크레딧을 입력한 경우
          버튼을 보이게하고 버튼 클릭시 ChargeModal로 이동 */}
          <ChargeVisibleButton
            onClick={handleShowChargeModal}
            showWarning={showWarning}
          >
            충전하러 가기
          </ChargeVisibleButton>
        </Modal>
      )}
      {/* 충전하러가기 버튼을 누르면 충전하기 모달 보이기 */}

      <ChargeModal
        isOpenP={openOtherModal}
        onClose={() => setOpenOtherModal(false)}
      />
    </>
  );
}

export default DonationModal;
