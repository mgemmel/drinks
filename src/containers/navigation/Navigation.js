import React, { useState } from "react";
import { connect } from "react-redux";
import Expand from "@material-ui/icons/ExpandMoreRounded";
import ExpandSidebar from "@material-ui/icons/ExpandMoreRounded";
import { NavLink } from "react-router-dom";
import { toggleSidebar } from "../../store/Actions";
import style from "./Navigation.module.css";

const Navigation = (props) => {
  const [active, setActive] = useState(false);
  const [activeS, setActiveS] = useState(false);
  const classes = [style.categoriesNav];
  if (active) {
    classes.push(style.show);
  }
  if (activeS) {
    classes.push(style.showS);
  }
  return (
    <div className={style.container}>
      <div className={style.showMenuContainer}>
        <div
          style={{
            transform: activeS ? "rotate(-90deg)" : "rotate(90deg)",
          }}
          className={style.expandIconContainerS}
          onClick={() => {
            props.toggleSidebar();
            setActiveS((prev) => {
              return !prev;
            });
          }}
        >
          <ExpandSidebar className={style.expandIcon} fontSize="large" />
        </div>
        <div
          style={{
            transform: active ? "rotate(180deg)" : "rotate(0)",
          }}
          className={style.expandIconContainer}
          onClick={() => {
            setActive((prev) => {
              return !prev;
            });
          }}
        >
          <Expand className={style.expandIcon} fontSize="large" />
        </div>
      </div>
      <nav className={classes.join(" ")}>
        <ul>
          {props.categories.map((item) => {
            return (
              <li className={style.linkItem} key={item.id}>
                <NavLink activeClassName={style.activeLink} to={item.link}>
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};
const mapActions = (despatch) => {
  return {
    toggleSidebar: () => despatch(toggleSidebar()),
  };
};

export default connect(mapStateToProps, mapActions)(Navigation);
