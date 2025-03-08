import IdolHorizontalCard from "./IdolHorizontalCard";
import { styled } from "styled-components";
import RadioComponent from "./RadioComponent";

const IdolModalHrCardDiv = styled.div`
  max-width: 100%;
  height: 70px;
  display: flex;
  border: none;
  background-color: #181d26;
  color: #f7f7f8;
`;

export default function IdolModalHrCard({ idol, flex, idx }) {
  return (
    <IdolModalHrCardDiv>
      <IdolHorizontalCard idol={idol} flex={flex} idx={idx} />
      <RadioComponent type="radio" name="chooseOneIdol" idol={idol} />
    </IdolModalHrCardDiv>
  );
}
