import * as actionTypes from "./ActionTypes";
import axios from "../axios-instance";
/*const loading = () => {
  return {
    type: actionTypes.LOADING,
  };
};*/
const categoryLoaded = (type, index, data) => {
  return {
    type: type,
    index: index,
    data: data,
  };
};
export const loadCategories = (categories) => {
  return (despatch) => {
    categories.forEach((element, index) => {
      axios.get(`/list.php?${element.id}=list`).then((response) => {
        //console.log(response);
        const data = response.data.drinks.map((item) => {
          return item[element.strKey];
        });
        despatch(categoryLoaded(actionTypes.CATEGORYLOADED, index, data));
      });
    });
  };
};

export const loadItems = (name, id) => {
  return (despatch) => {
    axios.get(`/filter.php?${id}=${name}`).then((response) => {
      //console.log(response);
      let data = response.data.drinks;
      despatch({
        type: actionTypes.ITEMSLOADED,
        data: Array.isArray(data) && data.length ? data : [],
      });
    });
  };
};
export const search = (name) => {
  return (despatch) => {
    axios.get(`/search.php?s=${name}`).then((response) => {
      //console.log(response);
      let data = response.data.drinks;
      despatch({
        type: actionTypes.ITEMSLOADED,
        data: Array.isArray(data) && data.length ? data : [],
      });
    });
  };
};
export const toggleSidebar = () => {
  return {
    type: actionTypes.SIDEBAR,
  };
};
