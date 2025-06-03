import { useState, useEffect } from "react";
import { Box, Button, Paper, Typography, Container } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import api from "../../../service/api";
import { Skeleton } from "@mui/material";
const TypingText = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 20); // Adjust typing speed here

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, onComplete]);

  return (
    <Typography variant="body1">{isComplete ? text : displayedText}</Typography>
  );
};

const DiagnosisPage = () => {
  const [symptoms, setSymptoms] = useState("");
  const [response, setResponse] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    api
      .post("diagnosis", { symptoms })
      .then((res) => {
        const mockResponse = {
          service: res.data.answer,
          explanation:
            res.data.answer ||
            "Dựa trên triệu chứng của bạn, chúng tôi gợi ý dịch vụ khám nội tổng quát để đánh giá sức khỏe toàn diện.",
        };
        setLoading(false);
        setResponse(mockResponse);
        setIsTyping(true);
      })
      .catch((error) => {
        console.error("Error during diagnosis:", error);
      });
  };

  const handleReset = () => {
    setSymptoms("");
    setResponse(null);
    setIsTyping(false);
  };

  return (
    <Container sx={{ py: 4, minHeight: "65vh" }}>
      <p className="mb-5 text-2xl font-semibold">Gợi ý dịch vụ cùng AI</p>

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
          disabled={!symptoms.trim()}
          sx={{
            display: "flex",
            mx: "auto",
            borderRadius: "20px",
          }}
        >
          Chuẩn đoán
        </Button>
      </Box>

      {loading && (
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={60}
            sx={{ mt: 2 }}
          />
        </Box>
      )}
      {!loading && response && (
        <Paper elevation={2} sx={{ p: 3, bgcolor: "#f5f5f5" }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Dịch vụ đề xuất: {response.service}
          </Typography>
          <Box sx={{ minHeight: "60px" }}>
            <TypingText
              text={response.explanation}
              onComplete={() => setIsTyping(false)}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={handleReset}
            >
              Làm mới
            </Button>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default DiagnosisPage;
