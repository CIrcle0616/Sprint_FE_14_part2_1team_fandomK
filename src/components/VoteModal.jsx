import { styled } from "styled-components";
import React, { useRef, useEffect, useState } from "react";

import Modal from "./GlobalModal";
import AlertModal from "./AlertModal";
import IdolHorizontalCardDiv from "./IdolHorizontalCard";
import { fetchGetIdols } from "../utils/idolApi";

import checkedRadioIcon from "../assets/icon/ic_radio_checked.png";
import radioIcon from "../assets/icon/ic_radio.png";
import useCredit from "../utils/useCredit";

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

const VoteModal = ({ isOpenP, onClose }) => {
  const [idolList, setIdolList] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [totalCredit, setTotalCredit] = useCredit();
  const [alert, setAlert] = useState(false);
  const [selectIdol, setSelectIdol] = useState();
  const [windowSize, setWindowSize] = useState(window.innerHeight);

  const fetchIdolList = async () => {
    const { list, nextCursor } = await fetchGetIdols({
      pageSize: 6, // 초기 데이터 충분히 로드
      cursor,
    });
    setIdolList((prevList) => [...prevList, ...list]);
    setCursor(nextCursor);
  };

  const handleVoteButton = () => {
    if (totalCredit >= 1000) {
      setTotalCredit(totalCredit - 1000);
      setAlert(false);
    } else {
      setAlert(true);
    }
  };

  useEffect(() => {
    if (isOpenP) {
      setIdolList([]);
      setCursor(null);
      fetchIdolList();
    }
  }, [isOpenP]);

  useEffect(() => {
    const innerSize = () => setWindowSize(window.innerHeight);
    window.addEventListener("resize", innerSize);
    return () => window.removeEventListener("resize", innerSize);
  }, []);

  // 스크롤 이벤트 처리 (데스크톱 전용)
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && cursor) {
      fetchIdolList();
    }
  };

  // 모달 열릴 때 상위 페이지 스크롤 방지

  return (
    <>
      {!alert && (
        <Modal
          title="이달의 여자 아이돌"
          isOpen={isOpenP}
          onClose={onClose}
          className="full-screen"
        >
          <VoteDiv onScroll={handleScroll} $height={windowSize}>
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
          <button onClick={handleVoteButton}>투표하기</button>
        </Modal>
      )}
      <AlertModal isOpen={alert} onClose={() => setAlert(false)} />
    </>
  );
};

export default VoteModal;
