import { styled } from "styled-components";
import logoImg from "../assets/images/logo.svg";
import profileImg from "../assets/images/fandomK-img-1-김채원.png";
import media from "../utils/mediaHelper";
import { Link } from "react-router-dom";

const HeaderStyle = styled.header`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 88px;
  margin: 0 auto;
  padding-top: 44px;
  display: flex;
  align-items: center;
  ${media.tablet`
    height: 81px;
    padding: 0;`}
  ${media.desktop`
    height: 80px;

    `}
`;

const Logo = styled(Link)`
  width: 108px;
  margin: 0 auto;
  & img {
    width: 100%;
  }
  ${media.tablet`
    & img {
    width: 120px;
    height: auto;}`}
  ${media.desktop`
    & img {
    width: auto;
    height: 32px;}`}
`;

const Profile = styled(Link)`
  position: absolute;
  right: 24px;
  border-radius: 50%;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
  & img {
    width: 32px;
    height: 32px;
  }
`;

export default function Header() {
  return (
    <HeaderStyle>
      <Logo to={"/list"}>
        <img src={logoImg} />
      </Logo>
      <Profile to={"/mypage"}>
        <img src={profileImg} />
      </Profile>
    </HeaderStyle>
  );
}
