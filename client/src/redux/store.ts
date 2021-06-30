import { compose, createStore } from "redux";
import rootReducer from "./reducers";

import CustomWindow from "../types/common/window.types";
declare let window: CustomWindow;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducer, composeEnhancers());
