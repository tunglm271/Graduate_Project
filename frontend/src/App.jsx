import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
import "./App.css";
import "./i18n";

import ProtectedRoute from "./components/ProtectedRoute";
import ConversationList from "./components/ConversationList";
import NewChat from "./components/NewChat";
import WorkingSchedule from "./components/doctor/WorkingSchedule";

import AppContext from "./context/AppContext";
import { getUser } from "./utlis/auth";

import {
  PatientMainLayout,
  AuthLayout,
  FacilityLayout,
  DoctorLayout,
  AdminLayout,
} from "./layouts";
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
  NewsList,
  NewDetail,
  AppointmentDetail,
  RevenueDashboard,
  AllNews,
  AllExternalNews,
  Facilities,
  DiagnosisPage,
  FacilityBooking,
  DoctorDetail,
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
  SalesManage,
  ServiceAssignmentPage,
  ReservationList,
  PatientList,
  PatientDetail,
  DashboardPage,
  FacilityList,
  FacilityDetail as AdminFacilityDetail,
  PatientAccountList,
  PatientDetailAdmin,
  BlogsList,
  EditBlog,
  Login,
  Register,
  FacilityRegister,
  NotFound,
  LandingPage,
  BlogDetail,
  MessagePage,
  FacilitySpecialties,
} from "./pages";
import "./echo";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute role={2} element={<PatientMainLayout />} />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "home", element: <PatientHomePage /> },
      { path: "messages", element: <MessagePage /> },
      { path: "appointments", element: <AppointmentPage /> },
      { path: "appointments/:id", element: <AppointmentDetail /> },
      { path: "medicines", element: <MedicinePage /> },
      { path: "booking/:facilityId", element: <FacilityBooking /> },
      { path: "clinics", element: <Facilities /> },
      { path: "clinic/:facilityId", element: <FacilityLandingPage /> },
      { path: "doctor-page/:doctorId", element: <DoctorDetail /> },
      { path: "services", element: <Services /> },
      { path: "services/:id", element: <ServicePage /> },
      { path: "health-profile", element: <HealthProfilePage /> },
      { path: "health-profile/:id", element: <HealthProfileDetail /> },
      { path: "health-profile/:id/edit", element: <HealthProfileEdit /> },
      { path: "health-profile/new", element: <HealthProfileEdit /> },
      {
        path: "health-profile/:id/record/:recordId",
        element: <MedicalRecord />,
      },
      { path: "appointments/:id/bill", element: <BillPage /> },
      {
        path: "appointments/:id/bill/payment-result",
        element: <PaymentResult />,
      },
      {
        path: "/conversation",
        element: <ConversationList onSelectConversation={null} />,
      },
      { path: "settings", element: <SettingPage /> },
      { path: "news", element: <NewsList /> },
      { path: "news/:id", element: <NewDetail /> },
      { path: "news-all", element: <AllNews /> },
      { path: "news-external", element: <AllExternalNews /> },
      { path: "ai-diagnosis", element: <DiagnosisPage /> },
    ],
  },
  {
    path: "/facility",
    element: <ProtectedRoute role={4} element={<FacilityLayout />} />,
    children: [
      { path: "dashboard", element: <FacilityDashboard /> },
      { path: "reservations", element: <FacilityReservations /> },
      { path: "patients", element: <PatientManage /> },
      { path: "patients/:id", element: <PatientDetail /> },
      { path: "services", element: <ServiceManage /> },
      { path: "services/:id", element: <ServiceDetail /> },
      { path: "services/:id/edit", element: <ServiceCreate /> },
      { path: "services/new", element: <ServiceCreate /> },
      { path: "staffs", element: <StaffManage /> },
      { path: "staffs/:id", element: <StaffDetail /> },
      { path: "staffs/:id/edit", element: <StaffCreate /> },
      { path: "staffs/new", element: <StaffCreate /> },
      { path: "profile", element: <FacilityProfile /> },
      { path: "sales", element: <SalesManage /> },
      { path: "revenue", element: <RevenueDashboard /> },
      { path: "messages", element: <MessagePage /> },
      { path: "specialties", element: <FacilitySpecialties /> },
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
      { path: "messages", element: <MessagePage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "facility-register", element: <FacilityRegister /> },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute role={1} element={<AdminLayout />} />,
    children: [
      { path: "", element: <DashboardPage /> },
      { path: "facilities", element: <FacilityList /> },
      { path: "facilities/:id", element: <AdminFacilityDetail /> },
      { path: "blogs", element: <BlogsList /> },
      { path: "blogs/new", element: <EditBlog /> },
      { path: "blogs/edit/:id", element: <EditBlog /> },
      { path: "blogs/:id", element: <BlogDetail /> },
      { path: "patient-accounts", element: <PatientAccountList /> },
      { path: "patient-accounts/:id", element: <PatientDetailAdmin /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  const [chatbox, setChatbox] = useState(null);
  const [user, setUser] = useState(getUser());

  console.log(import.meta.env);
  return (
    <AppContext.Provider value={{ chatbox, setChatbox, user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <RouterProvider router={router} />
            <NewChat />
          </GoogleOAuthProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default App;
