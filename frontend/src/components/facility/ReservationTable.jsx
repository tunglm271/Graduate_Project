import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Button, IconButton, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { renderEditStatus, renderStatus, STATUS_OPTIONS } from "../../utlis/renderStatus";

export default function ReservationTable({ appointments, setReservationId }) {
  const columns = [
    { field: "patientName", headerName: "Tên Bệnh Nhân", width: 180, renderCell: (params) => params.row.health_profile?.name || "N/A" },
    {
      field: "doctorName",
      headerName: "Bác Sĩ Phụ Trách",
      width: 200,
      renderCell: (params) => (
          <Stack direction="row" alignItems="center">
            <Avatar sx={{ width: 32, height: 32, marginRight: 1 }}>
              {params.row.doctor ? params.row.doctor.name.charAt(0) : "?"}
            </Avatar>
            {params.row.doctor?.name || "Chưa có"}
          </Stack>
      ),
    },
    { field: "service", headerName: "Dịch Vụ Khám", width: 200, renderCell: (params) => params.row.medical_service?.name || "N/A" },
    { field: "appointmentDate", headerName: "Ngày Khám", width: 150, renderCell: (params) => new Date(params.row.date).toLocaleDateString("vi-VN") },
    { field: "appointmentTime", headerName: "Khung Giờ Khám", width: 150, renderCell: (params) => 
      <div>
        {params.row.start_time} - {params.row.end_time}
      </div>
     },
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
        <IconButton onClick={() => setReservationId(params.row.id)}>
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  return (
    <div style={{ height: 600, width: "100%", marginTop: 20, borderRadius: 10 }}>
      <DataGrid
        rows={appointments}
        loading={!appointments.length}
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
