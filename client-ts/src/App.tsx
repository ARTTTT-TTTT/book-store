import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import { initializeApp } from "firebase/app";
import { config } from "./config/config";
import AuthRoute from "./components/AuthRoute";

initializeApp(config.firebaseConfig);

export interface IApplicationProps {}

const App: React.FunctionComponent<IApplicationProps> = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthRoute element={<Home />} />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
