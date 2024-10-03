import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signup, Login, AdminStats, AdminTraining, Stats, Dashboard, Courses, Taketest, Profile, ManagerProfile, ManagerStats, Feedback, AdminProfile, ManageEmployee, EmployeePerformance} from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from './components/ProtectedRoute'; 
import {jwtDecode} from 'jwt-decode';

function App() {

  const token = localStorage.getItem('authToken');
  let user = null;

  if (token) {
    const decoded = jwtDecode(token);
    user = decoded.role;
  }

  console.log(user)

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        {user === 'manager' && (
          <>
            <Route path='/manager' element={<ProtectedRoute element={Dashboard}/>}>
            <Route path="/manager" element={<ManagerStats/>} />
            <Route path="/manager/profile" element={<ManagerProfile/>} />
            <Route path="/manager/feedback" element={<Feedback/>} />
            </Route>
          </>
        )}
        {user === 'employee' && (
          <>
            <Route path='/employee' element={<ProtectedRoute element={Dashboard}/>}>
              <Route path="/employee" element={<Stats/>} />
              <Route path="/employee/course" element={<Courses/>} />
              <Route path="/employee/profile" element={<Profile/>} />
            </Route>
           <Route path="/course/:id/quiz" element={<ProtectedRoute element={Taketest} />}/>
          </>
        )}
        {user === 'admin' && (
          <>
            <Route path='/admin' element={<ProtectedRoute element={Dashboard}/>}>
              <Route path="/admin" element={<AdminStats/>} />
              <Route path="/admin/training" element={<AdminTraining/>} />
              <Route path="/admin/profile" element={<AdminProfile/>} />
              <Route path="/admin/manageemployee" element={<EmployeePerformance/>} />
            </Route>
          </>
        )}
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>
    </Router>
  );
}

export default App;
