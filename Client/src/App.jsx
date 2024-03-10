import React, { useEffect, useState, createContext } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import HowitWork from "./pages/HowItWork/HowitWork";
import Question from "./pages/QuestionAnswer/Question";
import axios from "./axiosConfig";
import Home from "./Components/Home/Home";
import AnswerPage from "./pages/AnswerPage/AnswerPage";
import Allanswer from "./pages/Allanswer/Allanswer";
import UserQuestion from "./pages/UserPage/UserQuestion";
import UserAnswerPage from "./pages/UserPage/UserAnswerPage";
import UserAnswerEdit from "./pages/UserPage/UserAnswerEdit";
import UserQuestionEdite from "./pages/UserPage/UserQuestionEdite";
import Four04 from "./pages/Four04";

export const AppState = createContext();
function App() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: { Authorization: "Bearer " + token },
      });
      setUser(data);
      // console.log(data)
    } catch (error) {
      console.log(error.response);
      navigate("/");
    }
  }
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/howItWork" element={<HowitWork />} />
        <Route path="/question" element={<Question />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/questions/all-questions/:questionid" element={<AnswerPage/>} />
        <Route path="/answer/getanswers/:questionid" element={<Allanswer/>} />
        <Route path="/questions/my-questions/:userid" element={<UserQuestion/>} />
        <Route path="/answer/my-answer/:userid" element={<UserAnswerPage/>} />
        <Route path="/answer/getanswer/:answerid" element={<UserAnswerEdit/>} />
        <Route path="/questions/edit-question/:id" element={<UserQuestionEdite/>} />
        <Route path='*' element={<Four04/>}/>
      </Routes>
    </AppState.Provider>
  );
}

export default App;
