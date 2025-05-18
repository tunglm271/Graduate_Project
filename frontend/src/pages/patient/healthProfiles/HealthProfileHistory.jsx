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
  return (
    <div className="health-profile-history">
      <div className="record-list min-h-80">
        <Timeline
          position="right"
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {medicalRecords.map((record, index) => (
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
