import React, { useState, useMemo } from 'react';
import { Box, Grid, Paper, TextField, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const columns = [
  { field: 'created_DT', headerName: 'Created_DT', width: 150 },
  { field: 'modified_DT', headerName: 'Modified_DT', width: 150 },
  { field: 'entity', headerName: 'Entity', width: 100 },
  { field: 'operating_status', headerName: 'Operating Status', width: 180 },
  { field: 'legal_name', headerName: 'Legal Name', width: 150 },
  { field: 'dba_name', headerName: 'DBA Name', width: 150 },
  { field: 'physical_address', headerName: 'Physical Address', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 150 },
  { field: 'dot', headerName: 'DOT', width: 100 },
  { field: 'mc_mx_ff', headerName: 'MC/MX/FF', width: 100 },
  { field: 'power_units', headerName: 'Power Units', width: 140 },
  { field: 'out_of_service_date', headerName: 'Out of Service Date', width: 200 },
];

function DataTable({ data }) {
  const theme = useTheme();
  const [filter, setFilter] = useState('');
  const rows = useMemo(() => data.map((row, index) => ({ id: index, ...row })), [data]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredRows = useMemo(() => {
    if (!filter) return rows;
    const lowerCaseFilter = filter.toLowerCase();
    return rows.filter(row =>
      columns.some(column => String(row[column.field]).toLowerCase().includes(lowerCaseFilter))
    );
  }, [filter, rows]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box p={2} sx={{ backgroundColor: theme.palette.background.default }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Global Filter"
              variant="outlined"
              fullWidth
              value={filter}
              onChange={handleFilterChange}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ height: 600, width: '100%' ,backgroundColor:"#edeaea4e" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          components={{
            Toolbar: GridToolbar,
          }}
          disableColumnFilter={false}
          disableColumnMenu={false}
        />
      </Box>
    </Paper>
  );
}

export default DataTable;
