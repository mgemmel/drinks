import React from "react";
import style from "./Menu.module.css";
import { connect } from "react-redux";

const Menu = (props) => {
  return (
    <div
      style={{
        transform: props.show ? "translateX(0)" : "translateX(-100vw)",
        opacity: props.show ? "1" : "0",
      }}
      className={style.Menu}
    >
      <nav>
        <ul className={style.menu}>
          {props.categories[props.index].data.map((item, index) => {
            return (
              <li
                className={style.menuLink}
                key={item}
                onClick={() => props.click(index)}
              >
                {item}
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
    loaded: state.loadedCount === 4 ? true : false,
    show: state.sideBar,
  };
};
const mapActions = (despatch) => {
  return {
    toggle: () => despatch(),
  };
};

export default connect(mapStateToProps, mapActions)(Menu);
