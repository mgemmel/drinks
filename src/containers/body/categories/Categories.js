import React, { useState, useEffect } from "react";
import Menu from "../../../components/menu/Menu";
import style from "./Categories.module.css";
import { connect } from "react-redux";
import { loadItems } from "../../../store/Actions";
import Item from "./items/Item";
import axios from "../../../axios-instance";
import Modal from "../../../UI/modal/Modal";
//import Loading from "../../../UI/loading/Loading";

const Categories = (props) => {
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState();
  const { loaded } = props;
  useEffect(() => {
    //console.log(loaded);
    if (loaded) {
      props.loadItems(
        props.categories[props.index].data[0],
        props.categories[props.index].id
      );
    }
  }, [loaded]);
  const handleIndex = (index) => {
    props.loadItems(
      props.categories[props.index].data[index],
      props.categories[props.index].id
    );
  };
  const loadDetails = (id) => {
    axios.get(`/lookup.php?i=${id}`).then((response) => {
      //console.log(response.data.drinks[0]);
      setShowDetail(true);
      setDetailData(response.data.drinks[0]);
    });
  };
  const closeDetail = () => {
    setShowDetail(false);
    setDetailData(null);
  };
  return (
    <div className={style.Container}>
      <Menu index={props.index} click={handleIndex} />
      <div className={style.categoriesContainer}>
        {showDetail && detailData ? (
          <Modal show={showDetail} click={closeDetail} item={detailData} />
        ) : null}
        {props.items.map((item, index) => {
          return (
            <Item
              click={() => loadDetails(item.idDrink)}
              key={index}
              item={item}
            />
          );
        })}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    items: state.items,
  };
};
const mapActionsToProps = (despatch) => {
  return {
    loadItems: (name, id) => despatch(loadItems(name, id)),
  };
};
export default connect(mapStateToProps, mapActionsToProps)(Categories);
