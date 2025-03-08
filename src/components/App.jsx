import IdolCircle from "./IdolCircle";
import ChargeModal from "./ChargeModal";
import VoteModal from "./VoteModal";
import { useState } from "react";
import DonationModal from "./DonationModal";

//get http 요청으로 아이돌 불러오기
const fetchMockIdol = async () => {
  const response = await fetch(
    "https://fandom-k-api.vercel.app/14-1/idols?pageSize=10"
  );
  if (!response.ok) return;
  const data = await response.json();
  console.log(data);
  const idols = data.list;
  return idols;
};
const mockIdols = await fetchMockIdol();
// console.log(mockIdols);

function App() {
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [totalCredit, setTotalCredit] = useState(50000);

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

  return (
    <>
      <ChargeModal isOpenP={isChargeModalOpen} onClose={closeChargeModal} />
      <VoteModal isOpenP={isVoteModalOpen} onClose={closeVoteModal} />
      <DonationModal
        isOpenP={isDonationModalOpen}
        onClose={closeDonationModal}
        totalCredit={totalCredit}
      />
      <ul>
        {mockIdols.map((idol) => (
          <li key={idol.id}>
            <IdolCircle idol={idol} />
          </li>
        ))}
        <button onClick={openChargeModal}>충전하기</button>
        <button onClick={openVoteModal}>투표하기</button>
        <button onClick={openDonationModal}>후원하기</button>
      </ul>
    </>
  );
}

export default App;
