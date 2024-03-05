import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthRoute from "./components/AuthRoute";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import FormPage from "./pages/form";
import RegisterPage from "./pages/register";
import DetailPage from "./pages/detail";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<AuthRoute element={<HomePage />} />}
                />
                <Route
                    path="/detail/:book_id"
                    element={<AuthRoute element={<DetailPage />} />}
                />
                <Route
                    path="/form"
                    element={<AuthRoute element={<FormPage />} />}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
