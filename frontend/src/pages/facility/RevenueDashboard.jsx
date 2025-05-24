import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { Search as SearchIcon } from "@mui/icons-material";
import transactionApi from "../../service/transactionApi";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";

const RevenueDashboard = () => {
  const [timeRange, setTimeRange] = useState("month"); // month, quarter, year
  const [startDate, setStartDate] = useState(dayjs().subtract(30, "day"));
  const [endDate, setEndDate] = useState(dayjs());
  const [searchQuery, setSearchQuery] = useState("");
  const [revenueData, setRevenueData] = useState({
    total_revenue: 0,
    daily_revenue: [],
    top_services: [],
    bills: [],
  });
  const { showErrorSnackbar } = useCustomSnackbar();

  useEffect(() => {
    fetchRevenueData();
  }, [timeRange, startDate, endDate]);

  const fetchRevenueData = async () => {
    try {
      // Replace with actual API call
      const response = await transactionApi.getRevenueStats({
        start_date: startDate.format("YYYY-MM-DD"),
        end_date: endDate.format("YYYY-MM-DD"),
        timeRange,
      });
      console.log("Revenue data:", response.data);
      setRevenueData(response.data);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
      showErrorSnackbar("Không thể tải dữ liệu doanh thu");
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleTimeRangeChange = (event) => {
    const newRange = event.target.value;
    setTimeRange(newRange);

    // Update date range based on selection
    const now = dayjs();
    switch (newRange) {
      case "month":
        setStartDate(now.subtract(30, "day"));
        setEndDate(now);
        break;
      case "quarter":
        setStartDate(now.subtract(90, "day"));
        setEndDate(now);
        break;
      case "year":
        setStartDate(now.subtract(365, "day"));
        setEndDate(now);
        break;
      default:
        break;
    }
  };

  const filteredPayments = revenueData.bills.filter(
    (payment) =>
      payment.health_profile.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      payment.services.some((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Thống kê doanh thu
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Khoảng thời gian</InputLabel>
            <Select
              value={timeRange}
              label="Khoảng thời gian"
              onChange={handleTimeRangeChange}
            >
              <MenuItem value="month">30 ngày gần nhất</MenuItem>
              <MenuItem value="quarter">3 tháng gần nhất</MenuItem>
              <MenuItem value="year">1 năm gần nhất</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
            <DatePicker
              label="Từ ngày"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
            <DatePicker
              label="Đến ngày"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Tổng doanh thu
              </Typography>
              <Typography variant="h4">
                {formatCurrency(revenueData.total_revenue)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Số lượng dịch vụ đã thanh toán
              </Typography>
              <Typography variant="h4">
                {revenueData.bills.reduce(
                  (total, bill) =>
                    total +
                    bill.services.reduce(
                      (billTotal, service) =>
                        billTotal + service.pivot.quantity,
                      0
                    ),
                  0
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Doanh thu trung bình/ngày
              </Typography>
              <Typography variant="h4">
                {formatCurrency(
                  revenueData.total_revenue /
                    (dayjs(endDate).diff(dayjs(startDate), "day") + 1)
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Doanh thu theo ngày
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData.daily_revenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  name="Doanh thu"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Top dịch vụ
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData.top_services}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="revenue" fill="#82ca9d" name="Doanh thu" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Payment History Table */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Lịch sử thanh toán
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Tìm kiếm theo tên bệnh nhân hoặc dịch vụ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ngày</TableCell>
                <TableCell>Bệnh nhân</TableCell>
                <TableCell>Dịch vụ</TableCell>
                <TableCell align="right">Số lượng</TableCell>
                <TableCell align="right">Đơn giá</TableCell>
                <TableCell align="right">Thành tiền</TableCell>
                <TableCell>Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPayments.map((payment) =>
                payment.services.map((service, serviceIndex) => (
                  <TableRow key={`${payment.id}-${service.id}`}>
                    {serviceIndex === 0 && (
                      <>
                        <TableCell rowSpan={payment.services.length}>
                          {dayjs(payment.payment_date).format(
                            "DD/MM/YYYY HH:mm"
                          )}
                        </TableCell>
                        <TableCell rowSpan={payment.services.length}>
                          {payment.health_profile.name}
                        </TableCell>
                      </>
                    )}
                    <TableCell>{service.name}</TableCell>
                    <TableCell align="right">
                      {service.pivot.quantity}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(service.price)}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(service.price * service.pivot.quantity)}
                    </TableCell>
                    {serviceIndex === 0 && (
                      <TableCell rowSpan={payment.services.length}>
                        <Typography
                          sx={{
                            color:
                              payment.status === "paid"
                                ? "success.main"
                                : "error.main",
                          }}
                        >
                          {payment.status === "paid"
                            ? "Đã thanh toán"
                            : "Chờ thanh toán"}
                        </Typography>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default RevenueDashboard;
