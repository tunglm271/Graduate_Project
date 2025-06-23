import { useState, useEffect } from "react";
import { Plus, ChevronDown, ChevronUp, Delete } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Autocomplete,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";
import medicineApi from "../service/medicineApi";
import { getMedicines } from "../hooks/useCachedData";

const MedicineCabinet = ({ medicines, healthProfileId, onMedicinesAdded }) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const prescriptionId = searchParams.get("prescriptionId");
  const { data: medicinesData = [] } = getMedicines();
  const [activeTab, setActiveTab] = useState("active");
  const [openDialog, setOpenDialog] = useState(false);
  const [medicinesList, setMedicinesList] = useState([
    {
      medicine_id: "",
      time_of_day: "",
      times_per_day: "",
      dosage_per_time: "",
      notes: "",
      total_quantity: "",
    },
  ]);

  useEffect(() => {
    // If prescriptionId exists in URL, fetch prescription medicines and open dialog
    if (prescriptionId) {
      console.log("Prescription ID found in URL:", prescriptionId);
      medicineApi
        .getPrescriptionMedicines(prescriptionId)
        .then((response) => {
          console.log("Prescription medicines response:", response.data);
          const prescriptionMedicines = response.data.map((med) => ({
            medicine_id: med.medicine.id,
            time_of_day: med.usage.split(",")[0] || "", // Assuming first part of usage is time of day
            times_per_day: med.usage.split(",")[1] || "", // Assuming second part is times per day
            dosage_per_time: med.amount || "",
            notes: med.usage || "",
            total_quantity: med.amount * 7 || "", // Default to 7 days supply
          }));
          console.log("Mapped prescription medicines:", prescriptionMedicines);
          setMedicinesList(prescriptionMedicines);
          setOpenDialog(true);
        })
        .catch((error) => {
          console.error("Error fetching prescription medicines:", error);
        });
    } else {
      console.log("No prescription ID found in URL");
    }
  }, [prescriptionId]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setMedicinesList([
      {
        medicine_id: "",
        time_of_day: "",
        times_per_day: "",
        dosage_per_time: "",
        notes: "",
        total_quantity: "",
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedMedicines = [...medicinesList];
    updatedMedicines[index][field] = value;
    setMedicinesList(updatedMedicines);
  };

  const handleAddMedicine = () => {
    setMedicinesList([
      ...medicinesList,
      {
        medicine_id: "",
        time_of_day: "",
        times_per_day: "",
        dosage_per_time: "",
        notes: "",
        total_quantity: "",
      },
    ]);
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = medicinesList.filter((_, i) => i !== index);
    setMedicinesList(updatedMedicines);
  };

  const handleSubmit = async () => {
    const medicinesWithDate = medicinesList.map((medicine) => ({
      ...medicine,
      start_date: new Date().toISOString().split("T")[0],
    }));

    medicineApi
      .storeHealthProfileMedicines(healthProfileId, {
        medicines: medicinesWithDate,
      })
      .then((res) => {
        console.log(res);
        handleCloseDialog();
        // Call the callback to refresh medicines data
        if (onMedicinesAdded) {
          onMedicinesAdded();
        }
      })
      .catch((error) => {
        console.error("Error adding medicines:", error);
      });
  };

  const filteredMedicines = medicines.filter((med) => {
    if (activeTab === "active") {
      return med.total_quantity > 0 && med.start_date !== null;
    } else {
      return med.total_quantity === 0 || med.start_date === null;
    }
  });

  const getStockLevelColor = (stock) => {
    if (stock <= 5) return "bg-red-100 text-red-800";
    if (stock <= 10) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  const [expandedMedicine, setExpandedMedicine] = useState(null);

  return (
    <div className="w-full bg-white rounded-lg p-2.5 shadow-[0px_4px_8px_rgba(173,216,230,0.7)]">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-semibold">{t("medicine.cabinet.title")}</p>
        <button
          className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
          onClick={handleOpenDialog}
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Add Medicine Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{t("medicine.add-medicine")}</DialogTitle>
        <DialogContent>
          {medicinesList.map((medicine, index) => (
            <div key={index} className="mb-6 border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <Typography variant="h6">
                  {t("medicine.medicine-name")} {index + 1}
                </Typography>
                {index > 0 && (
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveMedicine(index)}
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                )}
              </div>
              <Grid container spacing={2} className="mt-2">
                <Grid item xs={12}>
                  <Autocomplete
                    options={medicinesData}
                    getOptionLabel={(option) => option.name || ""}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("medicine.medicine-name")}
                        variant="standard"
                        required
                      />
                    )}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        {...props}
                        display="flex"
                        width="100%"
                        gap={1}
                      >
                        <Typography sx={{ fontSize: 14 }}>
                          {option.name}
                        </Typography>
                        <Typography sx={{ fontSize: 10, color: "gray" }}>
                          {option.description}
                        </Typography>
                      </Box>
                    )}
                    fullWidth
                    value={
                      medicinesData?.find(
                        (option) => option.id === medicine.medicine_id
                      ) || null
                    }
                    onChange={(e, newValue) =>
                      handleInputChange(
                        index,
                        "medicine_id",
                        newValue?.id || ""
                      )
                    }
                    slotProps={{
                      popper: {
                        sx: {
                          zIndex: 99999,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t("medicine.time-of-day", "Thời gian uống")}
                    name="time_of_day"
                    value={medicine.time_of_day}
                    onChange={(e) =>
                      handleInputChange(index, "time_of_day", e.target.value)
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t(
                      "medicine.times-per-day",
                      "Số lần uống trong ngày"
                    )}
                    name="times_per_day"
                    value={medicine.times_per_day}
                    onChange={(e) =>
                      handleInputChange(index, "times_per_day", e.target.value)
                    }
                    type="number"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t("medicine.dosage-per-time", "Liều lượng mỗi lần")}
                    name="dosage_per_time"
                    value={medicine.dosage_per_time}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "dosage_per_time",
                        e.target.value
                      )
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t("medicine.medicine-quantity", "Tổng số lượng")}
                    name="total_quantity"
                    value={medicine.total_quantity}
                    onChange={(e) =>
                      handleInputChange(index, "total_quantity", e.target.value)
                    }
                    type="number"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t("medicine.notes", "Ghi chú")}
                    name="notes"
                    value={medicine.notes}
                    onChange={(e) =>
                      handleInputChange(index, "notes", e.target.value)
                    }
                    multiline
                    rows={2}
                  />
                </Grid>
              </Grid>
            </div>
          ))}

          <Button
            startIcon={<Plus size={20} />}
            onClick={handleAddMedicine}
            sx={{ mt: 2 }}
          >
            {t("medicine.add-medicine")}
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            {t("admin.medical_articles.delete.cancel", "Hủy")}
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {t("medicine.add-medicine")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tabs */}
      <div className="flex mb-4">
        <button
          className={`py-2 px-4 font-medium flex-1 cursor-pointer hover:bg-gray-100 ${
            activeTab === "active"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("active")}
        >
          {t("medicine.cabinet.tabs.active")}
        </button>
        <button
          className={`py-2 px-4 font-medium flex-1 cursor-pointer hover:bg-gray-100 ${
            activeTab === "history"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("history")}
        >
          {t("medicine.cabinet.tabs.history")}
        </button>
      </div>

      {/* Medicines List */}
      {filteredMedicines.length > 0 ? (
        <div className="space-y-3">
          {filteredMedicines.map((med) => (
            <div
              key={med.id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div
                className="p-4 cursor-pointer"
                onClick={() =>
                  setExpandedMedicine(
                    expandedMedicine === med.id ? null : med.id
                  )
                }
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">
                      {med.medicine.name} {med.dosage_per_time}
                    </p>
                    <p className="text-gray-500 text-sm">{med.frequency}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${getStockLevelColor(
                        med.stock
                      )}`}
                    >
                      {med.total_quantity} {med.medicine.unit}
                    </span>

                    {expandedMedicine === med.id ? (
                      <ChevronUp size={20} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {expandedMedicine === med.id && (
                <div className="bg-gray-50 p-4 border-t">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("medicine.time-of-day", "Thời gian uống")}
                      </p>
                      <p>{med.time_of_day}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("medicine.dosage-per-time", "Liều lượng")}
                      </p>
                      <p>
                        {med.times_per_day} {med.medicine.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("medicine.start-date", "Ngày bắt đầu")}
                      </p>
                      <p>{new Date(med.start_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("medicine.notes", "Hướng dẫn")}
                      </p>
                      <p>{med.notes}</p>
                    </div>
                    {med.endDate && (
                      <div>
                        <p className="text-sm text-gray-500">
                          {t("medicine.end-date", "End date")}
                        </p>
                        <p>{med.endDate.toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-gray-500">
            {t(
              `medicine.no-medicine-schedule`,
              `No ${activeTab} medications found`
            )}
          </p>
        </div>
      )}
    </div>
  );
};

MedicineCabinet.propTypes = {
  medicines: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      medicine: PropTypes.shape({
        name: PropTypes.string.isRequired,
        unit: PropTypes.string.isRequired,
      }).isRequired,
      dosage_per_time: PropTypes.string,
      frequency: PropTypes.string.isRequired,
      time_of_day: PropTypes.string.isRequired,
      times_per_day: PropTypes.number.isRequired,
      notes: PropTypes.string,
      total_quantity: PropTypes.number.isRequired,
      stock: PropTypes.number.isRequired,
      start_date: PropTypes.string,
      endDate: PropTypes.string,
    })
  ).isRequired,
  healthProfileId: PropTypes.number.isRequired,
  onMedicinesAdded: PropTypes.func,
};

export default MedicineCabinet;
