import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";
import Login from "./components/login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import QuestionPage from "./components/QuestionPage";
import SignupAdmin from "./components/SignupAdmin";
import QuizAdd from "./components/QuizAdd";
import SignupUser from "./components/SignupUser";
import {Provider} from "react-redux";
import appStore from "./utils/appStore";
import QuestionpageUser from "./components/QuestionpageUser";
import ScoreCards from "./components/ScoreCards";


function App() {
  return (
    <Provider store={appStore}>
   <BrowserRouter>
   {/* <Navbar /> */}
   <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/questions/:id" element={<QuestionPage />} />
    <Route path="/questions/:quizId/:userId" element={<QuestionpageUser />} />
    <Route path="/signupAdmin" element={<SignupAdmin />} />
    <Route path="/signupUser" element={<SignupUser />} />
    <Route path="/quizAdd" element={<QuizAdd />} />
    <Route path="/scorecard" element={<ScoreCards />} />
    

   </Routes>
   </BrowserRouter>
   </Provider>
  );
}

export default App;
