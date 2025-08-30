import React, { useState } from 'react';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
  } from 'chart.js';
  import Chart from 'react-apexcharts';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add'; 
import { Card, CardContent, Typography, Grid } from '@mui/material';
import ReusableTable from '../../components/ReusableTable';
import { Box } from '@mui/material';
import { CustomContainer } from '../../../developer/component/detailsPage';
import { Event } from '@mui/icons-material';


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, PointElement);

const UserActivity = () => {
  const myRows = [
      {
        id: 1,
        dashboardID: 'D001',
        userEmailId: 'alice@example.com',
        accessDateTime: '2024-12-01 10:23:45',
        tabId: 'T001',
        functionName: 'Generate Report',
        functionId: 'F001',
      },
      {
        id: 2,
        dashboardID: 'D002',
        userEmailId: 'bob@example.com',
        accessDateTime: '2024-12-02 14:12:30',
        tabId: 'T002',
        functionName: 'Analyze Data',
        functionId: 'F002',
      },
      {
        id: 3,
        dashboardID: 'D003',
        userEmailId: 'charlie@example.com',
        accessDateTime: '2024-12-03 09:45:15',
        tabId: 'T003',
        functionName: 'Export Data',
        functionId: 'F003',
      },
      {
        id: 4,
        dashboardID: 'D004',
        userEmailId: 'diana@example.com',
        accessDateTime: '2024-12-04 11:18:25',
        tabId: 'T004',
        functionName: 'Import Data',
        functionId: 'F004',
      },
      {
        id: 5,
        dashboardID: 'D005',
        userEmailId: 'eve@example.com',
        accessDateTime: '2024-12-05 13:37:50',
        tabId: 'T005',
        functionName: 'Delete Records',
        functionId: 'F005',
      },
      {
        id: 6,
        dashboardID: 'D006',
        userEmailId: 'frank@example.com',
        accessDateTime: '2024-12-06 15:29:10',
        tabId: 'T006',
        functionName: 'Update Records',
        functionId: 'F006',
      },
      {
        id: 7,
        dashboardID: 'D007',
        userEmailId: 'grace@example.com',
        accessDateTime: '2024-12-07 16:45:35',
        tabId: 'T007',
        functionName: 'View Logs',
        functionId: 'F007',
      },
      {
        id: 8,
        dashboardID: 'D008',
        userEmailId: 'henry@example.com',
        accessDateTime: '2024-12-08 18:22:00',
        tabId: 'T008',
        functionName: 'Manage Users',
        functionId: 'F008',
      },
      {
        id: 9,
        dashboardID: 'D009',
        userEmailId: 'ivy@example.com',
        accessDateTime: '2024-12-09 08:55:15',
        tabId: 'T009',
        functionName: 'Generate Charts',
        functionId: 'F009',
      },
      {
        id: 10,
        dashboardID: 'D010',
        userEmailId: 'jack@example.com',
        accessDateTime: '2024-12-10 12:40:20',
        tabId: 'T010',
        functionName: 'Filter Data',
        functionId: 'F010',
      },
    ];
  const [rows, setRows] = useState(myRows);
  const [data, setData] = useState([
    { id: 1, name: 'Product A', sales: 150, status: 'Active' },
    { id: 2, name: 'Product B', sales: 200, status: 'Inactive' },
    { id: 3, name: 'Product C', sales: 300, status: 'Active' },
  ]);
  const [selectedRows, setSelectedRows] = useState([]);
  const handleRowSelect = (idOrIds) => {
    if (Array.isArray(idOrIds)) {
      setSelectedRows(idOrIds);
    } else {
      setSelectedRows((prev) =>
        prev.includes(idOrIds)
          ? prev.filter((rowId) => rowId !== idOrIds)
          : [...prev, idOrIds]
      );
    }
  };
  const handleDeleteRows = (ids) => {
    setRows(rows.filter((row) => !ids.includes(row.id)));
  };
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'], // Time or category labels
    datasets: [
      {
        // User Engagement Data
        label: 'User Engagement',
        data: [50, 70, 65, 80, 90, 100], // Example engagement scores (0-100)
      },
      {
        // User Retention Data
        label: 'User Retention',
        data: [40, 60, 55, 65, 75, 85], // Example retention scores (0-100)
      },
      {
        // New Users Data
        label: 'New Users',
        data: [10, 20, 30, 25, 40, 50], // Example number of new users
      },
    ],
  };
  const cellStyles = {
      isActive: (value) => ({
        backgroundColor: value === 'Yes' ? 'green' : 'red',
        color: 'white',
        borderRadius: '999px', // Max corner radius for pills
        textAlign: 'center',
        padding: '4px 8px',
      }),
  }
  const globalCellStyle = { padding: '10px', fontSize: '14px' };
  const columns = [
    { field: 'dashboardID', headerName: 'Dashboard ID' },
    { field: 'userEmailId', headerName: 'User Email ID' },
    {
      field: 'accessDateTime',
      headerName: 'Access Date Time',
      renderCell: (value) => (
        <>
          <Event sx={{ marginRight: '5px', color: 'gray' }} />
          {value ? new Date(value).toLocaleString() : 'N/A'}
        </>
      ),
    },
    { field: 'tabId', headerName: 'Tab ID' },
    { field: 'functionName', headerName: 'Function Name' },
    { field: 'functionId', headerName: 'Function ID' },
  ];
  
  return (
<CustomContainer 
>
  <Card
    sx={{
      width: '100%',
      height: '100%', // Adjust height as needed
      borderRadius: '16px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      top: '0px', // Move the Card slightly upwards
    }}
  >
    {/* Scrollable Card Content */}
    <Box
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        padding: '0px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {/* Chart Section */}
      <Box
        sx={{
          padding: '15px',
          borderRadius: '8px',
        }}
      >
        <ChartSection chartData={chartData} />
      </Box>

      {/* Table Section */}
      <ReusableTable
        data={rows}
        columns={columns}
        onDeleteRow={handleDeleteRows}
        selectable
        cellStyles={cellStyles}
        globalCellStyle={globalCellStyle}
      />
    </Box>
  </Card>
</CustomContainer>

  );
};

const ChartSection = ({ chartData }) => {
  const barChartOptions = {
    chart: { type: 'bar', height: 350 },
    xaxis: { categories: chartData.labels },
    plotOptions: {
      bar: { horizontal: false, columnWidth: '50%' },
    },
    colors: ['#FF5733', '#33FF57', '#3357FF'], // Red, Green, Blue for variety
  };

  const pieChartOptions = {
    chart: { type: 'pie' },
    labels: ['Active', 'Inactive'],
    colors: ['#FF9F00', '#FF4C00'], // Orange and Red for distinction
  };

  const scatterChartOptions = {
    chart: { type: 'scatter', height: 350 },
    xaxis: { categories: chartData.labels },
    colors: ['#FF1493', '#32CD32'], // Pink and Green for diversity
  };

  const lineChartOptions = {
    chart: { type: 'line', height: 350 },
    xaxis: { categories: chartData.labels },
    colors: ['#00BFFF', '#8A2BE2'], // Light Blue and Blue Violet
  };

  const areaChartOptions = {
    chart: { type: 'area', height: 350 },
    xaxis: { categories: chartData.labels },
    colors: ['#FF6347', '#20B2AA'], // Tomato and Light Sea Green
  };

  const radarChartOptions = {
    chart: { type: 'radar', height: 350 },
    xaxis: { categories: chartData.labels },
    colors: ['#FFD700', '#DAA520'], // Gold and Goldenrod
  };

  // Example user engagement and retention data
  const barChartSeries = [
    { name: 'User Engagement', data: chartData.datasets[0].data },
    { name: 'User Retention', data: chartData.datasets[1].data },
    { name: 'New Users', data: chartData.datasets[2].data },
  ];

  const pieChartSeries = [
    chartData.datasets[0].data.filter((v) => v > 0).length, // Active Users
    chartData.datasets[0].data.filter((v) => v <= 0).length, // Inactive Users
  ];

  const scatterChartSeries = [
    {
      name: 'Engagement vs Retention',
      data: chartData.labels.map((label, index) => ({
        x: chartData.datasets[0].data[index], // Engagement
        y: chartData.datasets[1].data[index], // Retention
      })),
    },
  ];

  const lineChartSeries = [
    { name: 'Engagement Trend', data: chartData.datasets[0].data },
    { name: 'Retention Trend', data: chartData.datasets[1].data },
  ];

  const areaChartSeries = [
    { name: 'Engagement Area', data: chartData.datasets[0].data },
    { name: 'Retention Area', data: chartData.datasets[1].data },
  ];

  const radarChartSeries = [
    { name: 'User Retention', data: chartData.datasets[0].data },
    { name: 'User Engagement', data: chartData.datasets[1].data },
  ];

  return (
    <Grid container spacing={2}>
      {/* Bar Chart Card */}
      <Grid item xs={12} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              User Engagement vs Retention (Bar Chart)
            </Typography>
            <Chart
              options={barChartOptions}
              series={barChartSeries}
              type="bar"
              height={350}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Pie Chart Card */}
      <Grid item xs={12} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Active vs Inactive Users (Pie Chart)
            </Typography>
            <Chart
              options={pieChartOptions}
              series={pieChartSeries}
              type="pie"
              height={350}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Scatter Chart Card */}
      <Grid item xs={12} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Engagement vs Retention (Scatter Chart)
            </Typography>
            <Chart
              options={scatterChartOptions}
              series={scatterChartSeries}
              type="scatter"
              height={350}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Line Chart Card */}
      <Grid item xs={12} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Engagement and Retention Trends (Line Chart)
            </Typography>
            <Chart
              options={lineChartOptions}
              series={lineChartSeries}
              type="line"
              height={350}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Area Chart Card */}
      <Grid item xs={12} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Engagement and Retention Area (Area Chart)
            </Typography>
            <Chart
              options={areaChartOptions}
              series={areaChartSeries}
              type="area"
              height={350}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Radar Chart Card */}
      <Grid item xs={12} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              User Retention and Engagement (Radar Chart)
            </Typography>
            <Chart
              options={radarChartOptions}
              series={radarChartSeries}
              type="radar"
              height={350}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
 



  

export default UserActivity;
