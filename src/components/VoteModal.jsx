import { styled } from "styled-components";
import Modal from "./GlobalModal";
import IdolModalHrCard from "./IdolModalHrCard";
const fetchMockIdol = async () => {
  const response = await fetch(
    "https://fandom-k-api.vercel.app/14-1/idols?pageSize=6"
  );
  if (!response.ok) return;
  const data = await response.json();
  console.log(data);
  const idols = data.list;
  return idols;
};

const VoteDiv = styled.div`
  background-color: #181d26;
`;
const VoteList = styled.div`
  width: 477px;
  height: 70px;
`;

const VoteListHr = styled.hr`
  width: 100%;
  height: 1px;
  background-color:#ffffff
  border: 0;
  opacity:0.3;
`;

const VoteDisDiv = styled.div`
  color: #ffffff;
  font-size: 12px;
  text-align: center;

  span {
    color: #f96d69;
  }
`;

const mockIdols = await fetchMockIdol();

function VoteModal({ isOpenP, onClose }) {
  return (
    <Modal title="이달의 여자 아이돌" isOpen={isOpenP} onClose={onClose}>
      <VoteDiv>
        {mockIdols.map((idol, idx) => {
          return (
            <>
              <VoteList key={idol.id}>
                <IdolModalHrCard idol={idol} flex="col" idx={idx} />
              </VoteList>
              <VoteListHr />
            </>
          );
        })}
      </VoteDiv>
      <VoteDisDiv>
        투표하는데 <span>1000 크레딧</span>이 소모됩니다.
      </VoteDisDiv>
    </Modal>
  );
}

export default VoteModal;
