import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { PatientMainLayout, AuthLayout, FacilityLayout } from "./layouts";
import {
  PatientHomePage,
  AppointmentPage,
  ServicePage,
  Services,
  MedicinePage,
  HealthProfilePage,
  HealthProfileDetail,
  HealthProfileEdit,
  MedicalRecord,
  FacilityBooking,
  FacilityDashboard,
  FacilityReservations,
  PatientManage,
  ServiceManage,
  ServiceCreate,
  ServiceDetail,
  StaffManage,
  StaffCreate,
  StaffDetail,
  Login,
  Register,
} from "./pages";
import { GoogleOAuthProvider } from "@react-oauth/google";
import './i18n';
import { SnackbarProvider } from 'notistack';
import Cookies from 'js-cookie';
import Chat from "./components/Chat";



const googleClientId = "91407289131-f8lts1h15ppivupjb5e027806kk88s5o.apps.googleusercontent.com";


const router = createBrowserRouter([
  {
    path: "/chat",
    element: <Chat />,
  },

  {
    path: "/",
    element: (
      <ProtectedRoute role={2} element={<PatientMainLayout />} />
    ),
    children: [
      { path: "home", element: <PatientHomePage /> },
      { path: "appointments", element: <AppointmentPage /> },
      { path: "medicines", element: <MedicinePage /> },
      { path: "booking/:facilityId", element: <FacilityBooking /> },
      { path: "services", element: <Services /> },
      { path: "services/:id", element: <ServicePage /> },
      { path: "health-profile", element: <HealthProfilePage /> },
      { path: "health-profile/:id", element: <HealthProfileDetail /> },
      { path: "health-profile/:id/edit", element: <HealthProfileEdit /> },
      { path: "health-profile/new", element: <HealthProfileEdit /> },
      { path: "health-profile/:id/record/:recordId", element: <MedicalRecord /> },
    ],
  },
  {
    path: "/facility",
    element: (
      <ProtectedRoute role={4} element={<FacilityLayout />} />
    ),
    children: [
      {path: "dashboard", element: <FacilityDashboard />},
      {path: "reservations", element: <FacilityReservations />},
      {path: "patients", element: <PatientManage />},
      {path: "services", element: <ServiceManage />},
      {path: "services/:id", element: <ServiceDetail />},
      {path: "services/:id/edit", element: <ServiceCreate />},
      {path: "services/new", element: <ServiceCreate />},
      {path: "staffs", element: <StaffManage />},
      {path: "staffs/:id", element: <StaffDetail />},
      {path: "staffs/:id/edit", element: <StaffCreate />},
      {path: "staffs/new", element: <StaffCreate />},
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
