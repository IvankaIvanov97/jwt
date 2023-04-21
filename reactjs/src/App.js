import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Auth from "./pages/Auth";
import Page from "./pages/Page";
import api, { apiSetHeader } from "./services/api";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    chech();
  }, []);
  async function chech() {
    if (localStorage.getItem("access") !== null) {
      apiSetHeader("Auth", `${localStorage.getItem("access")}`);
      await api.get("chech");
    } else {
      navigate("/login");
    }
  }
  return (
    <>
      <Routes>
        <Route path="/login" element={<Auth />}></Route>
        <Route path="/" element={<Page />}></Route>
      </Routes>
    </>
  );
}

export default App;
