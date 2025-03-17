import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkStyle = styled(Link)`
  background-color: white;
`;

export default function MainPage() {
  return (
    <>
      <LinkStyle to={"/landing"}>랜딩 페이지</LinkStyle>
      <LinkStyle to={"/list"}>목록 페이지</LinkStyle>
      <LinkStyle to={"/mypage"}>마이 페이지</LinkStyle>
      <LinkStyle to={"/addIdol"}>아이돌 추가 페이지</LinkStyle>
    </>
  );
}
