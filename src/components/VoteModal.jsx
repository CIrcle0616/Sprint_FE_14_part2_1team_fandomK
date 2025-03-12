import { styled } from "styled-components";
import React, { useRef, useEffect, useState } from "react";

import Modal from "./GlobalModal";
import AlertModal from "./AlertModal";
import IdolHorizontalCardDiv from "./IdolHorizontalCard";
import { fetchGetIdols } from "../utils/idolApi";

import checkedRadioIcon from "../assets/icon/ic_radio_checked.png";
import radioIcon from "../assets/icon/ic_radio.png";

const VoteDiv = styled.div`
  background: #181d26;
  overflow-y: auto;
  max-height: 520px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    max-height: ${(props) => props.height - 200}px;
  }
`;
const VoteList = styled.div`
  width: 477px;
  height: 70px;
  display: flex;
  align-items: center;

  img:last-child {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
  }
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

  span {
    color: #f96d69;
  }
`;

function VoteModal({ isOpenP, onClose }) {
  const [idolList, setIdolList] = useState([]); // fetchGetIdol로 받아온 아이돌 리스트
  const [cursor, setCursor] = useState(null); // fetchGetIdol로 받아온 nextCursor
  const [totalCredit, setTotalCredit] = useState(
    localStorage.getItem("credit")
  ); // 총 보유 크레딧을 localStorage에서 가져오기
  const [alert, setAlert] = useState(false); // 보유 크레딧이 적을경우 알림
  const [selectIdol, setSelectIdol] = useState(); // 사용자가 투표를 위해 선택한 아이돌
  const [windowSize, setWindowSize] = useState(window.innerHeight);

  // idolApi에서 fetchGetIdols로 아이돌 불러오기
  // 불러온 아이돌과 nextCursor를 idolList, cursor에 저장
  const fetchIdolList = async () => {
    const { list, nextCursor } = await fetchGetIdols({
      pageSize: 6,
      cursor,
    });
    setIdolList((prevList) => [...prevList, ...list]);
    setCursor(nextCursor);
  };

  // 투표하기 버튼을 누를때 onClick에서 불러오는 함수
  // 한번 투표할 때 1000크레딧 감소. 감소한 크레딧(result)를 localStorage에 set
  const handleVoteButton = () => {
    if (parseInt(totalCredit) > 1000) {
      const result = parseInt(totalCredit) - 1000;
      localStorage.setItem("credit", result.toString());
      setTotalCredit(result);
      setAlert(false);
    } else {
      setAlert(true); // 크레딧이 1000미만이면 alertModal open
    }
  };

  // 크레딧 부족 모달이 열릴때마다 새로운 데이터 요청. 이전 데이터를 초기화 하기 위해
  useEffect(() => {
    if (isOpenP) {
      setIdolList([]);
      setCursor(null);
      fetchIdolList();
    }
  }, [isOpenP]);

  // 모바일 환경에서 투표 모달이 전체 화면으로 채워질때 스크롤 이벤트를 위한 windowSize 이벤트
  useEffect(() => {
    const innerSize = () => setWindowSize(window.innerHeight);
    window.addEventListener("resize", innerSize);
    return () => window.removeEventListener("resize", innerSize);
  }, [windowSize]);

  // 스크롤 이벤트
  // 스크롤이 clientHeight만큼 내려갔는지와 NextCursor가 있는지 조건으로 아이돌 리스트 불러옴
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (scrollHeight - scrollTop <= clientHeight + 1 && cursor) {
      fetchIdolList();
    }
  };

  return (
    <>
      {/* 크레딧 부족 창이 뜨면 투표하기 모달이 닫힘 */}
      {!alert && (
        <Modal
          title="이달의 여자 아이돌"
          isOpen={isOpenP}
          onClose={onClose}
          className="full-screen"
        >
          <VoteDiv onScroll={handleScroll} height={windowSize}>
            {idolList.map((idol, idx) => (
              <React.Fragment key={`${idol.id}_${idx}`}>
                <VoteList onClick={() => setSelectIdol(idol.id)}>
                  <IdolHorizontalCardDiv idol={idol} flex="col" idx={idx} />
                  <img
                    src={selectIdol === idol.id ? checkedRadioIcon : radioIcon}
                  />
                </VoteList>
                <VoteListHr />
              </React.Fragment>
            ))}
          </VoteDiv>
          <VoteDisDiv>
            투표하는데 <span>1000 크레딧</span>이 소모됩니다.
          </VoteDisDiv>
          <button onClick={handleVoteButton}>ddsfdfsdf</button>
        </Modal>
      )}
      <AlertModal isOpen={alert} onClose={() => setAlert(false)} />
    </>
  );
}

export default VoteModal;
