import React, { useEffect } from 'react';
import dayjs from "dayjs";

const DatePicker = ({month, date ,setDate}) => {

    const endOfMonth = dayjs(month).endOf("month");
    const currentDate = dayjs();

    useEffect(() => {
        console.log('Date updated:', date.$D);
    }, [date]);

    const getRemainingDays = () => {
        const days = [];
        let BrowseDate = currentDate;
        while (BrowseDate.isBefore(endOfMonth) || BrowseDate.isSame(endOfMonth, "day")) {
          days.push({
            date: BrowseDate.format("DD"),
            dayOfWeek: BrowseDate.format("ddd"),
            fullDate: BrowseDate
          });
          BrowseDate = BrowseDate.add(1, "day");
        }
        return days;
    };

    const remainingDays = getRemainingDays();

    return (
        <div style={{ display: "flex", gap: "10px", alignItems: "center", width: "100%", overflowX: "auto", padding: "10px 0" }}>
        {remainingDays.map((day, index) =>  (
            <button
            key={index}
            style={{
                padding: "12px 20px",
                borderRadius: "8px",
                textAlign: "center",
                backgroundColor: date.$D === day.fullDate.$D ? "#007BFF" : "#F1F1F1",
                boxShadow: date.$D === day.fullDate.$D ? "0px 0px 10px rgba(173, 216, 230, 0.7)" : "none",
                color: date.$D === day.fullDate.$D ? "#FFF" : "#000",
            }}
            onClick={() => {
                setDate(day.fullDate);
                console.log(day.fullDate.$D);
            }}
            >
            <div style={{fontWeight: 700}}>{day.date}</div>
            <div>{day.dayOfWeek}</div>
            </button>
        ))}
    </div>
    );
}

export default DatePicker;
