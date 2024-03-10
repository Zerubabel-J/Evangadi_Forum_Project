import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import { Link, useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import Layout from "../Layout/Layout";
import classes from "./allanswer.module.css";
import SingleQuestion from "../AnswerPage/SingleQuestion";
import AsherPage from "../Qsher/AsherPage";
import { CgProfile } from "react-icons/cg";

const Allanswer = ({answerCount}) => {
  const { questionid } = useParams();
  const { user } = useContext(AppState);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnswer = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`/answer/getanswers/${questionid}`, {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        });
        setAnswers(response.data.answers);
        console.log(response.data);
        // console.log(response.data.answers);
        // console.log(answers.data.answers);
      } catch (error) {
        console.error("Error fetching question:", error);
        setError("Error fetching question. Please try again.");
      }
    };
    fetchAnswer();
  }, [questionid]);

  return (
    <Layout>
      <AsherPage />
      <SingleQuestion />
      <div className={classes.titles} >
        
           {answers?.length > 0 ? (<h3>Answer provided by the comunity <br /><small>There are{answers.length} answers</small> </h3>):(
            <h3>Be the first to give answer</h3>
           )}
        <hr />

        {answers?.length > 0 ? (
          <div>
            {answers?.map((answer, index) => (
              <div key={index} className={classes.post}>
               <CgProfile size={35}/> 
                <span> by {answer.username}</span>
                
                <h4>
                  Answer {index + 1}: {answer.answer}
                </h4>
              </div>
            ))}
          </div>
        ) : (
          <h3>No answers found.</h3>
        )}
        <div className={classes.but_contener}>
        <button className={`${classes.btn} butn`}>
          <Link to="/home">Back to Home</Link>
        </button>
        <button className={`${classes.btn} butn`}>
          <Link to={`/questions/all-questions/${questionid}`}>Give answer</Link>
        </button>
        </div>
       
      </div>
      
    </Layout>
  );
};

export default Allanswer;
