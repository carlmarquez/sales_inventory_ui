import {
    BrowserRouter as Router, Route,
} from "react-router-dom";
import MainUI from './components/mainUI/MainUI'
import Pos from "./components/POS/Pos";

const App = () => {
    return (
        <Router>
            <switch>
                {/*<Route exact path="/pos">*/}
                {/*    <Pos/>*/}
                {/*</Route>*/}
                {/*<Route exact path="/login">*/}
                {/*    <Login/>*/}
                {/*</Route>*/}
                <MainUI/>
            </switch>
        </Router>
    );
}

export default App;
