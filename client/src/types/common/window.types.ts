import { compose } from "redux";

type CustomWindow = Window & {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
};

export default CustomWindow;