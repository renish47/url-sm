/* eslint-disable no-unused-vars */
import { Route, Routes } from "react-router-dom";
import UrlSm from "./UrlSm";
import NewPasswordPage from "./components/NewPasswordPage";
import Redirect from "./components/Redirect";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UrlSm />} />
      <Route path="/reset-password/:id" element={<NewPasswordPage />} />
      <Route path="/:id" element={<Redirect />} />
    </Routes>
  );
}

export default App;
