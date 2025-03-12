import Modal from "../../../components/GlobalModal";

export default function AddIdolConfirmModal({ isOpenP, onClose, onSubmit }) {
  return (
    <Modal isOpen={isOpenP} onClose={onClose}>
      <h1>확인 모달이다!</h1>
      <button onClick={onSubmit}>확인</button>
      <button onClick={onClose}>닫기</button>
    </Modal>
  );
}
