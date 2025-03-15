import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../pages/main/container/MainPage";
import ListPage from "../pages/list/ListPage.jsx";
import MyPage from "../pages/myPage/container/MyPage";
import AddIdol from "../pages/addIdols/container/AddIdol";
import HeaderLayout from "./HeaderLayout.jsx";

export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route element={<HeaderLayout />}>
          <Route path="/list" element={<ListPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/addIdol" element={<AddIdol />} />
        </Route>
      </Routes>
    </Router>
  );
}
