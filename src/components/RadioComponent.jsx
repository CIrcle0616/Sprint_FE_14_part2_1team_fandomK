import styled from "styled-components";

const RadioWrapper = styled.label`
  display: flex;
  align-items: center;
  & input {
    width: 16px;
    height: 16px;
    border-radius: 50%
    border: 1px solid #f96d69;
    margin: 0;
    padding: 4px;
    cursor: pointer;
    accent-color: #f96d69;
  }
`;

export default function RadioComponent({ idol }) {
  const { id } = idol.id;

  return (
    <RadioWrapper>
      <input type="radio" name="idol" id={id} />
    </RadioWrapper>
  );
}
