import { useEffect, useState } from "react";
import Donation from "../components/Donation";
import { fetchGetDonations } from "../../../utils/donationApi";
import { styled } from "styled-components";
import media from "../../../utils/mediaHelper";

const DonationFlexListWrap = styled.div`
  margin-top: 40px;
  & h1 {
    font-size: 16px;
    font-weight: 700;
    margin-left: 24px;
    color: #f7f7f8;
  }
`;

const DonationFlexList = styled.ul`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  overflow-x: auto;
  -ms-overflow-style: none; //여기부터
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; // 여기까지 스크롤바 없애는 속성
  }
`;

const DonationLi = styled.li`
  display: block;
`;

const RightDiv = styled.div`
  min-width: 16px;
`;

export default function DonationList() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const getDonationListData = async () => {
      const { list } = await fetchGetDonations();
      setDonations(list);
      return;
    };
    getDonationListData();
  }, []);

  return (
    <DonationFlexListWrap>
      <h1>후원을 기다리는 조공</h1>
      <DonationFlexList>
        <RightDiv />
        {donations.map((donation) => (
          <DonationLi key={donation.id}>
            <Donation donation={donation} />
          </DonationLi>
        ))}
        <RightDiv />
      </DonationFlexList>
    </DonationFlexListWrap>
  );
}
