import DateSlider from "../../../components/DateSlider";
import { Avatar, Skeleton, CircularProgress } from "@mui/material";
import "./patentMedicinePage.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MedicineSchedule from "../../../components/MedicineSchedule";
import MedicineCabinet from "../../../components/MedicineCabinet";
import { useTranslation } from "react-i18next";
import healthProfileApi from "../../../service/healthProfileApi";
import medicineApi from "../../../service/medicineApi";

const PatientMedicinePage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const urlHealthProfileId = searchParams.get("healthProfileId");
  const [selectedProfile, setSelectedProfile] = useState(0);
  const [healthProfiles, setHealthProfiles] = useState([]);
  const [profileLoading, setProfileLoading] = useState(true);
  const [medicines, setMedicines] = useState([]);
  const [medicineSchedules, setMedicineSchedules] = useState([]);
  const [medicinesLoading, setMedicinesLoading] = useState(false);
  const [scheduleLoading, setScheduleLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    healthProfileApi.getAll().then((response) => {
      setHealthProfiles(response.data);
      if (urlHealthProfileId) {
        const profileExists = response.data.some(
          (profile) => profile.id === parseInt(urlHealthProfileId)
        );
        if (profileExists) {
          setSelectedProfile(parseInt(urlHealthProfileId));
        } else {
          setSelectedProfile(response.data[0].id);
        }
      } else {
        setSelectedProfile(response.data[0].id);
      }
      setProfileLoading(false);
    });
  }, [urlHealthProfileId]);

  useEffect(() => {
    if (selectedProfile != 0) {
      setMedicinesLoading(true);
      medicineApi
        .getHealthProfileMedicines(selectedProfile)
        .then((response) => {
          setMedicines(response.data);
          setMedicinesLoading(false);
          console.log(response.data);
        });
    }
  }, [selectedProfile]);

  useEffect(() => {
    if (selectedProfile != 0) {
      setScheduleLoading(true);
      medicineApi
        .getMedicineSchedules(
          selectedProfile,
          selectedDate.toLocaleDateString()
        )
        .then((response) => {
          setMedicineSchedules(response.data);
          setScheduleLoading(false);
          console.log(response.data);
        });
    }
  }, [selectedDate, selectedProfile]);

  const refreshMedicines = () => {
    if (selectedProfile !== 0) {
      setMedicinesLoading(true);
      medicineApi
        .getHealthProfileMedicines(selectedProfile)
        .then((response) => {
          setMedicines(response.data);
          setMedicinesLoading(false);
        });
    }
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      {/* Health Profiles Tab Header */}
      <p className="text-2xl font-bold">{t("medicine-management")}</p>
      <div className="bg-white rounded-lg px-4 py-2 shadow-[0px_4px_8px_rgba(173,216,230,0.7)]">
        <div className="flex items-center gap-4 overflow-x-auto">
          {profileLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  variant="rectangular"
                  key={index}
                  width={150}
                  height={50}
                  sx={{ borderRadius: "8px" }}
                />
              ))
            : healthProfiles.map((profile) => (
                <div
                  key={profile.id}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors whitespace-nowrap ${
                    selectedProfile === profile.id
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedProfile(profile.id)}
                >
                  <Avatar src={profile.avatar} sx={{ width: 32, height: 32 }} />
                  <div>
                    <p className="font-medium text-sm">{profile.name}</p>
                    <p className="text-xs text-gray-500">
                      {t(profile.relationship)}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex max-md:flex-col justify-between gap-5">
        {selectedProfile == 0 ? (
          <div className="w-full lg:w-[65%] min-h-96 p-4 bg-white rounded-lg shadow-[0px_4px_8px_rgba(173,216,230,0.7)]">
            <div className="w-full h-full flex text-center justify-center items-center bg-gray-100 rounded-lg text-lg m-auto">
              Chưa chọn hồ sơ sức khỏe
            </div>
          </div>
        ) : (
          <div className="patient-medicine-calendar w-full lg:w-[65%]">
            <div className="flex gap-1 items-center rounded-full">
              <Avatar
                src="/images/medicine.png"
                sx={{ width: 25, height: 25, borderRadius: "50%" }}
              />
              <h3>{t("medicine.my-medicines")}</h3>
            </div>
            <DateSlider
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <div className="flex flex-col gap-2">
              {scheduleLoading ? (
                <div className="w-full h-72 flex justify-center items-center">
                  <CircularProgress />
                </div>
              ) : medicineSchedules.length == 0 ? (
                <div className="w-full h-72 flex justify-center items-center">
                  <p className="text-lg text-gray-500">
                    {t("medicine.no-medicine-schedule")}
                  </p>
                </div>
              ) : (
                medicineSchedules.map((schedule) => (
                  <MedicineSchedule key={schedule.id} schedule={schedule} />
                ))
              )}
            </div>
          </div>
        )}
        {selectedProfile == 0 ? (
          <div className="w-full lg:w-[35%] p-4 bg-white rounded-lg shadow-[0px_4px_8px_rgba(173,216,230,0.7)] flex justify-center items-center">
            <div className="w-full h-full flex text-center justify-center items-center bg-gray-100 rounded-lg text-lg">
              Chưa chọn hồ sơ sức khỏe
            </div>
          </div>
        ) : medicinesLoading ? (
          <div className="w-full lg:w-[35%] p-4 bg-white rounded-lg shadow-[0px_4px_8px_rgba(173,216,230,0.7)] flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <MedicineCabinet
            medicines={medicines}
            healthProfileId={selectedProfile}
            onMedicinesAdded={refreshMedicines}
          />
        )}
      </div>
    </div>
  );
};

export default PatientMedicinePage;
