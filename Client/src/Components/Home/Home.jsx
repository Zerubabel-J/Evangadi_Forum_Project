import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import { SlLike } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { SlDislike } from "react-icons/sl";
import img1 from "../../assets/10002.svg";
import img2 from "../../assets/10003.svg";
import img3 from "../../assets/10001.png";
import { IoSearchOutline } from "react-icons/io5";
import { AppState } from "../../App";
import classes from "./home.module.css";
import LeftProfile from "./LeftProfile";
import Layout from "../../pages/Layout/Layout";


const Home = () => {
  const { questionid } = useParams();
  const user = useContext(AppState);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [answers, setAnswers] = useState([]);


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("/questions/all-questions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(data.task);
        
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const filtered = questions
      ? questions.filter((question) =>
          question.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
    setFilteredQuestions(filtered);
  }, [searchTerm, questions]);


  const handleSearch = () => {
    setFilteredQuestions(
      questions.filter((question) =>
        question.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

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


  const handleLike = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      await axios.patch(`/all-questions/${questionid}/like`);
      setLikes(likes + 1);
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  const handleDislike = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      await axios.patch(`/all-questions/${questionid}/dislike`);
      setDislikes(dislikes + 1);
    } catch (error) {
      console.error("Error updating dislike count:", error);
    }
  
  };
  // Scroll behavior function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle window scroll event
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
},[]);

  return (
    <Layout>
    <section className={classes.outer_cont}>
      <div className={classes.bg}>
        <div className={classes.img_display}>
          <div className={classes.first_img_cont}>
            <img src={img1} alt="" />
          </div>
          <div className={classes.therd_img_cont}>
            <input
              className={classes.search}
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className={classes.search_icon}>
              <IoSearchOutline size={35} onClick={handleSearch} />
            </span>
            <img src={img3} alt="" />
          </div>
          <div className={classes.second_img_cont}>
            <img src={img2} alt="" />
          </div>
        </div>
      </div>
      <div className={classes.middle_section}>
        <div className={classes.left_side}>
          <LeftProfile />
        </div>
        {filteredQuestions?.length == 0 ?(<h3 className={classes.no_found} > No question found!</h3> ):(
          <div className={classes.question_column}>
         
          {filteredQuestions?.map((question) => (
            <div key={question.questionid}>
              <div className={classes.post}>
                <div className={classes.postHeader}>
                  <div>
                    <CgProfile size={35}/>
                    <span className={classes.postUser}>{question.username}</span>
                  </div>
                  <div>
                    <br />
                    <span className={classes.postDate}>
                      {question.timestamp}
                    </span>
                  </div>
                </div>
                <div className={classes.postContent}>
                  <h3 className="">Tag: {question.title} </h3>
                  <h4>{question.description}</h4>
                </div>
                <div className={classes.postActions}>
                  <div>
                    <Link to={`/all-questions/${questionid}/like`} className="post-like" onClick={handleLike}>
                      <SlLike />
                      Like:{" "}
                      <span className={classes.postLikeCount}></span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href=""
                      className={classes.postDislike}
                      onClick={handleDislike}
                    >
                      <SlDislike />
                      <span className={classes.dislike}>
                        {" "}
                        Dislike: 
                      </span>
                    </Link>
                  </div>
                  <div>
                  <Link
                    to={`/questions/all-questions/${question.questionid}`}
                    className={classes.postTotalAnswers}
                  >
                    Give-Answer:
                  </Link>
                  </div>
                 
                  <Link to={`/answer/getanswers/${question.questionid}`}>
                  View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        ) }
        
      </div>
      <div className={classes.btn}>
        <button
          className={`scroll-to-top-button ${showButton ? "visible" : ""}`}
          onClick={scrollToTop}
          aria-label="Scroll to top" 
          tabIndex={0} 
        >
          Back to top
         
        </button>
</div>
    </section>
    </Layout>
  );
};

export default Home;
