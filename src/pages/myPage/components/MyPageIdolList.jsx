import { useState, useEffect } from "react";
import styled from "styled-components";
import IdolCircle from "../../../components/IdolCircle";

const TotalIdolList = styled.ul`
  margin-bottom:48px;
  display:flex; gap:32px 22px;
`

const ProfileInfo = styled.div`
  display:flex; flex-direction:column; color:#fff; font-size:16px; line-height:26px; text-align:center;
`
const AddButton = styled.button`
  display:block; margin:0 auto;
  width:255px; height:48px; background: linear-gradient(91.18deg, #F77063 3.33%, #FE5790 99.37%);
  color:#fff; font-size:16px; line-height:26px;font-weight:bold; text-align:center; border-radius:48px;
`


export default function SelectedIdol(idolList) {
  const [myPickedIdolList, setMyPickedIdolList] = useState([]);
  const [isActive, setIsActive] = useState({});

  function buttonCheckClick(e) {
    if (!e.currentTarget) return;

    const idolId = e.currentTarget.dataset.id;

    if (!idolId) return;

    // setIsActive((prev) => !prev); 하나의 상태로 관리할 수 없음
    // const [localState, setLocalState] = useState({
    //   myPickedIdolList : [],
    //   isActive : 'off'
    // });

    setIsActive( (prev) => ({
      ...prev,
      [idolId]: !prev[idolId]
    }));
    //setMyPickedIdolList((prev) => [...prev, idolId]);
    setMyPickedIdolList((prev) =>
      prev.includes(idolId) ? prev.filter((id) => id !== idolId) : [...prev, idolId]
    );
    console.log(isActive)

    // function buttonCheckClick (e) {
    //   if(isActive == "off") isActive = "on"
    //   else isActive = "off"

    //   let tempArr = localState.myPickedIdolList
    //   tempArr.push(e.currentTarget.dataset.id )
    //   setLocalState({...localState, myPickedIdolList:tempArr})

  }
  useEffect(() => {
    console.log("Updated isActive:", isActive);// useEffect로
  }, [isActive]);



  return (
    <div>
      <TotalIdolList>
        {idolList.props.map((idol) => (
          <li key={idol.id}>
            <button type="button" onClick={buttonCheckClick} data-id={idol.id} data-active={isActive[idol.id]? true : false}>
              <IdolCircle idol={idol} />
            </button>
            <ProfileInfo>
              <span>{idol.name}</span>
              <span>{idol.group}</span>
            </ProfileInfo>
          </li>
        ))}
      </TotalIdolList>
      <AddButton type="button"><span>추가하기</span></AddButton>
    </div>
  );
}


