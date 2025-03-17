import styled from "styled-components";
import IdolHorizontalCard from "../../../components/IdolHorizontalCard";
import { useEffect, useState } from "react";
import { fetchChartDataByGender } from "../../../utils/idolApi";
import media from "../../../utils/mediaHelper";

const Table = styled.div`
  width: 100%;
  & .chartHeader {
    display: flex;
  }
  padding-bottom: 150px;
`;

const MenuComp = styled.button`
  width: 50%;
  margin-top: 16px;
  padding: 12px;
  color: ${(props) => (props.active ? "#FFFFFF" : "#ffffff1a")};
  background-color: ${(props) => (props.active ? "#FFFFFF1A" : undefined)};
  border-bottom: ${(props) => (props.active ? "1px solid #ffffff" : undefined)};
  align-items: center;
  font-size: 14px;
  text-align: center;
`;

const OrderedList = styled.ol`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  & li {
    display: block;
    padding-bottom: 8px;
    border-bottom: 1px solid #ffffff1a;
  }
  & li:last-child {
    border: none;
  }
  ${media.desktop`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 24px;
    `}
`;

const LoadMoreIdolBtn = styled.button`
  display: block;
  max-width: 326px;
  max-height: 42px;
  margin: 40px auto;
  padding: 8px 143px;
  border: 1px solid #f1eef9cc;
  border-radius: 3px;
  background-color: #ffffff1a;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 0%;
  white-space: nowrap;
`;

export default function ChartTable({ setChartGender }) {
  const [idols, setIdols] = useState([]);
  const [selectedGender, setSelectedGender] = useState("female");
  const [currentCursor, setCurrentCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 1440px)").matches
  );
  const pageSize = isDesktop ? 10 : 5;

  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
    setChartGender(gender); //성별 탭 변경 시 투표하기 모달의 리스트 변경
  };
  // 데스크톱을 감지해서 IDOL호출 갯수 조절
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1440px)");
    const handleResize = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  useEffect(() => {
    const getChartListData = async () => {
      const { idols, nextCursor } = await fetchChartDataByGender(
        selectedGender,
        { pageSize }
      );
      setIdols(idols);
      setCurrentCursor(nextCursor);
      return;
    };
    getChartListData();
  }, [selectedGender, pageSize]);

  const handleLoadMoreClick = async () => {
    if (currentCursor === null) return;
    const { idols: loadedIdol, nextCursor } = await fetchChartDataByGender(
      selectedGender,
      { cursor: currentCursor, pageSize }
    );
    console.log(loadedIdol, nextCursor);
    setIdols((prevIdol) => [...prevIdol, ...loadedIdol]);
    setCurrentCursor(nextCursor);
  };

  return (
    <Table isGender={selectedGender}>
      <div className="chartHeader">
        <MenuComp
          active={selectedGender === "female"}
          onClick={() => handleGenderClick("female")}
        >
          이달의 여자 아이돌
        </MenuComp>
        <MenuComp
          active={selectedGender === "male"}
          onClick={() => handleGenderClick("male")}
        >
          이달의 남자 아이돌
        </MenuComp>
      </div>
      <OrderedList>
        {idols.map((idol, idx) => (
          <li key={idol.id}>
            <IdolHorizontalCard idol={idol} flex="row" idx={idx} />
          </li>
        ))}
      </OrderedList>
      {currentCursor && (
        <LoadMoreIdolBtn onClick={handleLoadMoreClick}>더 보기</LoadMoreIdolBtn>
      )}
    </Table>
  );
}
