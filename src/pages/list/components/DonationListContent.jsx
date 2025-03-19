// components/DonationListContent.jsx
import React from "react";
import Donation from "./Donation";
import PaginationArrow from "./PaginationArrow";
import leftBtnImg from "../../../assets/icon/btn_pagination_arrow_left.svg";
import rightBtnImg from "../../../assets/icon/btn_pagination_arrow_right.svg";
import {
  DonationFlexListWrap,
  DonationFlexList,
  DonationLi,
} from "../styles/DonationListStyles";

const DonationListContent = React.memo(
  ({
    isDesktop,
    startIndex,
    donations,
    visibleDonations,
    handlePagination,
    openDonationModal,
    itemsPerPage,
  }) => (
    <DonationFlexListWrap>
      <h1>후원을 기다리는 조공</h1>
      <DonationFlexList>
        {isDesktop && startIndex > 0 && (
          <PaginationArrow
            direction="left"
            onClick={() => handlePagination("left")}
            src={leftBtnImg}
          />
        )}
        {!isDesktop && <div />}

        {visibleDonations.map((donation) => (
          <DonationLi key={donation.id}>
            <Donation
              donation={donation}
              openDonationModal={openDonationModal}
            />
          </DonationLi>
        ))}

        {isDesktop && startIndex + itemsPerPage < donations.length && (
          <PaginationArrow
            direction="right"
            onClick={() => handlePagination("right")}
            src={rightBtnImg}
          />
        )}
        {!isDesktop && <div />}
      </DonationFlexList>
    </DonationFlexListWrap>
  )
);

export default DonationListContent;
