import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";
import Login from "./components/login";


function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login />} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
