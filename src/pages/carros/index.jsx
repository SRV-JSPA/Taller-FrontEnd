import { Box, Button, IconButton, TextField, Typography, useTheme, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../tema";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleEditClick(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDeleteClick(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const [carros, setCarros] = useState([]);
  const [filteredCarros, setFilteredCarros] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [nuevoCarro, setNuevoCarro] = useState({
    Marca: "",
    Modelo: "",
    Linea: "",
    Edicion: ""
  });

  const datos = async () => {
    const info = await axios.get("http://localhost:5000/carros");
    setCarros(info.data);
    setFilteredCarros(info.data);
  };

  useEffect(() => {
    datos();
  }, []);

  useEffect(() => {
    setFilteredCarros(
      carros.filter((carro) =>
        Object.values(carro)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, carros]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoCarro({ ...nuevoCarro, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (carro) => {
    setNuevoCarro(carro);
    setEditing(true);
    setOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/carros/${id}`);
      datos(); // Refresh the list of cars
    } catch (error) {
      console.error("Error al eliminar el carro:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://localhost:5000/carros/${nuevoCarro.id}`, nuevoCarro);
      } else {
        await axios.post("http://localhost:5000/carros", nuevoCarro);
      }
      datos(); // Refresh the list of cars
      setNuevoCarro({
        Marca: "",
        Modelo: "",
        Linea: "",
        Edicion: ""
      }); // Reset the form
      setOpen(false); // Close the modal
      setEditing(false); // Reset editing state
    } catch (error) {
      console.error("Error al agregar/editar el carro:", error);
    }
  };

  return (
    <Box m="20px">
      <Header titulo="CARROS" subtitulo="Pagina de carros" />
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Buscar Carro"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: '300px' }}
        />
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Agregar Carro
        </Button>
      </Box>
      <Box
        m="40px 0 20px 0"
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
        <DataGrid rows={filteredCarros} columns={columnas} />
      </Box>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            {editing ? "Editar Carro" : "Agregar Nuevo Carro"}
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              id="Marca"
              name="Marca"
              label="Marca"
              value={nuevoCarro.Marca}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              required
              fullWidth
              id="Modelo"
              name="Modelo"
              label="Modelo"
              value={nuevoCarro.Modelo}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              required
              fullWidth
              id="Linea"
              name="Linea"
              label="Linea"
              value={nuevoCarro.Linea}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              required
              fullWidth
              id="Edicion"
              name="Edicion"
              label="Edicion"
              value={nuevoCarro.Edicion}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
              {editing ? "Guardar Cambios" : "Agregar Carro"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Carros;
