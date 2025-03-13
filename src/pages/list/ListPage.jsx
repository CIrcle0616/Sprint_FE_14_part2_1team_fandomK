import { useState } from "react";
import logoImg from "../../assets/images/logo.svg";
import profileImg from "../../assets/images/fandomK-img-1-김채원.png";
import styled from "styled-components";
import CreditInfo from "./components/CreditInfo";
import DonationList from "./container/DonationList";
import IdolCharts from "./components/IdolCharts";
import media from "../../utils/mediaHelper";
import ChargeModal from "../../components/ChargeModal";
import DonationModal from "../../components/DonationModal";
import VoteModal from "../../components/VoteModal";
import AlertModal from "../../components/AlertModal";

const Wrap = styled.div`
  max-width: 1248px;
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.header`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 88px;
  margin: 0 auto;
  padding-top: 44px;
  display: flex;
  align-items: center;
  ${media.tablet`
    height: 81px;
    padding: 0;`}
  ${media.desktop`
    height: 80px;

    `}
`;

const Logo = styled.a`
  width: 108px;
  margin: 0 auto;
  & img {
    width: 100%;
  }
  ${media.tablet`
    & img {
    width: 120px;
    height: auto;}`}
  ${media.desktop`
    & img {
    width: auto;
    height: 32px;}`}
`;

const Profile = styled.a`
  position: absolute;
  right: 24px;
  border-radius: 50%;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
  & img {
    width: 32px;
    height: 32px;
  }
`;

export default function ListPage() {
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

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
      <Wrap>
        <Header>
          <Logo href="/abc">
            <img src={logoImg} />
          </Logo>
          <Profile href="/mypage">
            <img src={profileImg} />
          </Profile>
        </Header>
        <CreditInfo openChargeModal={openChargeModal} />
        <DonationList openDonationModal={openDonationModal}/>
        <IdolCharts openVoteModal={openVoteModal}/>
      </Wrap>
    </>
  );
}
