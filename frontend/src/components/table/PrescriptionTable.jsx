import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, Box
} from '@mui/material';


const PrescriptionTable = ({prescription}) => {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <TableContainer>
        <Table size="small" aria-label="prescription table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Medicine</strong></TableCell>
              <TableCell><strong>Unit</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prescription.medicines.map((row, index) => (
              <TableRow
                key={index}
                sx={index === prescription.medicines.length - 1 ? { '& td': { borderBottom: 'none' } } : {}}
              >
                <TableCell>
                  <Typography variant="body1">{row.name}</Typography>
                  <Typography variant="body2" fontStyle="italic" color="text.secondary">
                    {row.pivot.usage}
                  </Typography>
                </TableCell>
                <TableCell>{row.unit}</TableCell>
                <TableCell>{row.pivot.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PrescriptionTable;
