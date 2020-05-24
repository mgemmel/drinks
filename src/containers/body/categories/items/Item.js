import React from "react";
import style from "./Item.module.css";
const Item = (props) => {
  return (
    <div className={style.itemContainer} onClick={() => props.click()}>
      <div className={style.item}>
        <h4>{props.item.strDrink}</h4>
        <img alt="drinkIcon" src={props.item.strDrinkThumb} />
      </div>
    </div>
  );
};

export default Item;
