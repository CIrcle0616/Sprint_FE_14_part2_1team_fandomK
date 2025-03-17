import styled from "styled-components";
import media from "../../../utils/mediaHelper";
import IdolCircle from "/src/components/IdolCircle";
import ImageIdolRemove from "/src/assets/images/ic_item_remove.png";

const PickedList  = styled.ul`
  display:flex;
  gap:0 3.6rem;
  min-height:12.3rem;
  border-bottom:1px solid rgba(255,255,255,0.1);
  margin-bottom:3.2rem;
  padding-bottom:3.2rem;
  overflow:auto;
  &::-webkit-scrollbar {
    display: none;
  }

  ${media.tablet`
    line-height:2.8rem;
    min-height:15.3rem;

  `}
  ${media.desktop`
    min-height:19.5rem;
  `}

  li {
    position:relative;
  }

  button:nth-child(2) {
    margin-bottom:0.8rem;
    width:7rem;
    height:7rem;
      ${media.tablet`
        width:10rem;
        height:10rem;
    `}

  }
  img {
    padding:7.5%;
    width:100%;
    height:100%;
  }
`

const ProfileInfo = styled.div`
  display:flex;
  flex-direction:column;
  line-height:2.6rem;
  font-size:1.6rem;
  text-align:center;
  color:#fff;

  span {
    line-height:1.7rem;
    font-size:1.4rem;
    color:#FFFFFF99;

  ${media.tablet`
    line-height:2.8rem;

  `}
  }
`
const RemoveButton = styled.button`
  position:absolute;
  top:0;
  right:0;
  width:2.2rem;
  height:2.2rem;
  border-radius:50%;

  ${media.tablet`
    width:3.2rem;
    height:3.2rem;

  `}
  ${media.desktop`
    width:3.2rem;
    height:3.2rem;
  `}

  img {
    width:100%;
    height:100%;
  }
`
export default function SelectedIdol ({ idols, selectedIdols, removeIdols }) {
  const pickedIdols = idols.filter((idol) => selectedIdols.includes(idol.id));
  return (
    <PickedList>
      {pickedIdols.map((idol) => (
        <li key={idol.id}>
          <RemoveButton type="button" onClick={() => removeIdols(idol.id)}>
            <img src={ImageIdolRemove} alt="아이돌 삭제하기"/>
          </RemoveButton>
          <button type="button">
            <IdolCircle idol={idol} />
          </button>
          <ProfileInfo>
            <strong>{idol.name}</strong>
            <span>{idol.group}</span>
          </ProfileInfo>
        </li>
      ))}
    </PickedList>
  );
}
