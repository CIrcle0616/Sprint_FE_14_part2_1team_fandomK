//현재 http로 아이돌 목록을 출력하면 사진url이 제대로 생성되지 않은 데이터만
//나오고 있어서 데모 버전으로 만들게 되었습니다.
//이후 데이터를 업로드하고 난 이후엔 props로 받아서 사용하도록 수정바랍니다
import demoImg from "../assets/images/fandomk-img-1-김채원.png";
import { styled } from "styled-components";

//styled-components를 이용해서 동적으로 사이즈를 결정할 수 있게 작성했습니다.
const IdolCircleImg = styled.img`
  width: ${(props) => props.size || "100px"};
  height: ${(props) => props.size || "100px"};
  padding: 3px;
  border: 2px solid #f96d69;
  border-radius: 50%;
  background-color: black;
  object-fit: cover;
`;

//현재는 props로 받고 있지 않습니다. 이후에 props를 받아 idol 리스트의 요소마다 렌더링 되도록 할 예정입니다
//size 속성을 통해 크기를 동적으로 조정할 수 있게 했습니다.
export default function IdolCircle() {
  return <IdolCircleImg src={demoImg} alt="demo입니다" size={"100px"} />;
}
