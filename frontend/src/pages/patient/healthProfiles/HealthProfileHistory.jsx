import React, { useState } from "react";
import HealthExamatitonRecord from "../../../components/HealthExamatitonRecord";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  timelineItemClasses,
} from "@mui/lab";

const HealthProfileHistory = ({ medicalRecords }) => {
  const [currentFilter, setCurrentFilter] = useState("all");

  // Helper functions for filtering
  const now = new Date();
  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  };
  const isSameMonth = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth();
  const isSameWeek = (date1, date2) => {
    const weekStart1 = getWeekStart(date1);
    const weekStart2 = getWeekStart(date2);
    return (
      weekStart1.getFullYear() === weekStart2.getFullYear() &&
      weekStart1.getMonth() === weekStart2.getMonth() &&
      weekStart1.getDate() === weekStart2.getDate()
    );
  };

  const filteredRecords = medicalRecords.filter((record) => {
    const date = new Date(record.date || record.created_at);
    if (currentFilter === "all") return true;
    if (currentFilter === "month") return isSameMonth(date, now);
    if (currentFilter === "week") return isSameWeek(date, now);
    return true;
  });

  return (
    <div className="health-profile-history">
      <div className="record-list min-h-80">
        {filteredRecords.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <span>Không có lịch sử khám bệnh nào.</span>
          </div>
        ) : (
          <Timeline
            position="right"
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {filteredRecords.map((record, index) => (
              <React.Fragment key={index}>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <HealthExamatitonRecord record={record} />
                  </TimelineContent>
                </TimelineItem>
              </React.Fragment>
            ))}
          </Timeline>
        )}
      </div>
      <div className="record-filter">
        <button
          className={currentFilter === "all" ? "filter-active" : ""}
          onClick={() => setCurrentFilter("all")}
        >
          Tất cả
        </button>
        <button
          className={currentFilter === "month" ? "filter-active" : ""}
          onClick={() => setCurrentFilter("month")}
        >
          Trong tháng
        </button>
        <button
          className={currentFilter === "week" ? "filter-active" : ""}
          onClick={() => setCurrentFilter("week")}
        >
          Trong tuần
        </button>
      </div>
    </div>
  );
};

export default HealthProfileHistory;
