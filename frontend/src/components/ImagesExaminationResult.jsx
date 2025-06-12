import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

const ImagesExaminationResult = ({ examination }) => {
    return (
        <Accordion sx={{ boxShadow: "none" }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <PhotoLibraryIcon />
                <Typography sx={{ marginLeft: "5px", fontWeight: 600 }}>
                    {examination.test_name}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="h6">Siêu âm ổ bụng</Typography>
                <img
                style={{
                    margin: "0 auto",
                    display: "block",
                }}
                src="https://img.ykhoadiamond.com/Uploads/Content/20032023/ecd65afd-4a54-43dc-bb06-b2dda1b9382a.jpg"
                />
                <p style={{ marginTop: "10px" }}>
                <span
                    style={{
                    fontWeight: 600,
                    }}
                >
                    Kết luận sơ bộ:
                </span>{" "}
                &nbsp; Gan, thận, và các cơ quan nội tạng khác đều trong giới
                hạn bình thường.
                </p>
            </AccordionDetails>
        </Accordion>
    );
}

export default ImagesExaminationResult;
