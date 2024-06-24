import { Box, Typography, useTheme } from "@mui/material"
import {DataGrid} from '@mui/x-data-grid'
import {tokens} from '../../tema'
import { mockDataTeam } from "../../data/data.js"
import Header from "../../components/Header"

const Carros = () => {
  const tema = useTheme()
  const colores = tokens(tema.palette.mode)

  const columnas = [
    {
        field: "id",
        headerName: "ID",

    },
    {
        field: "marca",
        headerName: "Marca",
        flex: 1,
        cellClassName: "name-column--cell"
    },
    {
        field: "modelo",
        headerName: "Modelo",
        type: "number",
        headerAlign: "left",
        align: "left",
    },
    {
        field: "linea",
        headerName: "Linea",
        flex: 1,
        cellClassName: "name-column--cell"
    },
    {
        field: "edicion",
        headerName: "Edicion",
        flex: 1,
    }
  ]

  return (
    <Box m="20px" >
        <Header titulo="CARROS" subtitulo="Pagina de carros" />
        <Box m="40px 0 0 0" height="75vh" sx={{
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
          }
        }} >
            <DataGrid rows={mockDataTeam} columns={columnas} />
        </Box>
    </Box>
  )
}

export default Carros


