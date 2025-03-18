import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Modal from "./GlobalModal";
import creditIcon from "../assets/icon/ic_credit.svg";
import ChargeModal from "./ChargeModal";
import useCredit from "../hooks/useCredit";
import ModalButton from "./ModalButton";
import { Button } from "./ModalButton";
import { fetchPutDonationContribute } from "../utils/donationApi";

const DonationContent = styled.div`
  width: 295px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;

  div:nth-of-type(1) {
    font-size: 12px;
    color: #8c92ab;
  }

  div:nth-of-type(2) {
    font-size: 14px;
    color: #f7f7f8;
  }
`;

const ImgContainer = styled.div`
  width: 158px;
  height: 206px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
  }
`;
const DonationInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 158px;
  gap: 6px;
`;

const DonationInput = styled.input`
  width: 295px;
  height: 58px;
  border-radius: 8px;
  background-color: #272f3d;
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  padding: 16px;

  border: ${({ $totalCredit, $inputCredit }) =>
    $totalCredit < $inputCredit ? "solid 1px #ff3b3b" : "solid 1px #ffffff"};

  placeholder {
    color: #67666e;
  }

  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const DonationInputContainer = styled.div`
  position: relative;
`;
const DonationImg = styled.img`
  position: absolute;
  right: 15px;
  bottom: 13px;
`;

const DonatioVisibleDiv = styled.div`
  display: ${({ $showWarning }) => ($showWarning ? "block" : "none")};
  height: 14px;
  font-size: 12px;
  color: #ff2626;
`;

const ChargeVisibleButton = styled(Button)`
  margin-top: 0;
  display: ${({ $showWarning }) => ($showWarning ? "block" : "none")};
`;

function DonationModal({ isOpenP, onClose, donation, loadingAmountOfDonate }) {
  const [inputCredit, setInputCredit] = useState(0); // 사용자가 입력한 크레딧
  const [showWarning, setShowWarning] = useState(false); // 보유크레딧 보다 사용자가 입력한 크레딧이 많을 때
  const [totalCredit, setTotalCredit] = useCredit(); // 보유한 총 크레딧
  const [openOtherModal, setOpenOtherModal] = useState(false); // 충전하기 모달을 열 때
  const [disabledBtn, setDisableBtn] = useState(false);

  // donation 구조분해 할당
  const { id, idol = {}, title = "", subtitle = "" } = donation || {};

  // 크레딧 입력창에 입력한 크레딧을 inputCredit에 저장
  const handleInputChange = (e) => {
    setInputCredit(Number(e.target.value));
  };

  // "-" "+" "." 키를 눌렀을 때 입력 방지 & enter를 눌렀을 때 후원보내기
  const handleKeyDownMinus = async (e) => {
    if (e.key === "-" || e.key === "+" || e.key === ".") {
      e.preventDefault();
    } else if (e.key === "Enter") {
      if (!showWarning) {
        setTotalCredit(totalCredit - inputCredit);
        try {
          onClose();
          const data = await fetchPutDonationContribute(id, inputCredit);
          const { receivedDonations } = data;
          loadingAmountOfDonate(id, receivedDonations);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  // 인풋에 크레딧 입력시 실시간으로 크레딧 부족 경고를 받을 수 있게 변경
  useEffect(() => {
    setShowWarning(totalCredit < inputCredit);
    setDisableBtn(totalCredit < inputCredit);
  }, [totalCredit, inputCredit]);

  // 후원하기 버튼을 눌렀을때
  // 보유 크레딧에서 사용자가 입력한 크레딧을 뺀 크레딧을 localStorage에 저장
  const handleDonationButtonClick = async () => {
    if (totalCredit >= inputCredit) {
      setTotalCredit(totalCredit - inputCredit);
      try {
        onClose();
        const data = await fetchPutDonationContribute(id, inputCredit);
        const { receivedDonations } = data;
        loadingAmountOfDonate(id, receivedDonations);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 충전하기 버튼을 눌렀을 때 충전하기 모달 보여주기
  const handleShowChargeModal = () => {
    setOpenOtherModal(true);
  };

  // 충전하기, 후원하기 모달창을 열고 닫을 때 경고 div 숨김 and inputCredit 초기화
  useEffect(() => {
    setShowWarning(false);
    setInputCredit(0);
    setDisableBtn(true);
  }, [isOpenP, openOtherModal]);

  // console.log(disabledBtn);

  return (
    <>
      {!openOtherModal && (
        <Modal title="후원하기" isOpen={isOpenP} onClose={onClose}>
          <DonationContent>
            <ImgContainer>
              <img src={idol.profilePicture}></img>
            </ImgContainer>
            <DonationInfo>
              <div>{subtitle}</div>
              <div>{title}</div>
            </DonationInfo>
          </DonationContent>
          <DonationInputContainer>
            <DonationInput
              placeholder="크레딧 입력"
              type="number"
              min="0"
              $totalCredit={parseInt(totalCredit)}
              $inputCredit={inputCredit}
              onChange={handleInputChange}
              onKeyDown={handleKeyDownMinus}
            />
            <DonationImg src={creditIcon} />
          </DonationInputContainer>
          {/* 가지고 있는 크레딧 보다 많은 크레딧을 입력한 경우*/}
          <DonatioVisibleDiv $showWarning={showWarning}>
            갖고 있는 크레딧보다 더 많이 후원할 수 없어요
          </DonatioVisibleDiv>
          <ModalButton
            onClick={handleDonationButtonClick}
            disabled={disabledBtn}
          >
            후원하기
          </ModalButton>
          {/* 가지고 있는 크레딧 보다 많은 크레딧을 입력한 경우
          버튼을 보이게하고 버튼 클릭시 ChargeModal로 이동 */}
          <ChargeVisibleButton
            onClick={handleShowChargeModal}
            $showWarning={showWarning}
          >
            충전하러 가기
          </ChargeVisibleButton>
        </Modal>
      )}
      {/* 충전하러가기 버튼을 누르면 충전하기 모달 보이기 */}
      <ChargeModal
        isOpenP={openOtherModal}
        onClose={() => setOpenOtherModal(false)}
      />
    </>
  );
}

export default DonationModal;
