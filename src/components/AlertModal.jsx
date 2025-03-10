import Modal from "./GlobalModal";
import creditIcon from "../assets/icon/ic_credit.png";
import { useNavigate } from "react-router-dom";

function AlertModal({ isOpen }) {
  const navigate = useNavigate();

  const handleChargeClick = () => {
    navigate("/charge"); // "/charge" 경로로 이동
  };

  return (
    <Modal isOpen={isOpen}>
      <img src={creditIcon} alt="Credit Icon" />
      <div>충전할 크레딧 부족</div>
      <button>확인</button>
      <div
        onClick={handleChargeClick}
        style={{
          cursor: "pointer",
          color: "blue",
          textDecoration: "underline",
        }}
      >
        충전하러 가기
      </div>
    </Modal>
  );
}

export default AlertModal;
