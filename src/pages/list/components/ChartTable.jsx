import IdolHorizontalCard from "../../../components/IdolHorizontalCard";
import { useEffect, useState } from "react";
import { fetchChartDataByGender } from "../../../utils/idolApi";
import {
  Table,
  MenuComp,
  OrderedList,
  LoadMoreIdolBtn,
  SkeletonHorizontalCard,
  SkeletonCircle,
  SkeletonInfo,
  SkeletonRank,
  SkeletonText,
} from "../styles/ChartTableStyles";

// 스켈레톤 컴포넌트
const IdolHorizontalSkeleton = () => (
  <SkeletonHorizontalCard>
    <SkeletonCircle duration={0.5} baseColor="#333" highlightColor="#444" />
    <SkeletonRank duration={0.5} baseColor="#333" highlightColor="#444" />
    <SkeletonInfo>
      <SkeletonText
        width={150}
        duration={0.5}
        baseColor="#333"
        highlightColor="#444"
      />
    </SkeletonInfo>
  </SkeletonHorizontalCard>
);

export default function ChartTable({ setChartGender }) {
  const [idols, setIdols] = useState([]);
  const [selectedGender, setSelectedGender] = useState("female");
  const [currentCursor, setCurrentCursor] = useState(1);
  const [loading, setLoading] = useState(true);
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
      setLoading(true);
      //
      const minimumLoadingTime = new Promise((resolve) => {
        setTimeout(() => resolve(), 200); // 200ms = 0.2초
      });
      const fetchDataPromise = fetchChartDataByGender(selectedGender, {
        pageSize,
      });
      await Promise.all([fetchDataPromise, minimumLoadingTime]); //배열로 받은 Promise가 전부 resolve되기 전까지 반환하지 않는다.
      const { idols, nextCursor } = await fetchChartDataByGender(
        selectedGender,
        { pageSize }
      );
      setIdols(idols);
      setCurrentCursor(nextCursor);
      setLoading(false);
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
    setIdols((prevIdol) => [...prevIdol, ...loadedIdol]);
    setCurrentCursor(nextCursor);
  };

  const renderSkeleton = () =>
    Array.from({ length: pageSize }).map((_, index) => (
      <li key={index}>
        <IdolHorizontalSkeleton />
      </li>
    ));

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
      {loading ? (
        <OrderedList>{renderSkeleton()}</OrderedList>
      ) : (
        <OrderedList>
          {idols.map((idol, idx) => (
            <li key={idol.id}>
              <IdolHorizontalCard idol={idol} flex="row" idx={idx} />
            </li>
          ))}
        </OrderedList>
      )}
      {currentCursor && (
        <LoadMoreIdolBtn onClick={handleLoadMoreClick}>더 보기</LoadMoreIdolBtn>
      )}
    </Table>
  );
}
