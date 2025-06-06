import { useState, useEffect, useCallback } from "react";
import { fetchGetDonations } from "../../utils/donationApi";
import useOpen from "../../hooks/useOpen";
import styled from "styled-components";
import CreditInfo from "./components/CreditInfo";
import DonationList from "./container/DonationList";
import IdolCharts from "./components/IdolCharts";
import ChargeModal from "../../components/ChargeModal";
import DonationModal from "../../components/DonationModal";
import VoteModal from "../../components/VoteModal";
import AlertModal from "../../components/AlertModal";
import useCredit from "../../hooks/useCredit";

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
  const [credit, setCredit] = useCredit();
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartGender, setChartGender] = useState("female"); //투표하기 모달의 리스트 변경을 위해 받는 성별
  const checkedIdol = localStorage.getItem("checkedIdols");

  useEffect(() => {
    setCredit(credit || 0);
  }, []);

  const getDonationListData = useCallback(async () => {
    setIsLoading(true);
    const options = {cursor: '', pageSize: 20, priorityIdolIds: checkedIdol };
    const { list } = await fetchGetDonations(options);
    setDonations(list);
    setIsLoading(false);
    return;
  }, []);

  useEffect(() => {
    getDonationListData();
  }, [getDonationListData]);

  // useEffect(() => {
  //   if (!isDonationModalOpen) {
  //     getDonationListData();
  //   }
  // }, [isDonationModalOpen, getDonationListData]);

  const handleOpenDonationModal = (donation) => {
    setSelectedDonation(donation);
    openDonationModal();
  };

  const loadingAmountOfDonate = (donationId, amountCredit) => {
    const updateDonation = donations.map((donation) =>
      donation.id === donationId
        ? { ...donation, receivedDonations: amountCredit }
        : donation
    );
    setDonations(updateDonation);
  };

  return (
    <>
      <ChargeModal isOpenP={isChargeModalOpen} onClose={closeChargeModal} />
      <VoteModal
        isOpenP={isVoteModalOpen}
        onClose={closeVoteModal}
        chartGender={chartGender}
      />
      <DonationModal
        isOpenP={isDonationModalOpen}
        onClose={closeDonationModal}
        donation={selectedDonation}
        loadingAmountOfDonate={loadingAmountOfDonate}
      />
      <AlertModal isOpen={isAlertModalOpen} onClose={closeAlertModal} />
      <Wrap>
        <CreditInfo openChargeModal={openChargeModal} />
        <DonationList
          isLoading={isLoading}
          donations={donations}
          isDonationModalOpen={isDonationModalOpen}
          openDonationModal={handleOpenDonationModal}
        />
        <IdolCharts
          openVoteModal={openVoteModal}
          chartGender={chartGender}
          setChartGender={setChartGender}
        />
      </Wrap>
    </>
  );
}
