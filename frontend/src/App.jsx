import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { PatientMainLayout, AuthLayout } from "./layouts";
import {
  PatientHomePage,
  AppointmentPage,
  ServicePage,
  Login,
  Register,
} from "./pages";
import { GoogleOAuthProvider } from "@react-oauth/google";
import './i18n';

const googleClientId =
  "91407289131-f8lts1h15ppivupjb5e027806kk88s5o.apps.googleusercontent.com";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute isAuthenticated={true} element={<PatientMainLayout />} />
    ),
    children: [
      { path: "home", element: <PatientHomePage /> },
      { path: "appointments", element: <AppointmentPage /> },
      { path: "services/:id", element: <ServicePage /> },
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
    <GoogleOAuthProvider clientId={googleClientId}>
      <RouterProvider router={router} />;
    </GoogleOAuthProvider>
  );
}

export default App;
