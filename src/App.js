import React, { useEffect, useState } from 'react';
import { Container, Typography, CssBaseline } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import DataTable from './Components/DataTable';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//     },
//     secondary: {
//       main: '#d32f2f',
//     },
//     background: {
//       default: '#f4f6f8',
//     },
//   },
//   typography: {
//     h4: {
//       fontWeight: 600,
//     },
//   },
// });

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://docs.google.com/spreadsheets/d/1hB_LjBT9ezZigXnC-MblT2PXZledkZqBnvV23ssfSuE/gviz/tq?tqx=out:csv')
      .then(response => response.text())
      .then(csv => {
        const rows = csv.split('\n').slice(1);
        const jsonData = rows.map(row => {
          const cols = row.split(',');
          return {
            created_DT: cols[0],
            modified_DT: cols[1],
            entity: cols[2],
            operating_status: cols[3],
            legal_name: cols[4],
            dba_name: cols[5],
            physical_address: cols[6],
            phone: cols[7],
            dot: cols[8],
            mc_mx_ff: cols[9],
            power_units: cols[10],
            out_of_service_date: cols[11],
          };
        });
        setData(jsonData);
      });
  }, []);

  return (
    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
      <Container maxWidth="100%" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          FMCSA Viewer
        </Typography>
        <DataTable data={data} />
      </Container>
    // </ThemeProvider>
  );
}

export default App;
