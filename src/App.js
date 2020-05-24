import React, { useEffect } from "react";
import Header from "./containers/header/Header";
import { connect } from "react-redux";
import Loading from "./UI/loading/Loading";
import Body from "./containers/body/Body";
import { Switch, Route } from "react-router-dom";
import Categories from "./containers/body/categories/Categories";
import { loadCategories } from "./store/Actions";
import "./App.css";
import image from "./background.jpg";

function App(props) {
  const { categories, loadCategories } = props;
  useEffect(() => {
    //console.log(props);
    loadCategories(categories);
  }, []);
  return (
    <div className="App">
      <Header />
      {props.loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <img className="backgroundImage" src={image} />
          <Body>
            <Switch>
              {props.categories.map((item, index) => {
                return (
                  <Route
                    key={item.id}
                    path={item.link}
                    render={(newProps) => (
                      <Categories
                        {...newProps}
                        index={index}
                        loaded={props.loaded}
                      />
                    )}
                  />
                );
              })}
            </Switch>
          </Body>
        </React.Fragment>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    categories: state.categories,
    loaded: state.loadedCount === 4 ? true : false,
  };
};
const mapActionsToProps = (despatch) => {
  return {
    loadCategories: (data) => despatch(loadCategories(data)),
  };
};
export default connect(mapStateToProps, mapActionsToProps)(App);
