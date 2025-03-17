import backIcon from "../../../assets/icon/ic_back.png";
import AddIdolForm from "../components/AddIdolForm";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const AddIdolContainer = styled.div`
  width: max-content;
  margin: 50px auto;
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
        <Link to="/mypage">
          <img src={backIcon} />
        </Link>
        <div>뒤로가기</div>
      </AddIdolHeader>
      <AddIdolForm />
    </AddIdolContainer>
  );
}
