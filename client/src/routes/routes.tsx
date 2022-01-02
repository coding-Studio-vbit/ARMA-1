import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../components/Auth/login";
import ForumRoutes from "./ForumRoutes";
import Table from "../components/CustomTable";

function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forum/*" element={<ForumRoutes />} />
        <Route path="/test" element={<Table api=""/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
