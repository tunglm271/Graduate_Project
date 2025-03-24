import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const MultiSelectAutocomplete = ({ options, label, onChange, getOptionLabel, ...params }) => {
  return (
    <Autocomplete
      multiple
      options={options}
      getOptionLabel={getOptionLabel}
      onChange={(event, value) => onChange(value)}
      renderInput={(params) => <TextField {...params} label={label} variant="outlined" multiline rows={2}/>}
        {...params}
    />
  );
};

export default MultiSelectAutocomplete;
