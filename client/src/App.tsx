import { Provider } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from './redux/reducers';

import Scheduler from "./components/Scheduler/Scheduler";
import Test from './Test';

const store = createStore(rootReducer);

function App() {
    return (
        <Provider store={store}>
            <Scheduler />;
            {/* <Test /> */}
        </Provider>
    )
}

export default App;
