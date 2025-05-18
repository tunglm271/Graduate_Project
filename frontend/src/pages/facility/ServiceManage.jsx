import { Tabs, Tab, Box, Button, Stack, Divider } from "@mui/material";
import { useState } from "react";
import StethoscopeIcon from "@icon/StethoscopeIcon";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import TreatmentDataGrid from "../../components/table/TreatmentDataGrid";
import { Link } from "react-router-dom";

const ServiceManage = () => {
  const [viewType, setViewType] = useState(0);
  const [rowCount, setRowCount] = useState(0);

  const handleViewTypeChange = (event, newValue) => {
    setViewType(newValue);
  };

  return (
    <div>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "white",
          borderBottomWidth: "1.5px",
        }}
      >
        <Tabs
          value={viewType}
          onChange={handleViewTypeChange}
          aria-label="service type tabs"
        >
          <Tab label="Dịch vụ công khai" />
          <Tab label="Dịch vụ chỉ định" />
        </Tabs>
      </Box>
      <div
        className="flex items-center justify-between"
        style={{ padding: "1rem 1.5rem" }}
      >
        <div className="flex gap-2 items-center">
          <div className="rounded-sm bg-gray-300" style={{ padding: "0.3rem" }}>
            <StethoscopeIcon />
          </div>
          <p className="text-gray-500">
            <span className="font-bold text-xl text-black">{rowCount}</span>{" "}
            Dịch vụ
          </p>
        </div>
        <Stack direction={"row"} spacing={2}>
          <Button
            color="warning"
            variant="outlined"
            startIcon={<FilterListIcon />}
          >
            Lọc
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ boxShadow: "none" }}
            component={Link}
            to="/facility/services/new"
          >
            Thêm dịch vụ
          </Button>
        </Stack>
      </div>
      <Divider />
      <div style={{ padding: "1rem 1.5rem" }}>
        <TreatmentDataGrid setDataCount={setRowCount} viewType={viewType} />
      </div>
    </div>
  );
};

export default ServiceManage;
