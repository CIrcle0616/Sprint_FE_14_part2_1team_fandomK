//현재 http로 아이돌 목록을 출력하면 사진url이 제대로 생성되지 않은 데이터만
//나오고 있어서 데모 버전으로 만들게 되었습니다.
//이후 데이터를 업로드하고 난 이후엔 props로 받아서 사용하도록 수정바랍니다
import { styled } from "styled-components";
import checkImageMark from "../assets/images/img_checkmark.png";

//styled-components를 이용해서 동적으로 사이즈를 결정할 수 있게 작성했습니다.
const IdolCircleWrapper = styled.div`
  position: relative;
  width: ${(props) => props.size || "100px"};
  height: ${(props) => props.size || "100px"};

  /* 선택 시 스타일 */
  ${(props) =>
    props.isSelected &&
    `
  &::after {
    content: '';
    position: absolute;
    left:5px;
    width: 85%;
    height: 85%;
    background-color: rgba(249, 110, 104, 0.5);
    background-image : url(${checkImageMark});
    background-size: 40px 40px;
      background-repeat: no-repeat; /* 반복 방지 */
      background-position: center;
    border-radius: 50%;
  }
`}
`;

const IdolCircleImg = styled.img`
  width: ${(props) => props.size || "100px"};
  height: ${(props) => props.size || "100px"};
  padding: 5px;
  border: 1px solid #f96d69;
  border-radius: 50%;
  object-fit: cover;
  display: block;
`;

const IdolSelectedCircleImg = styled.img`
  width: 100%;
  height: 100%;
  padding: 5px;
  border: 1px solid #f96d69;
  border-radius: 50%;
  object-fit: cover;
  display: block;
`;

//현재는 props로 받고 있지 않습니다. 이후에 props를 받아 idol 리스트의 요소마다 렌더링 되도록 할 예정입니다
//size 속성을 통해 크기를 동적으로 조정할 수 있게 했습니다.
export default function IdolCircle({ idol, size, isSelected }) {
  const { profilePicture, name } = { ...idol };
  return (
    <>
      {isSelected && (
        <IdolCircleWrapper size={size} isSelected={isSelected}>
          <IdolSelectedCircleImg
            src={profilePicture}
            alt={name}
            isSelected={isSelected}
          />
        </IdolCircleWrapper>
      )}
      {!isSelected && (
        <IdolCircleImg src={profilePicture} size={size} alt={name} />
      )}
    </>
  );
}
