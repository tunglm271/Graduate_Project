import { Dialog, DialogActions, DialogTitle, Button, Select, MenuItem, FormControl, Slider, Radio,RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import { useState } from 'react';
const FilterPopUp = ({open, onClose, handleFilter}) => {
    const [maxPrice, setMaxPrice] = useState(100);
    const [gender, setGender] = useState("other");
    const marks = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 25,
            label: '1 triệu',
        },
        {
            value: 50,
            label: '2 triệu',
        },
        {
            value: 75,
            label: '3 triệu',
        },
        {
            value: 100,
            label: '4 triệu',
        },
    ]

    const handleSubmit = () => {
        handleFilter({
            maxPrice: maxPrice * 40000,
            gender: gender
        });
        onClose();
    }


    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Bộ lọc</DialogTitle>
        <div style={{padding: '0 20px'}}>
            <h4>Địa điểm</h4>
            <FormControl variant="standard" fullWidth sx={{ minWidth: 120, mb: 3 , mt: 1}}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={10}
                    fullWidth
                    disableUnderline
                    label="Địa điểm"
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        padding: '5px 10px',
                        boxShadow: " 0 4px 8px rgba(173, 216, 230, 0.5)",
                    }}
                >
                    <MenuItem value={10}>Hà Nội</MenuItem>
                    <MenuItem value={20}>Bình Định</MenuItem>
                    <MenuItem value={30}>Thành phố Hồ Chí Minh</MenuItem>
                </Select>
            </FormControl>
            <h4>Giá gói khám</h4>
            <Slider
                value={maxPrice}
                aria-labelledby="discrete-slider-always"
                step={25}
                marks={marks}
                sx={{width: '90%', ml: '4%', mb: 5}}
                onChange={(event, newValue) => setMaxPrice(newValue)}
            />

            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Giới tính</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                >
                    <FormControlLabel value="other" control={<Radio />} label="Tất cả" />
                    <FormControlLabel value="female" control={<Radio />} label="Nam" />
                    <FormControlLabel value="male" control={<Radio />} label="Nữ" />
                </RadioGroup>
            </FormControl>
        </div>
        <DialogActions>
            <Button onClick={onClose} color="secondary">Cancel</Button>
            <Button onClick={handleSubmit} color="primary">Áp dụng</Button>
        </DialogActions>
    </Dialog>
    );
}

export default FilterPopUp;
