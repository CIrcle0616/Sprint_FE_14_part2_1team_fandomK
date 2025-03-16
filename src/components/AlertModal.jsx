import Modal from "./GlobalModal";
import creditIcon from "../assets/icon/ic_credit.svg";
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
  width: 228px;
  color: #ffffff;
  font-size: 13px;
  text-align: center;
  margin: 31px auto;

  span {
    color: #f96d69;
  }
`;

function AlertModal({ isOpen, onClose, setIsChargeModalOpen }) {
  const [openChargeModal, setOpenChargeModal] = useState(false);

  const handleConfirmBtn = () => {
    onClose();
  };

  const handleOpenChargeModal = () => {
    setIsChargeModalOpen(true);
    setOpenChargeModal(true);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} className="alert">
        <CreditImg src={creditIcon} alt="Credit Icon" />
        <AlertDiv>
          앗! 투표하기 위한 <span>크레딧</span>이 부족해요
        </AlertDiv>
        <ModalButton onClick={handleConfirmBtn}>확인</ModalButton>
        <ModalButton onClick={handleOpenChargeModal}>충전하러 가기</ModalButton>
      </Modal>
      <ChargeModal
        isOpenP={openChargeModal}
        onClose={() => {
          setOpenChargeModal(false);
          setIsChargeModalOpen(false);
        }}
      />
    </>
  );
}

export default AlertModal;
