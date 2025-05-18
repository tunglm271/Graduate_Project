import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  IconButton,
  Typography,
  Avatar,
  AvatarGroup,
  Pagination,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { Star, Visibility } from "@mui/icons-material";
import TreatmentCategoryChip from "../chip/TreatmentCategoryChip";
import medicalServiceApi from "../../service/medicalServiceAPi";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const ActionCell = ({ id, setData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    medicalServiceApi.delete(id).then(() => {
      setData((prevData) => prevData.filter((item) => item.id !== id));
    });
    handleClose();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        height: "100%",
      }}
    >
      <IconButton
        color="gray"
        component={Link}
        to={`/facility/services/${id}`}
        size="small"
      >
        <Visibility />
      </IconButton>
      <IconButton color="gray" size="small" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

const TreatmentDataGrid = ({ setDataCount, viewType }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [viewData, setViewData] = useState([]);
  const rowsPerPage = 5;
  const columns = [
    { field: "name", headerName: "Tên Dịch Vụ", width: 200 },
    {
      field: "category",
      headerName: "Loại Dịch Vụ",
      width: 180,
      renderCell: (params) => <TreatmentCategoryChip category={params.value} />,
    },
    {
      field: "price",
      headerName: "Giá",
      width: 120,
      renderCell: (params) => (
        <p className="font-semibold">
          {params.value}{" "}
          <span className="text-xs text-gray-400 font-medium">VNĐ</span>
        </p>
      ),
    },
    {
      field: "duration",
      headerName: "Thời Gian",
      width: 120,
      renderCell: (params) => (
        <p className="font-semibold">
          {params.value}{" "}
          <span className="text-xs text-gray-400 font-medium">Phút</span>
        </p>
      ),
    },
    {
      field: "rating",
      headerName: "Đánh Giá",
      width: 120,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Star style={{ color: "#FFD700", marginRight: 4 }} />
          <Typography>4,2</Typography>
        </div>
      ),
    },
    {
      field: "doctors",
      headerName: "Bác Sĩ Phụ Trách",
      width: 200,
      renderCell: (params) => {
        const doctors = params.value || [];
        return (
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            {doctors.length === 0 ? (
              <Typography sx={{ fontSize: 14, fontStyle: "italic" }}>
                Không có
              </Typography>
            ) : doctors.length === 1 ? (
              <Avatar
                alt={doctors[0].name}
                src={doctors[0].avatar}
                sx={{ width: 30, height: 30 }}
              />
            ) : (
              <AvatarGroup
                max={3}
                sx={{ "& .MuiAvatar-root": { width: 25, height: 25 } }}
              >
                {doctors.map((doc, index) => (
                  <Tooltip title={doc.name} key={index}>
                    <Avatar key={index} alt={doc.name} src={doc.avatar} />
                  </Tooltip>
                ))}
              </AvatarGroup>
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      flex: 1,
      renderHeader: () => <span></span>,
      renderCell: (params) => (
        <ActionCell id={params.row.id} setData={setData} />
      ),
    },
  ];

  useEffect(() => {
    medicalServiceApi
      .getByFacility()
      .then((response) => {
        setData(response.data);
        setDataCount(response.data.length);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (viewType === 0) {
      const publicServices = data.filter((item) => item.is_public);
      setViewData(publicServices);
      setDataCount(publicServices.length);
    } else {
      const privateServices = data.filter((item) => !item.is_public);
      setViewData(privateServices);
      setDataCount(privateServices.length);
    }
  }, [viewType, data, setDataCount]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={viewData.slice((page - 1) * rowsPerPage, page * rowsPerPage)}
        loading={!data.length}
        columns={columns}
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
          count={Math.ceil(viewData.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
          sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
        />
      </Box>
    </div>
  );
};

export default TreatmentDataGrid;
