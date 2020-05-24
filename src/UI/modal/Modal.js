import React, { useEffect, useState } from "react";
import style from "./Modal.module.css";
const Modal = (props) => {
  const [ingredietns, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState();

  useEffect(() => {
    let ings = [];
    let i = 0;
    for (const key in props.item) {
      if (props.item[key] !== null && props.item[key] !== "") {
        if (key.startsWith("strIngredient")) {
          ings.push(props.item[key]);
        } else if (key === "strInstructions") {
          setInstructions(props.item[key]);
        } else if (key.startsWith("strMeasure")) {
          if (ings[i] !== "undefined") {
            ings[i] = ings[i] + ": " + props.item[key];
            i++;
          }
        }
      }
    }
    setIngredients(ings);
  }, []);

  return (
    <React.Fragment>
      <div onClick={props.click} className={style.Backdrop}></div>
      <div className={style.Detail}>
        <div className={style.title}>{props.item.strDrink}</div>
        <div className={style.content}>
          <div>
            <img
              className={style.modalImage}
              alt="detailImage"
              src={props.item.strDrinkThumb}
            />
          </div>
          <div className={style.contentInfo}>
            {/*<div className={style.ingredientsTitle}>Ingredients</div>*/}

            {ingredietns.map((item, index) => {
              return (
                <div className={style.ingredient} key={index}>
                  {item}
                </div>
              );
            })}
            <div className={style.divider} />
            {instructions ? (
              <div className={style.ins}>{instructions}</div>
            ) : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
