import styled from "styled-components";
import IdolCircle from "../../../components/IdolCircle";

const TotalIdolList = styled.ul`
  margin-bottom: 48px;
  display: flex;
  gap: 32px 22px;
`;

//get http 요청으로 아이돌 불러오기
export default function SelectedIdol() {
  return (
    <div>
      <TotalIdolList>
        
      </TotalIdolList>
    </div>
  );
}
