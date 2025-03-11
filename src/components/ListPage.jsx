import logoImg from "../assets/images/logo.svg";
import profileImg from "../assets/images/fandomK-img-1-김채원.png";
import styled from "styled-components";
import CreditInfo from "./CreditInfo";
import DonationList from "./DonationList";
import IdolCharts from "./IdolCharts";

const Header = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 88px;
  padding-top: 44px;
  display: flex;
  align-items: center;
`;

const Logo = styled.a`
  width: 108px;
  margin: 0 auto;
  & img {
    width: 100%;
  }
`;

const Profile = styled.a`
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

export default function ListPage() {
  return (
    <>
      <Header>
        <Logo href="/abc">
          <img src={logoImg} />
        </Logo>
        <Profile href="/mypage">
          <img src={profileImg} />
        </Profile>
      </Header>
      <CreditInfo />
      <DonationList />
      <IdolCharts />
    </>
  );
}
