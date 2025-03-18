import { styled } from "styled-components";
import closeIcon from "../assets/icon/ic_modal_close.png";
import { useEffect, useRef } from "react";

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(2, 0, 14, 0.8);
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px 16px 32px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  background: #181d26;
  border-radius: 8px;

&:focus {
    outline: none;
  }

  // 투표하기 모달의 모바일 환경에서 다른 디자인 적용
  &.full-screen {
    @media (max-width: 768px) {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      transform: none;
      border-radius: 0;
      justify-content:flex-start;
      // background: linear-gradient(295deg, #181d26 80%,rgb(2, 85, 112) 100%)
    }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalTitle = styled.div`
  color: #f7f7f8;
  font-size: 18px;
  font-weight: 500;
`;

const ModalCloseBtn = styled.img`
  width: 24px;
  height: 24px;

  cursor: ${(props) => (props.onClick ? "pointer" : "auto")};
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;

  &.alert {
    gap: 0;
    margin-top: 0;
    align-items: center;
  }
`;

// 공통된 모달을 만들어서 사용할 수 있도록 구현
// 모달이 열려있는지 여부를 isOpen으로 받아서 모달을 렌더링할지 말지 결정
// 모달이 열려있을 때는 children을 렌더링해서 모달 내용을 보여주고,
// x 버튼을 누르면 onClose 함수를 호출해서 모달을 닫도록 구현
const Modal = ({
  title,
  children,
  onClose,
  isOpen,
  className,
  hideCloseBtn,
}) => {
  const modalRef = useRef(null);

  // 모달이 영역 밖을 클릭했을 때 모달을 닫도록 구현
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose]);

  const handleKeydown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus(); // 모달이 열리면 포커스 이동
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent
        ref={modalRef}
        className={className}
        onKeyDown={handleKeydown}
        tabIndex={0}
      >
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          {!hideCloseBtn && (
            <ModalCloseBtn onClick={onClose} src={closeIcon} alt="닫기" />
          )}
        </ModalHeader>
        <ModalBody className={className}>{children}</ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
