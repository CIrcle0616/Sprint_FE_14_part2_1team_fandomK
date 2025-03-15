import { useState , useEffect} from 'react';
import styled from "styled-components";
import  MyPickIdol from "../components/MyPickIdol"
import  MyPageIdolList from "../components/MyPageIdolList"
import PlusImageIconSrc from "/src/assets/images/ic_plus.png";

const Title = styled.h2`
  margin-bottom:32px;
  line-height:26px;
  font-size:24px;
  color:#fff;
`

const InnerContainer = styled.div`
  padding:76px 0 81px
  width:1200px;
  margin:0 auto;;
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

  img {
    width:24px;
    height:24px;
    vertical-align:-7px;
  }
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

  //아이돌 선택/해제 함수
  const toggleIdolSelection = (idolId) => {
    setCheckedIdols((prev) => prev.includes(idolId) ? prev.filter((id) => id !== idolId) : [...prev, idolId]
    );
  };

  //추가하기 버튼 클릭 시 동작
  const handleAddIdols = () => {
    setFinalSelectedIdols(checkedIdols);
    localStorage.setItem('checkedIdols', JSON.stringify(checkedIdols))
  }

//checkedIdols 은 객체에 바로 반영되도록 useEffect 사용
  useEffect(() => {
    //로컬 스토리지에서 데이터 불러오기
    const savedCheckedIdols = JSON.parse(localStorage.getItem("checkedIdols")) || [];
    if (savedCheckedIdols.length > 0) {
      setCheckedIdols(savedCheckedIdols)
      setFinalSelectedIdols(savedCheckedIdols)
  }

  }, []);

  //아이돌 선택 해제 함수
  const handleRemoveIdol = (idolId) => {
    // 함수형 패턴 사용 : state값이 업데이트 되고 나서, 변경 후의 값을 참조하지 못하기 때문에 함수형 패턴으로 prev 값을 받아오면, 업데이트 후의 값을 받아올 수 있다.
    setCheckedIdols((prev) => prev.filter((id) => id !== idolId));
    setFinalSelectedIdols((prev) => prev.filter((id)=> id !== idolId));

    // 해당 형태로 사용하면, checkedIdols 값이 변경이 되었을 때, 변경 후의 값을 받아오지 못함.
    // setCheckedIdols((prev) => prev.filter((id) => id !== idolId));
    // setFinalSelectedIdols(checkedIdols);
  };

  return (
    <InnerContainer>
      <Title>관심 있는 아이돌을 추가해보세요.</Title>
      <MyPickIdol
        idols={mockIdols}
        selectedIdols={finalSelectedIdols}
        removeIdols={handleRemoveIdol}
      />
      <Title>내가 관심있는 아이돌</Title>
      <MyPageIdolList
        idols={mockIdols} // 전체 아이돌 리스트
        checkedIdols={checkedIdols} // 체크한 아이돌 모음
        toggleIdolSelection={toggleIdolSelection} // 아이돌 클릭 기능
      />
      <AddButton onClick={handleAddIdols}>
        <img src={PlusImageIconSrc} alt=""/>
        <span>추가하기</span>
      </AddButton>
    </InnerContainer>

  );
}