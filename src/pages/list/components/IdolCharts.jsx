import chartIcon from "../../../assets/icon/ic_chart.svg";
import ChartTable from "./ChartTable";
import { ChartWrapper } from "../styles/IdolChartsStyles";

export default function IdolCharts({ openVoteModal, setChartGender }) {
  return (
    <ChartWrapper>
      <div className="header">
        <h1>이달의 차트</h1>
        <button onClick={openVoteModal}>
          <img src={chartIcon} />
          차트 투표하기
        </button>
      </div>
      {/* //성별 탭 변경 시 투표하기 모달의 리스트 변경 */}
      <ChartTable setChartGender={setChartGender} />
    </ChartWrapper>
  );
}
