import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  InputLabel,
} from "@mui/material"
import Nav from "../../../components/nav";
import Footer from "../../../components/footer";
import { Navigate, useNavigate, useParams } from "react-router-dom";


const ExistingDataSet = () => {
  const navigate = useNavigate();
  const {module_id} = useParams()
  const [selectedDataSet, setSelectedDataSet] = useState("");
  const [iframeSrc, setIframeSrc] = useState("");

  const handleChange = (event) => {
    const navigate = useNavigate
    const selectedValue = event.target.value;
    setSelectedDataSet(selectedValue);

    // Update iframeSrc immediately when dropdown changes
    switch (selectedValue) {
      case "Data Set 1":
        setIframeSrc("https://static.wixstatic.com/media/9d7f1e_85cfaee762af403c9c6012a038aaad90~mv2.png");
        break;
      case "Data Set 2":
        setIframeSrc("https://exceljet.net/sites/default/files/styles/original_with_watermark/public/field/image/23%20things%20to%20know%20about%20Excel%20Tables.png");
        break;
      case "Data Set 3":
        setIframeSrc("https://exceljet.net/sites/default/files/images/articles/inline/table%20headers%20replace%20columns.png");
        break;
      default:
        setIframeSrc("");
    }
  };

  const handleSubmit = () => {
    // Navigate to the current iframeSrc when the "Submit" button is clicked
    if (iframeSrc) {
      navigate(`/home/${module_id}/new-tile-create/existing/modelling`)
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        height: "80vh",
        padding: "16px",
        position: "relative", // Make parent relatively positioned
      }}
    >
      {/* Background Box */}
      <Box
        sx={{
          position: "absolute", // Positioned behind the Card
          width: "100%", // Slightly larger than the Card
          height: "60%", // Adjusted to create a visual effect
          backgroundColor: "#095458", // Gray background
          top: 0
        }}
      />
  
      {/* Main Card */}
      <Card
        sx={{
          width: "80%",
          padding: "24px",
          borderRadius: "16px",
          backgroundColor: "#fff",
          position: "relative", // Ensure it appears above the background
        }}
      >
        {/* Dropdown and Submit Button in a Centered Container */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "24px",
            gap: "16px",
            width: "50%", // Centered div with 50% width
            marginLeft: "auto", // Center horizontally
            marginRight: "auto", // Center horizontally
          }}
        >
          <FormControl fullWidth sx={{ backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
            <Select
              value={selectedDataSet}
              onChange={handleChange}
              displayEmpty // Ensures the placeholder-like item is shown when no value is selected
              sx={{ borderRadius: "8px" }}
            >
              {/* Placeholder item */}
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              <MenuItem value="Data Set 1">Data Set 1</MenuItem>
              <MenuItem value="Data Set 2">Data Set 2</MenuItem>
              <MenuItem value="Data Set 3">Data Set 3</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            sx={{
              width: "114px",
              backgroundColor: "#00ACC1",
              color: "white",
              borderRadius: "8px",
              padding: "8px 16px",
              "&:hover": { backgroundColor: "#008b9b" },
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
  
        {/* Data Overview */}
        <Box
          sx={{
            textAlign: "center",
            marginBottom: "16px",
            fontWeight: "bold",
            fontSize: "18px",
            color: "#095458",
          }}
        >
          Overview
        </Box>
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            overflow: "hidden",
            height: "400px",
            backgroundColor: "#f5f5f5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {iframeSrc ? (
            <iframe
              title="Data Preview"
              src={iframeSrc}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                display: "block", // Ensure iframe is block-level for centering
              }}
            />
          ) : (
            <Typography variant="body2" color="textSecondary">
              Please select a dataset to view the table.
            </Typography>
          )}
        </Box>
      </Card>
    </Box>
  );
  
};


export default ExistingDataSet
