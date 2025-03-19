import React from 'react';
import DonationSkeleton from "./DonationSkeleton";
import { DonationFlexListWrap, DonationFlexList, DonationLi } from "../styles/DonationListStyles";

const DonationListSkeleton = React.memo(({ isDesktop, itemsPerPage }) => (
  <DonationFlexListWrap>
    <DonationFlexList>
      {!isDesktop && <div />}
      {Array.from({ length: itemsPerPage }).map((_, index) => (
        <DonationLi key={`skeleton-${index}`}>
          <DonationSkeleton />
        </DonationLi>
      ))}
      {!isDesktop && <div />}
    </DonationFlexList>
  </DonationFlexListWrap>
));

export default DonationListSkeleton;
