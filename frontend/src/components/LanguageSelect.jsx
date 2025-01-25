import { useTranslation } from "react-i18next";
import { Select, MenuItem, Box } from "@mui/material";
import EnglandFlag from "../assets/england.svg";
import VietnamFlag from "../assets/vietnam.svg";
import PublicIcon from "@mui/icons-material/Public";

const LanguageSelect = ({ color = "white" }) => {
  
  const { i18n } = useTranslation();
  console.log(useTranslation());
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0, // Space between the icon and Select
        color: color, // Ensure the icon matches the text color
        width: "auto",
        marginLeft: 1,
      }}
    >
      <PublicIcon sx={{ fontSize: 24 }} />
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={i18n.language}
        label="Language"
        onChange={(e) => changeLanguage(e.target.value)}
        renderValue={(selected) => {
          switch (selected) {
            case "en":
              return "EN";
            case "vi":
              return "VI";
          }
        }}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        }}
        sx={{
          color: color,
          "& .MuiSelect-icon": {
            color: color,
          },
          "& .MuiSelect-select": {
            paddingLeft: 1, // Remove left padding
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none", // Remove the border
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none", // Remove hover border
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none", // Remove focus border
          },
          display: {
            xs: "none",
            sm: "flex",
          },
          padding: 0,
        }}
      >
        <MenuItem
          value="en"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <img src={EnglandFlag} /> English
        </MenuItem>
        <MenuItem
          value="vi"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <img src={VietnamFlag} />
          Tiếng Việt
        </MenuItem>
      </Select>
    </Box>
  );
};

export default LanguageSelect;
