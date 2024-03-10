import React, { useRef, useState, useContext } from "react";
import "./loginpage.css";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
// import { use } from "../../../../routes/userRouts";

const LoginPage = () => {
  // const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [logInDisplay, setLogInDisplay] = useState("");
  const [regInDisplay, setRegInDisplay] = useState("display");
  const [resetPage, setResetPage] = useState("display");
  const [errors, setErrors] = useState("");
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [emailClicked, setEmailClicked] = useState(false);
  const [passwordClicked, setPasswordClicked] = useState(false);
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser]=useState("")

  // page changing functions start here***
  function registerPage() {
    setRegInDisplay("");
    setLogInDisplay("display");
    setResetPage("display");
  }
  function loginPage() {
    setLogInDisplay("");
    setRegInDisplay("display");
    setResetPage("display");
  }
  function passwordReset() {
    setResetPage("");
    setLogInDisplay("display");
    setRegInDisplay("display");
  }
  // page changing functions end here
  // ********************************
  // password show and hide function
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  // registration handling function start here*
  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !firstName || !lastName || !userName || !password) {
      setErrors("Please provide all required information");
      return;
    }
    try {
      await axios.post("/users/register", {
        email: email,
        firstname: firstName,
        lastname: lastName,
        username: userName,
        password: password,
      });
      alert("Register Successfull");
      navigate(loginPage());
    } catch (error) {
      console.log(error.response);
    }
  }
  // registration handling function end here*
  // ****************************************
  // login handling function start here*
  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      setErrors("Please provide all required information");
      return errors;
    }

    try {
      const { data } = await axios.post("/users/login", {
        email: email,
        password: password,
      });

      // alert("Log Successfull");
      localStorage.setItem("token", data.token);
      const user = data;
      navigate("/home");
      if (data.length == 0) {
        setInvalidCredentials(true);
        return;
      }
      if (data) {
        window.location.reload();
      }
    } catch (error) {
      setInvalidCredentials(true);
      console.log(error.response);
    }
  }
  return (
    <Layout>
      <section className="main__bg ">
        {/* left side statr here */}
        <div className="left_side">
          {/* login page statrt here */}
          <div className={logInDisplay}>
            <h3 className="login_account">Login to your account</h3>
            <p>
              Don’t have an account?{" "}
              <Link
                className="creat_account"
                onClick={() => registerPage()}
                to=""
              >
                Create a new account
              </Link>
            </p>
            <form className="login_form" onSubmit={handleLogin}>
              <small className="error_display">{errors}</small>
              <small className="error_display">
                {invalidCredentials && "Invalid credentials!"}
              </small>
              <input
                onClick={() => setEmailClicked(true)}
                onBlur={() => setEmailClicked(false)}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className={`email_input ${emailClicked ? "underline" : ""} ${
                  errors && !email ? "error-bg" : ""
                }`}
                name="eva_email"
                placeholder="Email address"
              />

              <input
                onClick={() => setPasswordClicked(true)}
                onBlur={() => setPasswordClicked(false)}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                className={`password__input ${passwordClicked ? 'underline' : ''} ${errors && !password ? 'error-bg' : ''}`}
                name="password"
                placeholder="Password"
              />
              <span className="toggle_password" onClick={handleTogglePassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <p className="forgotPwd">
                <Link
                  id="forgot-pass"
                  className="lnk-toggler da"
                  data-panel=".panel-forgot"
                  to="#"
                  onClick={() => passwordReset()}
                >
                  Forgot password?
                </Link>
              </p>
              <button className="butn_login" type="submit">
                Login
              </button>
            </form>
          </div>
          {/* login page end here */}
          {/* ************************** */}
          {/* register page start here */}
          <div
            initial={{ x: -500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={regInDisplay}
          >
            <h3 className="join-net">Join the network</h3>
            <p className="alrdy">
              Already have an account?
              <Link to="" onClick={() => loginPage()}>
                {" "}
                Sign in
              </Link>
            </p>
            <form onSubmit={handleSubmit}>
              <small className="error_display">{errors}</small>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className={`email_input ${errors && !email ? "error-bg" : ""}`}
                name="eva_email"
                placeholder="Email address"
              />
              <div className="personal-info">
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  id="fname-input"
                  type="text"
                  className={`f-name ${errors && !firstName ? "error-bg" : ""}`}
                  name="firstname"
                  placeholder="First Name"
                />
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  id="lname-input"
                  type="text"
                  className={`l-name ${errors && !lastName ? "error-bg" : ""}`}
                  name="lastname"
                  placeholder="Last Name"
                />
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  id="userName-input"
                  type="text"
                  className={`l-name ${errors && !userName ? "error-bg" : ""}`}
                  name="User name"
                  placeholder="User Name"
                />
              </div>
              <div className="paswrd-insert">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className={`password__input ${
                    errors && !password ? "error-bg" : ""
                  }`}
                  name="password"
                  // value={password}
                  placeholder="Password"
                />
                <div
                  className="toggle_password_reg"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <p className="term-policy small">
                I agree to the <Link to="#">privacy policy</Link> and{" "}
                <Link to="#">terms of service</Link>.
              </p>
              <button id="agree-but" className="butn_login" type="submit">
                Agree and Join
              </button>
              <Link to="" className="already" onClick={() => loginPage()}>
                Already have an account?
              </Link>
            </form>
          </div>
          {/* register page end here */}
          {/* reset password page start here */}
          <div className={resetPage}>
            <h4 className="reset_title">Reset your password</h4>
            <p className="reset__desc">
              Fill in your e-mail address below and we will send you an email
              with further instructions.
            </p>
            <input
              type="email"
              className="email_input"
              name="emailaddress"
              placeholder="Email address"
            />
            <button className="butn_login" type="submit">
              Reset your password
            </button>
            <div className="links">
              <Link
                onClick={() => loginPage()}
                data-panel=".panel-login"
                to="#"
              >
                Already have an account?
              </Link>

              <Link
                data-panel=".panel-signup"
                to="#"
                onClick={() => registerPage()}
              >
                Don’t have an account?
              </Link>
            </div>
          </div>
        </div>
        <div className="right_side">
          <div className="right_in_contener">
            <small className="about">About</small>
            <h2 className="evangadi-network text-gradients">
              Evangadi Networks
            </h2>
            <p className="p1">
              No matter what stage of life you are in, whether you’re just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>
            <p className="p2">
              Wheather you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>
            <button className="h_w_butn">
              <Link to="/howItWork">HOW IT WORKS</Link>
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;
