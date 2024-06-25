import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listplugin from "@fullcalendar/list";
import { formatDate } from "@fullcalendar/core";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../tema";

const Calendar = () => {
  const tema = useTheme();
  const colores = tokens(tema.palette.mode);
  const [eventosActuales, setEventosActuales] = useState([]);

  const handleDateClick = (seleccionado) => {
    const titulo = prompt("Porfavor ingresa un titulo nuevo para el evento");
    const calendarioApi = seleccionado.view.calendar;
    calendarioApi.unselect();

    if (titulo) {
      calendarioApi.addEvent({
        id: `${seleccionado.dateStr}-${titulo}`,
        titulo,
        start: seleccionado.startStr,
        end: seleccionado.endStr,
        allDay: seleccionado.allDay,
      });
    }
  };
  const handleEventClick = (seleccionado) => {
    if (
      window.confirm(
        `Estas seguro de eliminar el evento '${seleccionado.event.title}'`
      )
    ) {
      seleccionado.event.remove();
    }
  };

  return (
    <Box m="20px">
      <Header titulo="CALENDARIO" subtitulo="Calendario de eventos" />
      <Box display="flex" justifyContent="space-between">
        <Box
          flex="1 1 20%"
          backgroundColor={colores.primario[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Eventos</Typography>
          <List>
            {eventosActuales.map((evento) => {
              <ListItem
                key={evento.id}
                sx={{
                  backgroundColor: colores.verdeDecor[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={evento.title}
                  secondary={
                    <Typography>
                      {formatDate(evento.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>;
            })}
          </List>
        </Box>

        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listplugin,
            ]}
            headerToolbar={{
                left: "prev, next today",
                center: "title",
                right: "dayGridMonth, timeGridWeek, timeGridDay, listMonth"
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(eventos) => setEventosActuales(eventos)}
            initialEvents={[

            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
