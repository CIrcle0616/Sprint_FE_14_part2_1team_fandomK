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

//get http 요청으로 아이돌 불러오기
const fetchMockIdol = async () => {
  const response = await fetch(
    "https://fandom-k-api.vercel.app/14-1/idols?pageSize=10"
  );
  if (!response.ok) return;
  const data = await response.json();

  const idols = data.list;
  return idols;
};
const mockIdols = await fetchMockIdol();


export default function MyPage() {

  return (
    <InnerContainer>
      <Title>관심 있는 아이돌을 추가해보세요.</Title>
      <MyPickIdol props={mockIdols}/>
      <Title>내가 관심있는 아이돌</Title>
      <MyPageIdolList props={mockIdols}/>
    </InnerContainer>

  );
}