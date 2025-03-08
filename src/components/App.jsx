import IdolCircle from "./IdolCircle";
import ChargeModal from "./ChargeModal";
import { useState } from "react";

//get http 요청으로 아이돌 불러오기
const fetchMockIdol = async () => {
  const response = await fetch(
    "https://fandom-k-api.vercel.app/14-1/idols?pageSize=10"
  );
  if (!response.ok) return;
  const data = await response.json();
  console.log(data);
  const idols = data.list;
  return idols;
};
const mockIdols = await fetchMockIdol();
// console.log(mockIdols);

function App() {
  const [open, setOpen] = useState(false);

  const isOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ChargeModal isOpenP={open} onClose={handleClose} />
      <ul>
        {mockIdols.map((idol) => (
          <li>
            <IdolCircle idol={idol} />
          </li>
        ))}
        <button onClick={isOpen}>투표하기</button>
      </ul>
    </>
  );
}

export default App;
