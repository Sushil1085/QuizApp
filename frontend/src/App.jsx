import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";
import Login from "./components/login";
import Navbar from "./components/Navbar";
import AdminDashboard from "./components/AdminDashboard";
import QuestionPage from "./components/QuestionPage";


function App() {
  return (
   <BrowserRouter>
   <Navbar />
   <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/adminDashboard" element={<AdminDashboard />} />
    <Route path="/questions" element={<QuestionPage />} />
    

   </Routes>
   </BrowserRouter>
  );
}

export default App;
