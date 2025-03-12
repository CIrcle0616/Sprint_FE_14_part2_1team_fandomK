import { styled } from "styled-components";

const IdolInfoDiv = styled.div`
  display: flex;
  flex-grow: 1;
  ${({ flex }) =>
    flex === "col"
      ? `
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  & div {
  align-self: flex-start;}`
      : `
  flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & div {
      align-self: auto;
    }
  `}
  & div {
    display: flex;
    font-size: 14px;
  }
  & div.bold {
    font-weight: 500;
    color: #ffffffde;
  }
  & div.light {
    font-weight: 400;
    color: #ffffff99;
  }
`;

export default function IdolInfo({ idol, flex }) {
  const { name, totalVotes, group } = { ...idol };
  return (
    <IdolInfoDiv flex={flex}>
      <div className="bold">
        {group} {name}
      </div>
      <div className="light">{totalVotes + "표"}</div>
    </IdolInfoDiv>
  );
}
