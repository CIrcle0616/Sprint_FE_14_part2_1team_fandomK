import ChargeModal from "./ChargeModal";
import VoteModal from "./VoteModal";
import AlertModal from "./AlertModal";
import { useState } from "react";
import DonationModal from "./DonationModal";

function AppTest() {
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  //각 버튼마다 onClick 간소화 할 방법 찾기
  const openChargeModal = () => {
    setIsChargeModalOpen(true);
  };

  const closeChargeModal = () => {
    setIsChargeModalOpen(false);
  };

  const openVoteModal = () => {
    setIsVoteModalOpen(true);
  };

  const closeVoteModal = () => {
    setIsVoteModalOpen(false);
  };

  const openDonationModal = () => {
    setIsDonationModalOpen(true);
  };

  const closeDonationModal = () => {
    setIsDonationModalOpen(false);
  };

  const openAlertModal = () => {
    setIsAlertModalOpen(true);
  };

  const closeAlertModal = () => {
    setIsAlertModalOpen(false);
  };

  return (
    <>
      <ChargeModal isOpenP={isChargeModalOpen} onClose={closeChargeModal} />

      <VoteModal isOpenP={isVoteModalOpen} onClose={closeVoteModal} />
      <DonationModal
        isOpenP={isDonationModalOpen}
        onClose={closeDonationModal}
      />
      <AlertModal isOpen={isAlertModalOpen} onClose={closeAlertModal} />

      <button onClick={openChargeModal}>충전하기</button>
      <button onClick={openVoteModal}>투표하기</button>
      <button onClick={openDonationModal}>후원하기</button>
      <button onClick={openAlertModal}>경고 모달 열기</button>
    </>
  );
}

export default AppTest;
