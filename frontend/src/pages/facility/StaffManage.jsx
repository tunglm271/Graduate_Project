import StethoscopeIcon from "@icon/StethoscopeIcon";
import { Stack, Button, Box, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import StaffDataGrid from "../../components/table/StaffDataGrid";
import CreateDoctorDialog from "../../components/dialog/CreateDoctorDialog";
import doctorApi from "../../service/DoctorApi";

const StaffManage = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    doctorApi
      .getAll()
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = useCallback(
    (query) => {
      setSearchQuery(query);
      if (!query.trim()) {
        setFilteredData(data);
        return;
      }

      const searchLower = query.toLowerCase();
      const filtered = data.filter((doctor) => {
        return (
          doctor.name?.toLowerCase().includes(searchLower) ||
          doctor.phone?.toLowerCase().includes(searchLower) ||
          doctor.email?.toLowerCase().includes(searchLower)
        );
      });
      setFilteredData(filtered);
    },
    [data]
  );

  return (
    <div>
      <Box
        sx={{
          padding: "1rem 1.5rem",
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="flex gap-2 items-center">
          <div className="rounded-sm bg-gray-300" style={{ padding: "0.3rem" }}>
            <StethoscopeIcon />
          </div>
          <p className="text-gray-500">
            <span className="font-bold text-xl text-black">
              {filteredData.length || 0}
            </span>{" "}
            {t("staff.management.doctors")}
          </p>
        </div>
        <Stack direction={"row"} spacing={2}>
          <TextField
            size="small"
            placeholder={t("staff.management.search_placeholder")}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgb(209 213 219)",
                },
                "&:hover fieldset": {
                  borderColor: "rgb(59 130 246)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgb(59 130 246)",
                },
              },
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ boxShadow: "none" }}
            onClick={() => setOpen(true)}
          >
            {t("staff.management.add_doctor")}
          </Button>
        </Stack>
      </Box>
      <div style={{ padding: "1rem" }}>
        <StaffDataGrid data={filteredData} loading={loading} />
      </div>
      <CreateDoctorDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default StaffManage;
