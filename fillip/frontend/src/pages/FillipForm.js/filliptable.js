import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import ClearIcon from "@mui/icons-material/Clear";
import TableInput from "./tableinput";

export default function FillipTable({
  selectedOptionsArray,
  onRemoveRow,
  setFormData,
  handleNumberChange,
}) {
  const handleTableData = (option, newNumber) => {
    // Convert newNumber to a string
    const newNumberString = newNumber.toString();

    const key = `${option}`;

    // Update formData with the new data
    setFormData((prevData) => ({
      ...prevData,
      [key]: newNumberString, // Store as a string
    }));
  };

  return (
    <div>
      <TableContainer component={Paper} className="tableContainer">
        <Table aria-label="simple table" className="table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="tableCell"></TableCell>
              <TableCell align="center" className="tableCell">
                Number
              </TableCell>
              <TableCell align="center" className="tableCell">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedOptionsArray.map((option, index) => (
              <TableRow key={index}>
                <TableCell align="center" className="tableCell">
                  {option.option}
                </TableCell>
                <TableCell align="center" className="tableCell">
                  <TableInput
                    index={index}
                    value={option.number}
                    onChange={(newNumber) => {
                      handleTableData(option.option, newNumber);
                      handleNumberChange(index, newNumber); // Call handleNumberChange as well
                    }}
                  />
                </TableCell>
                <TableCell align="center" className="tableCell">
                  <button type="button" onClick={() => onRemoveRow(index)}>
                    <ClearIcon />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
