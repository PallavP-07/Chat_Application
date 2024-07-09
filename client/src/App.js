import React, { lazy } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
const Home = lazy(() => import("./Pages/Home"));
const Chat = lazy(() => import("./Pages/Chat"));
const Group = lazy(() => import("./Pages/Group"));
const Login = lazy(() => import("./Pages/Login"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));
const App = () => {

  const user =true;
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute user={user} />} >
              <Route path="/" element={<Home />} />
              <Route path="/group" element={<Group />} />
              <Route path="/chat/:id" element={<Chat />} />
            </Route>
            <Route
              path="/login"
              element={
                <ProtectedRoute user={!user} redirect="/">
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
