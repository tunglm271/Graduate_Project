import { useState, useEffect } from "react";
import { Eye, CheckCircle, XCircle, ArrowUp, ArrowDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAdminLayout } from "../../context/AdminLayoutProvider";
import adminPatientAccountApi from "../../service/admin/adminPatientAccountApi";
import { Link } from "react-router-dom";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";


const PatientAccountList = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "email",
    direction: "ascending",
  });
  const { showSuccessSnackbar, showInfoSnackbar } = useCustomSnackbar();

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const { setTitle } = useAdminLayout();

  useEffect(() => {
    setTitle("admin.patient_account_list.title");
    adminPatientAccountApi
      .getAllPatientAccounts()
      .then((response) => {
        console.log(response.data);
        setPatients(response.data);
        setFilteredPatients(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching patient accounts:", error);
      });
  }, []);

  // Effect to filter and sort patients when data changes
  useEffect(() => {
    let result = [...patients];

    // Apply search filter
    if (searchTerm) {
      result = result.filter((patient) =>
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });

      // Special case for date sorting
      if (sortConfig.key === "lastActivity") {
        result.sort((a, b) => {
          const dateA = new Date(a.lastActivity);
          const dateB = new Date(b.lastActivity);
          return sortConfig.direction === "ascending"
            ? dateA - dateB
            : dateB - dateA;
        });
      }
    }

    setFilteredPatients(result);
  }, [patients, searchTerm, sortConfig]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(i18n.language === "vi" ? "vi-VN" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const toggleActivation = (id) => {

    setPatients(
      patients.map((patient) => {
        if (patient.id === id) {
          if(patient.user.active) {
            adminPatientAccountApi.deactivatePatientAccount(id).then((res) => {
              console.log(res);
              showInfoSnackbar(t("admin.patient_account_list.deactivate_success"));
            });
          } else {
            adminPatientAccountApi.activatePatientAccount(id).then(() => {
              console.log(res);
              showSuccessSnackbar(t("admin.patient_account_list.activate_success"));
            });
          }
          return {
            ...patient,
            user: {
              ...patient.user,
              active: !patient.user.active
            }
          };
        }
        return patient;
      })
    );
    setDialogOpen(false);
  };

  // Open confirm dialog
  const openConfirmDialog = (patient) => {
    setSelectedPatient(patient);
    setDialogOpen(true);
  };

  // Close dialog
  const closeDialog = () => {
    setDialogOpen(false);
  };

  // Request sort
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Get sort indicator
  const getSortIndicator = (columnName) => {
    if (sortConfig.key !== columnName) {
      return null;
    }
    return sortConfig.direction === "ascending" ? (
      <ArrowUp className="w-4 h-4 inline ml-1" />
    ) : (
      <ArrowDown className="w-4 h-4 inline ml-1" />
    );
  };

  // Column headers with sort functionality
  const SortableColumnHeader = ({ columnName, label }) => (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
      onClick={() => requestSort(columnName)}
    >
      <div className="flex items-center">
        {label}
        {getSortIndicator(columnName)}
      </div>
    </th>
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden m-4">
      <div className="px-4 py-5 sm:px-6">
        <input
          type="text"
          placeholder={t("admin.patient_account_list.search_placeholder")}
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <SortableColumnHeader columnName="email" label="Email" />
              <SortableColumnHeader
                columnName="lastActivity"
                label={t("admin.patient_account_list.last_activity")}
              />
              <SortableColumnHeader
                columnName="healthProfiles"
                label={t("admin.patient_account_list.health_profiles")}
              />
              <SortableColumnHeader columnName="status" label={t("admin.patient_account_list.status")} />
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                </tr>
              ))
            ) : filteredPatients.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  {t("admin.patient_account_list.no_results")}
                </td>
              </tr>
            ) : (
              filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className={patient.status !== "active" ? "bg-gray-50" : ""}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {patient.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {formatDate(patient.user.last_activity)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {patient.number_of_health_profiles}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => openConfirmDialog(patient)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
                        patient.user.active
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                    >
                      {patient.user.active ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          {t("admin.patient_account_list.active")}
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 mr-1" />
                          {t("admin.patient_account_list.inactive")}
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/admin/patient-accounts/${patient.id}`}
                      className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200"
                    >
                      <Eye className="w-4 h-4 mr-1" /> {t("admin.patient_account_list.view_detail")}
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-30">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full z-50">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Confirm Action
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to{" "}
                {selectedPatient?.status === "active"
                  ? "deactivate"
                  : "activate"}{" "}
                the account for &ldquo;{selectedPatient?.email}&rdquo;?
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeDialog}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md cursor-pointer hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => toggleActivation(selectedPatient?.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientAccountList;
