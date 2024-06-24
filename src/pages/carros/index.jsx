import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../tema";
import { mockDataTeam } from "../../data/data.js";
import Header from "../../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";

const Carros = () => {
  const tema = useTheme();
  const colores = tokens(tema.palette.mode);

  const columnas = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "Marca",
      headerName: "Marca",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Modelo",
      headerName: "Modelo",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "Linea",
      headerName: "Linea",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Edicion",
      headerName: "Edicion",
      flex: 1,
    },
  ];

  const [carros, setCarros] = useState([]);

  const datos = async () => {
    const info = await axios.get("http://localhost:5000/carros");
    setCarros(info.data);
  };

  useEffect(() => {
    datos();
  }, []);

  return (
    <Box m="20px">
      <Header titulo="CARROS" subtitulo="Pagina de carros" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colores.verdeDecor[300],
          },
          "& .MuiDataGrid-withBorderColor": {
            backgroundColor: colores.azulDecor[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colores.primario[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colores.azulDecor[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colores.verdeDecor[200]} !important`,
          },
          "& .MuiDataGrid-scrollbarFiller--header": {
            backgroundColor: colores.azulDecor[700],
          },
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            marginRight: "none",
          },
        }}
      >
        <DataGrid rows={carros} columns={columnas} />
      </Box>
    </Box>
  );
};

export default Carros;
