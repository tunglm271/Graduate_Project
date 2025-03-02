import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Button, IconButton, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { renderEditStatus, renderStatus, STATUS_OPTIONS } from "../../utlis/renderStatus";

const columns = [
  { field: "patientName", headerName: "Tên Bệnh Nhân", width: 180 },
  {
    field: "doctorName",
    headerName: "Bác Sĩ Phụ Trách",
    width: 200,
    renderCell: (params) => (
      <>
        {params.value && <Stack direction="row" alignItems="center">
          <Avatar sx={{ width: 32, height: 32, marginRight: 1 }}>
            {params.value ? params.value.charAt(0) : "?"}
          </Avatar>
          {params.value || "Chưa có"}
        </Stack> }
      </>
    ),
  },
  { field: "service", headerName: "Dịch Vụ Khám", width: 200 },
  { field: "appointmentDate", headerName: "Ngày Khám", width: 150 },
  { field: "appointmentTime", headerName: "Khung Giờ Khám", width: 150 },
  {
    field: "status",
    headerName: "Trạng thái",
    renderCell: renderStatus,
    renderEditCell: renderEditStatus,
    type: "singleSelect",
    valueOptions: STATUS_OPTIONS,
    width: 150,
    editable: true,
  },
  {
    field: "actions",
    headerName: "Hành Động",
    width: 120,
    renderCell: (params) => (
      !params.row.doctorName && <Button variant="outlined" sx={{padding: "5px 10px"}}>Phản hồi</Button>
    ),
  },
  {
    width: 80,
    sortable: false,
    resizable: false,
    editable: false,
    filterable: false,
    renderCell: (params) => (
      <IconButton onClick={() => handleViewDetails(params.row)}>
        <VisibilityIcon />
      </IconButton>
    ),
  },
];

const initialRows = [
  { id: 1, patientName: "Nguyễn Văn A", doctorName: "", service: "Khám Nội Tổng Quát", appointmentDate: "2025-03-10", appointmentTime: "08:00 - 09:00", status: "Open" },
  { id: 2, patientName: "Trần Thị B", doctorName: "Bác sĩ Minh", service: "Xét Nghiệm Máu", appointmentDate: "2025-03-11", appointmentTime: "10:00 - 11:00", status: "Filled" },
  { id: 3, patientName: "Lê Văn C", doctorName: "", service: "Siêu Âm Tim", appointmentDate: "2025-03-12", appointmentTime: "09:00 - 10:00", status: "Open" },
  { id: 4, patientName: "Phạm Văn D", doctorName: "", service: "Khám Mắt", appointmentDate: "2025-03-13", appointmentTime: "14:00 - 15:00", status: "Filled" },
  { id: 5, patientName: "Hoàng Thị E", doctorName: "Bác sĩ An", service: "Xét Nghiệm Nước Tiểu", appointmentDate: "2025-03-14", appointmentTime: "08:30 - 09:30", status: "PartiallyFilled" },
  { id: 6, patientName: "Lý Minh F", doctorName: "", service: "Chụp X-Quang", appointmentDate: "2025-03-15", appointmentTime: "11:00 - 12:00", status: "Open" },
  { id: 7, patientName: "Trương Văn G", doctorName: "Bác sĩ Nam", service: "Khám Răng", appointmentDate: "2025-03-16", appointmentTime: "15:00 - 16:00", status: "Filled" },
];

const handleViewDetails = (row) => {
  alert(`Xem chi tiết lịch hẹn của ${row.patientName}`);
};

export default function ReservationTable() {
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  return (
    <div style={{ height: 600, width: "100%", marginTop: 20, borderRadius: 10 }}>
      <DataGrid
        rows={initialRows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSize={10}
        checkboxSelection
        pagination
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            fontSize: "14px", // Kích thước chữ
            textTransform: "uppercase", // Chữ in hoa
            fontWeight: 700, // Đậm chữ
            textAlign: "center", // Căn giữa chữ
          },
          "& .MuiDataGrid-cell:focus": { outline: "none" },
          "& .MuiDataGrid-columnHeaders": { border: "none" },
          "& .MuiDataGrid-columnHeader:focus": { outline: "none" },
        }}
      />
    </div>
  );
}
