import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { PatientMainLayout, AuthLayout } from "./layouts";
import {
  PatientHomePage,
  AppointmentPage,
  ServicePage,
  MedicinePage,
  HealthProfilePage,
  Login,
  Register,
} from "./pages";
import { GoogleOAuthProvider } from "@react-oauth/google";
import './i18n';
import { SnackbarProvider } from 'notistack';
import Cookies from 'js-cookie';



const googleClientId = "91407289131-f8lts1h15ppivupjb5e027806kk88s5o.apps.googleusercontent.com";
const authToken = Cookies.get('authToken');
const isAuthenticated = !!authToken;


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated} element={<PatientMainLayout />} />
    ),
    children: [
      { path: "", element: <PatientHomePage /> },
      { path: "appointments", element: <AppointmentPage /> },
      { path: "medicines", element: <MedicinePage /> },
      { path: "services/:id", element: <ServicePage /> },
      { path: "health-profile", element: <HealthProfilePage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
    >
      <GoogleOAuthProvider clientId={googleClientId}>
        <RouterProvider router={router} />;
      </GoogleOAuthProvider>
    </SnackbarProvider>
  );
}

export default App;
