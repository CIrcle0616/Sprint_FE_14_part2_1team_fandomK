// DonationList.jsx
import React, { useState, useCallback, useMemo } from "react";
import DonationListContent from "../components/DonationListContent";
import DonationListSkeleton from "../components/DonationListSkeleton";
import { useResponsive } from "../../../hooks/useResponsive";
import { ITEMS_PER_PAGE } from "../constants/donationConstants";
import { RightDiv } from "../styles/DonationListStyles";

const DonationList = ({ donations = [], isLoading = false, openDonationModal }) => {
  const { isDesktop } = useResponsive();
  const [startIndex, setStartIndex] = useState(0);

  const handlePagination = useCallback((direction) => {
    if (direction === "left" && startIndex - ITEMS_PER_PAGE >= 0) {
      setStartIndex(prev => prev - ITEMS_PER_PAGE);
    } else if (
      direction === "right" &&
      startIndex + ITEMS_PER_PAGE < donations.length
    ) {
      setStartIndex(prev => prev + ITEMS_PER_PAGE);
    }
  }, [startIndex, donations.length]);

  const visibleDonations = useMemo(() => 
    isDesktop
      ? donations.slice(startIndex, startIndex + ITEMS_PER_PAGE)
      : donations
  , [isDesktop, donations, startIndex]);

  return (
    <div>
      <RightDiv>후원을 기다리는 조공</RightDiv>
      {isLoading ? (
        <DonationListSkeleton 
          isDesktop={isDesktop} 
          itemsPerPage={ITEMS_PER_PAGE} 
        />
      ) : (
        <DonationListContent 
          isDesktop={isDesktop}
          startIndex={startIndex}
          donations={donations}
          visibleDonations={visibleDonations}
          handlePagination={handlePagination}
          openDonationModal={openDonationModal}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}
    </div>
  );
};

export default React.memo(DonationList);
