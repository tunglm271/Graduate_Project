import { DataGrid } from "@mui/x-data-grid";
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Pagination,
  Chip,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const PatientTable = ({ loading, patients }) => {
  const { t } = useTranslation();
  const rowsPerPage = 10;
  const [page, setPage] = useState(1);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {params.value}
        </Box>
      ),
    },
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
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "date_of_birth",
      headerName: t("date-of-birth"),
      width: 140,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "allergies",
      headerName: t("allergies"),
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Stack
          direction="column"
          spacing={0.5}
          flexWrap="wrap"
          gap={0.5}
          sx={{
            width: "100%",
            alignItems: "center",
          }}
        >
          {params.row.allergies?.map((allergy, index) => (
            <Chip
              key={index}
              label={allergy.name}
              size="small"
              color="warning"
              variant="outlined"
              sx={{
                height: "24px",
                maxWidth: "120px",
                "& .MuiChip-label": { px: 1, fontSize: "0.75rem" },
              }}
            />
          ))}
          {(!params.row.allergies || params.row.allergies.length === 0) && (
            <Typography variant="caption" color="text.secondary">
              {t("none")}
            </Typography>
          )}
        </Stack>
      ),
    },
    {
      field: "chronic_diseases",
      headerName: t("chronic-diseases"),
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Stack
          direction="column"
          spacing={0.5}
          flexWrap="wrap"
          gap={0.5}
          sx={{
            width: "100%",
            alignItems: "center",
          }}
        >
          {params.row.diseases?.map((disease, index) => (
            <Chip
              key={index}
              label={disease.name}
              size="small"
              color="error"
              variant="outlined"
              sx={{
                height: "24px",
                maxWidth: "120px",
                "& .MuiChip-label": { px: 1, fontSize: "0.75rem" },
              }}
            />
          ))}
          {(!params.row.diseases || params.row.diseases.length === 0) && (
            <Typography variant="caption" color="text.secondary">
              {t("none")}
            </Typography>
          )}
        </Stack>
      ),
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
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={patients.slice((page - 1) * rowsPerPage, page * rowsPerPage)}
        columns={columns}
        loading={loading}
        pageSize={10}
        checkboxSelection
        disablePagination
        hideFooter
        getRowHeight={() => "auto"}
        sx={{
          minHeight: "500px",
          border: "none",
          "& .MuiDataGrid-cell": {
            whiteSpace: "normal",
            lineHeight: "normal",
            padding: "8px 16px",
            "&:focus": { outline: "none" },
          },
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
          "& .MuiDataGrid-row": {
            "&:hover": {
              backgroundColor: "#f8fafc",
            },
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
