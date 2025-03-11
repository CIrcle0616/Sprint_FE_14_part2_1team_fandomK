import { useEffect, useState } from "react";
import Donation from "./Donation";
import { fetchGetDonations } from "../utils/donationApi";
import { styled } from "styled-components";

const DonationFlexListWrap = styled.div`
  margin-top: 40px;
  padding-left: 24px;;
  & h1 {
    font-size: 16px;
    font-weight: 700;
    color: #f7f7f8;
  }
`;

const DonationFlexList = styled.ul`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const DonationLi = styled.li`
  display: block;
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
        {donations.map((donation) => (
          <DonationLi key={donation.id}>
            <Donation donation={donation} />
          </DonationLi>
        ))}
      </DonationFlexList>
    </DonationFlexListWrap>
  );
}
