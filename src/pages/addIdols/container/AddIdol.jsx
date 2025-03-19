import backIcon from "../../../assets/icon/ic_back.png";
import AddIdolForm from "../components/AddIdolForm";
import { styled } from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
  text-decoration: none; // 밑줄 제거
`;

// 뒤로가기 버튼 컴포넌트
const BackButton = () => {
  const location = useLocation(); // 현재 위치 정보 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 함수

  // 뒤로가기 클릭 시 실행될 함수
  const handleBack = () => {
    if (location.state?.from === "/mypage") {
      navigate("/mypage"); // 마이페이지에서 왔으면 마이페이지로
    } else {
      navigate("/list"); // 아니면 목록 페이지로
    }
  };

  return (
    <BackLink as="button" onClick={handleBack}>
      <img src={backIcon} alt="뒤로" />
      <div>뒤로가기</div>
    </BackLink>
  );
};

// 메인 컴포넌트
export default function AddIdol() {
  return (
    <AddIdolContainer>
      <AddIdolHeader>
        <BackButton />
      </AddIdolHeader>
      <AddIdolForm />
    </AddIdolContainer>
  );
}
