import PillIcon from "@icon/PillIcon";
import { Avatar } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { X, Check } from "lucide-react";
import { useState } from "react";
const MedicineSchedule = ({ time = "morning", schedule }) => {

  const [isChecked, setIsChecked] = useState(false);

  const getTimeLabel = () => {
    switch (time) {
      case "morning":
        return "SA";
      case "afternoon":
        return "CH";
      default:
        return "";
    }
  };

  return (
    <div className="medicine-schedule relative bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="bg-gradient-to-r from-gray-600 to-gray-300 w-10 h-10 rounded-full flex justify-center items-center">
          <PillIcon size={30} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">{schedule.medicine_name}</h4>
          <p className="text-sm text-gray-600">
            2 viên vào lúc 8:00 {getTimeLabel()}
          </p>
          <p className="text-sm text-gray-600">Uống sau khi ăn no</p>
          <p className="text-sm text-gray-600 mt-1">Còn lại {schedule.remaining_doses} {schedule.unit}</p>
        </div>
        <Avatar
          sx={{
            backgroundColor: "#007bff",
            width: 20,
            height: 20,
            position: "absolute",
            right: "10px",
            top: "10px",
          }}
        >
          <NotificationsIcon sx={{ fontSize: 15 }} />
        </Avatar>
      </div>
      <button className={`ml-auto mr-5 mt-5 p-2 rounded-full hover:bg-gray-300 cursor-pointer transition-colors1 ${isChecked ? "bg-green-100" : "bg-gray-100"}`}>
          {isChecked ? (
            <Check size={20} color="green" onClick={() => setIsChecked(false)} />
          ) : (
            <X size={20} onClick={() => setIsChecked(true)} />
          )}
      </button>
    </div>
  );
};

export default MedicineSchedule;
