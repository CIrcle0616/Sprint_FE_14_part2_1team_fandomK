import styled from "styled-components";
import IdolCircle from "../../../components/IdolCircle";

const TotalIdolList = styled.ul`
  margin-bottom: 48px;
  display: flex;
  gap: 32px 22px;
`;

//get http 요청으로 아이돌 불러오기
const fetchMockIdol = async () => {
  const response = await fetch(
    "https://fandom-k-api.vercel.app/14-1/idols?pageSize=10"
  );
  if (!response.ok) return;
  const data = await response.json();
  const idols = data.list;
  return idols;
};
const mockIdols = await fetchMockIdol();

export default function SelectedIdol() {
  return (
    <div>
      <TotalIdolList>
        {mockIdols.map((idol) => (
          <li key={idol.id}>
            <button type="button">
              <IdolCircle idol={idol} />
            </button>
          </li>
        ))}
      </TotalIdolList>
    </div>
  );
}
