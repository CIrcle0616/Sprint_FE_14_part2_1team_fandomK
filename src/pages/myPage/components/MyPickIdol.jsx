import styled from "styled-components";
import IdolCircle from "../../../components/IdolCircle";

const PickIdolList = styled.ul`
  margin-bottom:40px;
  border-bottom:1px solid rgba(255,255,255,0.1);
  padding-bottom:42px;
  display:flex; gap:32px 22px;
`
const ProfileInfo = styled.div`
  display:flex; flex-direction:column; color:#fff; font-size:16px; line-height:26px; text-align:center;
`

const mockIdols = [
   {
      "id": 4612,
      "name": "안유진",
      "gender": "female",
      "group": "아이브",
      "profilePicture": "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1741344525571/4-br6YlS19fQwnmYnP63op_-IYlnF5sGuKWJ2yHF3p9iLbcfDAQ2FFEdassO3LNyJDLYcJKN1KCYcbVrJKMENw.webp",
      "totalVotes": 0,
      "teamId": 46
    },
    {
      "id": 4614,
      "name": "채원",
      "gender": "female",
      "group": "르세라핌",
      "profilePicture": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR0J_oS6KX6XYS7Z-SOiUsXiCb8wiSaIqkMVXlsYgX-B-ae8xdJQrQvuqn9XQkO0T6lyj5t8oqSce9XPIIlejKpNQ",
      "totalVotes": 0,
      "teamId": 46
    },
  ]


export default function SelectedIdol() {
  return (
    <>
      <PickIdolList>
        {mockIdols.map((idol) => (
          <li key={idol.id}>
            <button type="button">
              <IdolCircle idol={idol} />
            </button>
            <ProfileInfo>
              <span>{idol.name}</span>
              <span>{idol.name}</span>
            </ProfileInfo>
          </li>
        ))}
      </PickIdolList>
    </>
  );
}
