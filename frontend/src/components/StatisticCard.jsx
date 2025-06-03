import { Box, Typography, Paper } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import PropTypes from "prop-types";

const StatisticCard = ({ title, count, percentage_change, trend }) => {
  const getTrendIcon = () => {
    if (percentage_change === 0) return <TrendingFlatIcon color="action" />;
    return trend === "up" ? (
      <TrendingUpIcon color="success" />
    ) : (
      <TrendingDownIcon color="error" />
    );
  };

  const getTrendColor = () => {
    if (percentage_change === 0) return "text.secondary";
    return trend === "up" ? "success.main" : "error.main";
  };

  const formatPercentage = (value) => {
    if (value === 0) return "0%";
    return `${value > 0 ? "+" : ""}${value}%`;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: "100%",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        "&:hover": {
          boxShadow: 1,
          borderColor: "primary.light",
        },
      }}
    >
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontWeight: "bold",
            color: count === 0 ? "text.secondary" : "text.primary",
          }}
        >
          {count.toLocaleString()}
        </Typography>
        {count > 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: getTrendColor(),
              gap: 0.5,
            }}
          >
            {getTrendIcon()}
            <Typography
              variant="body2"
              sx={{
                fontWeight: "medium",
                color: "inherit",
              }}
            >
              {formatPercentage(percentage_change)}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

StatisticCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  percentage_change: PropTypes.number.isRequired,
  trend: PropTypes.oneOf(["up", "down", "flat"]).isRequired,
};

export default StatisticCard;
