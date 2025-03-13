import { useState } from "react";
import styled from "styled-components";
import IdolCircle from "../../../components/IdolCircle";

const PickedList  = styled.ul`
  margin-bottom:40px;
  border-bottom:1px solid rgba(255,255,255,0.1);
  padding-bottom:42px;
  display:flex; gap:32px 22px;
  height:195px;

  li {
    position:relative;
  }
`
const ProfileInfo = styled.div`
  display:flex; flex-direction:column; color:#fff; font-size:16px; line-height:26px; text-align:center;
`
const RemoveButton = styled.button`
  position:absolute; top:0; right:0;
  width:22px; height:22px; border-radius:50%;

  img {width:100%; height:100%; }

`

export default function SelectedIdol ({ idols, selectedIdols }) {
  const pickedIdols = idols.filter((idol) => selectedIdols.includes(idol.id));


  return (
    <PickedList>
      {pickedIdols.map((idol) => (
        <li key={idol.id}>
          <RemoveButton type="button"><img src="/src/assets/images/ic_item_remove.png"/></RemoveButton>

          <button type="button">
            <IdolCircle idol={idol} />
          </button>
          <ProfileInfo>
            <span>{idol.name}</span>
            <span>{idol.group}</span>
          </ProfileInfo>
        </li>
      ))}
    </PickedList>
  );
}
