import { useState } from "react";
import useOpen from "../../hooks/useOpen";
import styled from "styled-components";
import CreditInfo from "./components/CreditInfo";
import DonationList from "./container/DonationList";
import IdolCharts from "./components/IdolCharts";
import ChargeModal from "../../components/ChargeModal";
import DonationModal from "../../components/DonationModal";
import VoteModal from "../../components/VoteModal";
import AlertModal from "../../components/AlertModal";
import Header from "../../components/Header";

const Wrap = styled.div`
  max-width: 1248px;
  width: 100%;
  margin: 0 auto;
`;

export default function ListPage() {
  const [isChargeModalOpen, openChargeModal, closeChargeModal] = useOpen();
  const [isVoteModalOpen, openVoteModal, closeVoteModal] = useOpen();
  const [isDonationModalOpen, openDonationModal, closeDonationModal] =
    useOpen();
  const [isAlertModalOpen, openAlertModal, closeAlertModal] = useOpen();
  const [selectedDonation, setSelectedDonation] = useState(null);

  const handleOpenDonationModal = (donation) => {
    setSelectedDonation(donation);
    openDonationModal();
  };

  return (
    <>
      <ChargeModal isOpenP={isChargeModalOpen} onClose={closeChargeModal} />

      <VoteModal isOpenP={isVoteModalOpen} onClose={closeVoteModal} />
      <DonationModal
        isOpenP={isDonationModalOpen}
        onClose={closeDonationModal}
        donation={selectedDonation}
      />
      <AlertModal isOpen={isAlertModalOpen} onClose={closeAlertModal} />
      <Wrap>
        <CreditInfo openChargeModal={openChargeModal} />
        <DonationList openDonationModal={handleOpenDonationModal} />
        <IdolCharts openVoteModal={openVoteModal} />
      </Wrap>
    </>
  );
}
