import React, { useContext, useState } from "react";
import logo from "../../assets/evangadi-logo-home.png";
import "./navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppState } from "../../App";
import avatarIcon from "../../assets/avater.jpg";

const Navbar = () => {
  const { user, setUser } = useContext(AppState);
  const userid = user ? user.userid : null;
  // console.log(user);
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleLogout = () => {
    // Perform logout actions (clear user data from local storage, etc.)
    localStorage.removeItem("token");
    setUser(null); // Clear user state
    
  };
  
  return (
    <header className="nav__bar ">
      <nav className="navigation">
        <div className="container">
          <div className="outer__continer">
            <div className="evLogo__continer">
              <img src={logo} alt="evangadi-logo" />
            </div>
            <div className="nav__links">
              <ul className="lists__cont">
                <li className="flex">
                  {user  && user.username ? (
                    <>
                      <div
                        className="avatar__container dropdown__container"
                        onMouseEnter={() => setIsDropdownVisible(true)}
                        onMouseLeave={() => setIsDropdownVisible(false)}
                      >
                        <img
                          src={avatarIcon}
                          alt="avatar"
                          className="avatar__icon"
                        />
                        {isDropdownVisible && (
                          <div className="dropdown__content">
                            <Link to={"/question"} className="singleList">
                              Ask Question
                            </Link>
                            <Link to={`/questions/my-questions/${userid}`} className="singleList">
                              My Questions
                            </Link>
                            <Link to={`/answer/my-answer/${userid}`} className="singleList">
                              My Answers
                            </Link>
                            <Link
                              to={"/"}
                              className="singleList"
                              onClick={handleLogout}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "crimson";
                                e.target.style.borderRadius = "10px";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "";
                                e.target.style.borderRadius = "";
                              }}
                            >
                              LOG OUT
                            </Link>
                          </div>
                        )}
                      </div>
                      <div></div>
                      <span className="welcome">Welcome: {user.username}</span>
                      {location.pathname !== "/question" && (
                        <button
                          className="nav_butn signin__butn"
                          onClick={() => navigate("/question")}
                        >
                          ASK ?
                        </button>
                      )}
                    </>
                  ) : (
                    <button className="nav_butn signin__butn">
                      <Link to="/">SIGN IN</Link>
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
