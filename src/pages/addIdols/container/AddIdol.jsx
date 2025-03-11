import backIcon from "../../../assets/icon/ic_back.png";
import AddIdolForm from "../components/AddIdolForm";
import { styled } from "styled-components";

const AddIdolContainer = styled.div`
  width: 700px;
  margin: 10px auto;
`;

const AddIdolHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  div {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
  }
`;

export default function AddIdol() {
  return (
    <AddIdolContainer>
      <AddIdolHeader>
        <img src={backIcon} />
        <div>아이돌 추가하기</div>
      </AddIdolHeader>
      <AddIdolForm />
    </AddIdolContainer>
  );
}
