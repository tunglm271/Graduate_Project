import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ScienceIcon from "@mui/icons-material/Science";
import IndicatorTable from "../IndicatorTable";

const MetricsExaminationResult = ({indicators, conclusion}) => {
  return (
    <Accordion sx={{ boxShadow: "none" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <ScienceIcon />
        <Typography sx={{ marginLeft: "5px", fontWeight: 600 }}>
          Xét nghiệm chỉ số
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <IndicatorTable indicators={indicators} />
        <p className="m-5">
          <span style={{ fontWeight: 600 }}>Kết luận sơ bộ:</span> &nbsp;
          {conclusion}
        </p>
      </AccordionDetails>
    </Accordion>
  );
};

export default MetricsExaminationResult;
