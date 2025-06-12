import * as React from "react";
import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import InfoIcon from "@mui/icons-material/Info";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DoneIcon from "@mui/icons-material/Done";
import PaymentIcon from "@mui/icons-material/Payment";
import {
  GridEditModes,
  useGridApiContext,
  useGridRootProps,
} from "@mui/x-data-grid";

export const STATUS_OPTIONS = [
  "cancelled",
  "pending",
  "assigned",
  "completed",
  "paid",
];

const StyledChip = styled(Chip)(({ theme }) => ({
  justifyContent: "left",
  "& .icon": {
    color: "inherit",
  },
  "&.cancelled": {
    color: (theme.vars || theme).palette.error.dark,
    border: `1px solid ${(theme.vars || theme).palette.error.main}`,
  },
  "&.pending": {
    color: (theme.vars || theme).palette.warning.dark,
    border: `1px solid ${(theme.vars || theme).palette.warning.main}`,
  },
  "&.assigned": {
    color: (theme.vars || theme).palette.info.dark,
    border: `1px solid ${(theme.vars || theme).palette.info.main}`,
  },
  "&.completed": {
    color: (theme.vars || theme).palette.success.dark,
    border: `1px solid ${(theme.vars || theme).palette.success.main}`,
  },
  "&.paid": {
    color: (theme.vars || theme).palette.success.dark,
    border: `1px solid ${(theme.vars || theme).palette.success.main}`,
  },
}));

const useStatusUtils = () => {
  const getStatusIcon = React.useCallback((status) => {
    switch (status) {
      case "cancelled":
        return <ReportProblemIcon className="icon" />;
      case "pending":
        return <InfoIcon className="icon" />;
      case "assigned":
        return <AutorenewIcon className="icon" />;
      case "completed":
        return <DoneIcon className="icon" />;
      case "paid":
        return <PaymentIcon className="icon" />;
      default:
        return null;
    }
  }, []);

  const getStatusLabel = React.useCallback((status) => {
    switch (status) {
      case "pending":
        return "Chưa chỉ định";
      case "assigned":
        return "Đã chỉ định";
      case "cancelled":
        return "Đã hủy";
      case "completed":
        return "Hoàn thành";
      case "paid":
        return "Đã thanh toán";
      default:
        return status;
    }
  }, []);

  return { getStatusIcon, getStatusLabel };
};

const Status = React.memo(({ status }) => {
  const { getStatusIcon, getStatusLabel } = useStatusUtils();
  const icon = React.useMemo(
    () => getStatusIcon(status),
    [status, getStatusIcon]
  );
  const label = React.useMemo(
    () => getStatusLabel(status),
    [status, getStatusLabel]
  );

  return (
    <StyledChip
      className={status}
      icon={icon}
      size="small"
      label={label}
      variant="outlined"
    />
  );
});

Status.displayName = "Status";

Status.propTypes = {
  status: PropTypes.oneOf(STATUS_OPTIONS).isRequired,
};

const EditStatus = React.memo(({ id, value, field }) => {
  const { getStatusLabel } = useStatusUtils();
  const rootProps = useGridRootProps();
  const apiRef = useGridApiContext();

  const handleChange = React.useCallback(
    async (event) => {
      const isValid = await apiRef.current.setEditCellValue({
        id,
        field,
        value: event.target.value,
      });

      if (isValid && rootProps.editMode === GridEditModes.Cell) {
        apiRef.current.stopCellEditMode({
          id,
          field,
          cellToFocusAfter: "below",
        });
      }
    },
    [apiRef, field, id, rootProps.editMode]
  );

  const handleClose = React.useCallback(
    (event, reason) => {
      if (reason === "backdropClick") {
        apiRef.current.stopCellEditMode({
          id,
          field,
          ignoreModifications: true,
        });
      }
    },
    [apiRef, field, id]
  );

  const menuItems = React.useMemo(
    () =>
      STATUS_OPTIONS.map((option) => {
        let IconComponent = null;
        switch (option) {
          case "cancelled":
            IconComponent = ReportProblemIcon;
            break;
          case "pending":
            IconComponent = InfoIcon;
            break;
          case "assigned":
            IconComponent = AutorenewIcon;
            break;
          case "completed":
            IconComponent = DoneIcon;
            break;
          case "paid":
            IconComponent = PaymentIcon;
            break;
          default:
            break;
        }

        const label = getStatusLabel(option);

        return (
          <MenuItem key={option} value={option}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <IconComponent fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={label} sx={{ overflow: "hidden" }} />
          </MenuItem>
        );
      }),
    []
  );

  return (
    <Select
      value={value}
      onChange={handleChange}
      MenuProps={{
        onClose: handleClose,
      }}
      sx={{
        height: "100%",
        "& .MuiSelect-select": {
          display: "flex",
          alignItems: "center",
          pl: 1,
        },
      }}
      autoFocus
      fullWidth
      open
    >
      {menuItems}
    </Select>
  );
});

EditStatus.displayName = "EditStatus";

EditStatus.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
};

export function renderStatus(params) {
  if (!params.value && !params.row.status) {
    return "";
  }
  return <Status status={params.row.status} />;
}

export function renderEditStatus(params) {
  return <EditStatus {...params} />;
}
