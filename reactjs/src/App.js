import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Auth from "./pages/Auth";
import Page from "./pages/Page";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Auth />}></Route>
          <Route path="/" element={<Page />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
