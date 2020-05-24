import * as actionType from "./ActionTypes";

const initState = {
  loading: false,
  loadedCount: 0,
  items: [],
  sideBar: true,
  categories: [
    {
      id: "c",
      name: "Categories",
      link: "/categories",
      strKey: "strCategory",
      data: [],
    },
    {
      id: "g",
      name: "Glasses",
      link: "/glasses",
      strKey: "strGlass",
      data: [],
    },
    {
      id: "i",
      name: "Ingredients",
      link: "/ingredients",
      strKey: "strIngredient1",
      data: [],
    },
    {
      id: "a",
      name: "Alcoholic",
      link: "/alcoholic",
      strKey: "strAlcoholic",
      data: [],
    },
  ],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionType.CATEGORYLOADED:
      //console.log("save");
      let categories = [...state.categories];
      categories[action.index].data = action.data;
      return {
        ...state,
        loadedCount: state.loadedCount + 1,
        categories: categories,
        loading: false,
      };
    case actionType.ITEMSLOADED:
      return {
        ...state,
        items: action.data,
      };
    case actionType.SIDEBAR:
      return {
        ...state,
        sideBar: !state.sideBar,
      };
    default:
      return state;
  }
};
export default reducer;
