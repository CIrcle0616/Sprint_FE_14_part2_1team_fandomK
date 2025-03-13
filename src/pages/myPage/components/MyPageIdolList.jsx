import { useState, useEffect } from "react";
import styled from "styled-components";
import IdolCircle from "../../../components/IdolCircle";

//아이돌 리스트
const TotalIdolList = styled.ul`
  margin-bottom:48px;
  display:flex; gap:32px 22px;
`

const IdolItem = styled.li`
  margin-bottom: 10px;

  button {
    position:relative;
    overflow:hidden;
    border:1px solid #F77063;
    border-radius:50%;
  }
  img {
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
  top:0;
  left:0;
  z-index:10;
  width: 100%;
  height: 100%;
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius:50%;
  background: linear-gradient(271.36deg, rgba(249, 110, 104, 0.5) -9.84%, rgba(254, 87, 143, 0.5) 107.18%);

  img {
    width:52px;
    height:52px;
  }
`;


//아이돌 정보
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  font-size: 16px;
  line-height: 26px;
  text-align: center;
`;



export default function SelectedIdol({ idols = [], activeState, checkedIdols, toggleIdolSelection }) {

  return (
    <div>
      <TotalIdolList>
        {idols.map((idol) => (
          <IdolItem
            key={idol.id}
            isActive={checkedIdols.includes(idol.id)}
          >
              <button
                type="button"
                data-id={idol.id}
                onClick={() => toggleIdolSelection(idol.id)}
              >
              <IdolCircle idol={idol} />
              {checkedIdols.includes(idol.id) ? <Layer><img src="/src/assets/images/img_checkmark.png"/></Layer> : ''}
            </button>
            <ProfileInfo>
              <span>{idol.name}</span>
              <span>{idol.group}</span>
            </ProfileInfo>
          </IdolItem>
        ))}
      </TotalIdolList>
    </div>
  );
}


