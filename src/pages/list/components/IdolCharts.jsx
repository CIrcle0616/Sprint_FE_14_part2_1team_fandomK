import styled from "styled-components";
import chartIcon from "../../../assets/icon/ic_chart.svg";
import ChartTable from "./ChartTable";

const ChartWrapper = styled.div`
  margin-top: 40px;
  padding: 0 24px;
  color: #ffffff;
  & .header {
    width: 327px;
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & .header h1 {
    font-size: 16px;
    font-weight: 700;
  }
  & .header button {
    width: 128px;
    height: 32px;
    display: flex;
    gap: 4px;
    align-items: center;
    border-radius: 3px;
    padding: 2px 16px 3px;
    background: linear-gradient(to right, #f86f65, #fe5493);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2%;
    color: #ffffff;
    white-space: nowrap;
  }
  & .header img {
    width: 24px;
    height: 24px;
  }
`;

export default function IdolCharts() {
  return (
    <ChartWrapper>
      <div className="header">
        <h1>이달의 차트</h1>
        <button>
          <img src={chartIcon} />
          차트 투표하기
        </button>
      </div>
      <ChartTable />
    </ChartWrapper>
  );
}
