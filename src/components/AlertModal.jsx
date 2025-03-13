import Modal from "./GlobalModal";
import creditIcon from "../assets/icon/ic_credit.svg";
import { useNavigate } from "react-router-dom";
import ChargeModal from "./ChargeModal";
import { useState } from "react";
import styled from "styled-components";
import ModalButton from "./ModalButton";

const CreditImg = styled.img`
  width: 113px;
  height: 113px;
  margin: 0 auto;
`;

const AlertDiv = styled.div`
  color: #ffffff;
  font-size: 16px;
  margin: 33px;

  span {
    color: #f96d69;
  }
`;

function AlertModal({ isOpen, onClose }) {
  const [openChargeModal, setOpenChargeModal] = useState(false);

  const handleConfirmBtn = () => {
    onClose();
  };

  const handleOpenChargeModal = () => {
    onClose();
    setOpenChargeModal(true);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <CreditImg src={creditIcon} alt="Credit Icon" />
        <AlertDiv>
          앗! 투표하기 위한 <span>크레딧</span>이 부족해요
        </AlertDiv>
        <ModalButton onClick={handleConfirmBtn}>확인</ModalButton>
        <ModalButton onClick={handleOpenChargeModal}>충전하러 가기</ModalButton>
      </Modal>
      <ChargeModal
        isOpenP={openChargeModal}
        onClose={() => setOpenChargeModal(false)}
      />
    </>
  );
}

export default AlertModal;
