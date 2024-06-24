import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../tema";
import { mockDataTeam } from "../../data/data.js";
import Header from "../../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

const Usuarios = () => {
  const tema = useTheme();
  const colores = tokens(tema.palette.mode);

  const columnas = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "password",
      headerName: "Contraseña",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "rol",
      headerName: "Rol",
      flex: 1,
      renderCell: ({ row: { rol } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop="10px"
            backgroundColor={
              rol === "admin"
                ? colores.verdeDecor[600]
                : rol === "manager"
                ? colores.verdeDecor[700]
                : colores.verdeDecor[700]
            }
            borderRadius="4px"
          >
            {rol === "Admin" && <AdminPanelSettingsOutlinedIcon />}
            {rol === "cliente" && <SecurityOutlinedIcon />}
            {rol === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colores.gris[100]} sx={{ ml: "5px" }}>
              {rol}
            </Typography>
          </Box>
        );
      },
    },
  ];

  const [usuarios, setUsuarios] = useState([]);
  const [usuariosConRoles, setUsuariosConRoles] = useState([]);

  const datos = async () => {
    const info = await axios.get("http://localhost:5000/usuarios");
    setUsuarios(info.data);
  };

  const obtenerRolesParaUsuarios = async (usuarios) => {
    const usuariosConRoles = await Promise.all(
      usuarios.map(async (usuario) => {
        const { id_rol } = usuario;
        const rolResponse = await axios.get(
          `http://localhost:5000/roles/${id_rol}`
        );
        const info = rolResponse.data;
        const rolInfo = info.map((data) => {
          const datos = data.Rol;
          return datos;
        });
        const rol = rolInfo[0];
        return { ...usuario, rol };
      })
    );
    setUsuariosConRoles(usuariosConRoles);
  };

  useEffect(() => {
    datos();
  }, []);

  useEffect(() => {
    if (usuarios.length > 0) {
      obtenerRolesParaUsuarios(usuarios);
    }
  }, [usuarios]);

  return (
    <Box m="20px">
      <Header titulo="USUARIOS" subtitulo="Pagina de usuarios" />
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
        <DataGrid rows={usuariosConRoles} columns={columnas} />
      </Box>
    </Box>
  );
};

export default Usuarios;
