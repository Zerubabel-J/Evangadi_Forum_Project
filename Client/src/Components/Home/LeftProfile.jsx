import React, { useContext } from "react";
import { IoHome } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaQuestion } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FaTags } from "react-icons/fa";
import classes from "./leftProfile.module.css";
import { Link, useParams } from "react-router-dom";
import { AppState } from "../../App";
import htmlImg from "../../assets/html-removebg-preview.png";
import cssImg from "../../assets/css-removebg-preview.png";
import jsImg from "../../assets/js-removebg-preview.png";
import nodeImg from "../../assets/node-removebg-preview.png";
import reactImg from "../../assets/react-removebg-preview.png";

const LeftProfile = () => {
  const  {user} = useContext(AppState);
  const userid = user.userid;
  console.log(user)

  return (
    <>
      <div className={classes.icons}>
        <ul className={classes.iconsList}>
          <li>
            <Link to="">
              <CgProfile size={45} />
              <Link to=""> {user.username}</Link>
            </Link>
            <Link to={`/questions/my-questions/${userid}`}>My Questions</Link>
            <Link to={`/answer/my-answer/${userid}`}>My Answers</Link>
          </li>
          <li>
            <Link to="">
              <IoHome />
              <br />
              <small>Home</small>
            </Link>
          </li>
          <li>
            <Link to="/question">
              <FaQuestion />
              <br />

              <small>Ask question</small>
            </Link>
          </li>
          <li>
            <Link to="" style={{ position: "relative" }}>
              <IoNotifications />
              <br />
              <span className={classes.notificationBadge}>5</span>{" "}
              <span>Notification</span>
            </Link>
          </li>
          <li>
            <Link to="">
              <FaTags />
              <br />
              <span>Search by tag</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className={classes.corse_img}>
        <div className={classes.html_imgs}>
          <img src={htmlImg} alt="" />
        </div>
        <div className={classes.css_img}>
          <img className="" src={cssImg} alt="" />
        </div>
        <div className={classes.js_img}>
          <img className="" src={jsImg} alt="" />
        </div>
        <div className={classes.node_img}>
          <img src={nodeImg} alt="" />
        </div>
        <div className={classes.react_img}>
          <img src={reactImg} alt="" />
        </div>
      </div>
    </>
  );
};

export default LeftProfile;
