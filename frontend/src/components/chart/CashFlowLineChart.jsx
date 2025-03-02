import { FormControl, Select, MenuItem } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { getLast12Months, formatDate } from "../../utlis/DateFun";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  plugins,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, plugins);

const CashFlowLineChart = () => {
  const [gradient, setGradient] = useState(null);
  const [filter, setFilter] = useState("last12Months");
  const [timeRange, setTimeRange] = useState({
    start: "",
    end: "",
  });

  useEffect(() => {
    const last12Months = getLast12Months();
    setTimeRange({
      start: last12Months[0].label,
      end: last12Months[11].label,
    });
  }, []);

  // Update time range based on filter
  useEffect(() => {
    if (filter === "last12Months") {
      const last12Months = getLast12Months();
      setTimeRange({
        start: last12Months[0].label,
        end: last12Months[11].label,
      });
    } else if (filter === "lastMonth") {
      const date = new Date();
      date.setMonth(date.getMonth() - 1);
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      setTimeRange({
        start: formatDate(startOfMonth),
        end: formatDate(endOfMonth),
      });
    } else if (filter === "lastWeek") {
      const date = new Date();
      const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay() - 6));
      const endOfWeek = new Date(date.setDate(date.getDate() + 6));
      setTimeRange({
        start: formatDate(startOfWeek),
        end: formatDate(endOfWeek),
      });
    }
  }, [filter]);

  const data = {
    labels: ["May 10", "May 11", "May 12", "May 13", "May 14", "May 15", "May 16"],
    datasets: [{
      label: "Sales",
      data: [120, 150, 180, 130, 170, 190, 200],
      backgroundColor: (context) => {
        const { ctx, chartArea } = context.chart;
        if (!chartArea) {
          return "rgba(0,0,0,0.1)";
        }
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, "rgba(0, 123, 255, 0.4)");
        gradient.addColorStop(0.3, "rgba(0, 123, 255, 0.2)"); 
        gradient.addColorStop(1, "rgba(0, 123, 255, 0)");
        return gradient;
      },
      fill: true,
      borderColor: "#007bff",
      pointBorderColor: "transparent",
      pointBorderWidth: 4,
    }]
  };
  

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: "index",
      intersect: false, 
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: true,
        position: "nearest",
        displayColors: false,
        callbacks: {
          label: (tooltipItem) => ` ${tooltipItem.raw} VND`, 
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        grid: {
          borderDash: [10, 10],
          drawBorder: false,
        },
        ticks: {
          stepSize: 50,
          callback: (value) => value + " VND",
        },
      },
    },
  };
  

  return (
    <div className="cash-flow-line-chart">
      <div className="flex justify-between items-center" style={{ marginBottom: "1rem" }}>
        <h4 className="text-lg font-semibold">Biểu đồ dòng tiền</h4>
        <FormControl variant="standard" fullWidth sx={{ maxWidth: 150 }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value={"last12Months"}>12 tháng trước</MenuItem>
            <MenuItem value={"lastMonth"}>Tháng trước</MenuItem>
            <MenuItem value={"lastWeek"}>Tuần trước</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p>Tổng tiền</p>
          <h2>40,506,900 VND</h2>
        </div>
        <p className="text-gray-600 font-semibold text-lg">
          {timeRange.start} - {timeRange.end}
        </p>
      </div>
      <Line key={filter} data={data} options={options} />
    </div>
  );
};

export default CashFlowLineChart;
