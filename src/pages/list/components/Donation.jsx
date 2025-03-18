import creditImg from "../../../assets/icon/ic_credit.png";
import donationImgCover from "../../../assets/images/cover_donation.svg";
import { useMemo } from "react";
import {
  DonationCard,
  DonationImgWrapper,
  DonationImg,
  DonateBtn,
  DonationDescription,
  CoverImg,
  ProgressBar,
  ProgressBarWrap,
  CreditCount,
  TextSpan,
} from "../styles/DonationStyles";

export default function Donation({ donation, openDonationModal }) {
  const { title, subtitle, targetDonation, receivedDonations, idol, deadline } =
    donation;
  const fundingProgressPercent =
    (receivedDonations / targetDonation).toFixed(2) * 100;

  const daysRemaining = useMemo(() => {
    const currentDate = new Date(); // 현재 날짜
    const deadlineDate = new Date(deadline); // deadline을 Date 객체로 변환
    const timeDifferenceMs = deadlineDate - currentDate; // 밀리초 차이
    const millisecondsInADay = 24 * 60 * 60 * 1000; // 하루의 밀리초
    return Math.floor(timeDifferenceMs / millisecondsInADay); // 남은 일수
  }, [deadline]); // deadline이 변경될 때만 재계산

  return (
    <DonationCard>
      <DonationImgWrapper>
        <DonationImg src={idol.profilePicture} alt="민지" />
        {/* donation props를 인자로 전달하여 모달 열기 */}
        <DonateBtn onClick={() => openDonationModal(donation)}>
          후원하기
        </DonateBtn>
        <CoverImg src={donationImgCover} />
      </DonationImgWrapper>
      <DonationDescription>
        <h3>{subtitle}</h3>
        <h2>{title}</h2>
        <ProgressBarWrap>
          <CreditCount>
            <img src={creditImg} alt="credit" />
            <span>{receivedDonations || "0"}</span>
          </CreditCount>
          <TextSpan>{`${daysRemaining}일 남음`}</TextSpan>
        </ProgressBarWrap>
        <ProgressBar fundingProgressPercent={fundingProgressPercent}>
          <div></div>
        </ProgressBar>
      </DonationDescription>
    </DonationCard>
  );
}
