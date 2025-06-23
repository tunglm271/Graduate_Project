import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const HealthExamatitonRecord = ({ record }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 2 : 0,
      }}
    >
      <ListItem sx={{ paddingY: 0 }}>
        <ListItemAvatar>
          <Avatar>
            <MedicalServicesIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={record.service}
          primaryTypographyProps={{ sx: { fontWeight: "bold" } }}
          secondary={
            <>
              <Typography variant="body2" color="text.primary">
                Ngày trả kết quả: {record.result_release_date}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Cơ sở: {record.medical_facility.facility_name}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Link
        className="no-underline text-white bg-blue-500 px-4 py-2 text-sm rounded-full w-full md:w-[140px] text-center shadow-md hover:bg-blue-600 transition-colors"
        to={`record/${record.medical_record.id}`}
      >
        Xem kết quả
      </Link>
    </Box>
  );
};

HealthExamatitonRecord.propTypes = {
  record: PropTypes.shape({
    service: PropTypes.string.isRequired,
    result_release_date: PropTypes.string.isRequired,
    medical_facility: PropTypes.shape({
      facility_name: PropTypes.string.isRequired,
    }).isRequired,
    medical_record: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default HealthExamatitonRecord;
