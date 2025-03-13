import { styled } from "styled-components";

export const Button = styled.button`
  width: 295px;
  height: 42px;
  color: #ffffff;
  background: ${(props) =>
    props.disabled
      ? "#828282"
      : "linear-gradient(to left, #fe5493 0%, #f86f65 100%)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  border-radius: 3px;
  margin-top: 20px;
  cursor: ${(props) => (props.disabled ? "auto" : "pointer")};

  img {
    width: 15px;
    height: 18px;
    filter: invert(10%) sepia(150%) saturate(80%) hue-rotate(273deg)
      brightness(100%) contrast(1000%);
  }
`;

function ModalButton({ children, disabled, onClick }) {
  return (
    <Button disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  );
}

export default ModalButton;
