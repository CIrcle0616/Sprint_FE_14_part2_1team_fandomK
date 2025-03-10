import styled from "styled-components";
import  MyPickIdol from "../components/MyPickIdol"
import  MyPageIdolList from "../components/MyPageIdolList"

const Title = styled.h2`
  margin-bottom:32px;
  line-height:26px;
  font-size:24px;
  color:#fff;
`

const InnerContainer = styled.div`
padding:76px 0 81px
  width:1200px; margin:0 auto;;
`
const AddButton = styled.button`
  display:block; margin:0 auto;
  width:255px; height:48px; background: linear-gradient(91.18deg, #F77063 3.33%, #FE5790 99.37%);
  color:#fff; font-size:16px; line-height:26px;font-weight:bold; text-align:center; border-radius:48px;`

export default function MyPage() {

  return (
    <InnerContainer>
      <Title>관심 있는 아이돌을 추가해보세요.</Title>
      <MyPickIdol />
      <Title>내가 관심있는 아이돌</Title>
      <MyPageIdolList />
      <AddButton type="button"><span>추가하기</span></AddButton>
    </InnerContainer>

  );
}