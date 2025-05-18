import { useTranslation } from "react-i18next";
import { Select, MenuItem, Box } from "@mui/material";
import EnglandFlag from "../assets/england.svg";
import VietnamFlag from "../assets/vietnam.svg";
import PublicIcon from "@mui/icons-material/Public";

const LanguageSelect = ({ color = "white" }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={i18n.language}
        label="Language"
        onChange={(e) => changeLanguage(e.target.value)}
        renderValue={(selected) => {
          switch (selected) {
            case "en":
              return <img src={EnglandFlag} alt="English" />;
            case "vi":
              return <img src={VietnamFlag} alt="Vietnamese"  />;
            default:
              return <img src={EnglandFlag} alt="English" />;
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
            paddingLeft: 1,
            display: "flex",
            alignItems: "center",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
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
          <img src={EnglandFlag} alt="English" /> English
        </MenuItem>
        <MenuItem
          value="vi"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <img src={VietnamFlag} alt="Vietnamese" />
          Tiếng Việt
        </MenuItem>
      </Select>
  );
};

export default LanguageSelect;