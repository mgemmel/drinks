import React from "react";
import style from "./Body.module.css";

const Body = (props) => {
  return <div className={style.alcoholBody}>{props.children}</div>;
};

export default Body;
