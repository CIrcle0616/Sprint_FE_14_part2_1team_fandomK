import Routers from "./Routers";
import IdolCircle from "./IdolCircle";
import ChargeModal from "./ChargeModal";
import GlobalStyles from "../styles/GlobalStyles";
import theme from "../styles/theme";

function App() {
  return (
    <>
      <GlobalStyles theme={theme} />
      <Routers />
    </>
  );
}

export default App;
