import { useState, useEffect } from "react";
import styled from "styled-components";
import media from "../../../utils/mediaHelper";
import MyPickIdol from "../components/MyPickIdol";
import MyPageIdolList from "../components/MyPageIdolList";
import PlusImageIconSrc from "/src/assets/images/ic_plus.png";
import { Link } from "react-router-dom";

const Title = styled.h2`
  margin-bottom: 1.2rem;
  line-height: 2.6rem;
  font-size: 1.6rem;
  color: #fff;

  ${media.tablet`
    margin-bottom:2.5rem;
    font-size: 2rem;
  `}
  ${media.desktop`
    margin-bottom:3.2rem;
    font-size: 2.4rem;
  `}
`;

const InnerContainer = styled.div`
  margin: 0 auto;
  padding: 1.4rem 2.4rem 10.6rem;
  box-sizing: border-box;
  ${media.tablet`
    padding-bottom:8.1rem;
  `}
  ${media.desktop`
    padding-top:7.6rem;
    width:1200px;
  `}
`;
const FloatingButton = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 10.6rem;
  z-index: 100;
  display: flex;
  align-items: center;
  background-color: #02000e;
`;

const AddButton = styled.button`
  display: block;
  margin: 0 auto;
  width: 255px;
  height: 4.8rem;
  background: linear-gradient(91.18deg, #f77063 3.33%, #fe5790 99.37%);
  border-radius: 2.4rem;
  line-height: 2.6rem;
  text-align: center;
  font-weight: bold;
  font-size: 1.6rem;
  color: #fff;

  img {
    margin-right: 0.8rem;
    width: 2.4rem;
    height: 2.4rem;
    vertical-align: -7px;
  }
`;

const AddIdolLink = styled.span`
  color: #67666e;
  margin-left: auto;
`;

const TitleContainer = styled.div`
  display: flex;
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
    setCheckedIdols((prev) =>
      prev.includes(idolId)
        ? prev.filter((id) => id !== idolId)
        : [...prev, idolId]
    );
  };

  //추가하기 버튼 클릭 시 동작
  const handleAddIdols = () => {
    setFinalSelectedIdols(checkedIdols);
    localStorage.setItem("checkedIdols", JSON.stringify(checkedIdols));
  };

  //checkedIdols 은 객체에 바로 반영되도록 useEffect 사용
  useEffect(() => {
    //로컬 스토리지에서 데이터 불러오기
    const savedCheckedIdols =
      JSON.parse(localStorage.getItem("checkedIdols")) || [];
    if (savedCheckedIdols.length > 0) {
      setCheckedIdols(savedCheckedIdols);
      setFinalSelectedIdols(savedCheckedIdols);
    }
  }, []);

  //아이돌 선택 해제 함수
  const handleRemoveIdol = (idolId) => {
    // 함수형 패턴 사용 : state값이 업데이트 되고 나서, 변경 후의 값을 참조하지 못하기 때문에 함수형 패턴으로 prev 값을 받아오면, 업데이트 후의 값을 받아올 수 있다.
    setCheckedIdols((prev) => prev.filter((id) => id !== idolId));
    setFinalSelectedIdols((prev) => prev.filter((id) => id !== idolId));

    // 해당 형태로 사용하면, checkedIdols 값이 변경이 되었을 때, 변경 후의 값을 받아오지 못함.
    // setCheckedIdols((prev) => prev.filter((id) => id !== idolId));
    // setFinalSelectedIdols(checkedIdols);
  };

  return (
    <>
      <InnerContainer>
        <Title>관심 있는 아이돌을 추가해보세요.</Title>
        <MyPickIdol
          idols={mockIdols}
          selectedIdols={finalSelectedIdols}
          removeIdols={handleRemoveIdol}
        />
        <TitleContainer>
          <Title>내가 관심있는 아이돌</Title>
          <AddIdolLink>
            <Link to="/addIdol">찾으시는 아이돌이 없으신가요?</Link>
          </AddIdolLink>
        </TitleContainer>

        <MyPageIdolList
          idols={mockIdols} // 전체 아이돌 리스트
          checkedIdols={checkedIdols} // 체크한 아이돌 모음
          toggleIdolSelection={toggleIdolSelection} // 아이돌 클릭 기능
        />
        <FloatingButton>
          <AddButton onClick={handleAddIdols}>
            <img src={PlusImageIconSrc} alt="" />
            <span>추가하기</span>
          </AddButton>
        </FloatingButton>
      </InnerContainer>
    </>
  );
}
