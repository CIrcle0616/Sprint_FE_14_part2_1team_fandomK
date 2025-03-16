import { useEffect, useState } from "react";
import Donation from "../components/Donation";
import { styled } from "styled-components";
import media from "../../../utils/mediaHelper";
import leftBtnImg from "../../../assets/icon/btn_pagination_arrow_left.svg";
import rightBtnImg from "../../../assets/icon/btn_pagination_arrow_right.svg";
import DonationSkeleton from "../components/DonationSkeleton";

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

const PaginationButton = styled.button`
  position: absolute;
  top: 170px;
  cursor: pointer;
  ${({ direction }) =>
    direction === "left" ? "left: -40px;" : "right: -40px;"}
`;

const ITEMS_PER_PAGE = 4;

const PaginationArrow = ({ direction, onClick, src }) => (
  <PaginationButton direction={direction} onClick={onClick}>
    <img src={src} alt={`${direction} arrow`} />
  </PaginationButton>
);

export default function DonationList({
  donations,
  isLoading,
  openDonationModal,
}) {
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 1440px)").matches
  );
  const [startIndex, setStartIndex] = useState(0);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1440px)");
    const handleResize = (e) => setIsDesktop(e.matches);

    mediaQuery.addEventListener("change", handleResize);
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const handlePagination = (direction) => {
    if (direction === "left" && startIndex - ITEMS_PER_PAGE >= 0) {
      setStartIndex((prev) => prev - ITEMS_PER_PAGE);
    } else if (
      direction === "right" &&
      startIndex + ITEMS_PER_PAGE < donations.length
    ) {
      setStartIndex((prev) => prev + ITEMS_PER_PAGE);
    }
  };

  const visibleDonations = isDesktop
    ? donations.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    : donations;

  const renderSkeleton = () => (
    <>
      {!isDesktop && <RightDiv />}
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
        <DonationLi key={index}>
          <DonationSkeleton />
        </DonationLi>
      ))}
      {!isDesktop && <RightDiv />}
    </>
  );

  const renderContent = () => (
    <>
      {isDesktop && startIndex > 0 && (
        <PaginationArrow
          direction="left"
          onClick={() => handlePagination("left")}
          src={leftBtnImg}
        />
      )}
      {!isDesktop && <RightDiv />}
      {visibleDonations.map((donation) => (
        <DonationLi key={donation.id}>
          <Donation donation={donation} openDonationModal={openDonationModal} />
        </DonationLi>
      ))}
      {isDesktop && startIndex + ITEMS_PER_PAGE < donations.length && (
        <PaginationArrow
          direction="right"
          onClick={() => handlePagination("right")}
          src={rightBtnImg}
        />
      )}
      {!isDesktop && <RightDiv />}
    </>
  );

  return (
    <DonationFlexListWrap>
      <h1>후원을 기다리는 조공</h1>
      <DonationFlexList>
        {isLoading ? renderSkeleton() : renderContent()}
      </DonationFlexList>
    </DonationFlexListWrap>
  );
}
