import Modal from "../../../components/GlobalModal";
import { styled } from "styled-components";

const ModalChildren = styled.div`
  display: flex;
  width: 250px;
  align-items: flex-start;
  gap: 24px;
  margin: 20px 0;
`;

const ModalImgContainer = styled.div`
  width: 128px;
  height: 128px;
  border: solid 1px ${({ theme }) => theme.colors.brandColor1};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IdolInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0;

  div:first-child {
    font-size: ${({ theme }) => theme.fontSize.large};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
  justify-content: space-evenly;
`;

const ModalButton = styled.button`
  width: 100px;
  height: 42px;
  border-radius: 3px;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.whiteColor};
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: 600;
  background: linear-gradient(
    to left,
    ${({ theme }) => theme.colors.brandColor2} 0%,
    ${({ theme }) => theme.colors.brandColor1} 100%
  );
`;

const ModalImg = styled.img`
  width: 115px;
  height: 115px;
  background-color: ${({ theme }) => theme.colors.grayColor4};
  opacity: 0.7;
  border-radius: 50%;
`;

export default function AddIdolConfirmModal({
  isOpenP,
  onClose,
  onSubmit,
  img,
  name,
  group,
}) {
  return (
    <Modal title="추가하시겠습니까?" isOpen={isOpenP} onClose={onClose}>
      <ModalChildren>
        <ModalImgContainer>
          <ModalImg src={img}></ModalImg>
        </ModalImgContainer>
        <IdolInfo>
          <div>{name}</div>
          <div>{group}</div>
        </IdolInfo>
      </ModalChildren>
      <ButtonContainer>
        <ModalButton onClick={onSubmit}>확인</ModalButton>
        <ModalButton onClick={onClose}>닫기</ModalButton>
      </ButtonContainer>
    </Modal>
  );
}
