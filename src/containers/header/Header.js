import React, { useRef } from "react";
import { connect } from "react-redux";
import { search } from "../../store/Actions";
import logo from "./logo.png";
import style from "./Header.module.css";
import Navigation from "../navigation/Navigation";
import Search from "@material-ui/icons/LocalBar";

const Header = (props) => {
  const ref = useRef();
  let searchTimer;
  const timer = (val) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      if (val === ref.current.value) {
        props.search(val);
        //console.log(val + " *  " + ref.current.value);
      } else {
        //console.log("ine");
      }
    }, 500);
  };
  return (
    <header>
      <div className={style.header}>
        <div className={style.imgContainer}>
          <img alt="Logo" src={logo} />
        </div>
        <div className={style.search}>
          <label>Find your drink</label>
          <Search className={style.searchIcon} />
          <input
            ref={ref}
            onChange={(event) => {
              return timer(event.target.value);
            }}
            placeholder="search"
          ></input>
        </div>
      </div>
      <Navigation />
    </header>
  );
};

const mapActions = (despatch) => {
  return { search: (val) => despatch(search(val)) };
};

export default connect(null, mapActions)(Header);
