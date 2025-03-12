import styled from "styled-components";
import IdolHorizontalCard from "../../../components/IdolHorizontalCard";
import { useEffect, useState } from "react";
import { fetchChartDataByGender } from "../../../utils/idolApi";

const Table = styled.div`
  width: 100%;
  & .chartHeader {
    display: flex;
  }
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
`;

export default function ChartTable() {
  const [idols, setIdols] = useState([]);
  const [selectedGender, setSelectedGender] = useState("female");

  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
  };

  useEffect(() => {
    const getChartListData = async () => {
      const { idols } = await fetchChartDataByGender(selectedGender, {});
      setIdols(idols);
      return;
    };

    getChartListData();
  }, [selectedGender]);

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
    </Table>
  );
}
