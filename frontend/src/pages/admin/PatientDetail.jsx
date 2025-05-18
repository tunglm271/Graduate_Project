import {
  Breadcrumbs,
  Drawer,
  Skeleton,
  Avatar,
  Tabs,
  Tab,
  Chip,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import adminPatientAccountApi from "../../service/admin/adminPatientAccountApi";

const PatientDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [patientAccount, setPatientAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Rescheduled":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    adminPatientAccountApi
      .getPatientAccountById(id)
      .then((response) => {
        console.log("Patient account data:", response.data);
        setPatientAccount(response.data.patientAccount);
        setProfiles(response.data.heatlhProfiles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching patient account:", error);
      });
  }, [id]);

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs sx={{ marginBottom: 2 }}>
        <Link
          to="/admin/patient-accounts"
          className="text-gray-500 hover:text-gray-700"
        >
          {t("admin.patientDetail.breadcrumbs.patientAccounts")}
        </Link>
        <Link to="#" className="text-gray-500 hover:text-gray-700">
          {t("admin.patientDetail.breadcrumbs.patientDetail")}
        </Link>
      </Breadcrumbs>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 pb-4 border-b border-gray-200">
              {t("admin.patientDetail.accountInfo.title")}
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <div className="text-sm text-gray-500">
                  {t("admin.patientDetail.accountInfo.username")}
                </div>
                {loading ? (
                  <Skeleton variant="text" width={150} />
                ) : (
                  <div>{patientAccount?.name}</div>
                )}
              </div>
              <div>
                <div className="text-sm text-gray-500">
                  {t("admin.patientDetail.accountInfo.email")}
                </div>
                {loading ? (
                  <Skeleton variant="text" width={150} />
                ) : (
                  <div>{patientAccount?.email}</div>
                )}
              </div>
              <div>
                <div className="text-sm text-gray-500">
                  {t("admin.patientDetail.accountInfo.phone")}
                </div>
                <div>(555) 123-4567</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <p className="text-lg font-medium text-gray-900">
                {t("admin.patientDetail.healthProfiles.title")}
              </p>
            </div>
            {loading ? (
              <div className="space-y-4">
                <Skeleton variant="rectangular" width="100%" height={50} />
                <Skeleton variant="rectangular" width="100%" height={50} />
                <Skeleton variant="rectangular" width="100%" height={50} />
                <Skeleton variant="rectangular" width="100%" height={50} />
              </div>
            ) : (
              <div className="border border-gray-200 rounded-md overflow-hidden">
                {profiles.map((profile, index) => (
                  <div
                    key={index}
                    className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                    onClick={() => setSelectedProfile(profile)}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-10 h-10"
                      />
                      <div>
                        <p className="text-lg font-semibold">{profile.name}</p>
                        <div className="text-sm text-gray-500">
                          {t(profile.relationship)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Drawer
        anchor="bottom"
        open={Boolean(selectedProfile)}
        onClose={() => setSelectedProfile(null)}
      >
        <div className="p-4">
          <h1>{selectedProfile?.name}</h1>
          <Tabs
            value={selectedTab}
            sx={{ mx: "auto", display: "flex", justifyContent: "center" }}
          >
            <Tab
              label={t("admin.patientDetail.profileDrawer.tabs.profileInfo")}
              onClick={() => setSelectedTab(0)}
            />
            <Tab
              label={t("admin.patientDetail.profileDrawer.tabs.medicalHistory")}
              onClick={() => setSelectedTab(1)}
            />
          </Tabs>
          {selectedTab === 0 ? (
            <div className="p-4">
              <p className="text-lg font-semibold">
                {t("admin.patientDetail.profileDrawer.profileInfo.title")}
              </p>
              <div className="mt-4">
                <p>
                  <strong>
                    {t(
                      "admin.patientDetail.profileDrawer.profileInfo.relationship"
                    )}
                    :
                  </strong>{" "}
                  {t(selectedProfile?.relationship)}
                </p>
                <p>
                  <strong>
                    {t(
                      "admin.patientDetail.profileDrawer.profileInfo.dateOfBirth"
                    )}
                    :
                  </strong>{" "}
                  {selectedProfile?.date_of_birth}
                </p>
                <p>
                  <strong>
                    {t("admin.patientDetail.profileDrawer.profileInfo.gender")}:
                  </strong>{" "}
                  {selectedProfile?.gender}
                </p>
                <div className="flex gap-5">
                  <p>
                    <strong>
                      {t(
                        "admin.patientDetail.profileDrawer.profileInfo.height"
                      )}
                      :
                    </strong>{" "}
                    {selectedProfile?.height}
                  </p>
                  <p>
                    <strong>
                      {t(
                        "admin.patientDetail.profileDrawer.profileInfo.weight"
                      )}
                      :
                    </strong>{" "}
                    {selectedProfile?.weight}
                  </p>
                </div>
              </div>
              <p className="text-lg font-semibold mt-4">
                {t(
                  "admin.patientDetail.profileDrawer.profileInfo.allergies.title"
                )}
              </p>
              <div className="mt-4 flex flex-wrap">
                {selectedProfile?.allergies.length === 0 ? (
                  <p>
                    {t(
                      "admin.patientDetail.profileDrawer.profileInfo.allergies.none"
                    )}
                  </p>
                ) : (
                  selectedProfile?.allergies.map((allergy, index) => (
                    <Chip key={index} label={allergy.name} className="m-1" />
                  ))
                )}
              </div>
              <p className="text-lg font-semibold mt-4">
                {t(
                  "admin.patientDetail.profileDrawer.profileInfo.diseases.title"
                )}
              </p>
              <div className="mt-4 flex flex-wrap">
                {selectedProfile?.diseases.length === 0 ? (
                  <p>
                    {t(
                      "admin.patientDetail.profileDrawer.profileInfo.diseases.none"
                    )}
                  </p>
                ) : (
                  selectedProfile?.diseases.map((disease, index) => (
                    <Chip key={index} label={disease.name} className="m-1" />
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 mx-auto">
              <div className="overflow-x-auto bg-white rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {t(
                          "admin.patientDetail.profileDrawer.medicalHistory.table.date"
                        )}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {t(
                          "admin.patientDetail.profileDrawer.medicalHistory.table.doctor"
                        )}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {t(
                          "admin.patientDetail.profileDrawer.medicalHistory.table.facility"
                        )}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {t(
                          "admin.patientDetail.profileDrawer.medicalHistory.table.service"
                        )}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {t(
                          "admin.patientDetail.profileDrawer.medicalHistory.table.status"
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedProfile?.appointments.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                        >
                          {t(
                            "admin.patientDetail.profileDrawer.medicalHistory.table.noAppointments"
                          )}
                        </td>
                      </tr>
                    ) : (
                      selectedProfile?.appointments.map((appointment) => (
                        <tr key={appointment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(appointment.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {appointment.doctor.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {appointment.medical_facility.facility_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {appointment.medical_service.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                                appointment.status
                              )}`}
                            >
                              {t(
                                `admin.patientDetail.status.${appointment.status.toLowerCase()}`
                              )}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default PatientDetail;
