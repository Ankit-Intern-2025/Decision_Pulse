import React, { useState } from "react";
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
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import Select, { components } from "react-select";

export const CustomTable = ({
  data,
  columns,
  onDeleteRow,
  selectable,
  cellStyles = {},
  globalCellStyle = { textAlign: "center" },
  onApplyFilters
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
                      sx={{
                        textAlign: "center",
                        fontFamily: "Poppins, sans-serif",
                      }}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <FilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApplyFilters={onApplyFilters}
        columns={columns}
      />
    </>
  );
};

export default CustomTable;

const FilterModal = ({ open, onClose, onApplyFilters, columns }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filters, setFilters] = useState({});

  const handleSelectedFilterChange = (value) => {
    setSelectedFilters(value);
  };
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
      <div className="flex flex-col absolute rounded-md top-[50%] left-[50%] px-8 min-h-[600px] min-w-[700px] shadow-xl translate-x-[-50%] translate-y-[-50%] bg-white py-8">
        <h6 className="text-lg font-semibold mb-4">Filter Data</h6>

        <Select
          isMulti
          options={columns.map((data) => ({
            value: data.field,
            label: data.headerName,
          }))}
          placeholder="Select filter by"
          className="z-50"
          value={selectedFilters}
          onChange={handleSelectedFilterChange}
          styles={{
            control: (base) => ({
              ...base,
              // borderColor: "rgba(156, 163, 175)", // Matches Tailwind `border-slate-400`
              borderRadius: "0.15rem", // Matches Tailwind `rounded-md`
              // backgroundColor: "rgb(241, 245, 249)", // Matches Tailwind `bg-slate-100`
            }),
          }}
          components={{ DropdownIndicator: CustomDropdownIndicator }}
        />

        <div className="h-[500px] flex flex-col mt-4 gap-3 overflow-x-hidden overflow-y-auto custom-scrollbar">
          {selectedFilters.map((column) => {
            return (
              <>
                <input
                  className="outline-none px-3 py-2 border rounded-sm text-sm font-normal"
                  key={column?.label}
                  placeholder={`Filter by ${column?.label}`}
                  value={filters[column.value] || ""}
                  onChange={(e) => handleChange(column.field, e.target.value)}
                />
              </>
            );
          })}
        </div>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <button className="btn-primary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleApplyFilters}>
            Apply Filters
          </button>
        </Box>
      </div>
    </Modal>
  );
};

const CustomDropdownIndicator = (props) => {
  const { selectProps } = props;

  return (
    <components.DropdownIndicator {...props}>
      {selectProps.menuIsOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="13"
          viewBox="0 0 17 15"
          fill="none"
          className="flex-shrink-0"
        >
          <path
            d="M9.36602 14.5C8.98112 15.1667 8.01888 15.1667 7.63397 14.5L0.272759 1.75C-0.112142 1.08333 0.368983 0.250002 1.13878 0.250002L15.8612 0.25C16.631 0.25 17.1121 1.08333 16.7272 1.75L9.36602 14.5Z"
            fill="#3C3C3C"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="13"
          viewBox="0 0 17 15"
          fill="none"
          className="flex-shrink-0"
        >
          <path
            d="M7.63398 0.5C8.01888 -0.166667 8.98112 -0.166667 9.36602 0.5L16.7272 13.25C17.1121 13.9167 16.631 14.75 15.8612 14.75H1.13878C0.368984 14.75 -0.112141 13.9167 0.272759 13.25L7.63398 0.5Z"
            fill="#016064"
          />
        </svg>
      )}
    </components.DropdownIndicator>
  );
};
