import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import { Link, useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import AsherPage from "../Qsher/AsherPage";
import Layout from "../Layout/Layout";
import classes from "./userPage.module.css";
import { CiEdit } from "react-icons/ci";

Layout;
const UserAnswerPage = ({ answerDisplay }) => {
  const { user, setUser } = useContext(AppState);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);
  const userid = user.userid;
  useEffect(() => {
    const fetchAnswer = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`/answer/my-answer/${userid}`, {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        });
        setAnswers(response.data.answers);
        // console.log(response.data);
        // console.log(answers.data.answers);
      } catch (error) {
        console.error("Error fetching question:", error);
        setError("Error fetching question. Please try again.");
      }
    };
    fetchAnswer();
  }, [userid]);

  return (
    <Layout>
      <AsherPage />
      <div className={classes.title}>
        <h3>{user.username}: All the Answer you have submitted.</h3>
        <hr />
        {answers?.length > 0 ? (
          <div>
            {answers?.map((answer, i) => (
              <div key={i} className={classes.post}>
                <small>Answer {++i}:</small>
                <h4>{(answerDisplay = `${answer.answer}`)}</h4>
                <div className={classes.icons}>
                  <Link to={`/answer/getanswer/${answer.answerid}`}>
                    <CiEdit size={35} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No answers found.</p>
        )}
        <button className={`${classes.btn} butn`}>
          <Link to="/home">Back to Home</Link>
        </button>
      </div>
    </Layout>
  );
};

export default UserAnswerPage;
