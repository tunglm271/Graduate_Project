import { DataGrid } from "@mui/x-data-grid";
import {
  Avatar,
  AvatarGroup,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Chip,
  Stack,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import { Visibility } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import doctorApi from "../../service/DoctorApi";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";

const ActionCell = ({ id, onDeleted }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const { showInfoSnackbar } = useCustomSnackbar();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id) => {
    doctorApi
      .delete(id)
      .then(() => {
        showInfoSnackbar(t("staff.delete_success"));
        if (onDeleted) onDeleted();
        handleClose();
      })
      .catch((error) => {
        showInfoSnackbar(
          t("staff.delete_error", { error: error.message }),
          "error"
        );
        handleClose();
      });
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
        to={`/facility/staffs/${id}`}
        size="small"
      >
        <Visibility />
      </IconButton>
      <IconButton color="gray" size="small" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleDelete(id)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t("staff.delete")}</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

ActionCell.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onDeleted: PropTypes.func,
};

const StaffDataGrid = ({ data, loading, onDeleted }) => {
  const { t } = useTranslation();
  const columns = [
    {
      field: "name",
      headerName: t("staff.name"),
      width: 200,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1} sx={{ height: "100%" }}>
          <Avatar src={params.row.user.avatar} alt={params.row.name} />
          <Typography>{params.row.name}</Typography>
        </Box>
      ),
    },
    {
      field: "contact",
      headerName: t("staff.contact"),
      width: 200,
      renderCell: (params) => (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2">
            {params.row.phone || t("staff.no_phone")}
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            sx={{ textDecoration: "underline" }}
          >
            {params.row.user.email}
          </Typography>
        </Box>
      ),
    },
    {
      field: "workingDays",
      headerName: t("staff.working_days"),
      width: 300,
      renderCell: () => (
        <Box
          display="flex"
          justifyContent="flex-start"
          sx={{ width: "100%", height: "100%" }}
        >
          <AvatarGroup
            max={7}
            spacing={-5}
            sx={{ justifyContent: "flex-start", height: "100%" }}
          >
            {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map(
              (day, index) => (
                <Avatar
                  key={index}
                  sx={{
                    width: 30,
                    height: 30,
                    fontSize: 10,
                    marginY: "auto",
                    bgcolor: blue[500],
                    border: "none",
                    textTransform: "uppercase",
                  }}
                >
                  {t(`staff.days.${day}`)}
                </Avatar>
              )
            )}
          </AvatarGroup>
        </Box>
      ),
    },
    {
      field: "handle_service",
      headerName: t("staff.services"),
      width: 250,
      renderCell: (params) => {
        const services = params.row.handle_service || [];
        const hasMoreServices = services.length > 2;
        const displayedServices = services.slice(0, 2);
        const remainingCount = services.length - 2;

        const tooltipContent = (
          <Box sx={{ p: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {t("staff.all_services")}:
            </Typography>
            {services.map((service, index) => (
              <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                • {service.name}
              </Typography>
            ))}
          </Box>
        );

        return (
          <Tooltip
            title={hasMoreServices ? tooltipContent : ""}
            arrow
            placement="top"
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              {services.length > 0 ? (
                <>
                  {displayedServices.map((service, index) => (
                    <Chip
                      key={index}
                      label={service.name}
                      size="small"
                      sx={{
                        backgroundColor: blue[50],
                        color: blue[700],
                        fontWeight: 500,
                        maxWidth: "100%",
                        "& .MuiChip-label": {
                          whiteSpace: "normal",
                          textAlign: "left",
                        },
                      }}
                    />
                  ))}
                  {hasMoreServices && (
                    <Chip
                      label={`+${remainingCount} ${t("staff.more")}`}
                      size="small"
                      sx={{
                        backgroundColor: blue[100],
                        color: blue[700],
                        fontWeight: 500,
                        cursor: "help",
                      }}
                    />
                  )}
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {t("staff.no_services")}
                </Typography>
              )}
            </Box>
          </Tooltip>
        );
      },
    },
    {
      field: "action",
      headerName: "",
      width: 100,
      sortable: false,
      filterable: false,
      renderHeader: () => <span></span>,
      renderCell: (params) => (
        <ActionCell id={params.row.id} onDeleted={onDeleted} />
      ),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={data}
        loading={loading}
        columns={columns}
        checkboxSelection
        pageSizeOptions={[5, 10]}
        getRowHeight={() => "auto"}
        sx={{
          border: "none",
          boxShadow: "none",
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
          "& .MuiDataGrid-cell": {
            padding: "8px",
            whiteSpace: "normal",
            lineHeight: "normal",
          },
          "& .MuiDataGrid-row": {
            minHeight: "100px !important",
            "&:hover": {
              backgroundColor: "#f8fafc",
            },
          },
          "& .MuiDataGrid-loadingOverlay": {
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          },
        }}
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              <Typography color="text.secondary">
                {t("staff.no_doctors")}
              </Typography>
            </Stack>
          ),
        }}
      />
    </div>
  );
};

StaffDataGrid.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string,
      user: PropTypes.shape({
        avatar: PropTypes.string,
        email: PropTypes.string.isRequired,
      }).isRequired,
      handle_service: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  onDeleted: PropTypes.func,
};

export default StaffDataGrid;
