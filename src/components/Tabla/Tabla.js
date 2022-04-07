import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
} from "@mui/material";
import React from "react";

const Tabla = ({ headerRow = [], tableRows = [], maxHeight = 205 }) => {
  console.log("HEADER", headerRow);
  console.log("ROWS", tableRows);
  return (
    <div className="tableContainer">
      <TableContainer
        component={Paper}
        sx={{ minHeight: 205, maxHeight: maxHeight }}
      >
        <Table stickyHeader aria-label="Tabla de randoms" size="small">
          <TableHead>
            <TableRow>
              {headerRow.map((cell) => (
                <Tooltip title={cell.tooltipText} placement="bottom" arrow>
                  <TableCell align="center">{cell.title}</TableCell>
                </Tooltip>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows?.map((row) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.keys(row).map((cell) => (
                  <TableCell align="center" component="th" scope="row">
                    {row[cell]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tabla;
