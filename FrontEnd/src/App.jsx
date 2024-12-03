import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/RegisterPage";
import Login from "./Pages/LoginPage";
import City from "./Pages/City";
import CityDetail from "./Pages/CityDetail";
import CreateCity from "./Pages/CreateCity";
import "./App.css";
import Schools from "./Pages/Schools";
import SchoolDetail from "./Pages/SchoolDetail";
import CreateSchool from "./Pages/CreateSchool";
import Student from "./Pages/Student";
import StudentDetail from "./Pages/StudentDetail";
import CreateStudent from "./Pages/createStudent";
import NotFound from "./Pages/NotFound";
import { AuthProvider, AuthUserNotToken } from "./Context/Auth";
import CreateClass from "./Pages/CreateClass";
import ClassDetail from "./Pages/ClassDetail";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<NotFound />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/city"
            element={
              <AuthUserNotToken>
                <City />
              </AuthUserNotToken>
            }
          />
          <Route
            path="/city/:id"
            element={
              <AuthUserNotToken>
                <CityDetail />
              </AuthUserNotToken>
            }
          />
          <Route
            path="/city/create"
            element={
              <AuthUserNotToken>
                <CreateCity />
              </AuthUserNotToken>
            }
          />
          <Route
            path="/school"
            element={
              <AuthUserNotToken>
                <Schools />
              </AuthUserNotToken>
            }
          />
          <Route
            path="/school/:id"
            element={
              <AuthUserNotToken>
                <SchoolDetail />
              </AuthUserNotToken>
            }
          />
          <Route
            path="/school/create"
            element={
              <AuthUserNotToken>
                <CreateSchool />
              </AuthUserNotToken>
            }
          />
          <Route
            path="/class/create"
            element={
              <AuthUserNotToken>
                <CreateClass />
              </AuthUserNotToken>
            }
          />
          <Route
            path="/class/:id"
            element={
              <AuthUserNotToken>
                <ClassDetail />
              </AuthUserNotToken>
            }
          />
          <Route
            path="/student"
            element={
              <AuthUserNotToken>
                <Student />
              </AuthUserNotToken>
            }
          />
          <Route
            path="/student/:id"
            element={
              <AuthUserNotToken>
                <StudentDetail />
              </AuthUserNotToken>
            }
          />
          <Route
            path="/student/create"
            element={
              <AuthUserNotToken>
                <CreateStudent />
              </AuthUserNotToken>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
