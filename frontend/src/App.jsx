import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";
import Login from "./components/login";
import Navbar from "./components/Navbar";
import AdminDashboard from "./components/AdminDashboard";
import QuestionPage from "./components/QuestionPage";
import Signup from "./components/Signup";


function App() {
  return (
   <BrowserRouter>
   <Navbar />
   <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/adminDashboard" element={<AdminDashboard />} />
    <Route path="/questions" element={<QuestionPage />} />
    <Route path="/signup" element={<Signup />} />
    

   </Routes>
   </BrowserRouter>
  );
}

export default App;
