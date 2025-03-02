import { useState } from "react";

const ScheduleButton = ({startTime, endTime}) => {
    const [selected, setSelected] = useState(false);

    return (
        <button className={`schedule-button ${selected && 'selected-schedule'}`} onClick={() => setSelected(!selected)}>
            {startTime}-{endTime}
        </button>
    );
}

export default ScheduleButton;
