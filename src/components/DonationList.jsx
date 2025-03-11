import { useEffect, useState, useRef } from "react";
import Donation from "./Donation";
import { fetchGetDonations } from "../utils/donationApi";
import { styled } from "styled-components";

const DonationFlexListWrap = styled.div`
  margin-top: 40px;
  padding-left: 24px;
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
  overflow-x: auto;
  -ms-overflow-style: none; //여기부터
  scrollbar-width: none;
  transition: margin-left 0.3s ease;
  ${({ isScrolled }) =>
    isScrolled &&
    `
  margin-left: -20px;`}
  &::-webkit-scrollbar {
    display: none; // 여기까지 스크롤바 없애는 속성
  }
`;

const DonationLi = styled.li`
  display: block;
`;

export default function DonationList() {
  const [donations, setDonations] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false); 
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current.scrollLeft > 0 && !isScrolled) {
      setIsScrolled(true);
    } else if (scrollRef.current.scrollLeft === 0 && isScrolled) {
      setIsScrolled(false);
    }
  };

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
      <DonationFlexList
        ref={scrollRef}
        onScroll={handleScroll}
        isScrolled={isScrolled}
      >
        {donations.map((donation) => (
          <DonationLi key={donation.id}>
            <Donation donation={donation} />
          </DonationLi>
        ))}
      </DonationFlexList>
    </DonationFlexListWrap>
  );
}
