import React, { useState } from 'react'; 
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Paper,
  Button,
  Typography,
  Modal,
  Box,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FilterAlt } from '@mui/icons-material';


const FilterModal = ({ open, onClose, onApplyFilters, columns }) => {
    const [filters, setFilters] = useState({});
  
    const handleChange = (field, value) => {
      setFilters({
        ...filters,
        [field]: value,
      });
    };
  
    const handleApplyFilters = () => {
      onApplyFilters(filters);
      onClose();
    };
  
    return (
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
            minWidth: 400,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Filter Data
          </Typography>
          {columns.map((column) => (
            <TextField
              key={column.field}
              label={`Filter by ${column.headerName}`}
              value={filters[column.field] || ''}
              onChange={(e) => handleChange(column.field, e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleApplyFilters} variant="contained" color="primary">
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };


  const ReusableTable = ({
    data,
    columns,
    onDeleteRow,
    selectable,
    cellStyles = {},
    globalCellStyle = {textAlign:"center"},
    actionButtons = null,
  }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [idsToDelete, setIdsToDelete] = useState([]);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [filteredData, setFilteredData] = useState(data);
  
    const handleSelectRow = (id) => {
      setSelectedRows((prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((rowId) => rowId !== id)
          : [...prevSelected, id]
      );
    };
  
    const handleSelectAll = (event) => {
      if (event.target.checked) {
        setSelectedRows(filteredData.map((row) => row.id));
      } else {
        setSelectedRows([]);
      }
    };
  
    const getCellStyle = (column, row) => {
      const style =
        typeof cellStyles[column.field] === "function"
          ? cellStyles[column.field](row[column.field])
          : cellStyles[column.field] || {};
  
      return {
        ...globalCellStyle,
        ...style,
        fontFamily: "Poppins, sans-serif",
        textAlign: "center",
      };
    };
  
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "8px",
            marginBottom: "2px",
          }}
        >
          {selectable && onDeleteRow && (
            <Button
            variant="contained"
            color="error"
            onClick={() => setModalOpen(true)}
            disabled={selectedRows.length === 0}
            sx={{
              backgroundColor: "rgba(211, 47, 47, 0.8)", // Semi-transparent red
              color: "#fff", // Ensure white text for contrast
              fontFamily: "Poppins, sans-serif",
              marginRight: "10px",
              "&:hover": {
                backgroundColor: "rgba(211, 47, 47, 1)", // Fully opaque red on hover
              },
              "&:disabled": {
                backgroundColor: "rgba(211, 47, 47, 0.4)", // Lighter red when disabled
                color: "rgba(255, 255, 255, 0.7)", // Adjust text opacity for disabled state
              },
            }}
          >
            Delete Selected
          </Button>
          
          )}
          <Button
            variant="text"
            onClick={() => setFilterModalOpen(true)}
            startIcon={<FilterAlt />}
            sx={{
              fontFamily: "Poppins, sans-serif",
              backgroundColor: "#006064",
              color: "white",
              "&:hover": {
                backgroundColor: "#004d4d",
              },
            }}
          >
            Filter
          </Button>
        </Box>
  
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {selectable && (
                    <TableCell
                      padding="checkbox"
                      sx={{
                        color: "#095458",
                        fontFamily: "Poppins, sans-serif",
                        textAlign: "center",
                      }}
                    >
                      <Checkbox
                        indeterminate={
                          selectedRows.length > 0 &&
                          selectedRows.length < filteredData.length
                        }
                        checked={
                          filteredData.length > 0 &&
                          selectedRows.length === filteredData.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      sx={{
                        color: "#095458",
                        fontWeight: "bold",
                        fontFamily: "Poppins, sans-serif",
                        textAlign: "center",
                      }}
                    >
                      {column.headerName}
                    </TableCell>
                  ))}
                  {(onDeleteRow || actionButtons) && (
                    <TableCell
                      sx={{
                        color: "#095458",
                        fontWeight: "bold",
                        fontFamily: "Poppins, sans-serif",
                        textAlign: "center",
                      }}
                    >
                      Actions
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
  
              <TableBody>
                {filteredData.map((row, index) => (
                  <TableRow
                    key={row.id}
                    selected={selectedRows.includes(row.id)}
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff",
                    }}
                  >
                    {selectable && (
                      <TableCell
                        padding="checkbox"
                        sx={{ textAlign: "center", fontFamily: "Poppins, sans-serif" }}
                      >
                        <Checkbox
                          checked={selectedRows.includes(row.id)}
                          onChange={() => handleSelectRow(row.id)}
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => (
                      <TableCell
                        key={column.field}
                        style={getCellStyle(column, row)}
                      >
                        {column.renderCell
                          ? column.renderCell(row[column.field], row)
                          : row[column.field]?.toString() || ""}
                      </TableCell>
                    ))}
                    {(onDeleteRow || actionButtons) && (
                      <TableCell
                        sx={{
                          textAlign: "center",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        {actionButtons?.map(
                          ({ icon: Icon, onClick, tooltip }, index) => (
                            <IconButton
                              key={index}
                              onClick={() => onClick(row)}
                              title={tooltip || ""}
                            >
                              <Icon />
                            </IconButton>
                          )
                        )}
                        {onDeleteRow && (
                          <IconButton onClick={() => setModalOpen(true)}>
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </>
    );
  };
  
export default ReusableTable