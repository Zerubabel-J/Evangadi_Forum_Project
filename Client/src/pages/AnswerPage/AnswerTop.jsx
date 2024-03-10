import React from 'react'
import imgA from "../../assets/6d1dc4b1793d6c5c2ef40402171bff07.gif";
import { BsCheck2Square } from "react-icons/bs"
import classes from "./answer.module.css";
import AsherPage from '../Qsher/AsherPage';
const AnswerTop = () => {
  return (
    <>
       <AsherPage/>
        <div className={classes.steps}>
          <div className={classes.img_contener}>
            <img src={imgA} alt="" />
          </div>
          <div className={classes.answer_step_listes}>
            <h1>Steps To Write a Good Answer</h1>
            <ul>
              <li>
                <span>
                  <BsCheck2Square size={23} color="#2ca87d" />
                </span>
                Read the question carefully
              </li>
              <li>
                <span>
                  <BsCheck2Square size={23} color="#2ca87d" />
                </span>{" "}
                Understand the question well
              </li>
              <li>
                <span>
                  <BsCheck2Square size={23} color="#2ca87d" />
                </span>
                Use simple language
              </li>
              <li>
                <span>
                  <BsCheck2Square size={23} color="#2ca87d" />
                </span>
                Write to the best of your ability
              </li>
            </ul>
          </div>
        </div>
    </>
  )
}

export default AnswerTop
