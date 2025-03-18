import styled from "styled-components";
import media from "../../../utils/mediaHelper";
import Skeleton from "react-loading-skeleton";

export const Table = styled.div`
  width: 100%;
  & .chartHeader {
    display: flex;
  }
  padding-bottom: 150px;
`;

export const MenuComp = styled.button`
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

export const OrderedList = styled.ol`
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

export const LoadMoreIdolBtn = styled.button`
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

export const SkeletonHorizontalCard = styled.div`
  max-width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SkeletonCircle = styled(Skeleton)`
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;

export const SkeletonRank = styled(Skeleton)`
  width: 20px;
  height: 20px;
`;

export const SkeletonInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SkeletonText = styled(Skeleton)`
  width: 100px;
  height: 16px;
`;