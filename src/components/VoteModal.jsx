import { styled } from "styled-components";
import React, { useRef, useEffect, useState } from "react";

import Modal from "./GlobalModal";
import AlertModal from "./AlertModal";
import IdolHorizontalCardDiv from "./IdolHorizontalCard";
import { fetchChartDataByGender, fetchVoteIdol } from "../utils/idolApi";

import creditIcon from "../assets/icon/ic_credit.svg";
import checkedRadioIcon from "../assets/icon/ic_radio_checked.png";
import radioIcon from "../assets/icon/ic_radio.png";
import useCredit from "../hooks/useCredit";
import { Button } from "./ModalButton";

const VoteDiv = styled.div`
  background: #181d26;
  overflow-y: auto;
  max-height: 495px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    max-height: ${({ $height }) => $height - 200}px;
  }
`;
const VoteList = styled.div`
  width: 477px;
  height: 70px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
  }
`;

const RadioImg = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`;

const VoteListHr = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #ffffff;
  border: 0;
  opacity: 0.3;
`;

const VoteDisDiv = styled.div`
  color: #ffffff;
  font-size: 12px;
  text-align: center;
  margin-top: 12px;

  span {
    color: #f96d69;
  }
`;

const ModalVoteButton = styled(Button)`
  width: 477px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const NotSelectModal = styled(Modal)`
  padding: 0 12px 20px;
  img {
    width: 113px;
    height: 113px;
    margin: 0 auto;
  }
  div {
    color: #fff;
    font-size: 15px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 20px;
  }
  button {
    width: 250px;
    height: 42px;
    color: #ffffff;
    background: ${(props) =>
      props.disabled
        ? "#828282"
        : "linear-gradient(to left, #fe5493 0%, #f86f65 100%)"};
    font-size: 14px;
    font-weight: 600;
    border-radius: 3px;
  }
`;

const VoteModal = ({ isOpenP, onClose, chartGender }) => {
  const [idolList, setIdolList] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [totalCredit, setTotalCredit] = useCredit();
  const [alert, setAlert] = useState(false);
  const [selectIdol, setSelectIdol] = useState(null);
  const [windowSize, setWindowSize] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [notSelectedIdol, setNotSelectedIdol] = useState(false);
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);

  const fetchIdolList = async (reset = false) => {
    // 모달을 처음 열때 cursor를 초기화 하기 위해 reset 파라미터 추가 -> 모달 열때마다 새로운 리스트 불러오는거 방지
    const fetchCursor = reset ? null : cursor;
    const newPageSize = windowWidth < 768 ? 15 : 6;
    const { idols, nextCursor } = await fetchChartDataByGender(chartGender, {
      pageSize: newPageSize, // 초기 데이터 충분히 로드
      cursor: fetchCursor,
    });

    // 아이돌 리스트가 중복 호출되는 버그 방지
    setIdolList((prevList) => {
      const newIdols = idols.filter(
        (idol) => !prevList.some((prev) => prev.id === idol.id)
      );

      return reset ? idols : [...prevList, ...newIdols];
    });
    setCursor(nextCursor);
  };

  const handleVoteButton = async () => {
    if (!selectIdol) {
      setNotSelectedIdol(true);
      return;
    }

    if (totalCredit >= 1000) {
      setTotalCredit(totalCredit - 1000);
      setAlert(false);
      try {
        const response = await fetchVoteIdol(selectIdol); // 투표 후 반환 데이터
        const idolRes = response.idol;

        // 현재 아이돌 리스트(prevList)의 요소(idol)를 순회하면서 totalVotes를 새로 할당
        setIdolList((prevList) => {
          const updateList = prevList.map((idol) =>
            idol.id === selectIdol
              ? { ...idol, totalVotes: idolRes.totalVotes }
              : idol
          );
          // 순위가 변동 되었을 때 정렬하기 위해
          return updateList.sort((a, b) => b.totalVotes - a.totalVotes);
        });
      } catch (error) {
        console.error("투표 요청 실패:", error);
      }
    } else {
      setAlert(true);
    }
  };

  useEffect(() => {
    if (isOpenP) {
      // cursor:null로 첫페이지 리스트 로드
      fetchIdolList(true);
    }
  }, [isOpenP, chartGender, windowWidth]);

  // useEffect(() => {
  //   const innerSize = () => setWindowSize(window.innerHeight);
  //   window.addEventListener("resize", innerSize);
  //   return () => window.removeEventListener("resize", innerSize);
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && cursor) {
      fetchIdolList(false);
    }
  };

  return (
    <>
      <Modal
        title={`이달의 ${chartGender === "female" ? "여자" : "남자"} 아이돌`}
        isOpen={isOpenP}
        onClose={
          notSelectedIdol || alert || isChargeModalOpen ? () => {} : onClose
        }
        className="full-screen"
      >
        <VoteDiv onScroll={handleScroll} $height={windowSize}>
          {idolList.map((idol, idx) => (
            <React.Fragment key={`${idol.id}_${idx}`}>
              <VoteList onClick={() => setSelectIdol(idol.id)}>
                <IdolHorizontalCardDiv
                  idol={idol}
                  flex="col"
                  idx={idx}
                  isSelected={selectIdol === idol.id}
                />
                <RadioImg
                  src={selectIdol === idol.id ? checkedRadioIcon : radioIcon}
                />
              </VoteList>
              <VoteListHr />
            </React.Fragment>
          ))}
        </VoteDiv>
        <ModalVoteButton onClick={handleVoteButton}>투표하기</ModalVoteButton>
        <VoteDisDiv>
          투표하는데 <span>1000 크레딧</span>이 소모됩니다.
        </VoteDisDiv>
      </Modal>

      <AlertModal
        isOpen={alert}
        onClose={() => setAlert(false)}
        setIsChargeModalOpen={setIsChargeModalOpen}
      />
      <NotSelectModal
        isOpen={notSelectedIdol}
        onClose={() => setNotSelectedIdol(false)}
        hideCloseBtn={true}
        className="alert"
      >
        <img src={creditIcon} />
        <div>투표할 아이돌을 선택해 주세요</div>
        <button onClick={() => setNotSelectedIdol(false)}>확인</button>
      </NotSelectModal>
    </>
  );
};

export default VoteModal;
