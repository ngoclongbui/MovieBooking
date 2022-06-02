import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { CarouselReducers } from "../reducers/CarouselReducers";

import { CinemaManageReducers } from "../reducers/CinemaManageReducers";
import { UserManageReducers } from "../reducers/UserManageReducers";
import { MovieManageReducers } from "../reducers/MovieManageReducers";
import { TicketManageReducers } from "../reducers/TicketManageReducers";
import { LoadingReducers } from "../reducers/LoadingReducers";

const rootReducer = combineReducers({
  CarouselReducers,
  MovieManageReducers,
  CinemaManageReducers,
  UserManageReducers,
  TicketManageReducers,
  LoadingReducers,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
