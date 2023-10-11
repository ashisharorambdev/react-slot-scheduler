import * as React from "react";
import { useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./style.css";
import { generateTimeSlots } from "./generateTimeSlots";

function createData(room, timeSlot, slots) {
  return { room, timeSlot, slots };
}

const rooms = ["Room 1", "Room 2", "Room 3", "Room 4"];
const timeSlots = generateTimeSlots();

const rows = rooms.map((room) => createData(room, "", "", "", "", ""));

export default function BasicTable() {
  const [selectedCells, setSelectedCells] = useState([]);
  const rowRef = useRef(null); // Ref to track the current row being selected

  const handleCellMouseDown = (room, timeSlot) => {
    rowRef.current = room; // Store the current row
    setSelectedCells([{ room, timeSlot }]);
  };

  const handleCellMouseEnter = (room, timeSlot) => {
    if (rowRef.current === room && selectedCells.length > 0) {
      const lastSelectedCell = selectedCells[0];

      const minTimeSlotIndex = Math.min(
        timeSlots.indexOf(lastSelectedCell.timeSlot),
        timeSlots.indexOf(timeSlot)
      );
      const maxTimeSlotIndex = Math.max(
        timeSlots.indexOf(lastSelectedCell.timeSlot),
        timeSlots.indexOf(timeSlot)
      );

      const newSelectedCells = [];
      for (let i = minTimeSlotIndex; i <= maxTimeSlotIndex; i++) {
        newSelectedCells.push({ room, timeSlot: timeSlots[i] });
      }

      setSelectedCells(newSelectedCells);
    }
  };

  const handleMouseUp = () => {
    console.log(selectedCells);
    rowRef.current = null;
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple table"
        onMouseUp={handleMouseUp}
      >
        <TableHead>
          <TableRow>
            <TableCell>Time Slot</TableCell>
            {timeSlots.map((timeSlot, index) => (
              <TableCell key={index} align="right">
                {timeSlot}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room, rowIndex) => (
            <TableRow key={room}>
              <TableCell component="th" scope="row">
                {room}
              </TableCell>
              {timeSlots.map((timeSlot, columnIndex) => (
                <TableCell
                  key={timeSlot}
                  align="right"
                  onMouseDown={() => handleCellMouseDown(room, timeSlot)}
                  onMouseEnter={() => handleCellMouseEnter(room, timeSlot)}
                  style={{
                    backgroundColor: selectedCells.some(
                      (cell) => cell.room === room && cell.timeSlot === timeSlot
                    )
                      ? "lightblue"
                      : "white",
                  }}
                >
                  {
                    rows.find(
                      (data) => data.room === room && data.timeSlot === timeSlot
                    )?.slots
                  }
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
