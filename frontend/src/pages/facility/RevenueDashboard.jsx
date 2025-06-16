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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Autocomplete,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
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
import { Plus } from "lucide-react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import patientApi from "../../service/patientApi";
import medicalServiceApi from "../../service/medicalServiceApi";

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
  const { showErrorSnackbar, showSuccessSnackbar } = useCustomSnackbar();
  const [openCreateBill, setOpenCreateBill] = useState(false);
  const [patients, setPatients] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [billItems, setBillItems] = useState([{ service: null, quantity: 1 }]);
  const [paymentMethod, setPaymentMethod] = useState("pay_at_front_desk"); // Default to pay_at_front_desk

  useEffect(() => {
    fetchRevenueData();
  }, [timeRange, startDate, endDate]);

  useEffect(() => {
    if (openCreateBill) {
      fetchPatients();
      fetchServices();
    }
  }, [openCreateBill]);

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

  const fetchPatients = async () => {
    try {
      const response = await patientApi.getAll();
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
      showErrorSnackbar("Không thể tải danh sách bệnh nhân");
    }
  };

  const fetchServices = async () => {
    try {
      const response = await medicalServiceApi.getByFacility();
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      showErrorSnackbar("Không thể tải danh sách dịch vụ");
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

  const handleAddServiceRow = () => {
    setBillItems([...billItems, { service: null, quantity: 1 }]);
  };

  const handleRemoveServiceRow = (index) => {
    setBillItems(billItems.filter((_, i) => i !== index));
  };

  const handleServiceChange = (index, service) => {
    const newBillItems = [...billItems];
    newBillItems[index].service = service;
    setBillItems(newBillItems);
  };

  const handleQuantityChange = (index, quantity) => {
    const newBillItems = [...billItems];
    newBillItems[index].quantity = Math.max(1, parseInt(quantity) || 1);
    setBillItems(newBillItems);
  };

  const handleCreateBill = async () => {
    if (!selectedPatient) {
      showErrorSnackbar("Vui lòng chọn bệnh nhân");
      return;
    }

    if (billItems.some((item) => !item.service)) {
      showErrorSnackbar("Vui lòng chọn đầy đủ dịch vụ");
      return;
    }

    try {
      const totalAmount = calculateBillTotal();
      const billData = {
        health_profile_id: selectedPatient.id,
        payment_method: paymentMethod,
        total_amount: totalAmount,
        services: billItems.map((item) => ({
          service_id: item.service.id,
          quantity: item.quantity,
        })),
      };

      const response = await transactionApi.createBill(billData);

      if (paymentMethod === "vnpay") {
        // Handle VNPay payment flow
        const vnpayResponse = await transactionApi.vnPayPayment(
          response.data.id
        );
        // Redirect to VNPay payment URL
        window.location.href = vnpayResponse.data.payment_url;
      } else {
        // For pay_at_front_desk, just show success message
        showSuccessSnackbar("Tạo hóa đơn thành công");
        setOpenCreateBill(false);
        // Reset form
        setSelectedPatient(null);
        setBillItems([{ service: null, quantity: 1 }]);
        setPaymentMethod("pay_at_front_desk");
        fetchRevenueData(); // Refresh the revenue data
      }
    } catch (error) {
      console.error("Error creating bill:", error);
      showErrorSnackbar("Không thể tạo hóa đơn");
    }
  };

  const calculateServiceTotal = (service, quantity) => {
    if (!service) return 0;
    return service.price * quantity;
  };

  const calculateBillTotal = () => {
    return billItems.reduce((total, item) => {
      return total + calculateServiceTotal(item.service, item.quantity);
    }, 0);
  };

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
          <div className="flex justify-between items-center mb-2">
            <p className="text-xl">Lịch sử giao dịch</p>
            <button
              onClick={() => setOpenCreateBill(true)}
              className="flex items-center font-semibold rounded-md text-sm bg-blue-500 text-white px-2 py-1 hover:bg-blue-600 transition-colors cursor-pointer"
            >
              <Plus className="inline mr-1" />
              Tạo hóa đơn
            </button>
          </div>
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

      {/* Create Bill Dialog */}
      <Dialog
        open={openCreateBill}
        onClose={() => {
          setOpenCreateBill(false);
          // Reset form when closing
          setSelectedPatient(null);
          setBillItems([{ service: null, quantity: 1 }]);
          setPaymentMethod("pay_at_front_desk");
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">Tạo hóa đơn mới</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Autocomplete
              options={patients}
              getOptionLabel={(option) => `${option.name} - ${option.phone}`}
              value={selectedPatient}
              onChange={(_, newValue) => setSelectedPatient(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Chọn bệnh nhân" fullWidth />
              )}
              sx={{ mb: 3 }}
            />

            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Hình thức thanh toán</FormLabel>
              <RadioGroup
                row
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="pay_at_front_desk"
                  control={<Radio />}
                  label="Thanh toán trực tiếp tại quầy"
                />
                <FormControlLabel
                  value="vnpay"
                  control={<Radio />}
                  label="Chuyển khoản"
                />
              </RadioGroup>
            </FormControl>

            <div className="flex flex-col">
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mb: 2,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography sx={{ flex: 1, fontWeight: "bold" }}>
                  Dịch vụ
                </Typography>
                <Typography
                  sx={{
                    width: "80px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Số lượng
                </Typography>
                <Typography
                  sx={{
                    width: "120px",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  Đơn giá
                </Typography>
                <Typography
                  sx={{
                    width: "120px",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  Thành tiền
                </Typography>
                <Box sx={{ width: "40px" }}></Box>
              </Box>

              {billItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    gap: 2,
                    mb: 2,
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <FormControl sx={{ flex: 1 }}>
                    <Autocomplete
                      options={services}
                      getOptionLabel={(option) => option.name}
                      value={item.service}
                      onChange={(_, newValue) =>
                        handleServiceChange(index, newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Chọn dịch vụ"
                          variant="standard"
                          fullWidth
                        />
                      )}
                    />
                  </FormControl>
                  <TextField
                    type="number"
                    label="Số lượng"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                    sx={{ width: "80px" }}
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                  <Typography sx={{ width: "120px", textAlign: "right" }}>
                    {item.service ? formatCurrency(item.service.price) : "0 ₫"}
                  </Typography>
                  <Typography sx={{ width: "120px", textAlign: "right" }}>
                    {formatCurrency(
                      calculateServiceTotal(item.service, item.quantity)
                    )}
                  </Typography>
                  <IconButton
                    onClick={() => handleRemoveServiceRow(index)}
                    disabled={billItems.length === 1}
                    sx={{ width: "40px" }}
                  >
                    <HighlightOffIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </div>

            <Button
              startIcon={<Plus />}
              onClick={handleAddServiceRow}
              variant="outlined"
              sx={{ mt: 1 }}
            >
              Thêm dịch vụ
            </Button>

            <Box
              sx={{
                mt: 3,
                pt: 2,
                borderTop: "1px solid #e0e0e0",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography variant="h6">Tổng tiền:</Typography>
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontWeight: "bold" }}
              >
                {formatCurrency(calculateBillTotal())}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateBill(false)}>Hủy</Button>
          <Button
            onClick={handleCreateBill}
            variant="contained"
            color="primary"
          >
            Tạo hóa đơn
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RevenueDashboard;
