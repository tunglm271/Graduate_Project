import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
const exampleData = [
    { "category": "Chung", "name": "Huyết áp", "value": "140/90", "unit": "mmHg", "evaluation": "Cần theo dõi" },
    { "category": "Chung", "name": "Nhịp tim", "value": "80", "unit": "lần/phút", "evaluation": "Bình thường" },
    { "category": "Chung", "name": "Nhiệt độ", "value": "36.5", "unit": "°C", "evaluation": "Bình thường" },
    { "category": "Bạch Cầu", "name": "Neutrophil", "value": "60", "unit": "%", "evaluation": "Bình thường" },
    { "category": "Tiểu Cầu", "name": "PLT", "value": "90", "unit": "10^9/L", "evaluation": "Bất thường" },
    { "category": "Tiểu Cầu", "name": "MPV", "value": "10.5", "unit": "fL", "evaluation": "Bình thường" }
];

const groupByCategory = (data) => {
    return data.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
};


const IndicatorTable = () => {
    const groupedData = groupByCategory(exampleData);
    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>Chỉ số</TableCell>
                <TableCell align="right">Kết quả</TableCell>
                <TableCell align="right">Đơn vị</TableCell>
                <TableCell align="right">Đánh giá</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.keys(groupedData).map((category) => (
                <React.Fragment key={category}>
                    <TableRow>
                    <TableCell colSpan={4} align="left" sx={{ fontWeight: "600" }}>
                        {category}
                    </TableCell>
                    </TableRow>
                    {groupedData[category].map((row, index) => (
                    <TableRow key={index}>
                        <TableCell component="th" scope="row">{row.name}</TableCell>
                        <TableCell align="right" sx={row.evaluation === "Cần theo dõi" ? { fontWeight: "bold", color: "orange" } : row.evaluation === "Bất thường" ? { fontWeight: "bold", color: "red" } : {}}>
                        {row.value}
                        </TableCell>
                        <TableCell align="right">{row.unit}</TableCell>
                        <TableCell align="right" sx={row.evaluation === "Cần theo dõi" ? { fontWeight: "bold", color: "orange" } : row.evaluation === "Bất thường" ? { fontWeight: "bold", color: "red" } : {}}>
                        {row.evaluation}
                        </TableCell>
                    </TableRow>
                    ))}
                </React.Fragment>
                ))}
            </TableBody>
            </Table>
      </TableContainer>
    );
}

export default IndicatorTable;
