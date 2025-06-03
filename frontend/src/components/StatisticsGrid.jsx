import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import StatisticCard from "./StatisticCard";

const StatisticsGrid = ({ data }) => {
  const statistics = [
    {
      key: "patients",
      title: "Tổng số bệnh nhân",
      data: data.patients,
    },
    {
      key: "facilities",
      title: "Tổng số cơ sở y tế",
      data: data.facilities,
    },
    {
      key: "articles",
      title: "Tổng số bài viết",
      data: data.articles,
    },
  ];

  return (
    <Grid container spacing={3}>
      {statistics.map(({ key, title, data }) => (
        <Grid item xs={12} sm={6} md={4} key={key}>
          <StatisticCard
            title={title}
            count={data.count}
            percentage_change={data.percentage_change}
            trend={data.trend}
          />
        </Grid>
      ))}
    </Grid>
  );
};

StatisticsGrid.propTypes = {
  data: PropTypes.shape({
    patients: PropTypes.shape({
      count: PropTypes.number.isRequired,
      percentage_change: PropTypes.number.isRequired,
      trend: PropTypes.oneOf(["up", "down", "flat"]).isRequired,
    }).isRequired,
    facilities: PropTypes.shape({
      count: PropTypes.number.isRequired,
      percentage_change: PropTypes.number.isRequired,
      trend: PropTypes.oneOf(["up", "down", "flat"]).isRequired,
    }).isRequired,
    articles: PropTypes.shape({
      count: PropTypes.number.isRequired,
      percentage_change: PropTypes.number.isRequired,
      trend: PropTypes.oneOf(["up", "down", "flat"]).isRequired,
    }).isRequired,
  }).isRequired,
};

export default StatisticsGrid;
