import React from "react";
import { PaginationButton } from "../styles/DonationListStyles";

const PaginationArrow = React.memo(({ direction, onClick, src }) => (
  <PaginationButton onClick={onClick} direction={direction}>
    <img src={src} alt={`${direction} pagination arrow`} />
  </PaginationButton>
));

export default PaginationArrow;
