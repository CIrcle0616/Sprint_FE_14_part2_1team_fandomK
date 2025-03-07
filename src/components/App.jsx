import IdolCircle from "./IdolCircle";

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
  return (
    <ul>
      {mockIdols.map((idol) => (
        <li>
          <IdolCircle idol={idol} />
        </li>
      ))}
    </ul>
  );
}

export default App;
