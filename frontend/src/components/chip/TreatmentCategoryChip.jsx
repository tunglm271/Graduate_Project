import { Chip } from "@mui/material";

const categoryColors = {
    "General Check-up": "primary",
    "Specialist Consultation": "secondary",
    "Laboratory Tests": "success",
    "Medical Treatment": "error",
    "Vaccination & Preventive Care": "warning",
    "Home Healthcare Services": "info",
    "Health Consultation": "default",
};
  
const TreatmentCategoryChip = ({ category }) => {
    return <Chip label={category} color={categoryColors[category] || "default"} variant="outlined" />;
};

export default TreatmentCategoryChip;