import { useState } from 'react';
import styled from "styled-components";
import media from "../../../utils/mediaHelper";
import IdolCircle from "../../../components/IdolCircle";
import CheckImageMark from "/src/assets/images/img_checkmark.png";

//아이돌 리스트
const SlideWrapper = styled.div`
  position:relative;

`
const TotalIdolList = styled.ul`
  margin-top:1.6rem;
  margin-bottom:4rem;
  display:flex;
  gap:1.7rem 2.4rem;
  flex-wrap:wrap;
  ${media.tablet`
    margin-top:5.7rem;
      gap:2.4rem;
  `}
  ${media.desktop`
    margin-top:3.2rem;
    margin-bottom:4.8rem;
    gap:2.2rem 3.1rem;
  `}
`

const IdolItem = styled.li`
  ${({ isvisible }) => !isvisible && `display: none;`}

  button {
    position:relative;
    overflow:hidden;
    border:1px solid #F77063;
    border-radius:50%;
    width:9.8rem;
    height:9.8rem;
    margin-bottom:0.8rem;
    ${media.tablet`
      width:12.8rem;
      height:12.8rem;
    `}
    ${media.desktop`
      width:12.8rem;
      height:12.8rem;
    `}
  }
  img {
    padding:5%;
    width:100%;
    height:100%;
    border:none;
    &:hover {
      transform:scale(1.2);
      transition:all 0.4s;

    }
  }
`;

// 아이돌 아이템 영역 체크 표시
const Layer = styled.div`
  position:absolute;
  top:50%;
  left:50%;
  z-index:10;
  transform:translate(-50%,-50%);
  width: 90%;
  height: 90%;
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius:50%;
  background: linear-gradient(271.36deg, rgba(249, 110, 104, 0.5) -9.84%, rgba(254, 87, 143, 0.5) 107.18%);

  img {
    width:5.2rem;
    height:5.2rem;
  }
`;


//아이돌 정보
const ProfileInfo = styled.div`
  display:flex;
  flex-direction:column;
  gap:0.2rem;
  line-height:2.6rem;
  font-size:1.6rem;
  text-align:center;
  color:#fff;

  strong {
    font-weight:700;
  }
  span {
    line-height:1.7rem;
    font-size:1.4rem;
    color:#FFFFFF99;

    ${media.tablet`
      line-height:2.8rem;
    `}
  }
`;

const ArrowButton = styled.div`
  position:absolute;
  top:50%;
  transform:translateY(-50%);
  z-index:10;
  width:30px;
  height:135px;
  background: #1B1B1BCC;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:4px;

  &.left {
    left:-40px;
  }
  &.right {
    right:-40px;
  }
  img {
    width:6px;
    height:12px;
  }
`
export default function SelectedIdol({ idols = [], checkedIdols, toggleIdolSelection, hiddenIdols}) {
  return (
    <SlideWrapper>
      <TotalIdolList>
        {idols.map((idol) => (
          <IdolItem
            key={idol.id}
            isvisible={!hiddenIdols.includes(idol.id)}
          >
              <button
                type="button"
                data-id={idol.id}
                onClick={() => toggleIdolSelection(idol.id)}
              >
              <IdolCircle idol={idol} />
              {checkedIdols.includes(idol.id) ? <Layer><img src={CheckImageMark}/></Layer> : ''}
            </button>
            <ProfileInfo>
              <strong>{idol.name}</strong>
              <span>{idol.group}</span>
            </ProfileInfo>
          </IdolItem>
        ))}
      </TotalIdolList>

    </SlideWrapper>
  );
}


