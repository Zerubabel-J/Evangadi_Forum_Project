import React from "react";
import "./footer.css";
import logo from "../../assets/evangadi-logo-footer.png";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <section className="footer__container">
      <section className="link_wraper">
        <div className="logo_contener">
          <img className="footer__logo" src={logo} alt="evangadi-logo" />
          <div className="socila__link">
            <Link to="https://www.facebook.com/evangaditech" target="_blank">
              <FaFacebookF />
            </Link>
            <Link to="https://www.instagram.com/evangaditech/" target="_blank">
              <FaInstagram />
            </Link>
            <Link to="https://www.youtube.com/@EvangadiTech" target="_blank">
              <FaYoutube />
            </Link>
          </div>
        </div>
        <div className="footer_link">
        <div>
          <ul className="useful_link">
            <li>Useful Link</li>
            <li>
              <Link to="">How it works</Link>
            </li>
            <li>
              <Link to="">Terms of Service</Link>
            </li>
            <li>
              <Link to="">Privacy policy</Link>
            </li>
          </ul>
        </div>
        <div className="contact">
          <ul>
            <li className="title">Contact Info</li>
            <li>Evangadi Networks</li>
            <li>support@evangadi.com</li>
            <li>+1-202-386-2702</li>
          </ul>
        </div>
        </div>
        
      </section>
    </section>
  );
};

export default Footer;
