import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, IconButton, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  renderEditStatus,
  renderStatus,
  STATUS_OPTIONS,
} from "../../utlis/renderStatus";
import PropTypes from "prop-types";
import { formatDateTime } from "../../utlis/DateFun";

export default function ReservationTable({
  appointments,
  setReservationId,
  loading,
  onRefresh,
}) {
  const columns = [
    {
      field: "index",
      headerName: "STT",
      width: 70,
      renderCell: (params) => {
        const index = appointments.findIndex(
          (item) => item.id === params.row.id
        );
        return index + 1;
      },
    },
    {
      field: "patientName",
      headerName: "Tên Bệnh Nhân",
      width: 180,
      renderCell: (params) => params.row.health_profile?.name || "N/A",
    },
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
    {
      field: "service",
      headerName: "Dịch Vụ Khám",
      width: 200,
      renderCell: (params) => params.row.medical_service?.name || "Đơn hẹn bác sĩ",
    },
    {
      field: "appointmentDate",
      headerName: "Ngày Khám",
      width: 150,
      renderCell: (params) =>
        formatDateTime(params.row.date, "vi", "long") || "Chưa có",
    },
    {
      field: "appointmentTime",
      headerName: "Khung Giờ Khám",
      width: 150,
      renderCell: (params) => (
        <div>
          {params.row.start_time} - {params.row.end_time}
        </div>
      ),
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
      field: "Chi tiết",
      width: 80,
      sortable: false,
      resizable: false,
      editable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="w-full flex justify-between items-center">
          <IconButton onClick={() => setReservationId(params.row.id)}>
            <VisibilityIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  return (
    <div
      style={{ height: 600, width: "100%", marginTop: 20, borderRadius: 10 }}
    >
      <DataGrid
        rows={appointments}
        loading={loading}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSize={10}
        pagination
        getRowId={(row) => row.id}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            fontSize: "14px",
            textTransform: "uppercase",
            fontWeight: 700,
            textAlign: "center",
            border: "none",
          },
          "& .MuiDataGrid-cell:focus": { outline: "none" },
          "& .MuiDataGrid-columnHeader:focus": { outline: "none" },
        }}
      />
    </div>
  );
}

ReservationTable.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      health_profile: PropTypes.shape({
        name: PropTypes.string,
      }),
      doctor: PropTypes.shape({
        name: PropTypes.string,
      }),
      medical_service: PropTypes.shape({
        name: PropTypes.string,
      }),
      date: PropTypes.string,
      start_time: PropTypes.string,
      end_time: PropTypes.string,
      status: PropTypes.string,
    })
  ).isRequired,
  setReservationId: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
};
