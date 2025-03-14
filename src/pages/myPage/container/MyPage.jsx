import { useState , useEffect} from 'react';
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
//추가하기 버튼
const AddButton = styled.button`
  display: block;
  margin: 0 auto;
  width: 255px;
  height: 48px;
  background: linear-gradient(91.18deg, #F77063 3.33%, #FE5790 99.37%);
  color: #fff;
  font-size: 16px;
  line-height: 26px;
  font-weight: bold;
  text-align: center;
  border-radius: 48px;

  img {width:24px; height:24px; vertical-align:-7px; }
`;
export default function MyPage() {
  // 체크한 아이돌은 부모에서 상태관리
  const [mockIdols, setMockIdols] = useState([]);
  const [checkedIdols, setCheckedIdols] = useState([]);
  const [finalSelectedIdols, setFinalSelectedIdols] = useState([]);

  useEffect(() => {
    const fetchMockIdol = async () => {
      try {
        const response = await fetch(
          "https://fandom-k-api.vercel.app/14-1/idols?pageSize=10"
        );
        if (!response.ok) throw new Error("데이터 로드 실패");

        const data = await response.json();
        setMockIdols(data.list);
      } catch (error) {
        console.error("아이돌 데이터 로드 오류:", error);
        setError("아이돌 데이터를 불러오는 데 실패했습니다.");
      } finally {
        //setIsLoading(false); // 로딩 종료
      }
    };

    fetchMockIdol();
  }, []);

  const toggleIdolSelection = (idolId) => {//아이돌 선택/해제 함수
    setCheckedIdols((prev) =>
      prev.includes(idolId) ? prev.filter((id) => id !== idolId) : [...prev, idolId]
    );
  };

  const handleAddIdols = () => {
    setFinalSelectedIdols(checkedIdols);
  }
//checkedIdols 은 객체에 바로 반영되도록 useEffect 사용
  useEffect(() => {
    console.log("Updated isActive:", checkedIdols);
  }, [checkedIdols]);

  return (
    <InnerContainer>
      <Title>관심 있는 아이돌을 추가해보세요.</Title>
      <MyPickIdol idols={mockIdols} selectedIdols={finalSelectedIdols} />
      <Title>내가 관심있는 아이돌</Title>
      <MyPageIdolList
        idols={mockIdols} // 전체 아이돌 리스트
        checkedIdols={checkedIdols} // 체크한 아이돌 모음
        toggleIdolSelection={toggleIdolSelection} // 아이돌 클릭 기능
      />
      <AddButton onClick={handleAddIdols}>
        <img src="/src/assets/images/ic_plus.png"/>
        <span>추가하기</span>
        </AddButton>
    </InnerContainer>

  );
}