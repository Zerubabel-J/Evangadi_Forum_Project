import { useContext, useState, useEffect } from "react";
import { AppState } from "../../App";
import Layout from "../Layout/Layout";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { BsCheck2Square } from "react-icons/bs";
import img from "../../assets/stick_figure_sit_in_question_mark_300_nwm (1).jpg";
import classes from "./questionAnswer.module.css"
import QsherPage from "../Qsher/QsherPage";
const Question = () => {
  const user = useContext(AppState);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [questionResponse, setQuestionResponse] = useState("");
  const [error, setError] = useState("")
  const [asked, setAsked]= useState('')



  function submitQuestion(e) {
    e.preventDefault();

    if (!title || !discription) {
      setError("Question title or Discrtiption can not be empty")
      return
    }
    const token = localStorage.getItem("token");
    try {
      const askload = {
        title: title,
        description: discription,
      };
      axios.post("/questions/ask-questions", askload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setAsked("Question asked");
      navigate("/home", { msg: "you have poste new queston" });
    } catch (error) {}
  }

  return (
    <Layout>
      <section className="explained">
        <QsherPage/>
        <div className={classes.question_steps}>
          <div className={classes.img_contener}>
            <img src={img} alt="" />
          </div>
          <div className={classes.step_listes}>
            <h1>Steps To Write a Good Question</h1>
            <ul>
              <li>
                <span>
                  <BsCheck2Square size={23} color="#2ca87d" />
                </span>
                Describe your problem in more detail.
              </li>
              <li>
                <span>
                  <BsCheck2Square size={23} color="#2ca87d" />
                </span>{" "}
                Summarize your problem in a one-line title.
              </li>
              <li>
                <span>
                  <BsCheck2Square size={23} color="#2ca87d" />
                </span>
                Describe what you tried and what you expected to happen.
              </li>
              <li>
                <span>
                  <BsCheck2Square size={23} color="#2ca87d" />
                </span>
                Review your question and post it to the site.
              </li>
            </ul>
          </div>

          <hr />
        </div>
        <div className={classes.ask_container}>
          <h1 className={classes.text_gradient}>Ask a Public Question</h1>
          {/* <select className="tag" name="" id="">
              <option value="">Select Tag</option>
            </select> */}
          <form action="" onSubmit={submitQuestion}>
            <div className={classes.title_contener}>
              <input
                className={classes.title_input}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"
              />
            </div>
            <div className={classes.question}>
              <textarea
                onChange={(e) => setDiscription(e.target.value)}
                id="bio"
                name="bio"
                rows="3"
                cols="30"
                placeholder="Question Content"
              ></textarea>
            <small className={classes.error_display}>{error}</small>

            </div>
            <button className="butn" type="submit">
              Post your Question
            </button>
            <Link to={"/home"}>
            <button className={`${classes.btn} butn`} >
              Back to Home
            </button>
            </Link>
          </form>
         
        </div>
      </section>
    </Layout>
  );
};

export default Question;
