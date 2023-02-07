import Header from "./components/Header";
import React, { useEffect } from "react";
import MainLayout from "./components/Layout";
import useAuth from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { loginRoutes } from "./helpers/routes";

function App() {
  const isLogin = useAuth()
  const navigate = useNavigate()
  return (
    <div>
        <Header />
        {isLogin ? (
            <MainLayout />
        ) : (
            <Routes>
                {loginRoutes.map((item) => (
                    <Route
                        key={item.id}
                        path={item.path}
                        element={item.component}
                    />
                ))}
            </Routes>
        )}
    </div>
)

}
export default App












