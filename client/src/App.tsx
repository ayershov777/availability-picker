import { Provider } from "react-redux";

import store from "./redux/store";
import Scheduler from "./components/Scheduler/Scheduler";

function App() {
    return (
        <Provider store={store}>
            <Scheduler />
        </Provider>
    )
}

export default App;
