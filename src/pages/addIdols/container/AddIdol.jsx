import backIcon from "../../../assets/icon/ic_back.png";
import AddIdolForm from "../components/AddIdolForm";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const AddIdolContainer = styled.div`
  width: max-content;
  margin: 50px auto;
`;

const AddIdolHeader = styled.div`
  width: max-content;
  div {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
  }
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default function AddIdol() {
  return (
    <AddIdolContainer>
      <AddIdolHeader>
        <BackLink to="/mypage" style={{ textDecoration: "none" }}>
          <img src={backIcon} />
          <div>뒤로가기</div>
        </BackLink>
      </AddIdolHeader>
      <AddIdolForm />
    </AddIdolContainer>
  );
}
