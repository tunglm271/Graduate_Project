import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Box, Typography, IconButton, Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const PatientTable = ({ loading, patients }) => {
  const { t } = useTranslation();
  const rowsPerPage = 10;
  const [page, setPage] = useState(1);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: t("name"),
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1} sx={{ height: "100%" }}>
          <Avatar alt={params.row.name} src={params.row.avatar} />
          <Typography variant="body2">{params.row.name}</Typography>
        </Box>
      ),
    },
    {
      field: "gender",
      headerName: t("gender"),
      width: 100,
    },
    {
      field: "date_of_birth",
      headerName: t("date-of-birth"),
      width: 140,
    },
    {
      field: "contact",
      headerName: t("phone"),
      flex: 1,
      minWidth: 150,
    },
    {
      field: "action",
      headerName: "",
      sortable: false,
      width: 70,
      renderCell: (params) => (
        <IconButton
          component={Link}
          to={`/doctor/patients/${params.row.id}`}
          color="primary"
          size="small"
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={patients.slice((page - 1) * rowsPerPage, page * rowsPerPage)}
        columns={columns}
        loading={loading}
        pageSize={10}
        checkboxSelection
        disablePagination
        hideFooter
        sx={{
          border: "none",
          "& .MuiDataGrid-cell:focus": { outline: "none" },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "600",
            color: "#4a5565",
          },
          "& .MuiDataGrid-columnHeader:focus": { outline: "none" },
          "& .MuiDataGrid-topContainer": {
            backgroundColor: "#f1f5f9",
            textTransform: "uppercase",
            fontWeight: "600",
            color: "#4b5563",
            borderRadius: "8px 8px 0 0",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "white",
          },
        }}
      />
      <Box display="flex" justifyContent="flex-end">
        <Pagination
          count={Math.ceil(patients.length / rowsPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
          sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
        />
      </Box>
    </div>
  );
};

export default PatientTable;
