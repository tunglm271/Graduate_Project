import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Skeleton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAdminLayout } from "../../context/AdminLayoutProvider";
import adminFacilityApi from "../../service/admin/adminFacilityApi";
const FacilityList = () => {
  const facilityData = [
    {
      id: 1,
      name: "Main Hospital",
      doctorCount: 45,
      serviceCount: 12,
      lastActivity: "2025-05-03T14:30:00",
      active: true,
    },
    {
      id: 2,
      name: "North Clinic",
      doctorCount: 18,
      serviceCount: 8,
      lastActivity: "2025-05-02T09:15:00",
      active: true,
    },
    {
      id: 3,
      name: "South Medical Center",
      doctorCount: 32,
      serviceCount: 15,
      lastActivity: "2025-05-04T11:20:00",
      active: true,
    },
    {
      id: 4,
      name: "East Wing Facility",
      doctorCount: 24,
      serviceCount: 6,
      lastActivity: "2025-05-01T16:45:00",
      active: false,
    },
    {
      id: 5,
      name: "West Rehabilitation",
      doctorCount: 12,
      serviceCount: 5,
      lastActivity: "2025-04-30T13:10:00",
      active: true,
    },
    {
      id: 6,
      name: "Central Laboratory",
      doctorCount: 8,
      serviceCount: 3,
      lastActivity: "2025-04-29T10:00:00",
      active: false,
    },
    {
      id: 7,
      name: "Pediatric Wing",
      doctorCount: 15,
      serviceCount: 7,
      lastActivity: "2025-05-03T08:30:00",
      active: true,
    },
    {
      id: 8,
      name: "Emergency Department",
      doctorCount: 50,
      serviceCount: 20,
      lastActivity: "2025-05-04T07:45:00",
      active: true,
    },
    {
      id: 9,
      name: "Oncology Center",
      doctorCount: 28,
      serviceCount: 9,
      lastActivity: "2025-05-02T15:20:00",
      active: true,
    },
    {
      id: 10,
      name: "Cardiology Unit",
      doctorCount: 22,
      serviceCount: 11,
      lastActivity: "2025-05-01T12:15:00",
      active: true,
    },
    {
      id: 11,
      name: "Mental Health Clinic",
      doctorCount: 14,
      serviceCount: 6,
      lastActivity: "2025-04-30T14:50:00",
      active: false,
    },
    {
      id: 12,
      name: "Physical Therapy",
      doctorCount: 10,
      serviceCount: 4,
      lastActivity: "2025-04-29T11:30:00",
      active: true,
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [facilities, setFacilities] = useState(facilityData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const { setTitle } = useAdminLayout();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTitle("admin.facility_list.title");
    adminFacilityApi.getAllFacilities().then((response) => {
      console.log(response.data);
      setFacilities(response.data);
      setLoading(false);
    });
  });

  const toggleActive = (id) => {
    const updatedFacilities = facilities.map((facility) => {
      if (facility.id === id) {
        if (facility.status === "active") {
          adminFacilityApi
            .deactivateFacility(id)
            .then(() => {
              console.log("Facility deactivated successfully");
            })
            .catch((error) => {
              console.error("Error deactivating facility:", error);
            });
        } else {
          adminFacilityApi
            .activateFacility(id)
            .then(() => {
              console.log("Facility activated successfully");
            })
            .catch((error) => {
              console.error("Error activating facility:", error);
            });
        }
        return {
          ...facility,
          status: facility.status === "active" ? "inactive" : "active",
        };
      }
      return facility;
    });

    setFacilities(updatedFacilities);
    setDialogOpen(false);
  };

  const openConfirmDialog = (facility) => {
    setSelectedFacility(facility);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const totalPages = Math.ceil(facilities.length / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedFacilities = facilities.slice(startIndex, endIndex);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 my-7 mx-auto">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                {t("admin.facility_list.facility_name")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                {t("admin.facility_list.doctors")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                {t("admin.facility_list.services")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                {t("admin.facility_list.last_activity")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                {t("admin.facility_list.status.status")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                {t("admin.facility_list.view_detail")}
              </th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              {Array.from({ length: rowsPerPage }).map((_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Skeleton variant="text" width={30} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton variant="text" width={100} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Skeleton variant="text" width={30} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Skeleton variant="text" width={30} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Skeleton variant="text" width={100} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Skeleton variant="text" width={50} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Skeleton variant="text" width={80} />
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody className="divide-y divide-gray-200">
              {displayedFacilities.map((facility, index) => (
                <tr key={facility.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {facility.facility_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {facility.number_of_doctors}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {facility.number_of_services}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(facility.user.last_activity)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => openConfirmDialog(facility)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
                        facility.status == "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                    >
                      {facility.status == "active" ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          {t("admin.facility_list.status.active")}
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 mr-1" />
                          {t("admin.facility_list.status.inactive")}
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link
                      to={`/admin/facilities/${facility.id}`}
                      className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      {t("admin.facility_list.view_detail")}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 px-2">
        <div className="flex items-center text-sm text-gray-700">
          <span>{t("admin.facility_list.pagination.rows_per_page")}</span>
          <select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="mx-2 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {[5, 10, 25].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="ml-4">
            {startIndex + 1}-{Math.min(endIndex, facilities.length)}{" "}
            {t("admin.facility_list.pagination.of")} {facilities.length}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleChangePage(0)}
            disabled={page === 0}
            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronsLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleChangePage(index)}
                className={`px-3 py-1 rounded-md ${
                  page === index
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleChangePage(page + 1)}
            disabled={page >= totalPages - 1}
            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => handleChangePage(totalPages - 1)}
            disabled={page >= totalPages - 1}
            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronsRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>
          {t("admin.facility_list.pagination.confirm_dialog.title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("admin.facility_list.pagination.confirm_dialog.message", {
              action:
                selectedFacility?.status === "active"
                  ? t(
                      "admin.facility_list.pagination.confirm_dialog.deactivate"
                    )
                  : t("admin.facility_list.pagination.confirm_dialog.activate"),
              name: selectedFacility?.facility_name,
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="error">
            {t("admin.facility_list.pagination.confirm_dialog.cancel")}
          </Button>
          <Button onClick={() => toggleActive(selectedFacility?.id)}>
            {t("admin.facility_list.pagination.confirm_dialog.confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FacilityList;
