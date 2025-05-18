import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTranslation } from 'react-i18next';
import React, { useMemo } from 'react';

const groupByGroupName = (data) => {
  return data.reduce((acc, item) => {
    if (!acc[item.group_name]) {
      acc[item.group_name] = [];
    }
    acc[item.group_name].push(item);
    return acc;
  }, {});
};

const IndicatorTable = ({ indicators }) => {
  const { t } = useTranslation();
  
  const groupedData = useMemo(() => groupByGroupName(indicators), [indicators]);
  const getEvaluationStyle = (evaluation) => {
    if (t(evaluation) === t("Needs monitoring")) {
      return { fontWeight: "bold", color: "orange" };
    } else if (t(evaluation) === t("Abnormal")) {
      return { fontWeight: "bold", color: "red" };
    }
    return {};
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="indicators table">
        <TableHead>
          <TableRow>
            <TableCell>Chỉ số</TableCell>
            <TableCell align="right">Kết quả</TableCell>
            <TableCell align="right">Đơn vị</TableCell>
            <TableCell align="right">Đánh giá</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(groupedData).map(([groupName, items]) => (
            <React.Fragment key={groupName}>
              <TableRow>
                <TableCell 
                  colSpan={4} 
                  align="left" 
                  sx={{ fontWeight: "600"}}
                >
                  {groupName}
                </TableCell>
              </TableRow>
              {items.map((row, index) => {
                const evaluationStyle = getEvaluationStyle(row.evaluation);
                return (
                  <TableRow key={`${groupName}-${index}`} hover>
                    <TableCell component="th" scope="row">
                      {row.indicator_type.name}
                    </TableCell>
                    <TableCell align="right" sx={evaluationStyle}>
                      {row.value}
                    </TableCell>
                    <TableCell align="right">
                      {row.indicator_type.unit}
                    </TableCell>
                    <TableCell align="right" sx={evaluationStyle}>
                      {t(row.evaluation)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IndicatorTable;