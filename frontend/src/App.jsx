import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { useState } from "react";
import "./App.css";
import './i18n';

import ProtectedRoute from "./components/ProtectedRoute";
import ConversationList from "./components/ConversationList";
import NewChat from "./components/NewChat";
import WorkingSchedule from "./components/doctor/WorkingSchedule";

import AppContext from "./context/AppContext";

import { PatientMainLayout, AuthLayout, FacilityLayout, DoctorLayout } from "./layouts";
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
  BillPage,
  PaymentResult,
  SettingPage,
  FacilityBooking,
  FacilityLandingPage,
  FacilityDashboard,
  FacilityReservations,
  FacilityProfile,
  PatientManage,
  ServiceManage,
  ServiceCreate,
  ServiceDetail,
  StaffManage,
  StaffCreate,
  StaffDetail,
  ServiceAssignmentPage,
  ReservationList,
  PatientList,
  PatientDetail,
  Login,
  Register,
  NotFound
} from "./pages";

const googleClientId = "91407289131-f8lts1h15ppivupjb5e027806kk88s5o.apps.googleusercontent.com";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute role={2} element={<PatientMainLayout />} />,
    children: [
      { path: "home", element: <PatientHomePage /> },
      { path: "appointments", element: <AppointmentPage /> },
      { path: "medicines", element: <MedicinePage /> },
      { path: "booking/:facilityId", element: <FacilityBooking /> },
      { path: "clinic/:facilityId", element: <FacilityLandingPage /> },
      { path: "services", element: <Services /> },
      { path: "services/:id", element: <ServicePage /> },
      { path: "health-profile", element: <HealthProfilePage /> },
      { path: "health-profile/:id", element: <HealthProfileDetail /> },
      { path: "health-profile/:id/edit", element: <HealthProfileEdit /> },
      { path: "health-profile/new", element: <HealthProfileEdit /> },
      { path: "health-profile/:id/record/:recordId", element: <MedicalRecord /> },
      { path: "appointments/:id/bill", element: <BillPage />},
      { path: "appointments/:id/bill/payment-result", element: <PaymentResult />},
      { path: "/conversation", element: <ConversationList onSelectConversation={null}/> },
      { path: "settings", element: <SettingPage /> },
    ],
  },
  {
    path: "/facility",
    element: <ProtectedRoute role={4} element={<FacilityLayout />} />,
    children: [
      { path: "dashboard", element: <FacilityDashboard /> },
      { path: "reservations", element: <FacilityReservations /> },
      { path: "patients", element: <PatientManage /> },
      { path: "services", element: <ServiceManage /> },
      { path: "services/:id", element: <ServiceDetail /> },
      { path: "services/:id/edit", element: <ServiceCreate /> },
      { path: "services/new", element: <ServiceCreate /> },
      { path: "staffs", element: <StaffManage /> },
      { path: "staffs/:id", element: <StaffDetail /> },
      { path: "staffs/:id/edit", element: <StaffCreate /> },
      { path: "staffs/new", element: <StaffCreate /> },
      { path: "profile", element: <FacilityProfile /> },
    ],
  },
  {
    path: "/doctor",
    element: <ProtectedRoute role={3} element={<DoctorLayout />} />,
    children: [
      { path: "", element: <WorkingSchedule /> },
      { path: "service-assignment", element: <ServiceAssignmentPage /> },
      { path: "reservations", element: <ReservationList /> },
      { path: "patients", element: <PatientList /> },
      { path: "patients/:id", element: <PatientDetail /> },
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

function App() {
  const [chatbox, setChatbox] = useState(null);

  return (
    <AppContext.Provider value={{ chatbox, setChatbox }}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <GoogleOAuthProvider clientId={googleClientId}>
            <RouterProvider router={router} />
            <NewChat />
          </GoogleOAuthProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default App;
