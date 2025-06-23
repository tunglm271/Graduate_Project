import { useState, useEffect, useMemo } from "react";
import "./healthProfiles.css";
import {
  Breadcrumbs,
  Typography,
  Tabs,
  Tab,
  Box,
  Avatar,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Skeleton,
  CircularProgress,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import CallIcon from "@mui/icons-material/Call";
import WcIcon from "@mui/icons-material/Wc";
import HealthProfileHistory from "./HealthProfileHistory";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import healthProfileApi from "../../../service/healthProfileApi";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const LoadingSkeleton = () => (
  <div className="health-profile-detail">
    <Breadcrumbs>
      <Link to={"/health-profile"} className="hover:underline">
        Health Profiles
      </Link>
      <Skeleton variant="text" width={150} height={24} />
    </Breadcrumbs>
    <div className="content-wrapper">
      <div className="main-content">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs variant="fullWidth" value={0}>
            <Tab label="History" />
            <Tab label="Indicators" />
          </Tabs>
        </Box>
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <CircularProgress />
          </Box>
        </Box>
      </div>
      <div className="basic-infor-section">
        <div className="infor-item">
          <Box className="avatar-container">
            <Skeleton variant="circular" width="100%" height="100%" />
          </Box>
          <Typography variant="h6" textAlign={"center"} sx={{ mt: 2, mb: 2 }}>
            <Skeleton width={120} />
          </Typography>
          <div>
            {[1, 2, 3, 4].map((item) => (
              <ListItem key={item} sx={{ paddingY: 0 }}>
                <ListItemIcon>
                  <Skeleton variant="circular" width={24} height={24} />
                </ListItemIcon>
                <ListItemText
                  primary={<Skeleton width={120} />}
                  secondary={<Skeleton width={80} />}
                />
              </ListItem>
            ))}
          </div>
          <Box sx={{ mt: 3 }}>
            <Button variant="outlined" fullWidth disabled sx={{ mb: 1 }}>
              <Skeleton width={60} />
            </Button>
            <Button variant="outlined" color="error" fullWidth disabled>
              <Skeleton width={60} />
            </Button>
          </Box>
        </div>
      </div>
    </div>
  </div>
);

const HealthProfileDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [latestIndicators, setLatestIndicators] = useState({});
  const [indicatorDialogOpen, setIndicatorDialogOpen] = useState(false);
  const [selectedIndicator, setSelectedIndicator] = useState(null);
  const [indicatorHistory, setIndicatorHistory] = useState([]);
  const [indicatorHistoryLoading, setIndicatorHistoryLoading] = useState(false);
  const [historyView, setHistoryView] = useState("list");

  const chartData = useMemo(
    () =>
      indicatorHistory.reverse().map((item) => ({
        value: item.value,
        measured_at: new Date(item.measured_at).toLocaleString(),
      })),
    [indicatorHistory]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await healthProfileApi.getById(id);
        console.log("Profile data:", response.data);
        setProfile(response.data.health_profile);
        setMedicalRecords(response.data.health_profile.appointments || []);
        setLatestIndicators(response.data.latest_indicators || {});
      } catch (error) {
        console.error("Error fetching profile:", error);
        // You might want to show an error message to the user here
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleIndicatorClick = async (indicator) => {
    setSelectedIndicator(indicator);
    setIndicatorDialogOpen(true);
    setIndicatorHistoryLoading(true);
    try {
      const res = await healthProfileApi.getIndicatorHistory(
        id,
        indicator.indicator_type_id
      );
      setIndicatorHistory(res.data);
    } catch {
      setIndicatorHistory([]);
    } finally {
      setIndicatorHistoryLoading(false);
    }
  };

  const handleDialogClose = () => {
    setIndicatorDialogOpen(false);
    setSelectedIndicator(null);
    setIndicatorHistory([]);
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!profile) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          {t("profile.error.not-found")}
        </Typography>
      </Box>
    );
  }

  return (
    <div className="health-profile-detail">
      <Breadcrumbs>
        <Link to={"/health-profile"} className="hover:underline">
          {t("health-profiles-list")}
        </Link>
        <Typography>
          {profile.name} ({t(profile.relationship)})
        </Typography>
      </Breadcrumbs>
      <div className="content-wrapper">
        <div className="main-content">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              variant="fullWidth"
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
            >
              <Tab label={t("profile.tabs.history")} />
              <Tab label={t("profile.tabs.indicators")} />
            </Tabs>
          </Box>
          <Box>
            {tabValue === 0 && (
              <div>
                {medicalRecords.length === 0 ? (
                  <Box sx={{ p: 3, textAlign: "center" }}>
                    <Typography color="text.secondary">
                      {t("profile.history-empty")}
                    </Typography>
                  </Box>
                ) : (
                  <HealthProfileHistory medicalRecords={medicalRecords} />
                )}
              </div>
            )}
            {tabValue === 1 && (
              <Box sx={{ p: 3 }}>
                {Object.keys(latestIndicators).length === 0 ? (
                  <Typography color="text.secondary">
                    {t(
                      "profile.indicators.empty",
                      "No health indicators found."
                    )}
                  </Typography>
                ) : (
                  Object.entries(latestIndicators).map(
                    ([group, indicators]) => (
                      <Box key={group} sx={{ mb: 3, textAlign: "left" }}>
                        <p className="font-bold text-xl pl-2 border-l-2 text-gray-700 border-gray-700">
                          {group}
                        </p>
                        <Grid container spacing={2} sx={{ pl: 2 }}>
                          {indicators.map((indicator, idx) => (
                            <Grid item xs={12} sm={6} key={idx}>
                              <ListItem
                                alignItems="flex-start"
                                sx={{ px: 0, cursor: "pointer" }}
                                onClick={() => handleIndicatorClick(indicator)}
                              >
                                <ListItemText
                                  primary={
                                    <span>
                                      <span className="font-bold hover:underline">
                                        {indicator.name}
                                      </span>
                                      {": "}
                                      <span>
                                        {indicator.value} {indicator.unit}
                                      </span>
                                    </span>
                                  }
                                  secondary={
                                    t(
                                      "profile.indicators.measured_at",
                                      "Measured at"
                                    ) +
                                    ": " +
                                    new Date(
                                      indicator.measured_at
                                    ).toLocaleString()
                                  }
                                />
                              </ListItem>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )
                  )
                )}
              </Box>
            )}
          </Box>
        </div>
        <div className="basic-infor-section">
          <div className="infor-item">
            <div className="w-36 h-36 rounded-full overflow-hidden mb-4 mx-auto">
              <Avatar
                src={profile.avatar}
                alt={profile.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  mx: "auto",
                  objectFit: "cover",
                }}
              />
            </div>

            <Typography variant="h6" textAlign={"center"} sx={{ mt: 2, mb: 2 }}>
              {t("profile.detail.basic-info")}
            </Typography>
            <div>
              <ListItem sx={{ paddingY: 0 }}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t(profile.relationship)}
                  secondary={t("profile.detail.relationship")}
                />
              </ListItem>
              <ListItem sx={{ paddingY: 0 }}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText
                  primary={profile.name}
                  secondary={t("profile.detail.name")}
                />
              </ListItem>
              <ListItem sx={{ paddingY: 0 }}>
                <ListItemIcon>
                  <CallIcon />
                </ListItemIcon>
                <ListItemText
                  primary={profile.phone || t("profile.detail.no-phone")}
                  secondary={t("profile.detail.phone")}
                />
              </ListItem>
              <ListItem sx={{ paddingY: 0 }}>
                <ListItemIcon>
                  <WcIcon />
                </ListItemIcon>
                <ListItemText
                  primary={profile.gender}
                  secondary={t("profile.detail.gender")}
                />
              </ListItem>
            </div>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                component={Link}
                to={`/health-profile/${id}/edit`}
                fullWidth
                sx={{ mb: 1 }}
              >
                {t("profile.common.edit")}
              </Button>
              <Button variant="outlined" color="error" fullWidth>
                {t("profile.common.delete")}
              </Button>
            </Box>
          </div>
        </div>
      </div>
      <Dialog
        open={indicatorDialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedIndicator ? selectedIndicator.name : ""}
        </DialogTitle>
        <DialogContent>
          {indicatorHistory.length > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Button
                variant={historyView === "list" ? "contained" : "outlined"}
                size="small"
                sx={{ mr: 1 }}
                onClick={() => setHistoryView("list")}
              >
                Danh sách
              </Button>
              <Button
                variant={historyView === "chart" ? "contained" : "outlined"}
                size="small"
                onClick={() => setHistoryView("chart")}
              >
                Biểu đồ
              </Button>
            </Box>
          )}
          {indicatorHistoryLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 120,
              }}
            >
              <CircularProgress />
            </Box>
          ) : indicatorHistory.length === 0 ? (
            <Typography color="text.secondary" align="center">
              Không có lịch sử đo cho chỉ số này.
            </Typography>
          ) : historyView === "chart" && indicatorHistory.length > 1 ? (
            <Box sx={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="measured_at"
                    tick={{ fontSize: 12 }}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis domain={["dataMin", "dataMax"]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#1976d2" dot />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          ) : (
            <Box>
              {indicatorHistory.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>
                    {new Date(item.measured_at).toLocaleString()}
                  </Typography>
                  <Typography fontWeight={500}>
                    {item.value} {selectedIndicator.unit}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>
            {t("close", "Đóng")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HealthProfileDetail;
