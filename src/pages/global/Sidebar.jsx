import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../tema";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { MenuOutlined } from "@mui/icons-material";

const Item = ({ titulo, to, icono, seleccionado, setSeleccionado }) => {
  const tema = useTheme();
  const colores = tokens(tema.palette.mode);
  return (
    <MenuItem
      active={seleccionado === titulo}
      style={{ color: colores.gris[100] }}
      onClick={() => setSeleccionado(titulo)}
      icon={icono}
    >
      <Typography>{titulo}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const tema = useTheme();
  const colores = tokens(tema.palette.mode);
  const [colapsado, setColapsado] = useState(false);
  const [seleccionado, setSeleccionado] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colores.primario[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={colapsado}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setColapsado(!colapsado)}
            icon={colapsado ? <MenuOutlined /> : undefined}
            style={{ margin: "10px 0 20px 0", color: colores.gris[100] }}
          >
            {!colapsado && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colores.gris[100]}>
                  Taller
                </Typography>
                <IconButton onClick={() => setColapsado(!colapsado)}>
                  <MenuOutlined />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!colapsado && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="perfil usuario"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colores.gris[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Nombre Usuario
                </Typography>
                <Typography variant="h5" color={colores.verdeDecor[500]}>
                  Puesto usuario
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={colapsado ? undefined : "10%"}>
            <Item
              titulo="Dashboard"
              to="/"
              icono={<HomeOutlinedIcon />}
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
            />
            <Typography
              variant="h6"
              color={colores.gris[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Manejo
            </Typography>
            <Item
              titulo="Carros"
              to="/carros"
              icono={<DirectionsCarFilledOutlinedIcon />}
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
            />
            <Item
              titulo="Usuarios"
              to="/usuarios"
              icono={<PeopleOutlinedIcon />}
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
            />
            <Item
              titulo="Inventario"
              to="/inventario"
              icono={<ReceiptOutlinedIcon />}
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
            />
            <Item
              titulo="Calendario"
              to="/calendario"
              icono={<CalendarTodayOutlinedIcon />}
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
