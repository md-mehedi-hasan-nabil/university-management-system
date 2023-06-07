import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import useAuthCheck from './hooks/useAuthCheck';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminCourseSelection from './pages/AdminCourseSelection';
import StudentCourseAdvising from './pages/StudentCourseAdvising';
import StudentAdvisingTable from './pages/StudentAdvisingTable';
import StudentGrades from './pages/StudentGrades';
import StudentProfile from './pages/StudentProfile';
import { useGetUserQuery } from './features/auth/authApi';
import UsersPage from './pages/AdminUsersPage';
import AdminDepartment from './pages/AdminDepartment';
import Payment from './pages/Payment';

export default function App() {
  const authChecked = useAuthCheck();
  const auth = useSelector((state) => state.auth);
  const [id, setId] = useState('');
  const [loadData, setLoadData] = useState(true);


  useEffect(() => {
    if (auth?.user?.id) {
      setId(auth?.user?.id);
      setLoadData(false);
    }
  }, [auth?.user?.id]);


  const { isSuccess } = useGetUserQuery(
    { id },
    {
      skip: loadData,
    }
  );


  return !authChecked && isSuccess ? (
    <div>Checking authentication....</div>
  ) : (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                {auth?.user?.role === 'admin' ? (
                  <AdminDashboard />
                ) : (
                  <StudentDashboard />
                )}
              </PrivateRoute>
            }
          />

          <Route
            path="/users"
            element={
              <PrivateRoute>
                {auth?.user?.role === 'admin' ? <UsersPage /> : <Login />}
              </PrivateRoute>
            }
          />

          <Route
            path="/department"
            element={
              <PrivateRoute>
                {auth?.user?.role === 'admin' ? <AdminDepartment /> : <Login />}
              </PrivateRoute>
            }
          />

          <Route
            path="/course-advising"
            element={
              <PrivateRoute>
                {auth?.user?.role === 'user' ? (
                  <StudentCourseAdvising />
                ) : (
                  <Login />
                )}
              </PrivateRoute>
            }
          />

          <Route
            path="/payment"
            element={
              <PrivateRoute>
                {auth?.user?.role === 'user' ? (
                  <Payment />
                ) : (
                  <NoMatch />
                )}
              </PrivateRoute>
            }
          />

          <Route
            path="/advising-table"
            element={
              <PrivateRoute>
                {auth?.user?.role === 'user' ? (
                  <StudentAdvisingTable />
                ) : (
                  <Login />
                )}
              </PrivateRoute>
            }
          />
          <Route
            path="/grades"
            element={
              <PrivateRoute>
                {auth?.user?.role === 'user' ? <StudentGrades /> : <Login />}
              </PrivateRoute>
            }
          />

          <Route
            path="/course-selection"
            element={
              <PrivateRoute>
                {auth?.user?.role === 'admin' ? (
                  <AdminCourseSelection />
                ) : (
                  <Login />
                )}
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                {auth?.user?.role === 'user' ? <StudentProfile /> : <Login />}
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </>
  );
}
