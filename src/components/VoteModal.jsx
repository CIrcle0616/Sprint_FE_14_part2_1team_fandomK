import { styled } from "styled-components";

import Modal from "./GlobalModal";
import AlertModal from "./AlertModal";
import IdolModalHrCard from "./IdolModalHrCard";
import { fetchGetIdols } from "../utils/apiUtil";
import React, { useEffect, useState } from "react";
import creditIcon from "../assets/icon/ic_credit.png";

const VoteDiv = styled.div`
  background-color: #181d26;
  overflow-y: auto;
  max-height: 520px;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const VoteList = styled.div`
  width: 477px;
  height: 70px;
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
  const [idolList, setIdolList] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [totalCredit, setTotalCredit] = useState(
    localStorage.getItem("credit")
  );
  const [alert, setAlert] = useState(false);

  const fetchIdolList = async () => {
    const { list, nextCursor } = await fetchGetIdols({
      pageSize: 6,
      cursor,
    });
    setIdolList((prevList) => [...prevList, ...list]);
    setCursor(nextCursor);
  };

  const handleVoteButton = () => {
    if (parseInt(totalCredit) > 1000) {
      const result = parseInt(totalCredit) - 1000;
      localStorage.setItem("credit", result.toString());
      setTotalCredit(result);
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

  // 스크롤 이벤트
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (scrollHeight - scrollTop <= clientHeight + 1 && cursor) {
      fetchIdolList();
    }
  };

  return (
    <>
      <Modal title="이달의 여자 아이돌" isOpen={isOpenP} onClose={onClose}>
        <VoteDiv onScroll={handleScroll}>
          {idolList.map((idol, idx) => (
            <React.Fragment key={idol.id}>
              <VoteList>
                <IdolModalHrCard idol={idol} flex="col" idx={idx} />
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
      <AlertModal isOpen={alert} />
    </>
  );
}

export default VoteModal;
