import { faStar, faStarHalf } from "@fortawesome/free-regular-svg-icons";
import { faStarAndCrescent } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Quiz.css";
import React from "react";

export default function Stars({ filled }) {
  return (
    <div>
      <FontAwesomeIcon
        className="starPoint"
        icon={faStar} beat={filled}
        color={filled ? "orange" : "grey"}
        size={filled?"2xl":"x"}
      ></FontAwesomeIcon>
    </div>
  );
}
