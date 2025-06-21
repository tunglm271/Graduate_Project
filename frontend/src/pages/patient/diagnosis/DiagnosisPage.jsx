import { useState, useEffect } from "react";
import { Box, Button, Paper, Typography, Container, Grid } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import api from "../../../service/api";
import { Skeleton } from "@mui/material";
import ServiceCard from "../../../components/card/ServiceCard";
import PropTypes from "prop-types";

const TypingText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 20);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text]);

  return (
    <Typography variant="body1">{isComplete ? text : displayedText}</Typography>
  );
};

TypingText.propTypes = {
  text: PropTypes.string.isRequired,
};

const DiagnosisPage = () => {
  const [symptoms, setSymptoms] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    api
      .post("diagnosis", { prompt: symptoms })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setResponse(res.data);
      })
      .catch((error) => {
        console.error("Error during diagnosis:", error);
        setLoading(false);
        alert("Có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại.");
      });
  };

  const handleReset = () => {
    setSymptoms("");
    setResponse(null);
  };

  return (
    <Container sx={{ py: 4, minHeight: "65vh" }}>
      <p className="text-2xl font-semibold">Gợi ý dịch vụ cùng AI</p>
      <p className="text-gray-600 mb-5 text-sm w-5/6">
        Vui lòng nhập các triệu chứng bạn đang gặp phải vào ô bên dưới. Hệ thống sẽ phân tích và đề xuất các dịch vụ y tế phù hợp, kèm theo giải thích chi tiết để hỗ trợ bạn lựa chọn giải pháp chăm sóc sức khỏe tốt nhất.
      </p>

      <Box sx={{ mb: 3 }}>
        <textarea
          rows={4}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Nhập triệu chứng của bạn..."
          className="block bg-white w-5/6 min-h-[120px] p-3 mb-4 mx-auto rounded-xl border border-gray-300 shadow-inner shadow-blue-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none text-base font-sans"
        />
        <Button
          variant="contained"
          endIcon={<AutoAwesomeIcon />}
          onClick={handleSubmit}
          disabled={!symptoms.trim() || loading}
          sx={{
            display: "flex",
            mx: "auto",
            borderRadius: "20px",
          }}
        >
          {loading ? "Đang xử lý..." : "Chẩn đoán"}
        </Button>
      </Box>

      {loading && (
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Skeleton variant="text" width={200} height={40} />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {[1, 2, 3].map((index) => (
              <Grid item xs={12} md={4} key={index}>
                <Skeleton variant="rectangular" height={200} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {!loading && response && Array.isArray(response.recommended_services) && (
        <Box sx={{ mt: 4 }}>
          {/* Overall Explanation */}
          <Paper elevation={2} sx={{ p: 3, mb: 4, boxShadow: "0px 4px 8px rgba(173, 216, 230, 0.7)", borderRadius: "10px" }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Phân tích tổng quan
            </Typography>
            <Box sx={{ minHeight: "60px" }}>
              <TypingText
                text={
                  response.overall_explanation ||
                  "Không có phân tích tổng quan."
                }
              />
            </Box>
          </Paper>

          {/* Recommended Services */}
          <Typography variant="h6" color="primary" gutterBottom sx={{ mb: 2 }}>
            Các dịch vụ được đề xuất
          </Typography>
          <Grid container spacing={3}>
            {response.recommended_services.map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <ServiceCard
                  service={item.service}
                  explanation={
                    item.explanation || "Không có giải thích chi tiết."
                  }
                  similarityScore={item.similarity_score}
                />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={handleReset}
            >
              Làm mới
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default DiagnosisPage;
