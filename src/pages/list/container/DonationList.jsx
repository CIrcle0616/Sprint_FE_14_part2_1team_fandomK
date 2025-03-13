import { useEffect, useState } from "react";
import Donation from "../components/Donation";
import { fetchGetDonations } from "../../../utils/donationApi";
import { styled } from "styled-components";
import media from "../../../utils/mediaHelper";
import leftBtnImg from "../../../assets/icon/btn_pagination_arrow_left.svg";
import rightBtnImg from "../../../assets/icon/btn_pagination_arrow_right.svg";

const DonationFlexListWrap = styled.div`
  position: relative;
  overflow: visible;
  margin-top: 40px;
  padding: 0 24px;
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
  ${media.tablet`
      gap:16px;`}
  ${media.desktop`
        gap:24px;`}
`;

const DonationLi = styled.li`
  display: block;
`;

const RightDiv = styled.div`
  min-width: 16px;
  margin-left: -16px;
`;

const LeftButton = styled.button`
  position: absolute;
  top: 170px;
  left: -40px;
  cursor: pointer;
`;

const RightButton = styled.button`
  position: absolute;
  top: 170px;
  right: -40px;
  cursor: pointer;
`;

const itemsPerPage = 4;

export default function DonationList({openDonationModal}) {
  const [donations, setDonations] = useState([]);
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const getDonationListData = async () => {
      const { list } = await fetchGetDonations();
      setDonations(list);
      return;
    };
    getDonationListData();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleResize = (e) => setIsDesktop(e.matches);

    mediaQuery.addEventListener("change", handleResize);
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const handleRightClick = () => {
    if (startIndex + itemsPerPage < donations.length) {
      setStartIndex((prev) => prev + itemsPerPage);
    }
  };
  const handleLeftClick = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex((prev) => prev - itemsPerPage);
    }
  };

  const visibleDonations = donations.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <DonationFlexListWrap>
      <h1>후원을 기다리는 조공</h1>
      <DonationFlexList>
        {isDesktop ? (
          startIndex === 0 || (
            <LeftButton onClick={handleLeftClick}>
              <img src={leftBtnImg} />
            </LeftButton>
          )
        ) : (
          <RightDiv />
        )}
        {visibleDonations.map((donation) => (
          <DonationLi key={donation.id}>
            <Donation donation={donation} openDonationModal={openDonationModal}/>
          </DonationLi>
        ))}
        {isDesktop ? (
          startIndex + itemsPerPage >= donations.length || (
            <RightButton onClick={handleRightClick}>
              <img src={rightBtnImg} />
            </RightButton>
          )
        ) : (
          <RightDiv />
        )}
      </DonationFlexList>
    </DonationFlexListWrap>
  );
}
