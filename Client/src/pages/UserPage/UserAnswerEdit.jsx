import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import classes from "./userPage.module.css";
import Layout from "../Layout/Layout";
import AsherPage from "../Qsher/AsherPage";
import { AppState } from "../../App";

const UserAnswerEdit = () => {
  const { answerid } = useParams();
  const [answers, setAnswers] = useState("");
  const navigate = useNavigate();
  const  {user} = useContext(AppState);
  const userid = user.userid;

  useEffect(() => {
    const fetchAnswer = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`/answer/getanswer/${answerid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const answerData = response.data.answers[0]?.answer || "";
        setAnswers(answerData);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching answer:", error);
      }
    };
    fetchAnswer();
  }, [answerid]);

  const edit = async (updateAnswer) => {
    const token = localStorage.getItem("token");
    const answerUpdate = {
      answer: updateAnswer,
    };
    try {
      const response = await axios.patch(
        `/answer/updateAnswer/${answerid}`, // Correct endpoint for updating the answer
        answerUpdate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Answer updated successfully");
      } else {
        console.log("Error updating Answer");
      }
      navigate(`/answer/my-answer/${userid}`)
    } catch (error) {
      console.log("Error: unable to update Answer", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    edit(answers); // Call the edit function to update the answer
  };
  
  return (
    <Layout>
      <AsherPage />
      <div className={classes.container}>
        <h1 className={classes.edith1}>Update Answer</h1>
        <form className={classes.answer_edit} onSubmit={handleSubmit}>
          <label htmlFor="description">Answer:</label>
  
          <textarea
            className={classes.description}
            id="description"
            value={answers}
            onChange={(e) => setAnswers(e.target.value)}
          ></textarea>
  
          <button
            className={`${classes.btn} butn`}
           
            onClick={() => edit(answers)}
          >
            Update Answer
          </button>
        </form>
      </div>
      {/* <Link>Back To HomePage</Link> */}
    </Layout>
  );
};

export default UserAnswerEdit;
