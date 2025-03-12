import IdolCircle from "./IdolCircle";
import IdolInfo from "./IdolInfo";
import { styled } from "styled-components";

export const IdolHorizontalCardDiv = styled.div`
  max-width: 100%;
  height: 70px;
  display: flex;
  flex-grow: 1;
  gap: 12px;
  border: none;
  background-color: ${(props) => {
    props.flex === "row" ? "transparent" : "#181d26";
  }};

  & div {
    display: flex;
    align-items: center;
    color: #f96d69;
    font-size: 16px;
    font-weight: 400;
  }
`;

// const demoIdol = {
//   name: "김채원",
//   totalVotes: 200400,
// };

export default function IdolHorizontalCard({ idol, flex, idx }) {
  const rank = idx + 1;
  return (
    <IdolHorizontalCardDiv>
      <IdolCircle idol={idol} size={"70px"} />
      <div>{rank}</div>
      <IdolInfo idol={idol} flex={flex} />
    </IdolHorizontalCardDiv>
  );
}
